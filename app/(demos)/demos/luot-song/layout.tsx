import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/luot-song/identity";

export const metadata: Metadata = {
  title: "Ráng Sóng Surf Club · Trường dạy lướt sóng ở Đà Nẵng",
  description:
    "Ráng Sóng dạy lướt sóng cho người mới và người đã lướt ở bãi biển Đà Nẵng: an toàn, chèo ván, pop-up, đọc sóng. Chọn trình độ, số buổi, khung giờ để nhận khoá học gợi ý, thứ tự bài học và giá tham khảo.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Ráng Sóng Surf Club · Chạm sóng, bắt nắng",
    description: "Học lướt sóng ở Đà Nẵng cùng huấn luyện viên, từ buổi đầu tiên đến lúc tự đứng trên ván.",
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
