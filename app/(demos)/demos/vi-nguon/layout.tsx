import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Ví Nguồn · Nền tảng tài chính số cho ngân hàng và doanh nghiệp",
  description:
    "Ví Nguồn: nền tảng tài chính số giúp tổ chức tài chính tự động hoá quy trình, theo dõi dòng tiền và giảm phí giao dịch. Số liệu và khách hàng trên trang chỉ là minh hoạ, không phải doanh nghiệp thật.",
  openGraph: {
    title: "Ví Nguồn · Tương lai sáng cho ngân hàng số",
    description: "Nền tảng tài chính số: dòng tiền, thẻ chi tiêu, phân tích đầu tư và giao dịch phí thấp.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
