import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Nhà Phố Ánh Sáng · Căn hộ hiên nắng, gỗ tối đá sáng ở Thảo Điền",
  description:
    "Nhà Phố Ánh Sáng: 48 căn hộ riêng tư cao 22 tầng, mỗi căn có một hiên nắng riêng. Xem từng không gian, so sánh mặt bằng và đặt lịch xem nhà. Trang minh hoạ, hình ảnh là đồ hoạ dựng bằng mã, không phải dự án thật.",
  openGraph: {
    title: "Nhà Phố Ánh Sáng · Bước vào một căn hộ",
    description: "48 căn hộ, 22 tầng, mỗi căn một hiên nắng. Đặt lịch xem nhà riêng.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
