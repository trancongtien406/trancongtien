import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Luân Quang · Đồng hồ cơ khí chế tác thủ công (bản minh hoạ)",
  description:
    "Luân Quang là thương hiệu minh hoạ của một hãng đồng hồ cơ khí: bộ sưu tập, giỏ hàng mô phỏng, quy trình chế tác. Trang demo với hiệu ứng tách lớp linh kiện đồng hồ vẽ SVG khi cuộn.",
  openGraph: {
    title: "Luân Quang · Đồng hồ cơ khí (demo)",
    description: "Landing minh hoạ với đồng hồ SVG tách lớp linh kiện khi cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
