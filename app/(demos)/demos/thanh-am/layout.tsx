import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Thanh Âm · Tai nghe & loa không dây, nghe thử dạng sóng (bản minh hoạ)",
  description:
    "Thanh Âm là thương hiệu minh hoạ của một hãng thiết bị âm thanh: tai nghe, tai nghe nhét tai, loa không dây. Trang demo với dạng sóng SVG phản ứng con trỏ và phòng nghe thử tạo âm mẫu ngay trên trình duyệt.",
  openGraph: {
    title: "Thanh Âm · Thiết bị âm thanh (demo)",
    description: "Landing minh hoạ với dạng sóng SVG tương tác và âm mẫu Web Audio.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
