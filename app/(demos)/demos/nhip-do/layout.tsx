import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Nhịp Độ · Giày chạy bộ theo nhịp của bạn (demo)",
  description:
    "Nhịp Độ là thương hiệu giày chạy bộ minh hoạ: bốn dòng theo nhịp chạy, dải chữ chạy vô hạn đổi tốc độ theo vận tốc cuộn, máy tính nhịp chạy và giỏ hàng mô phỏng. Mọi số liệu là minh hoạ.",
  openGraph: {
    title: "Nhịp Độ · Giày chạy bộ theo nhịp của bạn",
    description: "Trang demo giày chạy bộ với velocity marquee phản ứng theo tốc độ cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function NhipDoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
