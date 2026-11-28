import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Thảo N. · Portfolio thiết kế và sáng tạo",
  description:
    "Portfolio cá nhân của Thảo N., nhà thiết kế sống ở Sài Gòn: thiết kế web, thiết kế sách, minh hoạ và dự án đa phương tiện. Trang minh hoạ.",
  openGraph: {
    title: "Thảo N. · Portfolio",
    description: "Tôi thiết kế, sáng tạo và suy nghĩ. Sống ở Sài Gòn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TanManLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
