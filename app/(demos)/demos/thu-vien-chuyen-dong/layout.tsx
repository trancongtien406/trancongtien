import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Thư Viện Chuyển Động · Công cụ dựng poster chuyển động",
  description:
    "Thư Viện Chuyển Động biến poster tĩnh thành chuyển động: băng chuyền, vòng, lưới, trường, hiệu ứng lộ và vệt, kết nối trợ lý AI qua MCP.",
  alternates: { canonical: "/demos/thu-vien-chuyen-dong" },
  openGraph: {
    title: "Thư Viện Chuyển Động · Công cụ dựng poster chuyển động",
    description: "Thư Viện Chuyển Động biến poster tĩnh thành chuyển động: băng chuyền, vòng, lưới, trường, hiệu ứng lộ và vệt, kết nối trợ lý AI qua MCP.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function ThuVienLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
