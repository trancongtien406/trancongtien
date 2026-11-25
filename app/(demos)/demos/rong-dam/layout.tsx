import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/rong-dam/identity";

export const metadata: Metadata = {
  title: "Rong Dặm · Tour Đà Nẵng, Hội An, Bà Nà, Huế",
  description:
    "Tour miền Trung kiểu sổ tay du lịch, song ngữ VI/EN: gợi ý chuyến đi theo sở thích, lịch trình theo giờ, bản đồ nét tay và ước tính chi phí theo số khách. Giá mang tính tham khảo.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Rong Dặm · Đi một dặm, thêm một chuyện",
    description: "Những chuyến đi miền Trung theo kiểu sổ tay du lịch: Đà Nẵng, Hội An, Bà Nà, Huế.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Rong Dặm, đi một dặm, thêm một chuyện" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: {
    canonical: "/demos/rong-dam",
    languages: { "vi-VN": "/demos/rong-dam", en: "/demos/rong-dam/en", "x-default": "/demos/rong-dam" },
  },
};

export default function RongDamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="rong-dam" lang="vi">
      {children}
    </div>
  );
}
