import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Mesh } from "./components/Mesh";
import { Motion } from "./components/Motion";
import { Reveals } from "./components/Reveals";
import { SerumDrop } from "./components/SerumDrop";
import { Treatments } from "./components/Treatments";
import { Builder } from "./components/Builder";
import { Actives, BeforeAfter, Booking, Faq, FinalCta, Flow, Footer, Manifesto } from "./components/Sections";
import styles from "./brand.module.css";

export default function DaXanhPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Mesh />
      <SerumDrop />
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <Manifesto />
        <Treatments />
        <Flow />
        <BeforeAfter />
        <Actives />
        <Builder />
        <Booking />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <Reveals />
    </>
  );
}
