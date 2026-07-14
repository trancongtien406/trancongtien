import {
  AdminCard,
  AdminPageHeader,
} from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function saveSettings(formData: FormData) {
  "use server";
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {
      siteName: String(formData.get("siteName") || ""),
      tagline: String(formData.get("tagline") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      location: String(formData.get("location") || ""),
      zaloUrl: String(formData.get("zaloUrl") || ""),
      notifyEmail: String(formData.get("notifyEmail") || ""),
      notifyPhone: String(formData.get("notifyPhone") || ""),
      seoTitle: String(formData.get("seoTitle") || ""),
      seoDescription: String(formData.get("seoDescription") || ""),
    },
    create: {
      id: "default",
      siteName: String(formData.get("siteName") || ""),
      notifyEmail: String(formData.get("notifyEmail") || ""),
      notifyPhone: String(formData.get("notifyPhone") || ""),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

function Field({
  name,
  label,
  defaultValue,
  hint,
  multiline,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  hint?: string;
  multiline?: boolean;
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
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      )}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default async function AdminSettingsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { id: "default" } });

  return (
    <>
      <AdminPageHeader
        title="Cài đặt"
        subtitle="Thông tin site, SEO và kênh nhận thông báo đặt lịch"
      />

      <form action={saveSettings} className="mx-auto max-w-3xl space-y-4">
        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900">
            Thông tin thương hiệu
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="siteName" label="Tên site" defaultValue={setting?.siteName} />
            <Field name="tagline" label="Tagline" defaultValue={setting?.tagline} />
            <Field name="email" label="Email công khai" defaultValue={setting?.email} />
            <Field name="phone" label="Điện thoại" defaultValue={setting?.phone} />
            <Field
              name="location"
              label="Địa điểm"
              defaultValue={setting?.location}
            />
            <Field
              name="zaloUrl"
              label="Zalo URL"
              defaultValue={setting?.zaloUrl}
              hint="Dùng cho nút Zalo nổi trên website"
            />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900">
            Thông báo admin
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              name="notifyEmail"
              label="Email nhận thông báo"
              defaultValue={setting?.notifyEmail}
              hint="Khi có form liên hệ / đặt lịch"
            />
            <Field
              name="notifyPhone"
              label="SĐT nhận thông báo"
              defaultValue={setting?.notifyPhone}
              hint="Log SMS / gắn gateway sau"
            />
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900">
            SEO mặc định
          </h2>
          <div className="grid gap-4">
            <Field name="seoTitle" label="SEO Title" defaultValue={setting?.seoTitle} />
            <Field
              name="seoDescription"
              label="SEO Description"
              defaultValue={setting?.seoDescription}
              multiline
            />
          </div>
        </AdminCard>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Lưu cài đặt
          </button>
        </div>
      </form>
    </>
  );
}
