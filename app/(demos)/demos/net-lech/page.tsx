import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Header } from "./components/Header";
import { Motion } from "./components/Motion";
import { BuilderSection, Craft, FaqSection, Final, Footer, Hero, LookbookSection, Manifesto, People, Process, Space, Strip } from "./components/Sections";

export const metadata: Metadata = {
  title: "Nét Lệch · Hair Studio, Lookbook và Service Builder",
  description:
    "Hair studio: Lookbook lọc kiểu tóc theo độ dài, loại, phong cách và mức chăm sóc; Service Builder tóm tắt dịch vụ với giá tham khảo và thời gian dự kiến.",
  alternates: { canonical: "/demos/net-lech" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Nét Lệch · Hair Studio",
  description: "Hair studio phong cách tạp chí thời trang: cắt, nhuộm, tạo kiểu.",
  inLanguage: "vi",
};

export default function Page() {
  const consult = buildConsultHref("net-lech");
  return (
    <div className={styles.brand} data-nl-root>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className={styles.skip} href="#lookbook">Bỏ qua, tới Lookbook</a>
      <Header />
      <main id="main">
        <Hero />
        <Strip />
        <Manifesto />
        <LookbookSection />
        <Craft />
        <BuilderSection consultHref={consult} />
        <People />
        <Space />
        <Process />
        <FaqSection />
        <Final consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <Motion />
    </div>
  );
}
