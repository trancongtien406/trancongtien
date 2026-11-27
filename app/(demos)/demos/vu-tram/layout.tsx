import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Vũ Trạm · Dữ liệu vệ tinh và trạm mặt đất cho doanh nghiệp",
  description:
    "Vũ Trạm (trang minh hoạ): nền tảng dữ liệu quan sát Trái Đất, giao diện quỹ đạo vệ tinh tương tác, gói giám sát nông nghiệp và cảnh báo thiên tai. Số liệu chỉ mang tính minh hoạ.",
  openGraph: {
    title: "Vũ Trạm · Công nghệ hàng không vũ trụ",
    description: "Trang minh hoạ giao diện quỹ đạo vệ tinh tương tác.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
