import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/tra-thi/identity";

export const metadata: Metadata = {
  title: "Tịch Trà · Nhà trà tĩnh lặng ở Đà Nẵng",
  description:
    "Nhà trà ở Đà Nẵng: chọn trà theo tâm trạng và đồ ăn kèm, xem cách pha có đồng hồ đếm giờ, chuẩn bị bản tóm tắt buổi thưởng trà.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tịch Trà · Một chén trà, vạn khoảng lặng",
    description: "Nhà trà tĩnh lặng ở Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tịch Trà, nhà trà ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function TraThiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
