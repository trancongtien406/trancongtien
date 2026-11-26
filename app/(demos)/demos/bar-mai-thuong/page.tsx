import { GrainOverlay } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Band, Manifesto, Pour, Signature, Ingredients, Rhythm, Faq, Footer } from "./components/Sections";
import { Menu } from "./components/Menu";
import { Matcher } from "./components/Matcher";
import { Zones } from "./components/Zones";
import { Reserve } from "./components/Reserve";
import { Motion } from "./components/Motion";
import { Happy } from "./components/Happy";
import { Board } from "./components/Board";
import { Night } from "./components/Night";
import { Contact, Events, Rules } from "./components/Info";

export default function BarMaiThuongPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Band />
        <Manifesto />
        <Happy />
        <Pour />
        <Signature />
        <Menu />
        <Board />
        <Ingredients />
        <Matcher />
        <Zones />
        <Night />
        <Rhythm />
        <Events />
        <Reserve />
        <Rules />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <div className={s.spot} data-tm="spot" aria-hidden="true" />
      <GrainOverlay fixed animated opacity={0.07} size={200} blendMode="overlay" zIndex={60} />
      <Motion />
    </div>
  );
}
