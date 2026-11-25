import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/khoi-nep/identity";

export const metadata: Metadata = {
  title: "Khối Nếp — Studio thiết kế không gian & nội thất",
  description:
    "Studio thiết kế không gian và nội thất: công cụ dự toán ngân sách tham khảo và bảng vật liệu tương tác.",
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, type: "image/png", sizes: "32x32" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Khối Nếp — Studio thiết kế không gian & nội thất",
    description: "Thiết kế không gian và nội thất từ ý tưởng đến hoàn thiện.",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630 }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function KhoiNepLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fontVars} ${styles.brand}`}>{children}</div>;
}
