import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Lê Mộc · Nông sản hữu cơ theo mùa (demo minh hoạ)",
  description:
    "Trang demo minh hoạ cho cửa hàng nông sản hữu cơ: khối blob biến hình thành quả lê theo tiến trình cuộn, lịch mùa vụ, giỏ hàng và đơn đặt mô phỏng.",
  alternates: { canonical: "/demos/le-moc" },
  openGraph: {
    title: "Lê Mộc · Nông sản hữu cơ theo mùa",
    description: "Demo minh hoạ: landing nông sản với blob SVG biến hình theo cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function LeMocLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
