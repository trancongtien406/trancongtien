import s from "./brand.module.css";
import { Cases } from "./components/Cases";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Playground } from "./components/Playground";
import { About, Faq, Footer, Header, Journal, Packages, Process, Quotes, Services, Timeline } from "./components/Sections";

export default function TanManNgoaiAnhPage() {
  return (
    <div className={s.brand} id="top">
      <a className={s.skip} href="#du-an">Bỏ qua tới nội dung</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Cases />
        <Playground />
        <Services />
        <Process />
        <Journal />
        <Timeline />
        <Quotes />
        <Packages />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
