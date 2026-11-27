import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Tinh Thể · Trang sức đá quý chế tác theo yêu cầu (demo)",
  description:
    "Tinh Thể là thương hiệu trang sức đá quý minh hoạ: viên đá nhiều mặt nghiêng 3D theo con trỏ, phản sáng từng mặt cắt, bộ sưu tập nhẫn, mặt dây, bông tai, vòng tay và đặt lịch xem mô phỏng. Mọi giá và thông tin là minh hoạ.",
  openGraph: {
    title: "Tinh Thể · Trang sức đá quý chế tác theo yêu cầu",
    description: "Trang demo trang sức với lăng kính tương tác theo con trỏ.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TinhTheLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
