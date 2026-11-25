import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/tiem-banh/identity";

export const metadata: Metadata = {
  title: "Mây Kẹo · Tiệm bánh ngọt làm tay ở Đà Nẵng",
  description:
    "Bánh kem, macaron, croissant và đồ ngọt làm tay mỗi sáng ở Đà Nẵng. Tự dựng chiếc bánh của bạn bằng Cake Builder: vị bánh, size, lớp kem, chữ viết và trang trí, kèm giá tham khảo.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Mây Kẹo · Tiệm bánh ngọt làm tay",
    description: "Ngọt vừa đủ, vui vừa đủ.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Mây Kẹo, tiệm bánh ngọt làm tay ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function TiemBanhLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
