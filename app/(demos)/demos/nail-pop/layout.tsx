import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/nail-pop/identity";

export const metadata: Metadata = {
  title: "Chấm Chanh · Nail studio màu gắt tại Đà Nẵng",
  description:
    "Sơn gel, ombre, chrome, chấm bi và charm tại Đà Nẵng. Dựng bộ móng của bạn trên bàn tay SVG, xem thời gian, giá tham khảo và các bước thực hiện trước khi đặt lịch.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Chấm Chanh · Nail studio",
    description: "Móng xinh, mood đỉnh. Dựng bộ móng của bạn ngay trên trang.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Chấm Chanh, nail studio ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function NailPopLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
