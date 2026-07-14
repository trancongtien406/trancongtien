import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notifyAdmin } from "@/lib/notify";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const id = String(form.get("id") || "");
    const status = String(form.get("status") || "CONTACTED");
    const scheduledAt = String(form.get("scheduledAt") || "");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.booking.update({
      where: { id },
      data: {
        status: status as
          | "NEW"
          | "CONTACTED"
          | "SCHEDULED"
          | "DONE"
          | "CANCELLED",
        ...(scheduledAt ? { scheduledAt: new Date(scheduledAt) } : {}),
      },
    });

    if (status === "SCHEDULED") {
      await notifyAdmin({
        title: "Lịch tư vấn đã xác nhận",
        body: `Booking ${id} → SCHEDULED${scheduledAt ? ` lúc ${scheduledAt}` : ""}`,
        channel: "EMAIL",
        meta: { bookingId: id },
      });
    }

    revalidatePath("/admin/bookings");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
