import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Vĩ Tốc EV · Coupe điện V4 Mưa Rào, 50 chiếc đầu tiên",
  description:
    "Vĩ Tốc EV V4 Mưa Rào: coupe điện hiệu năng cao, 523 mã lực, 0-100 km/h trong 3,4 giây. Cấu hình màu sơn, mâm, nội thất, tính trả góp và đặt chỗ phiên bản giới hạn 50 chiếc. Trang minh hoạ, không phải doanh nghiệp thật.",
  openGraph: {
    title: "Vĩ Tốc EV · V4 Mưa Rào",
    description: "Coupe điện hiệu năng cao, phiên bản giới hạn 50 chiếc. Cuộn một lần, mở mắt.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
