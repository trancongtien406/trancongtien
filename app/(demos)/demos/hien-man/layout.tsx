import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/hien-man/identity";

export const metadata: Metadata = {
  title: "Hiên Mặn Villa · Villa nghỉ dưỡng ven biển Sơn Trà, Đà Nẵng",
  description:
    "Hiên Mặn Villa ven biển Sơn Trà, Đà Nẵng: bảy phòng nghỉ, lịch phòng trống theo tháng và công cụ ước tính chi phí lưu trú.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Hiên Mặn Villa · Ở lại cùng nhịp biển",
    description: "Villa ven biển Sơn Trà với kiến trúc mở, bảy phòng nghỉ và nhịp sống chậm.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Hiên Mặn Villa, ở lại cùng nhịp biển" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
};

export default function HienManLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="hien-man" lang="vi">
      <a href="#main" className={styles.skip}>
        Bỏ qua điều hướng
      </a>
      {children}
    </div>
  );
}
