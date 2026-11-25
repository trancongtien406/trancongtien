import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/nep-tho/identity";

export const metadata: Metadata = {
  title: "Nếp Thở · Studio pilates & yoga",
  description:
    "Studio pilates và yoga với thời khoá biểu lọc lớp theo loại, cấp độ, huấn luyện viên và Class Finder gợi ý lớp tập phù hợp.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Nếp Thở · Studio pilates & yoga",
    description: "Studio pilates và yoga với thời khoá biểu tương tác.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Nếp Thở, studio pilates và yoga" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function NepThoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
