import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/rot-nhiet/identity";

export const metadata: Metadata = {
  title: "Rót Nhiệt Coffee · Quán cà phê rang xay ở Sơn Trà, Đà Nẵng",
  description:
    "Quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng: menu, hạt rang 250g mang về, bán buôn từ 5 kg, giờ mở cửa 06:30–21:30.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Rót Nhiệt Coffee",
    description: "Quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Rót Nhiệt Coffee, cà phê rang" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RotNhietLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
