import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/phuot-xe/identity";

export const metadata: Metadata = {
  title: "Vọt · Thuê xe máy và mô tô phượt ở Đà Nẵng",
  description:
    "Chọn xe số, tay ga, côn tay hay mô tô phượt ở Đà Nẵng, xem giá ngày và giá tuần rõ từng dòng, tính tiền giao nhận, phụ kiện, bảo hiểm và kiểm tra điều kiện thuê.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Vọt · Chọn xe. Lên đường. Vọt đi.",
    description: "Thuê xe máy và mô tô phượt ở Đà Nẵng, giá ngày và giá tuần rõ ràng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Vọt, thuê xe phượt ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function PhuotXeLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
