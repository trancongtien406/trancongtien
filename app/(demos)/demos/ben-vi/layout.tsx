import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/ben-vi/identity";

export const metadata: Metadata = {
  title: "Bến Vị · Nhà hàng hải sản ven biển Sơn Trà, Đà Nẵng",
  description:
    "Nhà hàng hải sản ven biển Quận Sơn Trà, Đà Nẵng: hải sản tươi sống chọn theo cân, thực đơn lẩu và món ăn kèm, set theo số người, phòng riêng 6 đến 12 khách, đặt bàn và tiệc đoàn.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Bến Vị · Nhà hàng hải sản",
    description: "Vị biển, trọn cuộc vui.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Bến Vị, nhà hàng hải sản" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function BenViLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
