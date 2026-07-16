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
import {
  formatPhoneForStorage,
  isValidEmail,
  isValidVnPhone,
} from "@/lib/validation";

const schema = z.object({
  name: z.string().trim().min(2, "Họ tên tối thiểu 2 ký tự"),
  email: z
    .string()
    .trim()
    .min(1, "Email là bắt buộc")
    .refine(isValidEmail, "Email không hợp lệ"),
  phone: z
    .string()
    .trim()
    .min(1, "Số điện thoại là bắt buộc")
    .refine(isValidVnPhone, "Số điện thoại không hợp lệ"),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().trim().min(5, "Nội dung tối thiểu 5 ký tự"),
  scheduledAt: z.string().optional(),
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const data = {
    ...parsed.data,
    email: parsed.data.email.trim().toLowerCase(),
    phone: formatPhoneForStorage(parsed.data.phone),
  };

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

  const href = `/admin/bookings?id=${booking.id}`;
  const adminBody = `${adminContactEmailText(data)}\nChi tiết: ${href}`;
  const adminNotify = await notifyAdmin({
    title: data.scheduledAt
      ? `Đặt lịch tư vấn mới từ ${data.name}`
      : `Liên hệ mới từ ${data.name}`,
    body: adminBody,
    channel: "EMAIL",
    meta: { bookingId: booking.id, href },
    html: adminContactEmailHtml({ ...data, adminHref: href }),
    deliver: false,
  });

  // Trả success ngay — email chạy nền sau khi response hoàn tất
  after(async () => {
    try {
      await deliverAdminNotify(adminNotify);

      // Chỉ gửi xác nhận khi email khách hợp lệ
      if (isValidEmail(data.email)) {
        await sendEmail({
          to: data.email,
          subject: "Đã nhận yêu cầu — Trần Công Tiến",
          text: customerConfirmationEmailText(data.name),
          html: customerConfirmationEmailHtml({
            name: data.name,
            message: data.message,
          }),
        });
      }
    } catch (err) {
      console.error("[bookings] background email failed", err);
    }
  });

  return NextResponse.json({ ok: true, id: booking.id });
}
