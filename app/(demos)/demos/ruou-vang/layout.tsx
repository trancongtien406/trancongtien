import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/ruou-vang/identity";

export const metadata: Metadata = {
  title: "Mộc Vang · Wine bar ở Đà Nẵng, vang theo ly và theo chai",
  description:
    "Mộc Vang là wine bar nhỏ ở Quận Ngũ Hành Sơn, Đà Nẵng: vang theo ly và theo chai chia theo phong cách nho, set thử rượu, đồ nhắm charcuterie, happy hour 17:00 – 19:00, bàn nhóm và đêm thử vang. Dành cho khách từ 18 tuổi.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Mộc Vang · Wine bar Đà Nẵng",
    description: "Wine bar ở Đà Nẵng: vang theo ly và theo chai, set thử rượu, đồ nhắm. Dành cho khách từ 18 tuổi.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Mộc Vang, wine bar ánh nến ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RuouVangLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
