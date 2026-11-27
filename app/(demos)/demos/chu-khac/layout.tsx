import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Chữ Khắc · Nhà xuất bản sách nghệ thuật (demo)",
  description:
    "Chữ Khắc là nhà xuất bản sách nghệ thuật minh hoạ: chữ động học tách từ, mặt nạ trượt theo nhịp cuộn, danh mục sách, quy trình in và đặt trước sách mô phỏng. Mọi nội dung và số liệu là minh hoạ.",
  openGraph: {
    title: "Chữ Khắc · Nhà xuất bản sách nghệ thuật",
    description: "Trang demo xuất bản sách với kinetic typography theo nhịp cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function ChuKhacLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
