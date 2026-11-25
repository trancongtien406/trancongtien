import { after, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { trackServerEvent } from "@/lib/analytics";
import { prisma } from "@/lib/db";
import {
  adminContactEmailHtml,
  adminContactEmailText,
  customerConfirmationEmailHtml,
  customerConfirmationEmailText,
} from "@/lib/email-templates";
import {
  createConsultationLead,
  findDuplicateLeads,
} from "@/lib/leads";
import { deliverAdminNotify, notifyAdmin, sendEmail } from "@/lib/notify";
import { REF_COOKIE, resolveApprovedPartner } from "@/lib/partners";
import {
  formatPhoneForStorage,
  isValidEmail,
  isValidVnPhone,
} from "@/lib/validation";

const schema = z.object({
  name: z.string().trim().min(2, "Họ tên tối thiểu 2 ký tự"),
  company: z.string().trim().max(160).optional(),
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
  industry: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().trim().min(5, "Nội dung tối thiểu 5 ký tự"),
  scheduledAt: z.string().optional(),
  referralCode: z.string().trim().max(32).optional(),
  landingPath: z.string().trim().max(500).optional(),
  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  consent: z.literal(true, { error: "Bạn cần đồng ý chính sách bảo mật" }),
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

  const cookieStore = await cookies();
  const requestedRef =
    data.referralCode || cookieStore.get(REF_COOKIE)?.value || "";
  const partner = await resolveApprovedPartner(requestedRef);
  const duplicates = await findDuplicateLeads(data.email, data.phone);

  const lead = await createConsultationLead(data, partner);

  if (duplicates.length > 0) {
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: "SYSTEM",
        title: "Cảnh báo trùng email/SĐT",
        body: `Đã có ${duplicates.length} lead liên quan: ${duplicates
          .map((d) => d.leadNumber)
          .join(", ")}`,
        meta: JSON.stringify({
          duplicates: duplicates.map((d) => ({
            id: d.id,
            leadNumber: d.leadNumber,
            status: d.status,
          })),
        }),
      },
    });
  }

  const href = `/admin/leads?id=${lead.id}`;
  const adminBody = `${adminContactEmailText(data)}\nChi tiết: ${href}`;
  const adminNotify = await notifyAdmin({
    title: data.scheduledAt
      ? `Đặt lịch tư vấn mới từ ${data.name}`
      : `Liên hệ mới từ ${data.name}`,
    body: adminBody,
    channel: "EMAIL",
    meta: {
      leadId: lead.id,
      leadNumber: lead.leadNumber,
      href,
      duplicateWarning: duplicates.length > 0,
    },
    html: adminContactEmailHtml({ ...data, adminHref: href }),
    deliver: false,
  });

  after(async () => {
    try {
      await deliverAdminNotify(adminNotify);
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
      await trackServerEvent("consultation_submitted", {
        industry: data.industry || null,
        projectType: data.projectType || null,
        hasPartner: Boolean(partner),
        landingPath: data.landingPath || null,
        utmSource: data.utmSource || null,
      });
    } catch (err) {
      console.error("[bookings] background email/analytics failed", err);
    }
  });

  return NextResponse.json({
    ok: true,
    id: lead.id,
    leadNumber: lead.leadNumber,
    duplicateWarning: duplicates.length > 0,
  });
}
