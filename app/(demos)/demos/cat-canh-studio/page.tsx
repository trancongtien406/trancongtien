import s from "./brand.module.css";
import { Apps } from "./components/Apps";
import { Contact } from "./components/Contact";
import { Gallery } from "./components/Gallery";
import { Cases, Features, Posts, Reviews, Stats, Team } from "./components/More";
import { Portal } from "./components/Portal";
import { Pricing } from "./components/Pricing";
import { Rocket } from "./components/Rocket";
import { Badge, Faq, Nav, Ready } from "./components/Sections";

export default function CatCanhStudioPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#ung-dung">Bỏ qua tới nội dung</a>
      <Nav />
      <Badge />
      <main>
        <Portal />
        <Apps />
        <Gallery />
        <Rocket />
        <Faq />
        <Stats />
        <Features />
        <Cases />
        <Pricing />
        <Reviews />
        <Team />
        <Posts />
        <Contact />
        <Ready />
      </main>
    </div>
  );
}
