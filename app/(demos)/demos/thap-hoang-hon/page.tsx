import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Night } from "./components/Night";
import { Case } from "./components/Case";
import { Studio } from "./components/Studio";
import { Disciplines } from "./components/Disciplines";
import { Quote } from "./components/Quote";
import { Projects } from "./components/Projects";
import { Process } from "./components/Process";
import { Sun } from "./components/Sun";
import { Team } from "./components/Team";
import { Voices } from "./components/Voices";
import { Models } from "./components/Models";
import { Journal } from "./components/Journal";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Motion } from "./components/Motion";

export default function Page() {
  return (
    <div className={s.brand} data-th-root>
      <a className={s.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Night />
        <Case />
        <Studio />
        <Disciplines />
        <Quote />
        <Projects />
        <Process />
        <Sun />
        <Team />
        <Voices />
        <Models />
        <Journal />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <div className={s.ring} data-ring aria-hidden="true" />
      <Motion />
    </div>
  );
}
