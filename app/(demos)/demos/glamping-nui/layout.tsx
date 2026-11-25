import type { Metadata } from "next";
import { fontVars } from "./fonts";
import styles from "./brand.module.css";

const ID = "/images/demos/glamping-nui/identity";

export const metadata: Metadata = {
  title: "Rừng Thức · Glamping và camping núi gần Đà Nẵng",
  description:
    "Ngủ lều giữa rừng thông, ngồi bên lửa trại, thức dậy cùng sương núi. Xem hành trình một ngày-đêm, chọn lều, và ước tính chi phí chuyến đi bằng công cụ lên kế hoạch. Giá tham khảo.",
  robots: { index: false, follow: true },
  icons: {
    icon: [
      { url: `${ID}/favicon.svg`, type: "image/svg+xml" },
      { url: `${ID}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${ID}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Rừng Thức · Đêm chạm rừng, ngày chạm mây",
    description: "Glamping giữa núi rừng gần Đà Nẵng: lều ấm, bữa tối bên lửa, bầu trời đầy sao.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: `${ID}/og-image.webp`, width: 1200, height: 630, alt: "Rừng Thức, đêm chạm rừng, ngày chạm mây" }],
  },
  twitter: { card: "summary_large_image", images: [`${ID}/og-image.webp`] },
  alternates: { canonical: "/demos/glamping-nui" },
};

export default function GlampingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fontVars} ${styles.brand}`} data-site="glamping-nui" lang="vi">
      {children}
    </div>
  );
}
