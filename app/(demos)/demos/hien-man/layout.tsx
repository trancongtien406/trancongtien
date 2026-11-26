import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/hien-man/identity";

export const metadata: Metadata = {
  title: "Hiên Mặn Villa · Villa 7 phòng ven biển Sơn Trà, Đà Nẵng",
  description:
    "Hiên Mặn Villa: villa 7 phòng ven biển Sơn Trà, Đà Nẵng cho 2–16 khách. Bảng giá theo mùa, lịch phòng trống, ăn uống, đưa đón sân bay, chính sách đặt cọc và huỷ.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Hiên Mặn Villa · Villa ven biển Sơn Trà, Đà Nẵng",
    description: "Villa 7 phòng ven biển Sơn Trà, giá từ 2.040.000 ₫ một đêm, nhận phòng 14:00, có gói bao trọn cho nhóm đến 16 khách.",
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
