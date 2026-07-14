export {
  AdminCard,
  AdminPageHeader,
  StatusBadge,
} from "@/components/admin/AdminChrome";

import { AdminPageHeader } from "@/components/admin/AdminChrome";

/** Thin wrapper for older pages — layout already provides chrome. */
export function AdminShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <AdminPageHeader title={title} subtitle={subtitle} />
      {children}
    </>
  );
}
