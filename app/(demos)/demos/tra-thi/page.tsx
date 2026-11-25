import { CustomCursor, GrainOverlay, ScrollProgress } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto, Rituals, Space, Faq, Closing, Footer } from "./components/Sections";
import { Catalog } from "./components/Catalog";
import { Pairing } from "./components/Pairing";
import { Summary } from "./components/Summary";
import { Motion } from "./components/Motion";
import { Preloader } from "./components/Preloader";

export default function TraThiPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Preloader />
      <ScrollProgress variant="bar" className={s.progress} label="Tiến độ cuộn trang" />
      <GrainOverlay opacity={0.07} size={200} baseFrequency={0.75} blendMode="overlay" fixed zIndex={2} />
      <CustomCursor size={10} hoverScale={4.2} />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Rituals />
        <section id="danh-muc" className={s.sectionBlock}><Catalog /></section>
        <section id="ghep-tra" className={s.sectionBlock}><Pairing /></section>
        <section id="buoi-tra" className={s.sectionBlock}><Summary /></section>
        <Space />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
