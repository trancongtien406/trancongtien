import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/phuot-xe/identity";

export const metadata: Metadata = {
  title: "Vọt · Cho thuê xe máy và mô tô ở Đà Nẵng",
  description:
    "Cửa hàng cho thuê xe số, tay ga, côn tay và mô tô ở Quận Hải Châu, Đà Nẵng: giá ngày và giá tuần, giao xe tận khách sạn và sân bay, điều kiện thuê, đặt cọc, bảo hiểm và cung đường gợi ý.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Vọt · Thuê xe máy. Lên đường. Vọt đi.",
    description: "Thuê xe máy và mô tô phượt ở Đà Nẵng, giá ngày và giá tuần rõ ràng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Vọt, thuê xe phượt ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function PhuotXeLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
