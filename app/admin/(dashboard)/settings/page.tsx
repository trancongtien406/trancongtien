import {
  AdminCard,
  AdminPageHeader,
} from "@/components/admin/AdminChrome";
import { LlmSettingsFields } from "@/components/admin/LlmSettingsFields";
import { SettingsFileUploadField } from "@/components/admin/SettingsFileUploadField";
import { SettingsForm } from "@/components/admin/SettingsForm";
import type { SettingsActionState } from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function strOrNull(formData: FormData, key: string) {
  const value = str(formData, key);
  return value || null;
}

async function saveSettings(
  _state: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  "use server";
  try {
    const keepSmtpPass = formData.get("keepSmtpPass") === "1";
    const keepPayosApi = formData.get("keepPayosApi") === "1";
    const keepPayosChecksum = formData.get("keepPayosChecksum") === "1";
    const keepR2Secret = formData.get("keepR2Secret") === "1";
    const keepLlmApiKey = formData.get("keepLlmApiKey") === "1";

    const current = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });

    const smtpPass = str(formData, "smtpPass");
    const payosApiKey = str(formData, "payosApiKey");
    const payosChecksumKey = str(formData, "payosChecksumKey");
    const r2SecretAccessKey = str(formData, "r2SecretAccessKey");
    const llmApiKey = str(formData, "llmApiKey");

    await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        siteName: str(formData, "siteName"),
        tagline: str(formData, "tagline"),
        email: str(formData, "email"),
        phone: str(formData, "phone"),
        location: str(formData, "location"),
        zaloUrl: str(formData, "zaloUrl"),
        notifyEmail: str(formData, "notifyEmail"),
        notifyPhone: str(formData, "notifyPhone"),
        seoTitle: str(formData, "seoTitle"),
        seoDescription: str(formData, "seoDescription"),
        cvUrl: strOrNull(formData, "cvUrl"),
        payosClientId: strOrNull(formData, "payosClientId"),
        payosApiKey:
          payosApiKey || (keepPayosApi ? current?.payosApiKey : null),
        payosChecksumKey:
          payosChecksumKey ||
          (keepPayosChecksum ? current?.payosChecksumKey : null),
        smtpHost: strOrNull(formData, "smtpHost"),
        smtpPort: str(formData, "smtpPort") || "587",
        smtpSecure: formData.get("smtpSecure") === "on",
        smtpUser: strOrNull(formData, "smtpUser"),
        smtpPass: smtpPass || (keepSmtpPass ? current?.smtpPass : null),
        smtpFrom: strOrNull(formData, "smtpFrom"),
        r2AccountId: strOrNull(formData, "r2AccountId"),
        r2AccessKeyId: strOrNull(formData, "r2AccessKeyId"),
        r2SecretAccessKey:
          r2SecretAccessKey || (keepR2Secret ? current?.r2SecretAccessKey : null),
        r2Bucket: strOrNull(formData, "r2Bucket"),
        r2PublicUrl: strOrNull(formData, "r2PublicUrl"),
        posthogKey: strOrNull(formData, "posthogKey"),
        posthogHost: strOrNull(formData, "posthogHost"),
        llmProvider: strOrNull(formData, "llmProvider") || "openai",
        llmModel: strOrNull(formData, "llmModel") || "gpt-4o-mini",
        llmBaseUrl: strOrNull(formData, "llmBaseUrl"),
        llmApiKey: llmApiKey || (keepLlmApiKey ? current?.llmApiKey : null),
      },
      create: {
        id: "default",
        siteName: str(formData, "siteName") || "TRAN CONG TIEN",
        notifyEmail: str(formData, "notifyEmail"),
        notifyPhone: str(formData, "notifyPhone"),
        cvUrl: strOrNull(formData, "cvUrl"),
        payosClientId: strOrNull(formData, "payosClientId"),
        payosApiKey: payosApiKey || null,
        payosChecksumKey: payosChecksumKey || null,
        smtpHost: strOrNull(formData, "smtpHost"),
        smtpPort: str(formData, "smtpPort") || "587",
        smtpSecure: formData.get("smtpSecure") === "on",
        smtpUser: strOrNull(formData, "smtpUser"),
        smtpPass: smtpPass || null,
        smtpFrom: strOrNull(formData, "smtpFrom"),
        r2AccountId: strOrNull(formData, "r2AccountId"),
        r2AccessKeyId: strOrNull(formData, "r2AccessKeyId"),
        r2SecretAccessKey: r2SecretAccessKey || null,
        r2Bucket: strOrNull(formData, "r2Bucket"),
        r2PublicUrl: strOrNull(formData, "r2PublicUrl"),
        posthogKey: strOrNull(formData, "posthogKey"),
        posthogHost: strOrNull(formData, "posthogHost"),
        llmProvider: strOrNull(formData, "llmProvider") || "openai",
        llmModel: strOrNull(formData, "llmModel") || "gpt-4o-mini",
        llmBaseUrl: strOrNull(formData, "llmBaseUrl"),
        llmApiKey: llmApiKey || null,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/admin/thuong-mai");
    revalidatePath("/admin/estimator");
    return {
      ok: true,
      message: "Đã lưu cài đặt",
      submittedAt: Date.now(),
    };
  } catch {
    return {
      ok: false,
      message: "Lưu cài đặt thất bại",
      submittedAt: Date.now(),
    };
  }
}

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
const areaClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({
  name,
  label,
  defaultValue,
  hint,
  multiline,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          rows={4}
          placeholder={placeholder}
          className={areaClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue || ""}
          placeholder={placeholder}
          autoComplete="off"
          className={fieldClass}
        />
      )}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  options,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  options: Array<{ value: string; label: string }>;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue || options[0]?.value || ""}
        className={fieldClass}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function SecretField({
  name,
  label,
  hasValue,
  keepName,
  hint,
}: {
  name: string;
  label: string;
  hasValue: boolean;
  keepName: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>
      {hasValue ? <input type="hidden" name={keepName} value="1" /> : null}
      <input
        id={name}
        name={name}
        type="password"
        placeholder={hasValue ? "•••••••• (để trống nếu giữ nguyên)" : ""}
        autoComplete="new-password"
        className={fieldClass}
      />
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      {hasValue ? (
        <p className="text-xs text-emerald-600">Đã lưu — nhập giá trị mới để ghi đè.</p>
      ) : null}
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <AdminCard>
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="font-display text-lg font-bold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        ) : null}
      </div>
      {children}
    </AdminCard>
  );
}

