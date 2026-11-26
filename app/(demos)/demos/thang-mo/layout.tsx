import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/thang-mo/identity";

export const metadata: Metadata = {
  title: "Tháng Mơ · Studio ảnh cưới Đà Nẵng: pre-wedding, phóng sự cưới, album",
  description:
    "Studio ảnh cưới tại Quận Sơn Trà, Đà Nẵng. Pre-wedding studio và ngoại cảnh, phóng sự ngày cưới, album và ảnh in. Gói từ 5.900.000 đ, ghi rõ bao gồm, quy trình và chính sách đặt cọc.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Tháng Mơ · Studio ảnh cưới Đà Nẵng",
    description: "Pre-wedding, phóng sự ngày cưới, album và ảnh in tại Đà Nẵng.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Tháng Mơ, studio ảnh cưới Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function ThangMoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
