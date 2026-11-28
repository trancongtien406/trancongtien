import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Project, Marquee, Gestures, Finishes, Amenities, Journey, Team, Location, Faq } from "./components/Sections";
import { Plans } from "./components/Plans";
import { Book, Footer } from "./components/Book";
import { Motion } from "./components/Motion";

export default function Page() {
  return (
    <div className={s.brand} data-np-root>
      <a className={s.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <div data-hero-end aria-hidden="true" />
        <Project />
        <Marquee />
        <Gestures />
        <Plans />
        <Finishes />
        <Amenities />
        <Journey />
        <Team />
        <Location />
        <Faq />
        <Book />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
