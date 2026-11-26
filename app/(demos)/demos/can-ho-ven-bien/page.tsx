import { CustomCursor } from "@/features/showroom/effects";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Chapters } from "./components/Chapters";
import { SunScene } from "./components/SunScene";
import { Planner } from "./components/Planner";
import { Tower } from "./components/Tower";
import { Units } from "./components/Units";
import { Visit } from "./components/Visit";
import { FloorRuler } from "./components/FloorRuler";
import { Faq, Footer, Gallery, Overview } from "./components/Sections";
import { Motion } from "./components/Motion";
import styles from "./brand.module.css";

export default function CanHoVenBienPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <FloorRuler />
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <Overview />
        <Chapters />
        <Tower />
        <Gallery />
        <SunScene />
        <Units />
        <Planner />
        <Faq />
        <Visit />
      </main>
      <Footer />
      <Motion />
      <CustomCursor size={10} hoverScale={3} />
    </>
  );
}
