import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/sat-gym/identity";

export const metadata: Metadata = {
  title: "SẬT Gym · Phòng tập sức mạnh và thể lực ở Đà Nẵng",
  description:
    "SẬT Gym là phòng tập strength & conditioning bằng bê tông và thép ở Đà Nẵng: chọn bài WOD kèm đồng hồ tabata/EMOM, xem lịch lớp tuần, bảng gói tập giá tham khảo và trao đổi với huấn luyện viên.",
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
    description: "Phòng tập sức mạnh và thể lực ở Đà Nẵng: bài WOD theo mục tiêu, lịch lớp tuần và gói tập giá tham khảo.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "SẬT Gym, phòng tập sức mạnh và thể lực" }],
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
