import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Áo Mộc Xuống Phố · Local brand streetwear Việt Nam",
  description:
    "Áo Mộc Xuống Phố: giá treo áo trực tuyến. Chọn áo thun, sơ mi, áo khoác bóng chày, áo đấu để phóng to, đổi màu bằng thẻ treo và xem mặt trước, mặt sau. Trang minh hoạ, không phải cửa hàng thật.",
  openGraph: {
    title: "Áo Mộc Xuống Phố · Streetwear Việt",
    description: "Giá treo áo trực tuyến: chọn áo, đổi màu, xem mặt sau.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function AoMocLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
