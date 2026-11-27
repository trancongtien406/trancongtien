import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Lửa Thổ · Gốm thủ công nung củi, mỗi món một dấu tay",
  description:
    "Lửa Thổ (trang minh hoạ): xưởng gốm thủ công với vòng trưng bày xoay 3D, bình, bát, chén, đĩa, đặt hàng theo mẻ nung. Nội dung, giá và số liệu chỉ mang tính minh hoạ.",
  openGraph: {
    title: "Lửa Thổ · Gốm thủ công",
    description: "Trang minh hoạ xưởng gốm thủ công với vòng trưng bày xoay theo cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
