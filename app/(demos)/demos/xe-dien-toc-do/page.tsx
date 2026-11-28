import s from "./brand.module.css";
import { BuildProvider } from "./Store";
import { Header, Floaters } from "./components/Header";
import { Intro } from "./components/Intro";
import { HeroWet, Lights, Built, Numbers, Engineering, Cabin, Charge, Voices } from "./components/Sections";
import { Garage } from "./components/Garage";
import { Config } from "./components/Config";
import { Own } from "./components/Own";
import { TestDrive } from "./components/TestDrive";
import { Finale, Footer, Drawer } from "./components/Finale";
import { Motion } from "./components/Motion";

export default function Page() {
  return (
    <BuildProvider>
      <div className={s.brand} data-vt-root>
        <a className={s.skip} href="#main">Bỏ qua, tới nội dung</a>
        <Header />
        <main id="main">
          <Intro />
          <HeroWet />
          <Lights />
          <Garage />
          <Built />
          <Numbers />
          <Engineering />
          <Config />
          <Cabin />
          <Charge />
          <Own />
          <Voices />
          <TestDrive />
          <Finale />
        </main>
        <Footer />
        <Floaters />
        <Drawer />
        <Motion />
      </div>
    </BuildProvider>
  );
}
