import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/sat-gym/identity";

export const metadata: Metadata = {
  title: "SẬT Gym · Box CrossFit và strength ở Ngũ Hành Sơn, Đà Nẵng",
  description:
    "SẬT Gym là box CrossFit và strength ở Quận Ngũ Hành Sơn, Đà Nẵng: lớp WOD, strength, conditioning, mobility và lớp cho người mới, lịch lớp tuần, gói tập giá tham khảo và đăng ký buổi tập thử.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "SẬT Gym · Rèn thân. Lì tâm.",
    description: "Box CrossFit và strength ở Quận Ngũ Hành Sơn, Đà Nẵng: lịch lớp tuần, gói tập giá tham khảo và buổi tập thử.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "SẬT Gym, box CrossFit và strength ở Đà Nẵng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/sat-gym" },
};

export default function SatGymLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="sat-gym" lang="vi">
      {children}
    </div>
  );
}
