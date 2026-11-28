import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Giày Thanh Lịch · Giày cao gót, bốt, búp bê và áo khoác dáng dài cho phái đẹp",
  description:
    "Giày Thanh Lịch: tiệm giày và thời trang nữ với cao gót, sandal, bốt cổ ngắn, búp bê da mềm và áo khoác dáng dài. Chọn dáng giày hợp mình, đổi size trong 7 ngày. (Demo minh hoạ)",
  openGraph: {
    title: "Giày Thanh Lịch · Vẻ đẹp của việc là chính mình",
    description: "Giày và thời trang nữ thanh lịch, chất liệu mềm, dáng chuẩn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function GiayThanhLichLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
