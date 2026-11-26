import { CustomCursor, GrainOverlay } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto, Rituals, Faq, Closing, Footer } from "./components/Sections";
import { Bites, Rooms, Takeaway, Space, Rules } from "./components/Venue";
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
      <GrainOverlay opacity={0.07} size={200} baseFrequency={0.75} blendMode="overlay" fixed zIndex={2} />
      <CustomCursor size={10} hoverScale={4.2} />
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <section id="danh-muc" className={s.sectionBlock}><Catalog /></section>
        <Bites />
        <Rituals />
        <section id="ghep-tra" className={s.sectionBlock}><Pairing /></section>
        <Rooms />
        <section id="buoi-tra" className={s.sectionBlock}><Summary /></section>
        <Takeaway />
        <Space />
        <Rules />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
