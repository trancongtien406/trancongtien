import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Header } from "./components/Header";
import { ImmersiveAlbum } from "./components/ImmersiveAlbum";
import { Moodboard } from "./components/Moodboard";
import { Motion } from "./components/Motion";
import { About, Closing, FaqSection, Footer, Hero, Light, Packages, Policies, Process, Services, Styles, Wardrobe } from "./components/Sections";

export const metadata: Metadata = {
  title: "Tháng Mơ · Studio ảnh cưới Đà Nẵng: pre-wedding, phóng sự cưới, album",
  description:
    "Studio ảnh cưới tại Quận Sơn Trà, Đà Nẵng. Pre-wedding studio và ngoại cảnh, phóng sự ngày cưới, album và ảnh in. Gói từ 5.900.000 đ, ghi rõ bao gồm, quy trình và chính sách đặt cọc.",
  alternates: { canonical: "/demos/thang-mo" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tháng Mơ, studio ảnh cưới Đà Nẵng",
  description: "Studio ảnh cưới tại Đà Nẵng.",
  inLanguage: "vi",
};

export default function Page() {
  const consult = buildConsultHref("thang-mo");
  return (
    <div className={styles.brand} data-tm-root>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Header consultHref={consult} />
      <main id="main">
        <Hero consultHref={consult} />
        <About />
        <Services />
        <Packages />
        <Styles />
        <Wardrobe />
        <Light />
        <Moodboard consultHref={consult} />
        <Process />
        <Policies />
        <FaqSection />
        <Closing consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <ImmersiveAlbum />
      <Motion />
    </div>
  );
}
