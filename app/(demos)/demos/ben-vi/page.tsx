import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey, Space, Policies, Faq, Closing, Footer } from "./components/Sections";
import { Signature } from "./components/Signature";
import { Composer } from "./components/Composer";
import { Reservation } from "./components/Reservation";
import { Motion } from "./components/Motion";
import { TurnTable } from "./components/TurnTable";
import { MenuBook } from "./components/MenuBook";
import { Sets } from "./components/Sets";

export default function BenViPage() {
  return (
    <div className={s.brand} id="top">
      <a className={`${s.skip} ${s.noPrint}`} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <TurnTable />
        <MenuBook />
        <Signature />
        <Journey />
        <Sets />
        <Composer />
        <Space />
        <Reservation />
        <Policies />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
