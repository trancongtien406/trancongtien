import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Vô Cực Lab · Agency giải pháp số và AI",
  description:
    "Vô Cực Lab: agency AI xây dựng ứng dụng, chiến lược và sản phẩm số. Dịch vụ, dự án tiêu biểu, đối tác và liên hệ.",
  alternates: { canonical: "/demos/vo-cuc-lab" },
  openGraph: {
    title: "Vô Cực Lab · Agency giải pháp số và AI",
    description: "Vô Cực Lab: agency AI xây dựng ứng dụng, chiến lược và sản phẩm số. Dịch vụ, dự án tiêu biểu, đối tác và liên hệ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function VoCucLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
