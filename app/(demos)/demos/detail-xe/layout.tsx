import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/detail-xe/identity";

export const metadata: Metadata = {
  title: "Gương Phẩm · Chăm sóc xe hơi ở Quận Ngũ Hành Sơn, Đà Nẵng",
  description:
    "Cửa hàng chăm sóc xe hơi ở Quận Ngũ Hành Sơn, Đà Nẵng: rửa chi tiết từ 350.000 đ, đánh bóng sơn, phủ ceramic, nội thất, khoang máy. Giá theo dòng xe, quy trình từng bước, mở 08:00 đến 18:00.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Gương Phẩm · Rửa chi tiết, đánh bóng, phủ ceramic ở Đà Nẵng",
    description: "Kiểm tra xe miễn phí, báo giá theo dòng xe, quy trình rõ từng bước.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Gương Phẩm, chăm sóc xe hơi ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function DetailXeLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
