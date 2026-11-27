import type { Metadata } from "next";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  title: "Khoảng Lặng · Thiền và hít thở có hướng dẫn (demo)",
  description:
    "Khoảng Lặng là không gian thiền minh hoạ: giao diện hít thở với quầng sáng phồng xẹp theo nhịp, bài tập thở 4-7-8, thở hộp và chương trình thiền ngắn. Mọi nội dung và số liệu là minh hoạ.",
  openGraph: {
    title: "Khoảng Lặng · Thiền và hít thở có hướng dẫn",
    description: "Trang demo thiền với giao diện hít thở, quầng sáng đi theo nhịp.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function KhoangLangLayout({ children }: { children: React.ReactNode }) {
  return <div className={fontVars} style={{ display: "contents" }}>{children}</div>;
}
