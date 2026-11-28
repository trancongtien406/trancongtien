import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Dựng Hình Minh · Làm thương hiệu chuyển động",
  description:
    "Dựng Hình Minh: freelancer thiết kế website, phim motion, hình 3D, ứng dụng và phần mềm cho thương hiệu. Website của bạn lên sóng trong 24 giờ. Trang minh hoạ.",
  openGraph: {
    title: "Dựng Hình Minh · Làm thương hiệu chuyển động",
    description: "Website, phim motion, 3D và ứng dụng cho thương hiệu Việt.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function ThuongHieuChuyenDongLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
