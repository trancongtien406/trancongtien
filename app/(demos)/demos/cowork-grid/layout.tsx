import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/cowork-grid/identity";

export const metadata: Metadata = {
  title: "Ô Lưới · Không gian làm việc chung ở Quận Hải Châu, Đà Nẵng",
  description:
    "Không gian làm việc chung ở Quận Hải Châu, Đà Nẵng: hot desk từ 120.000 đ mỗi ngày, bàn cố định, phòng riêng, phòng họp. Mở 07:00 đến 21:00, dùng thử 1 ngày miễn phí, xem sơ đồ chỗ ngồi và đặt lịch tham quan.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Ô Lưới · Hot desk, bàn cố định, phòng họp ở Đà Nẵng",
    description: "Thuê chỗ làm việc theo ngày, tuần, tháng ở Quận Hải Châu. Dùng thử 1 ngày miễn phí.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Ô Lưới, không gian làm việc chung ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function CoworkGridLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
