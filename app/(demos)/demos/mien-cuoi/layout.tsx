import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/mien-cuoi/identity";

export const metadata: Metadata = {
  title: "Miền Cười · Phòng khám nha khoa tại Hải Châu, Đà Nẵng",
  description:
    "Phòng khám nha khoa tại Quận Hải Châu, Đà Nẵng: khám và lấy cao răng, trám, nhổ răng, niềng, tẩy trắng, tư vấn implant. Quy trình khám, chi phí tham khảo và đặt lịch.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Miền Cười · Phòng khám nha khoa",
    description: "Hiểu răng mình. An tâm chăm sóc.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Miền Cười, nha khoa" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function MienCuoiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
