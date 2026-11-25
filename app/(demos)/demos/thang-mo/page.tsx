import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Header } from "./components/Header";
import { ImmersiveAlbum } from "./components/ImmersiveAlbum";
import { Moodboard } from "./components/Moodboard";
import { Motion } from "./components/Motion";
import { Albums, Closing, Essay, FaqSection, Footer, Hero, Packages, Process, Story } from "./components/Sections";

export const metadata: Metadata = {
  title: "Tháng Mơ · Studio ảnh cưới phong cách analog photobook",
  description:
    "Studio ảnh cưới phong cách analog photobook: Immersive Album lật trang toàn màn hình và Wedding Moodboard dựng bảng mood cùng gói chụp tham khảo.",
  alternates: { canonical: "/demos/thang-mo" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tháng Mơ — studio ảnh cưới",
  description: "Album ảnh cưới cảm hứng và công cụ moodboard.",
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
        <Hero />
        <Story />
        <Albums />
        <Essay />
        <Packages />
        <Moodboard consultHref={consult} />
        <Process />
        <FaqSection />
        <Closing consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <ImmersiveAlbum />
      <Motion />
    </div>
  );
}
