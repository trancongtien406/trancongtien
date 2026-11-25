import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/can-ho-ven-bien/identity";

export const metadata: Metadata = {
  title: "Vọng Triều · Căn hộ ven biển Đà Nẵng",
  description:
    "Vọng Triều giới thiệu căn hộ ven biển Đà Nẵng theo từng chương: vị trí, tiện ích, căn hộ và hoàn thiện. Xem mặt bằng 1PN, 2PN, 3PN, hướng nhìn theo tầng và ước tính khoản thanh toán trước khi trao đổi với đội tư vấn.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Vọng Triều · Biển mở ra trước khi bạn kịp mở cửa",
    description: "Căn hộ ven biển Đà Nẵng: xem mặt bằng, hướng nhìn theo tầng và ánh sáng mặt tiền theo giờ.",
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
