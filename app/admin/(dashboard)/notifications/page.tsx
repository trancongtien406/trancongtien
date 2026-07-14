import { revalidatePath } from "next/cache";
import {
  AdminCard,
  AdminPageHeader,
} from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function markRead(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await prisma.notification.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/notifications");
}

async function markAllRead() {
  "use server";
  await prisma.notification.updateMany({ data: { read: true } });
  revalidatePath("/admin/notifications");
}

export default async function AdminNotificationsPage() {
  const items = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <>
      <AdminPageHeader
        title="Thông báo"
        subtitle="Email / SMS / hệ thống"
        actions={
          <form action={markAllRead}>
            <button
              type="submit"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold"
            >
              Đánh dấu tất cả đã đọc
            </button>
          </form>
        }
      />
      <div className="space-y-3">
        {items.map((n) => (
          <AdminCard key={n.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className="mt-1 max-h-48 overflow-y-auto whitespace-pre-wrap text-sm text-slate-600">
                  {n.body}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {n.channel} · {n.createdAt.toLocaleString("vi-VN")}
                </p>
              </div>
              {!n.read ? (
                <form action={markRead}>
                  <input type="hidden" name="id" value={n.id} />
                  <button
                    type="submit"
                    className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    Đã đọc
                  </button>
                </form>
              ) : (
                <span className="text-xs text-emerald-600">Đã đọc</span>
              )}
            </div>
          </AdminCard>
        ))}
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">Chưa có thông báo.</p>
        ) : null}
      </div>
    </>
  );
}
