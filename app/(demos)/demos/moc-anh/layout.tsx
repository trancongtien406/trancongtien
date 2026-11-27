import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Mộc Ảnh · Hãng phim quảng cáo và phim ngắn",
  description:
    "Mộc Ảnh (trang minh hoạ): hãng sản xuất phim với màn mở điện ảnh theo cuộn, quy trình tiền kỳ, quay, hậu kỳ và đặt lịch trao đổi dự án. Nội dung và số liệu chỉ mang tính minh hoạ.",
  openGraph: {
    title: "Mộc Ảnh · Sản xuất phim",
    description: "Trang minh hoạ hãng phim với màn mở clip-path tỷ lệ điện ảnh.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
