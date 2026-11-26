import { CustomCursor, ScrollProgress } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { SLUG } from "./data/content";
import { Configurator } from "./components/Configurator";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Motion } from "./components/Motion";
import { About, Care, Collections, Contact, Craft, Faq, Footer, Info, Karat, Pricing, RingSection, Services, Visit } from "./components/Sections";
import styles from "./brand.module.css";

export default function KimHoanPage() {
  const consultHref = buildConsultHref(SLUG);
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Intro />
      <ScrollProgress variant="bar" className={styles.progress} label="Tiến độ cuộn trang" />
      <Header consultHref={consultHref} />
      <main id="main" className={styles.main}>
        <Hero />
        <Info />
        <About />
        <Collections />
        <RingSection />
        <Karat />
        <Pricing />
        <Configurator consultHref={consultHref} />
        <Services />
        <Craft />
        <Care />
        <Visit />
        <Faq />
        <Contact consultHref={consultHref} />
      </main>
      <Footer />
      <Motion />
      <CustomCursor size={10} hoverScale={3.2} className={styles.cursor} labelClassName={styles.cursorLabel} />
    </>
  );
}
