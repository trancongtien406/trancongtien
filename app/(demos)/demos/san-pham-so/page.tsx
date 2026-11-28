import styles from "./brand.module.css";
import { Blog, Closing, Contact, Creative, FaqSection, FinCase, Hero, Industries, MatchCase, Plans, Problems, Process, Projects, Services, Stats, Team, Voices } from "./components/Sections";
import { RevealInit, SiteNav } from "./components/Interactive";

export default function Page() {
  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#du-an">Bỏ qua, tới nội dung chính</a>
      <SiteNav />
      <main>
        <Hero />
        <Projects />
        <FinCase />
        <MatchCase />
        <Problems />
        <Services />
        <Creative />
        <Process />
        <Stats />
        <Industries />
        <Team />
        <Voices />
        <Plans />
        <Blog />
        <FaqSection />
        <Contact />
      </main>
      <Closing />
      <RevealInit />
    </div>
  );
}
