import styles from "./brand.module.css";
import { Atom, About, Insights, Metrics, Process, Quotes, Team } from "./components/Extra";
import { Cases } from "./components/Cases";
import { Contact } from "./components/Contact";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Motion } from "./components/Motion";
import { Nav } from "./components/Nav";
import { Packages } from "./components/Packages";
import { ParticleField } from "./components/Particles";
import { Services } from "./components/Services";
import { Trusted } from "./components/Trusted";

export default function Page() {
  return (
    <div className={styles.vc}>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung</a>
      <ParticleField />
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Cases />
        <Trusted />
        <About />
        <Process />
        <Atom />
        <Metrics />
        <Team />
        <Quotes />
        <Packages />
        <Faq />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
