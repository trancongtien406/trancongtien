import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/ngoai-ngu-sao/identity";

export const metadata: Metadata = {
  title: "Mở Lời · Trung tâm tiếng Anh, tiếng Nhật, tiếng Hàn tại Đà Nẵng",
  description:
    "Mở Lời dạy tiếng Anh, tiếng Nhật và tiếng Hàn theo cách nói trước: thẻ từ vựng lật, hội thoại tình huống thật, lớp nhóm nhỏ. Làm bài kiểm tra cấp độ nhanh và xem lịch lớp trong tuần.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Mở Lời · Mở lời ngôn ngữ mới, mở thêm một thế giới",
    description: "Học tiếng Anh, Nhật, Hàn ở Đà Nẵng bằng hội thoại, thẻ từ vựng và lộ trình rõ ràng.",
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
