import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { notifyAdmin, sendEmail } from "@/lib/notify";

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

  await notifyAdmin({
    title: data.scheduledAt
      ? `Đặt lịch tư vấn mới từ ${data.name}`
      : `Liên hệ mới từ ${data.name}`,
    body: [
      `Email: ${data.email}`,
      `SĐT: ${data.phone || "—"}`,
      `Loại: ${data.projectType || "—"}`,
      `Ngân sách: ${data.budget || "—"}`,
      `Timeline: ${data.timeline || "—"}`,
      `Nội dung: ${data.message}`,
      data.scheduledAt ? `Lịch hẹn: ${data.scheduledAt}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    channel: "EMAIL",
    meta: { bookingId: booking.id },
  });

  await sendEmail({
    to: data.email,
    subject: "Đã nhận yêu cầu — Tran Cong Tien Studio",
    text: `Xin chào ${data.name},\n\nTôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong 24 giờ.\n\n— Trần Công Tiến`,
  });

  return NextResponse.json({ ok: true, id: booking.id });
}
