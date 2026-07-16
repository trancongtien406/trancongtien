import { siteConfig } from "@/lib/site";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function emailShell(opts: {
  preheader: string;
  title: string;
  bodyHtml: string;
}) {
  const brand = siteConfig.fullName;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);padding:28px 32px;">
              <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:700;">
                ${escapeHtml(siteConfig.brand)}
              </p>
              <h1 style="margin:8px 0 0;font-size:22px;line-height:1.35;color:#ffffff;font-weight:700;">
                ${escapeHtml(opts.title)}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid #e2e8f0;background:#f8fafc;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
                ${escapeHtml(brand)} · ${escapeHtml(siteConfig.location)}
              </p>
              <p style="margin:8px 0 0;font-size:12px;line-height:1.6;color:#94a3b8;">
                <a href="${siteConfig.url}" style="color:#2563eb;text-decoration:none;">${siteConfig.url.replace(/^https?:\/\//, "")}</a>
                · <a href="mailto:${siteConfig.email}" style="color:#2563eb;text-decoration:none;">${siteConfig.email}</a>
                · <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" style="color:#2563eb;text-decoration:none;">${siteConfig.phoneDisplay}</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#94a3b8;">
                © ${year} ${escapeHtml(brand)}. Email này được gửi tự động từ form liên hệ.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;width:140px;vertical-align:top;font-size:13px;color:#64748b;font-weight:600;">
    ${escapeHtml(label)}
  </td>
  <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;vertical-align:top;font-size:14px;color:#0f172a;line-height:1.5;">
    ${escapeHtml(value)}
  </td>
</tr>`;
}

export type ContactEmailData = {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  scheduledAt?: string;
};

export function adminContactEmailHtml(data: ContactEmailData) {
  const rows = [
    detailRow("Họ tên", data.name),
    detailRow("Email", data.email),
    detailRow("Số điện thoại", data.phone || "—"),
    detailRow("Loại dự án", data.projectType || "—"),
    detailRow("Ngân sách", data.budget || "—"),
    detailRow("Timeline", data.timeline || "—"),
  ];

  if (data.scheduledAt) {
    rows.push(detailRow("Lịch hẹn", data.scheduledAt));
  }

  const bodyHtml = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">
      Bạn vừa nhận được một yêu cầu liên hệ mới từ website.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${rows.join("")}
    </table>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 18px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">
        Nội dung
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#0f172a;white-space:pre-wrap;">
${escapeHtml(data.message)}
      </p>
    </div>
    <p style="margin:24px 0 0;">
      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:10px;">
        Trả lời ${escapeHtml(data.name)}
      </a>
    </p>
  `;

  return emailShell({
    preheader: `Liên hệ mới từ ${data.name}`,
    title: data.scheduledAt
      ? `Đặt lịch tư vấn từ ${data.name}`
      : `Liên hệ mới từ ${data.name}`,
    bodyHtml,
  });
}

export function customerConfirmationEmailHtml(data: {
  name: string;
  message: string;
}) {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">
      Xin chào <strong style="color:#0f172a;">${escapeHtml(data.name)}</strong>,
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">
      Cảm ơn bạn đã liên hệ. Tôi đã nhận được yêu cầu và sẽ phản hồi trong vòng
      <strong style="color:#0f172a;">24 giờ</strong>.
    </p>
    <div style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:16px 18px;margin:0 0 24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#2563eb;">
        Tóm tắt yêu cầu của bạn
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#1e3a8a;white-space:pre-wrap;">
${escapeHtml(data.message)}
      </p>
    </div>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">
      Nếu cần trao đổi nhanh, bạn có thể nhắn Zalo hoặc gọi trực tiếp:
    </p>
    <p style="margin:0 0 24px;">
      <a href="${siteConfig.social.zalo}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:10px;margin-right:8px;">
        Nhắn Zalo
      </a>
      <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" style="display:inline-block;background:#ffffff;color:#2563eb;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:10px;border:1px solid #bfdbfe;">
        ${siteConfig.phoneDisplay}
      </a>
    </p>
    <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;">
      Trân trọng,<br />
      <strong style="color:#0f172a;">${escapeHtml(siteConfig.fullName)}</strong><br />
      <span style="color:#64748b;font-size:13px;">${escapeHtml(siteConfig.tagline)}</span>
    </p>
  `;

  return emailShell({
    preheader: "Đã nhận yêu cầu — tôi sẽ phản hồi trong 24 giờ",
    title: "Đã nhận yêu cầu của bạn",
    bodyHtml,
  });
}

export function adminContactEmailText(data: ContactEmailData) {
  return [
    `Email: ${data.email}`,
    `SĐT: ${data.phone || "—"}`,
    `Loại: ${data.projectType || "—"}`,
    `Ngân sách: ${data.budget || "—"}`,
    `Timeline: ${data.timeline || "—"}`,
    `Nội dung: ${data.message}`,
    data.scheduledAt ? `Lịch hẹn: ${data.scheduledAt}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function customerConfirmationEmailText(name: string) {
  return `Xin chào ${name},\n\nTôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong 24 giờ.\n\n— ${siteConfig.fullName}`;
}
