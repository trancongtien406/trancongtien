import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/detail-xe/identity";

export const metadata: Metadata = {
  title: "Gương Phẩm · Chăm sóc xe hơi chuẩn chi tiết ở Đà Nẵng",
  description:
    "Rửa chi tiết, đánh bóng sơn, phủ ceramic, nội thất và khoang máy. Chọn dòng xe, tình trạng sơn và nhu cầu để nhận gói gợi ý, các bước thi công, thời gian và giá tham khảo.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Gương Phẩm · Đánh thức vẻ đẹp nguyên bản",
    description: "Chăm sóc xe hơi theo quy trình rõ từng bước, giá tham khảo công khai.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Gương Phẩm, chăm sóc xe hơi ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function DetailXeLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
