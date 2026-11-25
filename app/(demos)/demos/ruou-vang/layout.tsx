import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/ruou-vang/identity";

export const metadata: Metadata = {
  title: "Mộc Vang · Wine bar Đà Nẵng, vang theo ly và theo chai",
  description:
    "Wine bar ánh nến ở Đà Nẵng: chọn vang theo món, dịp và khẩu vị, xem thực đơn theo ly và theo chai, chuẩn bị tóm tắt đặt bàn. Dành cho khách từ 18 tuổi.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Mộc Vang · Wine bar Đà Nẵng",
    description: "Chậm lại một ly vang.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Mộc Vang, wine bar ánh nến ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RuouVangLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
