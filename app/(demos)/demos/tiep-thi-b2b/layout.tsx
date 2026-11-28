import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Phong Vị B2B · Agency marketing B2B: nội dung, quảng cáo hiệu suất, đo lường",
  description:
    "Phong Vị B2B: agency tiếp thị cho doanh nghiệp B2B. Xây bộ máy marketing tạo pipeline, quảng cáo hiệu suất, nội dung sáng tạo, đo lường và đội ngũ demand riêng. (Demo minh hoạ)",
  openGraph: {
    title: "Phong Vị B2B · Bộ máy marketing hiệu suất cao cho thương hiệu B2B",
    description: "Agency marketing B2B: pipeline, hiệu suất, đo lường.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function TiepThiLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
