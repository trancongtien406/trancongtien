import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Điểm Phá · Agency sáng tạo thương hiệu & website (bản minh hoạ)",
  description:
    "Điểm Phá là thương hiệu minh hoạ của một creative agency: chiến lược thương hiệu, nhận diện, website và nội dung số. Trang demo với con trỏ từ tính, nút hút theo chuột và hiệu ứng đảo màu.",
  openGraph: {
    title: "Điểm Phá · Creative agency (demo)",
    description: "Landing minh hoạ với con trỏ từ tính và hiệu ứng mix-blend-mode.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
