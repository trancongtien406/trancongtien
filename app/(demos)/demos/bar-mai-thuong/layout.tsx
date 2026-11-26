import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/bar-mai-thuong/identity";

export const metadata: Metadata = {
  title: "Tầng Mây · Rooftop bar & cocktail ở Sơn Trà, Đà Nẵng",
  description:
    "Tầng Mây: rooftop bar & cocktail ở Quận Sơn Trà, Đà Nẵng. Mở 17:00–00:00, happy hour 17:00–19:00, thực đơn cocktail, mocktail, món nhắm, đặt bàn nhóm và sự kiện riêng. Dành cho khách từ 18 tuổi.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tầng Mây · Rooftop bar & cocktail",
    description: "Rooftop bar & cocktail ở Quận Sơn Trà, Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tầng Mây, rooftop bar và cocktail" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function BarMaiThuongLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
