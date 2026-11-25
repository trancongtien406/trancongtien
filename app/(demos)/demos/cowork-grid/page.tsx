import { ScrollProgress } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Crosshair } from "./components/Crosshair";
import { Motion } from "./components/Motion";
import { Amenities, Closing, Faq, Footer, Manifesto, PickerSection, Pricing, Steps, Ticker, WorkdaySection, Zones } from "./components/Sections";

export default function CoworkGridPage() {
  return (
    <div className={s.brand} data-cg-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <ScrollProgress variant="bar" className={s.topProgress} label="Tiến độ cuộn trang" />
      <Header />
      <main id="main">
        <Hero />
        <Ticker words={["Hot desk", "Bàn cố định", "Phòng họp", "Phòng riêng", "Cà phê", "In ấn", "Đà Nẵng"]} />
        <Manifesto />
        <Zones />
        <PickerSection />
        <Ticker outline reverse words={["Chọn đúng ô", "Làm đúng việc", "A1", "B2", "C3", "D4", "Ô Lưới"]} />
        <WorkdaySection />
        <Amenities />
        <Pricing />
        <Steps />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Crosshair />
      <Motion />
    </div>
  );
}
