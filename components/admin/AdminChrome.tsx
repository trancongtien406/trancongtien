"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Calculator,
  ChevronLeft,
  FileText,
  FolderKanban,
  ContactRound,
  UsersRound,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  X,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import {
  AdminSidebarProvider,
  useAdminSidebar,
} from "@/components/admin/AdminSidebarContext";
import { enumLabel } from "@/lib/enums";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Lead", icon: ContactRound },
  { href: "/admin/estimator", label: "Estimator", icon: Calculator },
  { href: "/admin/partners", label: "Đối tác", icon: UsersRound },
  { href: "/admin/solutions", label: "Giải pháp", icon: Briefcase },
  { href: "/admin/projects", label: "Dự án", icon: FolderKanban },
  { href: "/admin/services", label: "Dịch vụ", icon: Briefcase },
  { href: "/admin/posts", label: "Blog / Tài nguyên", icon: FileText },
  { href: "/admin/thuong-mai", label: "Thanh toán & hoa hồng", icon: Mail },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/notifications", label: "Thông báo", icon: Bell },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings },
];

const secondaryNav = [
  { href: "/admin/resources", label: "Tài nguyên tải" },
  { href: "/admin/sales-resources", label: "Tài nguyên bán hàng" },
  { href: "/admin/process", label: "Quy trình" },
  { href: "/admin/about-content", label: "Nội dung Về tôi" },
  { href: "/admin/testimonials", label: "Nhận xét" },
  { href: "/admin/faqs", label: "FAQ" },
];

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

