import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/bar-mai-thuong/identity";

export const metadata: Metadata = {
  title: "Tầng Mây · Rooftop bar & cocktail Đà Nẵng",
  description:
    "Rooftop bar & cocktail trên mái nhà Đà Nẵng: chọn ly theo vị ngọt, chua, đắng, khói và chuẩn bị tóm tắt đặt bàn. Dành cho khách từ 18 tuổi.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tầng Mây · Rooftop bar & cocktail",
    description: "Chạm tầng mây, chạm vị đêm.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tầng Mây, rooftop bar và cocktail" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function BarMaiThuongLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
