import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MenuSection, Interlude, BuilderSection, StorySection, ProcessSection, Manifesto, Faq, Closing, Footer } from "./components/Sections";
import { Motion } from "./components/Motion";

export default function TiemBanhPage() {
  return (
    <div className={s.brand}>
      <a className={`${s.skip} ${s.noPrint}`} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <MenuSection />
        <Interlude />
        <BuilderSection />
        <StorySection />
        <ProcessSection />
        <Manifesto />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
