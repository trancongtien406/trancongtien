import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Giọt Sương · Serum hyaluronic cấp ẩm cho da căng mịn",
  description:
    "Giọt Sương: serum hyaluronic 2% không hương liệu. Ba giọt sáng và tối, da mềm dịu từ tuần đầu, dùng thử 30 ngày, không hợp gửi lại. Trang minh hoạ.",
  openGraph: {
    title: "Giọt Sương · Serum hyaluronic cấp ẩm",
    description: "Da căng mịn từ sáng đến nửa đêm. Dùng thử 30 ngày.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function GiotSuongLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
