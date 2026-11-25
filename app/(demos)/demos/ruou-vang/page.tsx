import { GrainOverlay } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "./brand.module.css";
import { Curtain } from "./components/Curtain";
import { Finder } from "./components/Finder";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Labels } from "./components/Labels";
import { Menu } from "./components/Menu";
import { Motion } from "./components/Motion";
import { Band, Cellar, Faq, Footer, Plates, Pour, Story } from "./components/Sections";
import { Swirl } from "./components/Swirl";

export default function RuouVangPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Band />
        <Story />
        <Pour />
        <Swirl />
        <Labels />
        <Menu />
        <Plates />
        <Cellar />
        <Finder consultHref={buildConsultHref("ruou-vang")} />
        <Faq />
      </main>
      <Footer />
      <div className={s.vignette} aria-hidden="true" />
      <div className={s.spot} data-rv="spot" aria-hidden="true" />
      <GrainOverlay fixed animated opacity={0.06} size={200} blendMode="overlay" zIndex={60} />
      <Curtain />
      <Motion />
    </div>
  );
}
