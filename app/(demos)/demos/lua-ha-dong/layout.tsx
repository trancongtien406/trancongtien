import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Lụa Hà Đông · In lụa hoa văn, dệt để bền",
  description:
    "Lụa Hà Đông: xưởng in lụa kỹ thuật số hoa văn Việt. Cuộn để xem máy in nhả vải, giọt mực chạy theo đường đứt nét, bộ sưu tập lụa đặc trưng và quy trình từ giọt mực tới tấm lụa. Trang minh hoạ, không phải doanh nghiệp thật.",
  openGraph: {
    title: "Lụa Hà Đông · Không chỉ in lụa, chúng tôi dệt để bền",
    description: "Xưởng in lụa kỹ thuật số hoa văn Việt: mực, màu và tấm vải.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function LuaHaDongLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
