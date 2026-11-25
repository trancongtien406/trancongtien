import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/da-xanh/identity";

export const metadata: Metadata = {
  title: "NÉA Skin Studio · Chăm sóc da cơ bản tại Đà Nẵng",
  description:
    "NÉA Skin Studio là studio chăm sóc da cơ bản ở Đà Nẵng: làm sạch dịu, cấp ẩm, làm dịu da và xây thói quen skincare vừa đủ. Thử công cụ Skin Routine Builder để có gợi ý quy trình sáng và tối.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "NÉA Skin Studio · Chăm da dịu dàng, hiểu làn da hơn",
    description: "Studio chăm sóc da cơ bản ở Đà Nẵng và công cụ gợi ý quy trình skincare sáng, tối.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "NÉA Skin Studio, chăm da dịu dàng" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/da-xanh" },
};

export default function DaXanhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="da-xanh" lang="vi">
      {children}
    </div>
  );
}
