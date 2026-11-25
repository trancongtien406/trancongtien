import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey, Space, Faq, Closing, Footer } from "./components/Sections";
import { Signature } from "./components/Signature";
import { Composer } from "./components/Composer";
import { Reservation } from "./components/Reservation";
import { Motion } from "./components/Motion";

export default function BenViPage() {
  return (
    <div className={s.brand}>
      <a className={`${s.skip} ${s.noPrint}`} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Journey />
        <Signature />
        <Composer />
        <Space />
        <Reservation />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
