import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/luot-song/identity";

export const metadata: Metadata = {
  title: "Ráng Sóng Surf Club · Trường dạy lướt sóng ở Đà Nẵng",
  description:
    "Ráng Sóng là trường dạy lướt sóng ở bãi biển quận Sơn Trà, Đà Nẵng: buổi trải nghiệm từ 750.000 ₫, khoá 3, 5, 10 buổi, lớp trẻ em từ 6 tuổi, thuê ván và đồ. Xem lịch học theo khung giờ, bảng giá, quy định an toàn và chính sách dời lịch khi biển động.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Ráng Sóng Surf Club · Trường dạy lướt sóng ở Sơn Trà",
    description: "Học lướt sóng ở Đà Nẵng: buổi trải nghiệm, khoá 3, 5, 10 buổi, lớp trẻ em, thuê ván và đồ.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Ráng Sóng Surf Club" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/luot-song" },
};

export default function LuotSongLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="luot-song" lang="vi">
      {children}
    </div>
  );
}
