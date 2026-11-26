import { CustomCursor, GrainOverlay } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Band, Booking, Contact, Delivery, EstimatorSection, Faq, Footer, Master, Process, Rates, Services, Studio } from "./components/Sections";
import { Motion } from "./components/Motion";

export default function PhongThuPage() {
  return (
    <div className={s.brand} data-site="phong-thu">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <div className={s.rail} aria-hidden="true"><i /></div>
      <main id="main">
        <Hero />
        <Band />
        <Services />
        <Process />
        <Delivery />
        <Studio />
        <Master />
        <Rates />
        <EstimatorSection />
        <Booking />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <GrainOverlay fixed animated={false} opacity={0.06} size={200} blendMode="overlay" />
      <CustomCursor size={12} hoverScale={3.6} />
      <Motion />
    </div>
  );
}
