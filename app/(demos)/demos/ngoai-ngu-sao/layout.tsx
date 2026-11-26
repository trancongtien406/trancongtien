import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/ngoai-ngu-sao/identity";

export const metadata: Metadata = {
  title: "Mở Lời · Trung tâm ngoại ngữ tại Quận Hải Châu, Đà Nẵng",
  description:
    "Trung tâm ngoại ngữ Mở Lời ở Quận Hải Châu, Đà Nẵng: tiếng Anh giao tiếp, IELTS, tiếng Nhật JLPT N5 – N3, tiếng Hàn sơ cấp. Lớp tối đa 12 học viên, học phí từ 2.400.000 ₫ một khoá, học thử miễn phí một buổi.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Mở Lời · Trung tâm ngoại ngữ ở Đà Nẵng",
    description: "Tiếng Anh giao tiếp, IELTS, tiếng Nhật, tiếng Hàn. Lớp nhỏ, lịch khai giảng và học phí rõ ràng, học thử miễn phí.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Mở Lời, trung tâm ngoại ngữ" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/ngoai-ngu-sao" },
};

export default function NgoaiNguSaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="ngoai-ngu-sao" lang="vi">
      {children}
    </div>
  );
}
