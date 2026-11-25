import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/rot-nhiet/identity";

export const metadata: Metadata = {
  title: "Rót Nhiệt Coffee · Cà phê rang theo gu của bạn",
  description:
    "Cà phê rang: menu có bộ lọc và khay tạm tính, Coffee Selector 3 câu hỏi gợi ý hạt và cách pha hợp gu.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Rót Nhiệt Coffee",
    description: "Cà phê rang theo gu của bạn.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Rót Nhiệt Coffee, cà phê rang" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RotNhietLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
