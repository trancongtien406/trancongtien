import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import {
  createPayosCheckout,
  createProposal,
  markCommissionPaid,
  markProposalSent,
  recordPayment,
} from "@/lib/commercial";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const proposalSchema = z.object({
  action: z.literal("create_proposal"),
  leadId: z.string().min(1),
  title: z.string().trim().min(3).max(200),
  amount: z.coerce.number().positive(),
  currency: z.string().optional(),
});

const sendProposalSchema = z.object({
  action: z.literal("send_proposal"),
  proposalId: z.string().min(1),
});

const paymentSchema = z.object({
  action: z.literal("record_payment"),
  leadId: z.string().min(1),
  amount: z.coerce.number().positive(),
  currency: z.string().optional(),
  reference: z.string().trim().max(200).optional(),
  note: z.string().trim().max(2000).optional(),
  status: z.enum(["PENDING", "RECEIVED", "REFUNDED", "CANCELLED"]).optional(),
  receivedAt: z.string().optional(),
});

const payosSchema = z.object({
  action: z.literal("create_payos_link"),
  leadId: z.string().min(1),
  amount: z.coerce.number().positive(),
  note: z.string().trim().max(2000).optional(),
});

const payCommissionSchema = z.object({
  action: z.literal("pay_commission"),
  commissionId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const user = await requireAdmin();
    const body = await request.json();
    const action = body.action as string;

    if (action === "create_proposal") {
      const parsed = proposalSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const proposal = await createProposal({
        ...parsed.data,
        actorId: user.id,
      });
      revalidatePath("/admin/thuong-mai");
      revalidatePath("/admin/leads");
      return NextResponse.json({ ok: true, id: proposal.id });
    }

    if (action === "send_proposal") {
      const parsed = sendProposalSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      await markProposalSent(parsed.data.proposalId, user.id);
      revalidatePath("/admin/thuong-mai");
      return NextResponse.json({ ok: true });
    }

    if (action === "record_payment") {
      const parsed = paymentSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const payment = await recordPayment({
        ...parsed.data,
        actorId: user.id,
      });
      revalidatePath("/admin/thuong-mai");
      revalidatePath("/admin/leads");
      revalidatePath("/admin/partners");
      return NextResponse.json({ ok: true, id: payment.id });
    }

    if (action === "create_payos_link") {
      const parsed = payosSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      const origin =
        process.env.SITE_ORIGIN?.replace(/\/$/, "") ||
        siteConfig.url.replace(/\/$/, "");
      const payment = await createPayosCheckout({
        ...parsed.data,
        actorId: user.id,
        origin,
      });
      revalidatePath("/admin/thuong-mai");
      revalidatePath("/admin/leads");
      return NextResponse.json({
        ok: true,
        id: payment.id,
        checkoutUrl: payment.checkoutUrl,
      });
    }

    if (action === "pay_commission") {
      const parsed = payCommissionSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message },
          { status: 400 },
        );
      }
      await markCommissionPaid(parsed.data.commissionId, user.id);
      revalidatePath("/admin/thuong-mai");
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  } catch (error) {
    const unauthorized =
      error instanceof Error && error.message === "UNAUTHORIZED";
    const notFound = error instanceof Error && error.message === "NOT_FOUND";
    const payosMissing =
      error instanceof Error && error.message === "PAYOS_NOT_CONFIGURED";
    return NextResponse.json(
      {
        error: unauthorized
          ? "Unauthorized"
          : notFound
            ? "Không tìm thấy"
            : payosMissing
              ? "Chưa cấu hình PayOS (PAYOS_CLIENT_ID / API_KEY / CHECKSUM_KEY)"
              : error instanceof Error
                ? error.message
                : "Không thể xử lý yêu cầu",
      },
      {
        status: unauthorized ? 401 : notFound ? 404 : payosMissing ? 400 : 500,
      },
    );
  }
}
