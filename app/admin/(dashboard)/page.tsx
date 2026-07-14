import Link from "next/link";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [posts, projects, services, users, bookings, latestPosts, latestBookings] =
    await Promise.all([
      prisma.post.count(),
      prisma.project.count(),
      prisma.service.count(),
      prisma.user.count(),
      prisma.booking.count({ where: { status: "NEW" } }),
      prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
        include: { author: true },
      }),
      prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Tổng bài viết", value: posts, href: "/admin/posts" },
    { label: "Dự án", value: projects, href: "/admin/projects" },
    { label: "Dịch vụ", value: services, href: "/admin/services" },
    { label: "Người dùng", value: users, href: "/admin/settings" },
    { label: "Liên hệ mới", value: bookings, href: "/admin/bookings" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Tổng quan nội dung & liên hệ"
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white"
          >
            + Tạo nội dung
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <AdminCard className="transition hover:border-brand/30 hover:shadow-md">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-slate-900">
                {s.value}
              </p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Nội dung mới nhất</h2>
            <Link href="/admin/posts" className="text-sm font-semibold text-brand">
              Xem tất cả
            </Link>
          </div>
          <ul className="space-y-3">
            {latestPosts.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0"
              >
                <div className="min-w-0">
                  <Link
                    href={`/admin/posts/${p.id}`}
                    className="truncate text-sm font-medium text-slate-800 hover:text-brand"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-slate-500">
                    {p.author?.name || "Admin"}
                  </p>
                </div>
                <StatusBadge status={p.status} />
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Liên hệ mới</h2>
            <Link
              href="/admin/bookings"
              className="text-sm font-semibold text-brand"
            >
              Xem tất cả
            </Link>
          </div>
          <ul className="space-y-3">
            {latestBookings.map((b) => (
              <li
                key={b.id}
                className="border-b border-slate-100 pb-3 text-sm last:border-0"
              >
                <p className="font-medium text-slate-800">
                  {b.name} · {b.email}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {b.projectType || "N/A"} · <StatusBadge status={b.status} />
                </p>
              </li>
            ))}
            {latestBookings.length === 0 ? (
              <p className="text-sm text-slate-500">Chưa có liên hệ mới.</p>
            ) : null}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
