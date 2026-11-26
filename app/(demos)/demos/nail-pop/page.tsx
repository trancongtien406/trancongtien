import { CustomCursor } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Booking } from "./components/Booking";
import { Strip, Services, BuilderSection, Manifesto, Moodboard, Process, Policies, Faq, Closing, Footer } from "./components/Sections";

export default function NailPopPage() {
  return (
    <div className={s.brand} data-np-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Strip />
        <Services />
        <BuilderSection />
        <Manifesto />
        <Moodboard />
        <Process />
        <Policies />
        <Booking />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <CustomCursor size={16} hoverScale={3.4} className={s.cursor} labelClassName={s.cursorLabel} />
    </div>
  );
}
