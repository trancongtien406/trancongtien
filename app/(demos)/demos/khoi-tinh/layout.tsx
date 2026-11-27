import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Khối Tĩnh · Studio kiến trúc & nội thất, cảnh 3D theo cuộn (demo minh hoạ)",
  description:
    "Trang demo minh hoạ cho studio kiến trúc: cảnh 3D CSS perspective nhiều lớp cuộn xuyên qua các khung cửa, dự án mẫu, vật liệu, quy trình và ước tính chi phí mô phỏng.",
  alternates: { canonical: "/demos/khoi-tinh" },
  openGraph: {
    title: "Khối Tĩnh · Studio kiến trúc & nội thất",
    description: "Demo minh hoạ: landing kiến trúc với parallax 3D nhiều lớp.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function KhoiTinhLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
