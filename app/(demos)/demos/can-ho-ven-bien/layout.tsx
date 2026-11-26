import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/can-ho-ven-bien/identity";

export const metadata: Metadata = {
  title: "Vọng Triều · Dự án căn hộ ven biển Đà Nẵng",
  description:
    "Vọng Triều là dự án căn hộ ven biển một tháp 36 tầng ở Đà Nẵng: căn 1PN, 2PN, 3PN, tiện ích nội khu, vị trí và kết nối. Xem mặt bằng, hướng nhìn theo tầng, cách chia khoản thanh toán tham khảo và đặt lịch xem nhà mẫu.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Vọng Triều · Căn hộ 1 đến 3 phòng ngủ ven biển Đà Nẵng",
    description: "Dự án căn hộ ven biển một tháp 36 tầng: mặt bằng, hướng nhìn theo tầng, thanh toán tham khảo, đặt lịch xem nhà mẫu.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Vọng Triều, căn hộ ven biển Đà Nẵng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/can-ho-ven-bien" },
};

export default function CanHoVenBienLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="can-ho-ven-bien" lang="vi">
      {children}
    </div>
  );
}
