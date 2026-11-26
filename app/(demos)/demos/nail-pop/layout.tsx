import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/nail-pop/identity";

export const metadata: Metadata = {
  title: "Chấm Chanh · Tiệm nail tại Quận Hải Châu, Đà Nẵng",
  description:
    "Tiệm nail ở Quận Hải Châu, Đà Nẵng: sơn gel từ 150.000 ₫, đắp gel, nail art, chrome, charm. Xem bảng giá và chính sách, dựng thử bộ móng trên bàn tay và chọn khung giờ trống để đặt lịch.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Chấm Chanh · Tiệm nail ở Đà Nẵng",
    description: "Sơn gel, đắp gel, nail art và chrome. Báo giá rõ, đặt lịch theo khung giờ trống.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Chấm Chanh, nail studio ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function NailPopLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
