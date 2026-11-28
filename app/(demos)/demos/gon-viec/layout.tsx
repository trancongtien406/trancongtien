import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Gọn Việc · Ứng dụng giao việc và theo dõi tiến độ cho cả nhóm",
  description:
    "Gọn Việc: trung tâm điều hành công việc của nhóm. Tạo thẻ việc, đặt hạn chót, giao người phụ trách và theo dõi tiến độ theo thời gian thực. (Demo minh hoạ)",
  openGraph: {
    title: "Gọn Việc · Trung tâm điều hành công việc của nhóm",
    description: "Tạo thẻ, đặt hạn, giao người phụ trách. Cùng làm, cùng xong nhanh.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function GonViecLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
