import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/kim-hoan/identity";

export const metadata: Metadata = {
  title: "Kim Nguyệt · Tiệm kim hoàn, nhẫn cưới và trang sức vàng ở Đà Nẵng",
  description:
    "Kim Nguyệt là tiệm kim hoàn ở Quận Hải Châu, Đà Nẵng: nhẫn cưới, nhẫn đính hôn, dây chuyền, bông tai, lắc và vòng bằng vàng 10K, 14K, 18K, 24K. Giá tính minh bạch từng khoản, nhận đặt làm, khắc chữ, sửa chữa và thu đổi.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Kim Nguyệt · Tiệm kim hoàn ở Đà Nẵng",
    description: "Nhẫn cưới và trang sức vàng chế tác theo yêu cầu, giá viết ra từng khoản: vàng, công, đá.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Kim Nguyệt, tiệm kim hoàn ở Đà Nẵng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/kim-hoan" },
};

export default function KimHoanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="kim-hoan" lang="vi">
      {children}
    </div>
  );
}
