import { CustomCursor, ScrollProgress } from "@/features/showroom/effects";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Chapters } from "./components/Chapters";
import { SunScene } from "./components/SunScene";
import { Planner } from "./components/Planner";
import { Faq, FinalCta, Footer, Gallery, Manifesto } from "./components/Sections";
import { Motion } from "./components/Motion";
import styles from "./brand.module.css";

export default function CanHoVenBienPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <ScrollProgress variant="bar" className={styles.progress} label="Tiến độ cuộn trang" />
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <Manifesto />
        <Chapters />
        <Gallery />
        <SunScene />
        <Planner />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <CustomCursor size={10} hoverScale={3} />
    </>
  );
}
