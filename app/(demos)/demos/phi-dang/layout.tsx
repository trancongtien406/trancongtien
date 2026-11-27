import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Phi Dáng · Nhà mốt Thu Đông, sàn diễn cuộn ngang (demo minh hoạ)",
  description:
    "Trang demo minh hoạ cho thương hiệu thời trang cao cấp: sàn diễn cuộn ngang được ghim, typography khổng lồ, bảng giá đo may và đặt lịch thử đồ mô phỏng.",
  alternates: { canonical: "/demos/phi-dang" },
  openGraph: {
    title: "Phi Dáng · Nhà mốt Thu Đông",
    description: "Demo minh hoạ: landing thời trang với sàn diễn cuộn ngang.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function PhiDangLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
