import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/glamping-nui/identity";

export const metadata: Metadata = {
  title: "Rừng Thức · Khu glamping chân núi Bà Nà, Đà Nẵng",
  description:
    "Khu glamping ở chân núi Bà Nà, Hòa Vang, Đà Nẵng: 3 loại lều cho 2 đến 4 người từ 890.000₫ một đêm, BBQ bên lửa trại, trekking nhẹ, lịch trình 2 ngày 1 đêm. Giá tham khảo.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Rừng Thức · Đêm chạm rừng, ngày chạm mây",
    description: "Khu glamping chân núi Bà Nà, Đà Nẵng: lều từ 890.000₫ một đêm, BBQ, trekking, ngắm sao.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Rừng Thức, đêm chạm rừng, ngày chạm mây" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/glamping-nui" },
};

export default function GlampingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="glamping-nui" lang="vi">
      {children}
    </div>
  );
}
