import type { Metadata } from "next";
import { ToastProvider } from "@/components/common/ToastProvider";

export const metadata: Metadata = {
  title: "Admin | TRAN CONG TIEN",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-admin-ui="true">
      {children}
      <ToastProvider />
    </div>
  );
}
