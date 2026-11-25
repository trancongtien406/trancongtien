import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  extendOwnershipIfNeeded,
  reassignLeadPartner,
  releaseLeadOwnership,
} from "@/lib/leads";

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum([
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "MEETING",
    "PROPOSAL",
    "NEGOTIATION",
    "WON",
    "LOST",
  ]),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
  note: z.string().trim().max(5000).optional(),
  nextFollowUpAt: z.string().optional(),
  lostReason: z.string().trim().max(1000).optional(),
});

const releaseSchema = z.object({
  id: z.string().min(1),
  reason: z.string().trim().max(1000).optional(),
});

const reassignSchema = z.object({
  id: z.string().min(1),
  partnerId: z.string().min(1),
});

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();
    const body = await request.json();
    const action =
      body.action === "release"
        ? "release"
        : body.action === "reassign"
          ? "reassign"
          : "update";

    if (action === "release") {
      const parsed = releaseSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      await releaseLeadOwnership(
        parsed.data.id,
        user.id,
        parsed.data.reason,
      );
      revalidatePath("/admin/leads");
      return NextResponse.json({ ok: true });
    }

    if (action === "reassign") {
      const parsed = reassignSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      await reassignLeadPartner(
        parsed.data.id,
        parsed.data.partnerId,
        user.id,
      );
      revalidatePath("/admin/leads");
      revalidatePath("/admin/partners");
      return NextResponse.json({ ok: true });
    }

    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const previous = await prisma.lead.findUnique({ where: { id: data.id } });
    if (!previous) {
      return NextResponse.json({ error: "Lead không tồn tại" }, { status: 404 });
    }

    const followUpChanged =
      Boolean(data.nextFollowUpAt) &&
      data.nextFollowUpAt !==
        (previous.nextFollowUpAt?.toISOString().slice(0, 16) || "");

    await prisma.$transaction(async (tx) => {
      await tx.lead.update({
        where: { id: data.id },
        data: {
          status: data.status,
          priority: data.priority,
          nextFollowUpAt: data.nextFollowUpAt
            ? new Date(data.nextFollowUpAt)
            : null,
          lostReason: data.status === "LOST" ? data.lostReason || null : null,
          lastContactAt:
            data.note || followUpChanged ? new Date() : previous.lastContactAt,
        },
      });
      if (previous.status !== data.status) {
        await tx.leadActivity.create({
          data: {
            leadId: data.id,
            actorId: user.id,
            type: "STATUS_CHANGED",
            title: `Trạng thái: ${previous.status} → ${data.status}`,
          },
        });
      }
      if (data.note) {
        await tx.leadActivity.create({
          data: {
            leadId: data.id,
            actorId: user.id,
            type: "NOTE",
            title: "Ghi chú",
            body: data.note,
          },
        });
      }
      if (followUpChanged) {
        await tx.leadActivity.create({
          data: {
            leadId: data.id,
            actorId: user.id,
            type: "FOLLOW_UP",
            title: "Cập nhật follow-up",
            body: data.nextFollowUpAt || "",
          },
        });
        await extendOwnershipIfNeeded(tx, data.id, user.id, true);
      }
    });
    revalidatePath("/admin/leads");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const unauthorized =
      error instanceof Error && error.message === "UNAUTHORIZED";
    const notFound = error instanceof Error && error.message === "NOT_FOUND";
    const partnerMissing =
      error instanceof Error && error.message === "PARTNER_NOT_FOUND";
    const partnerNotApproved =
      error instanceof Error && error.message === "PARTNER_NOT_APPROVED";
    return NextResponse.json(
      {
        error: unauthorized
          ? "Unauthorized"
          : notFound
            ? "Lead không tồn tại"
            : partnerMissing
              ? "Đối tác không tồn tại"
              : partnerNotApproved
                ? "Đối tác chưa được duyệt"
                : "Không thể cập nhật lead",
      },
      {
        status: unauthorized
          ? 401
          : notFound || partnerMissing
            ? 404
            : partnerNotApproved
              ? 400
              : 500,
      },
    );
  }
}
