import type { Metadata } from "next";
import { fontVars } from "./fonts";

const base = "/images/demos/mien-cuoi/identity";

export const metadata: Metadata = {
  title: "Miền Cười · Chăm sóc răng miệng rõ ràng, an tâm",
  description:
    "Care Navigator định hướng nhu cầu chăm sóc (không chẩn đoán) và công cụ tóm tắt lịch hẹn thăm khám. Giá chỉ để tham khảo.",
  icons: {
    icon: [
      { url: `${base}/favicon.svg`, type: "image/svg+xml" },
      { url: `${base}/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Miền Cười · Nha khoa",
    description: "Hiểu răng mình. An tâm chăm sóc.",
    images: [{ url: `${base}/og-image.webp`, width: 1200, height: 630, alt: "Miền Cười, nha khoa" }],
    locale: "vi_VN",
    type: "website",
  },
};

export default function MienCuoiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
