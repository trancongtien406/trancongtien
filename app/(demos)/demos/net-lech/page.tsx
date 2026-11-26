import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Header } from "./components/Header";
import { Motion } from "./components/Motion";
import { BuilderSection, Craft, FaqSection, Final, Footer, Hero, LookbookSection, Manifesto, People, Policies, Process, Products, Space, Strip } from "./components/Sections";

export const metadata: Metadata = {
  title: "Nét Lệch · Salon tóc Hải Châu, Đà Nẵng: cắt, uốn, duỗi, nhuộm",
  description:
    "Salon tóc nam nữ tại Quận Hải Châu, Đà Nẵng. Bảng giá cắt, uốn, duỗi, nhuộm, tẩy, phục hồi theo độ dài tóc, giờ mở cửa 09:00–20:00, chính sách đặt cọc và ước tính thời gian.",
  alternates: { canonical: "/demos/net-lech" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Nét Lệch · Salon tóc Đà Nẵng",
  description: "Salon tóc nam nữ tại Quận Hải Châu, Đà Nẵng.",
  inLanguage: "vi",
};

export default function Page() {
  const consult = buildConsultHref("net-lech");
  return (
    <div className={styles.brand} data-nl-root>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Strip />
        <Craft />
        <Manifesto />
        <LookbookSection />
        <Process />
        <BuilderSection consultHref={consult} />
        <People />
        <Products />
        <Space />
        <Policies />
        <FaqSection />
        <Final consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <Motion />
    </div>
  );
}
