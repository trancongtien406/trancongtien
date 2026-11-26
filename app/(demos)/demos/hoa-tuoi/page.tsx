import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About, PriceSection, Occasions, Garden, Season, Wedding, Rhythm, BuilderSection, Cards, Lead, Craft, Care, Faq, Closing, Footer } from "./components/Sections";
import { Motion } from "./components/Motion";
import { PetalRain } from "./components/PetalRain";
import { CustomCursor } from "@/features/showroom/effects";

export default function HoaTuoiPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <PriceSection />
        <Occasions />
        <Garden />
        <Season />
        <Wedding />
        <Rhythm />
        <BuilderSection />
        <Cards />
        <Lead />
        <Craft />
        <Care />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <PetalRain />
      <CustomCursor size={14} hoverScale={4.2} />
      <Motion />
    </div>
  );
}
