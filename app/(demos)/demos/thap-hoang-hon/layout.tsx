import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Tháp Hoàng Hôn · Tổng thầu xây dựng tổ hợp tháp ven sông",
  description:
    "Tháp Hoàng Hôn: tổng thầu xây dựng nhà ở, công trình công cộng và gia cố kháng chấn ven sông. Ba toà tháp một khu phố, năm bộ môn một đội từ khảo sát tới bàn giao chìa khoá. Trang minh hoạ, không phải doanh nghiệp thật.",
  openGraph: {
    title: "Tháp Hoàng Hôn · Chúng tôi xây theo giờ ánh sáng đổi màu",
    description: "Ba toà tháp. Một khu phố. Năm bộ môn. Một đội.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