export default async function AdminSettingsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { id: "default" } });

  return (
    <>
      <AdminPageHeader
        title="Cài đặt"
        subtitle="Thương hiệu, SEO và tích hợp — ưu tiên Settings, fallback biến môi trường"
      />

      <SettingsForm action={saveSettings}>
        <Section
          title="Thương hiệu"
          description="Thông tin hiển thị công khai trên website và email."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="siteName" label="Tên site" defaultValue={setting?.siteName} />
            <Field name="tagline" label="Tagline" defaultValue={setting?.tagline} />
            <Field name="email" label="Email công khai" defaultValue={setting?.email} />
            <Field name="phone" label="Điện thoại" defaultValue={setting?.phone} />
            <Field name="location" label="Địa điểm" defaultValue={setting?.location} />
            <Field
              name="zaloUrl"
              label="Zalo URL"
              defaultValue={setting?.zaloUrl}
              hint="Dùng cho nút Zalo nổi trên website"
            />
          </div>
        </Section>

        <Section title="File CV" description="Frontend tải trực tiếp URL này.">
          <SettingsFileUploadField
            name="cvUrl"
            label="Upload CV"
            defaultValue={setting?.cvUrl}
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            hint="PDF hoặc Word."
          />
        </Section>

        <Section
          title="Thông báo admin"
          description="Nhận lead mới, thanh toán và sự kiện quan trọng."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="notifyEmail"
              label="Email nhận thông báo"
              defaultValue={setting?.notifyEmail}
            />
            <Field
              name="notifyPhone"
              label="SĐT nhận thông báo"
              defaultValue={setting?.notifyPhone}
            />
          </div>
        </Section>

        <Section
          title="PayOS"
          description="Thanh toán khách hàng. Webhook: /api/webhooks/payos"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="payosClientId"
              label="Client ID"
              defaultValue={setting?.payosClientId}
            />
            <SecretField
              name="payosApiKey"
              label="API Key"
              hasValue={Boolean(setting?.payosApiKey)}
              keepName="keepPayosApi"
            />
            <SecretField
              name="payosChecksumKey"
              label="Checksum Key"
              hasValue={Boolean(setting?.payosChecksumKey)}
              keepName="keepPayosChecksum"
            />
          </div>
        </Section>

        <Section title="SMTP / Email" description="Nodemailer — thông báo và xác nhận khách.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="smtpHost" label="SMTP Host" defaultValue={setting?.smtpHost} />
            <SelectField
              name="smtpPort"
              label="SMTP Port"
              defaultValue={setting?.smtpPort || "587"}
              options={[
                { value: "587", label: "587 — STARTTLS" },
                { value: "465", label: "465 — SSL/TLS" },
                { value: "25", label: "25 — Plain (không khuyến nghị)" },
                { value: "2525", label: "2525 — Alternate" },
              ]}
            />
            <Field name="smtpUser" label="SMTP User" defaultValue={setting?.smtpUser} />
            <SecretField
              name="smtpPass"
              label="SMTP Password"
              hasValue={Boolean(setting?.smtpPass)}
              keepName="keepSmtpPass"
            />
            <Field
              name="smtpFrom"
              label="From"
              defaultValue={setting?.smtpFrom}
              placeholder="Tran Cong Tien <hello@trancongtien.com>"
            />
            <label className="flex items-center gap-2.5 self-end rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="smtpSecure"
                defaultChecked={setting?.smtpSecure === true}
                className="size-4 rounded border-slate-300 text-brand focus:ring-brand/30"
              />
              Dùng TLS/SSL (port 465)
            </label>
          </div>
        </Section>

        <Section
          title="Cloudflare R2"
          description="Object storage production. Local uploads chỉ dùng khi thiếu cấu hình."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="r2AccountId"
              label="Account ID"
              defaultValue={setting?.r2AccountId}
            />
            <Field
              name="r2AccessKeyId"
              label="Access Key ID"
              defaultValue={setting?.r2AccessKeyId}
            />
            <SecretField
              name="r2SecretAccessKey"
              label="Secret Access Key"
              hasValue={Boolean(setting?.r2SecretAccessKey)}
              keepName="keepR2Secret"
            />
            <Field name="r2Bucket" label="Bucket" defaultValue={setting?.r2Bucket} />
            <Field
              name="r2PublicUrl"
              label="Public URL"
              defaultValue={setting?.r2PublicUrl}
              placeholder="https://media.trancongtien.com"
            />
          </div>
        </Section>

        <Section
          title="Analytics"
          description="PostHog — để trống nếu không dùng."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="posthogKey" label="PostHog Key" defaultValue={setting?.posthogKey} />
            <SelectField
              name="posthogHost"
              label="PostHog Host"
              defaultValue={setting?.posthogHost || "https://us.i.posthog.com"}
              options={[
                {
                  value: "https://us.i.posthog.com",
                  label: "US Cloud — us.i.posthog.com",
                },
                {
                  value: "https://eu.i.posthog.com",
                  label: "EU Cloud — eu.i.posthog.com",
                },
                {
                  value: "https://app.posthog.com",
                  label: "Legacy — app.posthog.com",
                },
              ]}
            />
          </div>
        </Section>

        <Section title="LLM / AI Estimator">
          <LlmSettingsFields
            provider={setting?.llmProvider}
            model={setting?.llmModel}
            baseUrl={setting?.llmBaseUrl}
            hasApiKey={Boolean(setting?.llmApiKey)}
          />
        </Section>

        <Section title="SEO mặc định" description="Fallback metadata khi trang không tự khai báo.">
          <div className="grid gap-4">
            <Field name="seoTitle" label="SEO Title" defaultValue={setting?.seoTitle} />
            <Field
              name="seoDescription"
              label="SEO Description"
              defaultValue={setting?.seoDescription}
              multiline
            />
          </div>
        </Section>
      </SettingsForm>
    </>
  );
}
