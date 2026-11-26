import { CustomCursor, GrainOverlay } from "@/features/showroom/effects";
import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Paths, Story, Custom, Care, Space, Faq, Closing, Footer } from "./components/Sections";
import { Fire } from "./components/Fire";
import { Shelf } from "./components/Shelf";
import { Workshop } from "./components/Workshop";
import { Designer } from "./components/Designer";
import { Motion } from "./components/Motion";

export default function GomLoPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <GrainOverlay opacity={0.16} size={220} baseFrequency={0.8} blendMode="multiply" fixed zIndex={2} />
      <CustomCursor size={12} hoverScale={4.6} />
      <Header />
      <main id="main">
        <Hero />
        <Paths />
        <Shelf />
        <Workshop />
        <Fire />
        <Custom />
        <Designer />
        <Story />
        <Care />
        <Space />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
