import { CustomCursor } from "@/features/showroom/effects";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Depth } from "./components/Depth";
import { Motion } from "./components/Motion";
import { Chapters } from "./components/Chapters";
import { Courses } from "./components/Courses";
import { Journey } from "./components/Journey";
import { Finder } from "./components/Finder";
import { About, Faq, FinalCta, Footer, Safety } from "./components/Sections";
import { Crew, Pricing, Schedule, Seasons } from "./components/Operations";
import styles from "./brand.module.css";

export default function LanBienPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Depth />
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <About />
        <Chapters />
        <Courses />
        <Schedule />
        <Pricing />
        <Seasons />
        <Journey />
        <Finder />
        <Crew />
        <Safety />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <CustomCursor size={12} hoverScale={2.6} />
    </>
  );
}
