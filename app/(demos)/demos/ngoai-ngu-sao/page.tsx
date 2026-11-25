import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Languages } from "./components/Languages";
import { Vocab } from "./components/Vocab";
import { Manifesto } from "./components/Manifesto";
import { Dialogue } from "./components/Dialogue";
import { Path } from "./components/Path";
import { Tools } from "./components/Tools";
import { Teachers, Pricing, Faq, FinalCta, Footer } from "./components/Sections";
import styles from "./brand.module.css";

export default function NgoaiNguSaoPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <Marquee />
        <Languages />
        <Vocab />
        <Manifesto />
        <Dialogue />
        <Path />
        <Tools />
        <Teachers />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
