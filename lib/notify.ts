import { prisma } from "@/lib/db";
import type { NotificationChannel } from "@/lib/generated/prisma/client";

type NotifyInput = {
  title: string;
  body: string;
  channel?: NotificationChannel;
  meta?: Record<string, unknown>;
};

/** Persist in-app notification and attempt email (and SMS stub) to admin phone/email. */
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

  if (notifyEmail) {
    await sendEmail({
      to: notifyEmail,
      subject: `[TCT Admin] ${input.title}`,
      text: `${input.body}\n\nPhone notify target: ${notifyPhone || "N/A"}`,
    });
  }

  // SMS gateway stub — logs for local; plug Twilio/Zalo OA here in production
  if (notifyPhone) {
    console.info(`[SMS→${notifyPhone}] ${input.title}: ${input.body.slice(0, 120)}`);
  }
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
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
  });

  return { ok: true, mode: "smtp" as const };
}
