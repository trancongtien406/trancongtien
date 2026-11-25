import { GrainOverlay, ScrollProgress } from "@/features/showroom/effects";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Bands } from "./components/Bands";
import { Manifesto } from "./components/Manifesto";
import { Courses } from "./components/Courses";
import { Process } from "./components/Process";
import { Planner } from "./components/Planner";
import { Seasons } from "./components/Seasons";
import { Motion } from "./components/Motion";
import { Faq, FinalCta, Footer } from "./components/Sections";
import styles from "./brand.module.css";

export default function LuotSongPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <Bands />
        <Manifesto />
        <Courses />
        <Process />
        <Planner />
        <Seasons />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <ScrollProgress variant="ring" size={46} className={styles.progress} label="Tiến độ cuộn trang" />
      <GrainOverlay fixed opacity={0.16} size={200} blendMode="multiply" animated zIndex={90} />
    </>
  );
}
