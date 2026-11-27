import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Đường Nét · Portfolio nhiếp ảnh chân dung & kiến trúc (bản minh hoạ)",
  description:
    "Đường Nét là studio nhiếp ảnh minh hoạ: portfolio dạng lưới, nhấp vào ảnh để mở toàn màn hình kiểu tạp chí bằng GSAP Flip, kèm gói chụp, quy trình và đặt lịch mô phỏng.",
  openGraph: {
    title: "Đường Nét · Studio nhiếp ảnh (demo)",
    description: "Portfolio nhiếp ảnh minh hoạ với hiệu ứng ảnh mở rộng toàn màn hình.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
