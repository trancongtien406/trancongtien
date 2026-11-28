import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Tiến Hoá Studio · Studio thiết kế sản phẩm số cho doanh nghiệp",
  description:
    "Tiến Hoá Studio: thiết kế UX/UI, website, ứng dụng web và di động, hệ thống thiết kế, nhận diện và chuyển động 3D giúp sản phẩm số của doanh nghiệp Việt lớn lên. (Demo minh hoạ)",
  openGraph: {
    title: "Tiến Hoá Studio · Thiết kế giúp doanh nghiệp bạn lớn lên",
    description: "Studio thiết kế sản phẩm số: web, app, hệ thống thiết kế, chuyển động 3D.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function SanPhamSoLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
