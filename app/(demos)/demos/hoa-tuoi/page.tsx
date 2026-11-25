import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Band, Manifesto, Occasions, Garden, BuilderSection, Craft, Faq, Closing, Footer } from "./components/Sections";
import { Motion } from "./components/Motion";
import { PetalRain } from "./components/PetalRain";
import { CustomCursor, ScrollProgress } from "@/features/showroom/effects";

export default function HoaTuoiPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <ScrollProgress variant="bar" className={s.progress} label="Tiến độ cuộn trang" />
      <Header />
      <main id="main">
        <Hero />
        <Band />
        <Manifesto />
        <Occasions />
        <Garden />
        <BuilderSection />
        <Craft />
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
