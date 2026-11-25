import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/lan-bien/identity";

export const metadata: Metadata = {
  title: "Tầng Xanh · Lặn biển và thể thao nước miền Trung",
  description:
    "Tầng Xanh đưa bạn xuống năm tầng nước từ mặt biển đến vùng xanh thẫm: snorkeling, lặn có bình khí, freediving ở Cù Lao Chàm, Sơn Trà và biển miền Trung. Tìm cấp độ phù hợp trước khi trao đổi với hướng dẫn viên.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tầng Xanh · Chạm mặt biển, chạm một thế giới khác",
    description: "Lặn biển và thể thao nước ở Cù Lao Chàm, Sơn Trà và biển miền Trung, đi cùng hướng dẫn viên.",
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
