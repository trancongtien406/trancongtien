import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Tia Chớp Film · Hãng phim, hậu kỳ và đồ hoạ chuyển động",
  description:
    "Tia Chớp Film: dựng phim quảng cáo, đồ hoạ chuyển động 2D và 3D, hậu kỳ cho thương hiệu Việt. Xem dự án, dịch vụ, câu hỏi thường gặp và liên hệ.",
  alternates: { canonical: "/demos/phim-tia-chop" },
  openGraph: {
    title: "Tia Chớp Film · Hãng phim, hậu kỳ và đồ hoạ chuyển động",
    description: "Tia Chớp Film: dựng phim quảng cáo, đồ hoạ chuyển động 2D và 3D, hậu kỳ cho thương hiệu Việt. Xem dự án, dịch vụ, câu hỏi thường gặp và liên hệ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TiaChopLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
