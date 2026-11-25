import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Skybox } from "./components/Skybox";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Journey } from "./components/Journey";
import { Stay } from "./components/Stay";
import { Experiences } from "./components/Experiences";
import { Campfire } from "./components/Campfire";
import { Planner } from "./components/Planner";
import { Faq } from "./components/Faq";
import { Closing } from "./components/Closing";

export default function GlampingNuiPage() {
  const consultHref = buildConsultHref("glamping-nui");
  return (
    <Skybox>
      <a className={styles.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Journey />
        <Stay />
        <Experiences />
        <Campfire />
        <Planner consultHref={consultHref} />
        <Faq />
      </main>
      <Closing consultHref={consultHref} />
    </Skybox>
  );
}
