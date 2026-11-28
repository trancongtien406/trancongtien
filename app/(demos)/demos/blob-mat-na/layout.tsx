import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Mặt Nạ Blob · Portfolio nhà thiết kế",
  description:
    "Portfolio nhà thiết kế với hiệu ứng blob theo con trỏ, lộ lớp video và đảo màu chữ. Dự án, giới thiệu và liên hệ.",
  alternates: { canonical: "/demos/blob-mat-na" },
  openGraph: {
    title: "Mặt Nạ Blob · Portfolio nhà thiết kế",
    description: "Portfolio nhà thiết kế với hiệu ứng blob theo con trỏ, lộ lớp video và đảo màu chữ. Dự án, giới thiệu và liên hệ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function BlobMatNaLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
