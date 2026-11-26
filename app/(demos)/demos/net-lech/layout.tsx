import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/net-lech/identity";

export const metadata: Metadata = {
  title: "Nét Lệch · Salon tóc Hải Châu, Đà Nẵng: cắt, uốn, duỗi, nhuộm",
  description:
    "Salon tóc nam nữ tại Quận Hải Châu, Đà Nẵng. Bảng giá cắt, uốn, duỗi, nhuộm, tẩy, phục hồi theo độ dài tóc, giờ mở cửa 09:00–20:00, chính sách đặt cọc và ước tính thời gian.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Nét Lệch · Salon tóc Đà Nẵng",
    description: "Cắt, uốn, duỗi, nhuộm, phục hồi tóc tại Quận Hải Châu, Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Nét Lệch, salon tóc Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function NetLechLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
