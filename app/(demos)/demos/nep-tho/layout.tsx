import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/nep-tho/identity";

export const metadata: Metadata = {
  title: "Nếp Thở · Studio pilates & yoga",
  description:
    "Studio Pilates và Yoga lớp nhỏ tại quận Sơn Trà, Đà Nẵng: lớp Reformer, Mat Pilates, Yoga, lịch tuần, gói tập và buổi tập thử.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Nếp Thở · Studio pilates & yoga",
    description: "Pilates và Yoga lớp nhỏ tại Sơn Trà, Đà Nẵng. Lịch tuần, gói tập, tập thử.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Nếp Thở, studio pilates và yoga" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function NepThoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
