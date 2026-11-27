import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Hương Ẩn · Nước hoa nghệ thuật theo từng mùi hương ký ức",
  description:
    "Hương Ẩn (trang minh hoạ): bộ sưu tập nước hoa nghệ thuật với tầng hương đầu, giữa, cuối, thử mẫu tại nhà và tư vấn chọn hương. Nội dung và số liệu chỉ mang tính minh hoạ.",
  openGraph: {
    title: "Hương Ẩn · Nước hoa nghệ thuật",
    description: "Trang minh hoạ thương hiệu nước hoa nghệ thuật với hiệu ứng mặt nạ lỏng.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
