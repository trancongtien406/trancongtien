import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Vocab } from "./components/Vocab";
import { Dialogue } from "./components/Dialogue";
import { Programs } from "./components/Programs";
import { Roadmap } from "./components/Roadmap";
import { ClassProvider } from "./components/ClassContext";
import { Schedule } from "./components/Schedule";
import { QuickTest } from "./components/LevelTest";
import { Pricing } from "./components/Pricing";
import { Register } from "./components/Register";
import { Teachers, Facilities, Process, Faq, Footer } from "./components/Sections";
import styles from "./brand.module.css";

export default function NgoaiNguSaoPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <About />
        <Programs />
        <Roadmap />
        <Teachers />
        <Vocab />
        <Dialogue />
        <ClassProvider>
          <Schedule />
          <Pricing />
          <Facilities />
          <Process />
          <QuickTest />
        </ClassProvider>
        <Faq />
        <Register />
      </main>
      <Footer />
    </>
  );
}