function SidebarNav({
  unread,
  logoutAction,
}: {
  unread: number;
  logoutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const { collapsed, open, setOpen, toggleCollapsed } = useAdminSidebar();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh flex-col border-r border-white/10 bg-[#0B1220] text-slate-300 transition-[width,transform] duration-200",
          collapsed ? "w-19" : "w-64",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-white/10 px-3",
            collapsed ? "justify-center" : "justify-between gap-2 px-4",
          )}
        >
          {!collapsed ? <Logo variant="dark" size={34} /> : <Logo variant="dark" size={34} showText={false} />}
          <button
            type="button"
            className="hidden size-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:bg-white/5 lg:inline-flex"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
          </button>
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 py-3">
          {nav.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                title={item.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  collapsed && "justify-center px-2",
                  active
                    ? "bg-brand text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {!collapsed ? <span className="truncate">{item.label}</span> : null}
                {!collapsed && item.href === "/admin/notifications" && unread > 0 ? (
                  <span className="ml-auto rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                ) : null}
              </Link>
            );
          })}
          {!collapsed ? (
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                CMS phụ
              </p>
              {secondaryNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-xs font-medium transition",
                      active
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-3">
          <form action={logoutAction}>
            <button
              type="submit"
              className={cn(
                "flex w-full items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5",
                collapsed && "justify-center px-2",
              )}
            >
              <LogOut className="size-4" />
              {!collapsed ? "Đăng xuất" : null}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

function ChromeInner({
  user,
  unread,
  title,
  subtitle,
  children,
  logoutAction,
}: {
  user: UserInfo;
  unread: number;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  logoutAction: () => Promise<void>;
}) {
  const { collapsed, toggleOpen } = useAdminSidebar();

  return (
    <div className="min-h-dvh bg-[#F4F7FB]">
      <SidebarNav unread={unread} logoutAction={logoutAction} />
      <div
        className={cn(
          "flex min-h-dvh flex-col transition-[padding] duration-200",
          collapsed ? "lg:pl-19" : "lg:pl-64",
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-3 backdrop-blur sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
              onClick={toggleOpen}
              aria-label="Mở sidebar"
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0">
              {title ? (
                <h1 className="truncate font-display text-lg font-bold text-slate-900 sm:text-xl">
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p className="truncate text-xs text-slate-500 sm:text-sm">{subtitle}</p>
              ) : (
                <p className="truncate text-xs text-slate-500 sm:text-sm">
                  Xin chào, {user.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/notifications"
              className="relative inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white"
            >
              <Bell className="size-4" />
              {unread > 0 ? (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {unread > 9 ? "9+" : unread}
                </span>
              ) : null}
            </Link>
            <Link
              href="/admin/leads"
              className="hidden items-center gap-1 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white sm:inline-flex"
            >
              <Mail className="size-4" /> Leads
            </Link>
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5 md:flex">
              <div className="flex size-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-800">
                  {user.name}
                </p>
                <p className="truncate text-[10px] text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export function AdminChrome({
  user,
  unread,
  children,
  logoutAction,
}: {
  user: UserInfo;
  unread: number;
  children: React.ReactNode;
  logoutAction: () => Promise<void>;
}) {
  return (
    <AdminSidebarProvider>
      <ChromeInner user={user} unread={unread} logoutAction={logoutAction}>
        {children}
      </ChromeInner>
    </AdminSidebarProvider>
  );
}

/** Page-level title helper for dashboard pages */
export function AdminPageHeader({
  title,
  subtitle,
  actions,
  backHref,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  backHref?: string;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {backHref ? (
          <Link
            href={backHref}
            className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand"
          >
            <ChevronLeft className="size-4" /> Quay lại
          </Link>
        ) : null}
        <h1 className="font-display text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  const map: Record<string, string> = {
    PUBLISHED: "bg-emerald-50 text-emerald-700",
    DRAFT: "bg-amber-50 text-amber-700",
    ARCHIVED: "bg-slate-100 text-slate-600",
    NEW: "bg-sky-50 text-sky-700",
    CONTACTED: "bg-violet-50 text-violet-700",
    QUALIFIED: "bg-indigo-50 text-indigo-700",
    MEETING: "bg-brand-soft text-brand",
    PROPOSAL: "bg-cyan-50 text-cyan-700",
    NEGOTIATION: "bg-orange-50 text-orange-700",
    WON: "bg-emerald-50 text-emerald-700",
    LOST: "bg-rose-50 text-rose-700",
    APPLIED: "bg-amber-50 text-amber-700",
    APPROVED: "bg-emerald-50 text-emerald-700",
    SUSPENDED: "bg-rose-50 text-rose-700",
    REJECTED: "bg-slate-100 text-slate-600",
    PENDING: "bg-amber-50 text-amber-700",
    RECEIVED: "bg-emerald-50 text-emerald-700",
    EARNED: "bg-sky-50 text-sky-700",
    PAID: "bg-emerald-50 text-emerald-700",
    SENT: "bg-sky-50 text-sky-700",
    ACCEPTED: "bg-emerald-50 text-emerald-700",
    REFUNDED: "bg-rose-50 text-rose-700",
    CANCELLED: "bg-rose-50 text-rose-700",
    LOW: "bg-slate-100 text-slate-600",
    NORMAL: "bg-sky-50 text-sky-700",
    HIGH: "bg-orange-50 text-orange-700",
    URGENT: "bg-rose-50 text-rose-700",
    HOT: "bg-rose-50 text-rose-700",
    WARM: "bg-amber-50 text-amber-700",
    COLD: "bg-slate-100 text-slate-600",
    IN_PROGRESS: "bg-sky-50 text-sky-700",
    CALCULATED: "bg-indigo-50 text-indigo-700",
    OPTIMIZED: "bg-violet-50 text-violet-700",
    CONTACT_CAPTURED: "bg-emerald-50 text-emerald-700",
    ABANDONED: "bg-slate-100 text-slate-600",
    REFERRAL: "bg-violet-50 text-violet-700",
    SALES: "bg-brand-soft text-brand",
    AGENCY: "bg-indigo-50 text-indigo-700",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
        map[status] || "bg-slate-100 text-slate-600",
      )}
    >
      {enumLabel(status)}
    </span>
  );
}
