import type { Metadata } from "next";
import { DemoNotice } from "@/features/showroom/DemoNotice";

/**
 * Layout chung của khu /demos: CHỈ làm 2 việc – noindex và thanh nhãn Demo.
 * Mọi giao diện (font, màu, header, footer, bố cục) do từng demo tự định nghĩa.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DemoNotice />
    </>
  );
}
