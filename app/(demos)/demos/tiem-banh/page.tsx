import { ScrollProgress } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MenuSection, BuilderSection, StorySection, ProcessSection, Faq, Closing, Footer } from "./components/Sections";
import { Shelf } from "./components/Shelf";
import { Oven } from "./components/Oven";
import { Slice } from "./components/Slice";
import { Candles } from "./components/Candles";
import { Care, Seasons } from "./components/Info";
import { Motion } from "./components/Motion";

export default function TiemBanhPage() {
  return (
    <div className={s.brand}>
      <a className={`${s.skip} ${s.noPrint}`} href="#main">Bỏ qua tới nội dung</a>
      <ScrollProgress variant="bar" fixed className={s.progress} />
      <Header />
      <main id="main">
        <Hero />
        <MenuSection />
        <Shelf />
        <Oven />
        <Slice />
        <BuilderSection />
        <Candles />
        <Seasons />
        <ProcessSection />
        <Care />
        <StorySection />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
