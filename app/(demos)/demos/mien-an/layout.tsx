import type { Metadata } from "next";
import styles from "./brand.module.css";

const ID = "/images/demos/mien-an/identity";

export const metadata: Metadata = {
  title: "Miên An Wellness — Spa & wellness",
  description:
    "Miên An Wellness: những nghi thức chăm sóc nhẹ nhàng, công cụ gợi ý liệu trình theo nhu cầu và tóm tắt lịch hẹn ngay trên trang.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Miên An Wellness — Spa & wellness",
    description: "Chậm lại, để trở về với mình. Nghi thức chăm sóc và gợi ý liệu trình tại Miên An.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Miên An Wellness — Chậm lại, để trở về với mình" }],
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
