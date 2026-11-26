import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/pet-vui/identity";

export const metadata: Metadata = {
  title: "Bông Xù · Tiệm tắm và cắt tỉa lông chó mèo, Quận Sơn Trà, Đà Nẵng",
  description:
    "Tắm, sấy, chải gỡ rối, cắt tỉa tạo kiểu, cắt móng, lau tai cho chó mèo đã tiêm phòng. Bảng giá theo cân nặng và độ dài lông, quy trình, giờ mở cửa 8:00 – 19:00 và đặt lịch hẹn.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Bông Xù · Tiệm tắm và cắt tỉa lông chó mèo",
    description: "Biến boss thành cục bông đáng yêu.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Bông Xù, pet spa và grooming chó mèo ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function PetVuiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
