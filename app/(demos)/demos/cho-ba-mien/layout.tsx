import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Chợ Ba Miền · Siêu thị đặc sản Bắc, Trung, Nam dạo bước trong không gian 3D",
  description:
    "Chợ Ba Miền: siêu thị đặc sản trực tuyến. Cuộn để đi bộ giữa các kệ hàng 3D, ngắm chè Thái Nguyên, mè xửng Huế, nước dừa Bến Tre rồi thêm vào giỏ. Trang minh hoạ, không phải cửa hàng thật.",
  openGraph: {
    title: "Chợ Ba Miền · Siêu thị đặc sản ba miền",
    description: "Dạo siêu thị đặc sản ba miền trong không gian 3D, thêm món vào giỏ ngay trên kệ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function ChoBaMienLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
