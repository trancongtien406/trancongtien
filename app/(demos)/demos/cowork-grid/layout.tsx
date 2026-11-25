import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/cowork-grid/identity";

export const metadata: Metadata = {
  title: "Ô Lưới · Không gian làm việc chung ở Đà Nẵng",
  description:
    "Hot desk, bàn cố định, phòng họp và phòng riêng ở Đà Nẵng. Xem sơ đồ chỗ ngồi theo giờ, chọn số người, số ngày và loại chỗ để nhận gói gợi ý và chi phí tham khảo mỗi tháng.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Ô Lưới · Chọn đúng ô. Làm đúng việc.",
    description: "Không gian làm việc chung ở Đà Nẵng, chia theo ô, có sơ đồ chỗ ngồi và bảng giá tham khảo.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Ô Lưới, không gian làm việc chung ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function CoworkGridLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
