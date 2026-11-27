import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Tốc Ảnh · Showroom xe thể thao, chuỗi khung hình điện ảnh (demo minh hoạ)",
  description:
    "Trang demo minh hoạ cho showroom ô tô thể thao: chuỗi 120 khung hình vẽ bằng canvas điều khiển theo cuộn, so sánh mẫu xe, cấu hình màu và đặt lịch lái thử mô phỏng.",
  alternates: { canonical: "/demos/toc-anh" },
  openGraph: {
    title: "Tốc Ảnh · Showroom xe thể thao",
    description: "Demo minh hoạ: landing xe thể thao với chuỗi khung hình canvas theo cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TocAnhLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
