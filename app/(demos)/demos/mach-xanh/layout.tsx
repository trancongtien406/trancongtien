import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Mạch Xanh · Điện mặt trời, gió và pin lưu trữ cho doanh nghiệp",
  description:
    "Mạch Xanh (trang minh hoạ): giải pháp năng lượng tái tạo cho xưởng và cơ sở kinh doanh, sơ đồ dòng năng lượng sống động, ước tính tiết kiệm và đặt lịch khảo sát. Số liệu mang tính minh hoạ.",
  openGraph: {
    title: "Mạch Xanh · Năng lượng tái tạo",
    description: "Trang minh hoạ về dòng năng lượng tái tạo chạy theo đường dẫn SVG.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
