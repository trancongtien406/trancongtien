import { ScrollProgress } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto, Routes, Process, Garage, Faq, Closing, Footer, SpeedBand } from "./components/Sections";
import { RentalDesk } from "./components/RentalDesk";
import { RoadDivider } from "./components/RoadDivider";
import { Motion } from "./components/Motion";
import { Preloader } from "./components/Preloader";
import { Speedometer } from "./components/Speedometer";

export default function PhuotXePage() {
  return (
    <div className={s.brand} data-vx-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <Preloader />
      <ScrollProgress variant="bar" className={s.topProgress} label="Tiến độ cuộn trang" />
      <Header />
      <main id="main">
        <Hero />
        <SpeedBand words={["Chọn xe", "Lên đường", "Vọt đi", "Hải Vân", "Sơn Trà", "Hội An", "Bà Nà"]} />
        <Manifesto />
        <RentalDesk divider={<RoadDivider kind="ga" />} />
        <RoadDivider kind="con" reverse />
        <Routes />
        <SpeedBand outline reverse words={["Đèo Hải Vân", "Bán đảo Sơn Trà", "Biển Hội An", "Đường lên Bà Nà"]} />
        <Process />
        <Garage />
        <RoadDivider kind="so" />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Speedometer />
      <Motion />
    </div>
  );
}
