import { after, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import {
  adminContactEmailHtml,
  adminContactEmailText,
  customerConfirmationEmailHtml,
  customerConfirmationEmailText,
} from "@/lib/email-templates";
import { deliverAdminNotify, notifyAdmin, sendEmail } from "@/lib/notify";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(5),
  scheduledAt: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const data = parsed.data;
  const booking = await prisma.booking.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      budget: data.budget,
      timeline: data.timeline,
      message: data.message,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      status: data.scheduledAt ? "SCHEDULED" : "NEW",
    },
  });

  const adminBody = adminContactEmailText(data);
  const adminNotify = await notifyAdmin({
    title: data.scheduledAt
      ? `Đặt lịch tư vấn mới từ ${data.name}`
      : `Liên hệ mới từ ${data.name}`,
    body: adminBody,
    channel: "EMAIL",
    meta: { bookingId: booking.id },
    html: adminContactEmailHtml(data),
    deliver: false,
  });

  // Trả success ngay — email chạy nền sau khi response hoàn tất
  after(async () => {
    try {
      await deliverAdminNotify(adminNotify);
      await sendEmail({
        to: data.email,
        subject: "Đã nhận yêu cầu — Trần Công Tiến",
        text: customerConfirmationEmailText(data.name),
        html: customerConfirmationEmailHtml({
          name: data.name,
          message: data.message,
        }),
      });
    } catch (err) {
      console.error("[bookings] background email failed", err);
    }
  });

  return NextResponse.json({ ok: true, id: booking.id });
}
