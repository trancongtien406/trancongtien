import s from "./brand.module.css";
import { ChapterBar, Preloader } from "./components/Hud";
import { Contact } from "./components/Contact";
import { Faq, Notes, Numbers, Pricing, Quotes, RevealAll, StartForm, Tools } from "./components/Extras";
import { ParticleStage } from "./components/ParticleStage";
import { About, Header, Hero, Process, Services } from "./components/Sections";
import { Work } from "./components/Work";

export default function ThuongHieuChuyenDongPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#du-an">Bỏ qua tới dự án</a>
      <ParticleStage className={s.particles} />
      <Header />
      <main className={s.main}>
        <Hero />
        <About />
        <Services />
        <Work />
        <Process />
        <Numbers />
        <Tools />
        <Pricing />
        <Quotes />
        <Notes />
        <Faq />
        <StartForm />
        <Contact />
      </main>
      <ChapterBar />
      <Preloader />
      <RevealAll />
    </div>
  );
}
