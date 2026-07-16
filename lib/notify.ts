import { prisma } from "@/lib/db";
import type { NotificationChannel } from "@/lib/generated/prisma/client";

type NotifyInput = {
  title: string;
  body: string;
  channel?: NotificationChannel;
  meta?: Record<string, unknown>;
  /** HTML body for admin email (falls back to text if omitted). */
  html?: string;
  /**
   * When false, only persist the in-app notification and return a payload
   * for `deliverAdminNotify` (useful with Next.js `after()`).
   */
  deliver?: boolean;
};

/** Persist in-app notification and (by default) attempt email/SMS to admin. */
export async function notifyAdmin(input: NotifyInput) {
  const setting = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  const notifyEmail = setting?.notifyEmail || process.env.NOTIFY_EMAIL;
  const notifyPhone = setting?.notifyPhone || process.env.NOTIFY_PHONE;

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });

  await prisma.notification.create({
    data: {
      title: input.title,
      body: input.body,
      channel: input.channel ?? "SYSTEM",
      meta: JSON.stringify({
        ...input.meta,
        notifyEmail,
        notifyPhone,
      }),
      userId: admin?.id,
    },
  });

  const payload = {
    notifyEmail: notifyEmail || null,
    notifyPhone: notifyPhone || null,
    title: input.title,
    body: input.body,
    html: input.html,
  };

  if (input.deliver !== false) {
    await deliverAdminNotify(payload);
  }

  return payload;
}

/** Send the admin email/SMS side effects prepared by notifyAdmin. */
export async function deliverAdminNotify(payload: Awaited<ReturnType<typeof notifyAdmin>>) {
  if (payload.notifyEmail) {
    await sendEmail({
      to: payload.notifyEmail,
      subject: `[TCT Admin] ${payload.title}`,
      text: `${payload.body}\n\nPhone notify target: ${payload.notifyPhone || "N/A"}`,
      html: payload.html,
    });
  }

  if (payload.notifyPhone) {
    console.info(
      `[SMS→${payload.notifyPhone}] ${payload.title}: ${payload.body.slice(0, 120)}`,
    );
  }
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info(`[EMAIL→${opts.to}] ${opts.subject}\n${opts.text}`);
    return { ok: true, mode: "console" as const };
  }

  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });

  return { ok: true, mode: "smtp" as const };
}
