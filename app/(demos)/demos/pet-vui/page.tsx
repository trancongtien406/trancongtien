import { ScrollProgress } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Strip, About, Packs, Process, Gallery, Manifesto, Faq, Closing, Footer } from "./components/Sections";
import { Planner } from "./components/Planner";
import { PawCursor } from "./components/PawCursor";

export default function PetVuiPage() {
  return (
    <div className={s.brand} data-pv-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <ScrollProgress className={s.progress} />
      <Header />
      <main id="main">
        <Hero />
        <Strip />
        <About />
        <Packs />
        <Planner />
        <Process />
        <Gallery />
        <Manifesto />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <PawCursor />
    </div>
  );
}
