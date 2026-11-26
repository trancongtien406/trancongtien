import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/tiem-banh/identity";

export const metadata: Metadata = {
  title: "Mây Kẹo · Tiệm bánh ngọt và bánh kem sinh nhật ở Hải Châu, Đà Nẵng",
  description:
    "Mây Kẹo, tiệm bánh ngọt ở Quận Hải Châu, Đà Nẵng: bánh kem sinh nhật, bánh lạnh, bánh mì croissant, cookie macaron. Bán 7:00–21:00, bánh kem từ 320.000₫, đặt bánh sinh nhật trước 2 ngày.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Mây Kẹo · Tiệm bánh ngọt làm tay",
    description: "Tiệm bánh ngọt làm tay ở Quận Hải Châu, Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Mây Kẹo, tiệm bánh ngọt làm tay ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function TiemBanhLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
