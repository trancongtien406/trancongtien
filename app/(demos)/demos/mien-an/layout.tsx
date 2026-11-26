import type { Metadata } from "next";
import styles from "./brand.module.css";

const ID = "/images/demos/mien-an/identity";

export const metadata: Metadata = {
  title: "Miên An Wellness — Spa massage & chăm sóc da tại Hải Châu, Đà Nẵng",
  description:
    "Miên An Wellness: spa & massage trị liệu tại Quận Hải Châu, Đà Nẵng. Bảng giá liệu trình 45–120 phút, combo, giờ mở cửa 9:00–20:00, chính sách đặt và huỷ, chọn giờ trên lịch hai phòng.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Miên An Wellness — Spa massage & chăm sóc da tại Hải Châu, Đà Nẵng",
    description: "Massage, chăm sóc da mặt, ngâm chân tại Hải Châu, Đà Nẵng. Giá từ 320.000 ₫, mở 9:00–20:00 mỗi ngày.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Miên An Wellness — spa & massage trị liệu tại Hải Châu, Đà Nẵng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
};

export default function MienAnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.brand} data-site="mien-an" data-ma-root lang="vi">
      <a href="#main" className={styles.skip}>
        Bỏ qua điều hướng
      </a>
      {children}
    </div>
  );
}
