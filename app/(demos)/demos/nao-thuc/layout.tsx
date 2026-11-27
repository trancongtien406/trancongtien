import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Não Thức · Bản đồ tâm trí: phòng khám thần kinh (demo minh hoạ)",
  description:
    "Trang demo minh hoạ cho phòng khám khoa học thần kinh: bản đồ não cuộn theo từng vùng, dịch vụ đo EEG, trị liệu nhận thức, neurofeedback và form đặt lịch mô phỏng.",
  alternates: { canonical: "/demos/nao-thuc" },
  openGraph: {
    title: "Não Thức · Bản đồ tâm trí",
    description: "Demo minh hoạ: landing phòng khám thần kinh với bản đồ não cuộn theo vùng.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function NaoThucLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
