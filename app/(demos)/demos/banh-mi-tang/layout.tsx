import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Bánh Mì Tầng · Bánh mì kẹp xếp tầng, khoai chiên và trà sữa kem",
  description:
    "Bánh Mì Tầng: bánh mì kẹp thịt nướng xếp tầng, khoai chiên sốt cay, trà sữa kem Oreo và combo cuối tuần. Cuộn để xem từng lớp nhân tách rời. Trang minh hoạ, không phải cửa hàng thật.",
  openGraph: {
    title: "Bánh Mì Tầng · Xếp tầng như một ngôi sao",
    description: "Bánh mì kẹp xếp tầng, khoai chiên, trà sữa kem và combo cuối tuần.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function BanhMiTangLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
