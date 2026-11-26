import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/da-xanh/identity";

export const metadata: Metadata = {
  title: "NÉA Skin Studio · Studio chăm sóc da cơ bản, Quận Thanh Khê, Đà Nẵng",
  description:
    "Studio chăm sóc da cơ bản ở Quận Thanh Khê, Đà Nẵng: liệu trình làm sạch, cấp ẩm, phục hồi, chăm sóc vùng mắt và cổ, 45 đến 90 phút, từ 350.000 đ. Phòng riêng, hẹn trước, giờ mở cửa 9:00 – 20:00.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "NÉA Skin Studio · Chăm da dịu dàng, hiểu làn da hơn",
    description: "Studio chăm sóc da cơ bản ở Quận Thanh Khê, Đà Nẵng: liệu trình có giá và thời lượng rõ ràng, đặt lịch hẹn trước.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "NÉA Skin Studio, chăm da dịu dàng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/da-xanh" },
};

export default function DaXanhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="da-xanh" lang="vi">
      {children}
    </div>
  );
}
