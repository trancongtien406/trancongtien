import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Cất Cánh Studio · Làm website của bạn chuyển động",
  description:
    "Cất Cánh Studio: bộ ứng dụng không cần code giúp dựng website cuộn 3D, chuyển động mượt và tương tác kéo thả. Cài đặt trong vài phút. Trang minh hoạ.",
  openGraph: {
    title: "Cất Cánh Studio · Website chuyển động",
    description: "Tạo trải nghiệm cuộn ấn tượng dễ như kéo thả.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function CatCanhStudioLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
