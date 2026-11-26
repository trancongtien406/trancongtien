import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/lan-bien/identity";

export const metadata: Metadata = {
  title: "Tầng Xanh · Trung tâm lặn biển và thể thao nước ở Đà Nẵng",
  description:
    "Trung tâm lặn biển ở Quận Sơn Trà, Đà Nẵng: lặn thử, khoá Open Water và Advanced, tour lặn ngắm san hô Sơn Trà và Cù Lao Chàm, thuê trang thiết bị. Xem lịch khởi hành, giá theo gói và mùa biển.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tầng Xanh · Học lặn, ngắm san hô ngay từ biển Đà Nẵng",
    description: "Lặn thử, khoá lặn và tour san hô ở Sơn Trà, Cù Lao Chàm, đi cùng hướng dẫn viên.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Tầng Xanh, lặn biển và thể thao nước" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/lan-bien" },
};

export default function LanBienLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="lan-bien" lang="vi">
      {children}
    </div>
  );
}
