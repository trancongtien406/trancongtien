import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/pet-vui/identity";

export const metadata: Metadata = {
  title: "Bông Xù · Pet spa & grooming chó mèo tại Đà Nẵng",
  description:
    "Tắm bọt, sấy thơm, chải gỡ rối và tỉa gọn cho chó mèo ở Đà Nẵng. Chọn loài, cân nặng, độ dài lông và tình trạng của bé để xem các bước chăm sóc, thời gian và giá tham khảo.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Bông Xù · Pet spa & grooming chó mèo",
    description: "Biến boss thành cục bông đáng yêu.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Bông Xù, pet spa và grooming chó mèo ở Đà Nẵng" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function PetVuiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
