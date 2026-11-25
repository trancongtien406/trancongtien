import { ScrollProgress } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "./brand.module.css";
import { Hero } from "./components/Hero";
import { Scrub } from "./components/Scrub";
import { Motion } from "./components/Motion";
import { BuilderSection, Closing, Coating, Faq, Footer, Gallery, Header, Packages, Philosophy, Process } from "./components/Sections";

export default function DetailXePage() {
  const consultHref = buildConsultHref("detail-xe");
  return (
    <div className={s.brand} data-dx-root="">
      <a className={s.skip} href="#main">Bỏ qua tới nội dung</a>
      <ScrollProgress variant="bar" className={s.progress} label="Tiến độ cuộn trang" />
      <Header consultHref={consultHref} />
      <main id="main">
        <Hero consultHref={consultHref} />
        <Philosophy />
        <Scrub />
        <Packages />
        <Process />
        <Coating />
        <BuilderSection consultHref={consultHref} />
        <Gallery />
        <Faq />
        <Closing consultHref={consultHref} />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
