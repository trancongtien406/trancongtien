import { redirect } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { destroySession, getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  const unread = await prisma.notification.count({ where: { read: false } });

  async function logoutAction() {
    "use server";
    await destroySession();
    redirect("/admin/login");
  }

  return (
    <AdminChrome
      user={{ id: user.id, name: user.name, email: user.email }}
      unread={unread}
      logoutAction={logoutAction}
    >
      {children}
    </AdminChrome>
  );
}
