import { GrainOverlay } from "@/features/showroom/effects";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Bands } from "./components/Bands";
import { About } from "./components/About";
import { Courses } from "./components/Courses";
import { Process } from "./components/Process";
import { Schedule } from "./components/Schedule";
import { Pricing } from "./components/Pricing";
import { Planner } from "./components/Planner";
import { Seasons } from "./components/Seasons";
import { Crew } from "./components/Crew";
import { Safety } from "./components/Safety";
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
        <About />
        <Courses />
        <Process />
        <Schedule />
        <Pricing />
        <Planner />
        <Seasons />
        <Crew />
        <Safety />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <GrainOverlay fixed opacity={0.16} size={200} blendMode="multiply" animated zIndex={90} />
    </>
  );
}
