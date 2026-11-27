import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Vị Tầng · Nhà hàng tasting sáu tầng vị (demo)",
  description:
    "Vị Tầng là nhà hàng fine dining minh hoạ với thực đơn tasting sáu tầng: mỗi món một lớp xếp chồng khi cuộn. Trang demo giao diện, thương hiệu và số liệu đều là minh hoạ.",
  openGraph: {
    title: "Vị Tầng · Nhà hàng tasting sáu tầng vị",
    description: "Trang demo nhà hàng fine dining với thẻ món xếp chồng theo cuộn.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function ViTangLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
