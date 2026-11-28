import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Mặc Thạch Parfums · The Night Collection",
  description:
    "Mặc Thạch Parfums (trang minh hoạ): bộ sưu tập 5 mùi hương Extrait de Parfum ủ trong bóng tối đá bazan với không gian trưng bày hốc đá và ánh sáng sân khấu tương tác.",
  openGraph: {
    title: "Mặc Thạch Parfums · The Night Collection",
    description:
      "Năm sáng tạo mùi hương từ đá bazan & bóng đêm — trải nghiệm trưng bày hốc đá và ánh sáng đổi màu theo từng chai.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={fontVars} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
