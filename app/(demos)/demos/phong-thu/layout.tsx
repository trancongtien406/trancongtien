import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/phong-thu/identity";

export const metadata: Metadata = {
  title: "Tần Số Studio · Phòng thu âm Đà Nẵng",
  description:
    "Phòng thu âm tại Đà Nẵng: thu giọng, thu band, podcast, voice-over, mix và master. Ước tính số giờ, chi phí tham khảo và checklist chuẩn bị cho buổi thu.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tần Số Studio · Phòng thu âm Đà Nẵng",
    description: "Chạm đúng tần số, tạo chất riêng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tần Số Studio, phòng thu âm" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function PhongThuLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
