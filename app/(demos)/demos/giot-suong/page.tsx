import s from "./brand.module.css";
import { Journey } from "./components/Journey";
import { Shop } from "./components/Shop";
import { Header, RevealAll } from "./components/Interactive";
import { Contact, Faq, Footer, Ingredients, Plans, Problem, Results, Reviews, Shelf, Steps, Story } from "./components/Sections";

export default function GiotSuongPage() {
  return (
    <div className={s.brand}>
      <a className={s.skip} href="#mua">Bỏ qua tới sản phẩm</a>
      <Header />
      <main>
        <Journey />
        <Shop />
        <Problem />
        <Ingredients />
        <Steps />
        <Results />
        <Shelf />
        <Story />
        <Reviews />
        <Plans />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <RevealAll />
    </div>
  );
}
