import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/kim-hoan/identity";

export const metadata: Metadata = {
  title: "Kim Nguyệt · Trang sức vàng chế tác ở Đà Nẵng",
  description:
    "Kim Nguyệt chế tác nhẫn, mặt dây, bông tai và lắc tay bằng vàng 10K, 14K, 18K, vàng trắng và bạc ở Đà Nẵng. Chọn chất liệu, đá, kích cỡ và xem khoảng giá tham khảo tính minh bạch ngay trên trang.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Kim Nguyệt · Vẻ đẹp lưu dấu thời gian",
    description: "Trang sức vàng chế tác ở Đà Nẵng: chọn chất liệu, đá và kích cỡ, xem khoảng giá tham khảo từng khoản.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Kim Nguyệt, trang sức vàng chế tác ở Đà Nẵng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/kim-hoan" },
};

export default function KimHoanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="kim-hoan" lang="vi">
      {children}
    </div>
  );
}
