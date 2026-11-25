import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/gom-lo/identity";

export const metadata: Metadata = {
  title: "Đất Mơ · Xưởng gốm và workshop làm gốm ở Đà Nẵng",
  description:
    "Xưởng gốm thủ công ở Đà Nẵng: nặn tay, bàn xoay, vẽ men. Chọn buổi làm gốm, nặn thử chiếc bình của riêng bạn và xem tóm tắt chi phí tham khảo.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Đất Mơ · Nặn nên điều bạn mơ",
    description: "Xưởng gốm thủ công và workshop làm gốm ở Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Đất Mơ, xưởng gốm ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function GomLoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
