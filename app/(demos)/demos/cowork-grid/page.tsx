import { ScrollProgress } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Crosshair } from "./components/Crosshair";
import { Motion } from "./components/Motion";
import { Amenities, Booking, Closing, Community, Faq, Footer, HoursSection, Manifesto, PickerSection, Pricing, Trial, WorkdaySection, Zones } from "./components/Sections";

export default function CoworkGridPage() {
  return (
    <div className={s.brand} data-cg-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <ScrollProgress variant="bar" className={s.topProgress} label="Tiến độ cuộn trang" />
      <Header />
      <main id="main">
        <Hero />
        <HoursSection />
        <Manifesto />
        <Pricing />
        <Zones />
        <PickerSection />
        <WorkdaySection />
        <Amenities />
        <Trial />
        <Community />
        <Booking />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Crosshair />
      <Motion />
    </div>
  );
}
