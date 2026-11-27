import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Thủy Vực · Lặn biển ngắm san hô, chứng chỉ Open Water (bản minh hoạ)",
  description:
    "Thủy Vực là thương hiệu minh hoạ của một trung tâm lặn biển: lặn thử, khoá Open Water, lặn đêm. Trang demo với hiệu ứng khúc xạ nước SVG feTurbulence khi cuộn xuống từng tầng độ sâu.",
  openGraph: {
    title: "Thủy Vực · Trung tâm lặn biển (demo)",
    description: "Landing minh hoạ với hiệu ứng khúc xạ nước khi cuộn xuống đáy biển.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
