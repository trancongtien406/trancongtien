import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/hoa-tuoi/identity";

export const metadata: Metadata = {
  title: "Nở Rừng · Tiệm hoa tươi ở Đà Nẵng",
  description:
    "Hoa tươi cắm tay theo dịp: sinh nhật, khai trương, cưới, lời xin lỗi. Tự dựng bó hoa bằng Bouquet Builder: chọn dịp, ngân sách, tông màu, loại hoa và kích cỡ, kèm giá tham khảo và lời thiệp.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Nở Rừng · Hoa cho những điều đang nở",
    description: "Tiệm hoa tươi ở Đà Nẵng, cắm tay theo từng dịp.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Nở Rừng, tiệm hoa tươi ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function HoaTuoiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
