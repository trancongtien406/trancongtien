import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Strip, About, Services, Surcharges, Process, Intake, Faq, Closing, Footer } from "./components/Sections";
import { PriceBoard } from "./components/PriceBoard";
import { Planner } from "./components/Planner";
import { Booking } from "./components/Booking";
import { PawCursor } from "./components/PawCursor";

export default function PetVuiPage() {
  return (
    <div className={s.brand} data-pv-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Strip />
        <About />
        <Services />
        <PriceBoard />
        <Surcharges />
        <Planner />
        <Process />
        <Intake />
        <Booking />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <PawCursor />
    </div>
  );
}
