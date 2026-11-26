import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/tra-thi/identity";

export const metadata: Metadata = {
  title: "Tịch Trà · Nhà trà ở Quận Hải Châu, Đà Nẵng",
  description:
    "Nhà trà ở Quận Hải Châu, Đà Nẵng: menu 12 loại trà pha tại bàn, bánh trà ăn kèm, phòng trà cho nhóm 4 đến 10 người, trà đóng gói mang về. Mở 8:30 đến 21:30.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tịch Trà · Một chén trà, vạn khoảng lặng",
    description: "Nhà trà ở Quận Hải Châu, Đà Nẵng: trà pha tại bàn, phòng trà nhóm, trà mang về.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tịch Trà, nhà trà ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function TraThiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
