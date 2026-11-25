import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/thang-mo/identity";

export const metadata: Metadata = {
  title: "Tháng Mơ · Studio ảnh cưới phong cách photobook",
  description:
    "Studio ảnh cưới phong cách analog photobook: Immersive Album lật trang toàn màn hình và Wedding Moodboard dựng bảng mood cùng gói chụp tham khảo.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tháng Mơ · Studio ảnh cưới",
    description: "Album cảm hứng, gói chụp tham khảo và moodboard cho ngày cưới.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tháng Mơ, studio ảnh cưới" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function ThangMoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
