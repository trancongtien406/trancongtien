import s from "./brand.module.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Numbers } from "./components/Numbers";
import { Smarter } from "./components/Smarter";
import { Performance } from "./components/Performance";
import { Ledger } from "./components/Ledger";
import { Trusted } from "./components/Trusted";
import { Products } from "./components/Products";
import { Security } from "./components/Security";
import { Steps } from "./components/Steps";
import { Pricing } from "./components/Pricing";
import { Partners } from "./components/Partners";
import { Insights } from "./components/Insights";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";
import { Motion } from "./components/Motion";

export default function Page() {
  return (
    <div className={s.brand} data-vn-root>
      <a className={s.skip} href="#main">Bỏ qua, tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Numbers />
        <Smarter />
        <Performance />
        <Ledger />
        <Trusted />
        <Products />
        <Security />
        <Steps />
        <Pricing />
        <Partners />
        <Insights />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
