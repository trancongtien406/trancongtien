import { CustomCursor, ScrollProgress } from "@/features/showroom/effects";
import { Barbell } from "./components/Barbell";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Motion } from "./components/Motion";
import { Picker } from "./components/Picker";
import { Schedule } from "./components/Schedule";
import { ShakeProvider } from "./components/Shake";
import { About, Coaches, Faq, FinalCta, Footer, Pricing, Programs, Rules, Session, Space } from "./components/Sections";
import styles from "./brand.module.css";

export default function SatGymPage() {
  return (
    <>
      <a className={styles.skip} href="#main">Bỏ qua, tới nội dung chính</a>
      <ScrollProgress variant="bar" className={styles.progress} label="Tiến độ cuộn trang" />
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <About />
        <Programs />
        <Schedule />
        <Coaches />
        <Session />
        <Barbell />
        <Picker />
        <Space />
        <Rules />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Motion />
      <ShakeProvider />
      <CustomCursor size={14} hoverScale={2.2} className={styles.cursor} labelClassName={styles.cursorLabel} />
    </>
  );
}
