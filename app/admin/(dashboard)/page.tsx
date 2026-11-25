import Link from "next/link";
import {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";
import { prisma } from "@/lib/db";
import { LEAD_STATUS_OPTIONS, enumLabel } from "@/lib/enums";

export const dynamic = "force-dynamic";

function startOfMonth(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function startOfWeek(d = new Date()) {
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday start
  const start = new Date(d);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - diff);
  return start;
}

function formatVnd(n: number) {
  return `${Math.round(n).toLocaleString("vi-VN")} ₫`;
}

export default async function AdminDashboardPage() {
  const monthStart = startOfMonth();
  const weekStart = startOfWeek();

  const [
    posts,
    projects,
    services,
    users,
    newLeads,
    latestPosts,
    latestLeads,
    leadsByStatus,
    paymentsReceived,
    commissionsEarned,
    estimateSessionsWeek,
    hotLeads,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.project.count(),
    prisma.service.count(),
    prisma.user.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.post.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { author: true },
    }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.payment.aggregate({
      where: {
        status: "RECEIVED",
        receivedAt: { gte: monthStart },
      },
      _sum: { amount: true },
    }),
    prisma.commission.aggregate({
      where: { status: { in: ["EARNED", "PAID"] } },
      _sum: { amount: true },
    }),
    prisma.estimateSession.count({
      where: { createdAt: { gte: weekStart } },
    }),
    prisma.lead.count({ where: { scoreBand: "HOT" } }),
  ]);

  const statusMap = Object.fromEntries(
    leadsByStatus.map((row) => [row.status, row._count._all]),
  ) as Record<string, number>;
  const pipelineTotal = leadsByStatus.reduce((sum, row) => sum + row._count._all, 0);
  const paymentsSum = Number(paymentsReceived._sum.amount || 0);
  const commissionSum = Number(commissionsEarned._sum.amount || 0);

  const stats = [
    { label: "Lead mới", value: String(newLeads), href: "/admin/leads" },
    { label: "Lead HOT", value: String(hotLeads), href: "/admin/leads" },
    {
      label: "Thanh toán tháng này",
      value: formatVnd(paymentsSum),
      href: "/admin/thuong-mai",
    },
    {
      label: "Hoa hồng đã ghi nhận",
      value: formatVnd(commissionSum),
      href: "/admin/thuong-mai",
    },
    {
      label: "Estimator tuần này",
      value: String(estimateSessionsWeek),
      href: "/admin/estimator",
    },
    { label: "Tổng bài viết", value: String(posts), href: "/admin/posts" },
    { label: "Dự án", value: String(projects), href: "/admin/projects" },
    { label: "Dịch vụ", value: String(services), href: "/admin/services" },
    { label: "Người dùng", value: String(users), href: "/admin/settings" },
  ];

  return (
    <>
      <AdminPageHeader
        title="Tổng quan"
        subtitle="Pipeline, thanh toán, estimator và nội dung"
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold text-white"
          >
            + Tạo nội dung
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <AdminCard className="transition hover:border-brand/30 hover:shadow-md">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="mt-2 truncate font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {s.value}
              </p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <AdminCard className="mt-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-slate-900">Pipeline lead</h2>
            <p className="text-xs text-slate-500">
              Tổng {pipelineTotal} lead theo trạng thái
            </p>
          </div>
          <Link href="/admin/leads" className="text-sm font-semibold text-brand">
            Xem CRM
          </Link>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {LEAD_STATUS_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5"
            >
              <p className="text-xs text-slate-500">{enumLabel(opt.value)}</p>
              <p className="mt-1 font-display text-xl font-bold text-slate-900">
                {statusMap[opt.value] || 0}
              </p>
            </div>
          ))}
        </div>
      </AdminCard>

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
            <h2 className="font-semibold text-slate-900">Lead mới</h2>
            <Link
              href="/admin/leads"
              className="text-sm font-semibold text-brand"
            >
              Xem tất cả
            </Link>
          </div>
          <ul className="space-y-3">
            {latestLeads.map((b) => (
              <li
                key={b.id}
                className="border-b border-slate-100 pb-3 text-sm last:border-0"
              >
                <p className="font-medium text-slate-800">
                  {b.name} · {b.email}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {b.leadNumber} · {b.projectType || "N/A"} ·{" "}
                  <StatusBadge status={b.status} />
                </p>
              </li>
            ))}
            {latestLeads.length === 0 ? (
              <p className="text-sm text-slate-500">Chưa có lead mới.</p>
            ) : null}
          </ul>
        </AdminCard>
      </div>
    </>
  );
}
