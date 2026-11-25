import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/net-lech/identity";

export const metadata: Metadata = {
  title: "Nét Lệch · Hair Studio, cắt nhuộm tạo kiểu",
  description:
    "Hair studio phong cách tạp chí thời trang: Lookbook lọc kiểu tóc và Service Builder tóm tắt dịch vụ, giá tham khảo và thời gian dự kiến.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Nét Lệch · Hair Studio",
    description: "Hair studio phong cách tạp chí thời trang: cắt, nhuộm, tạo kiểu.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Nét Lệch Hair Studio" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function NetLechLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
