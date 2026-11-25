import { buildConsultHref } from "@/features/showroom/consultation";
import { siteConfig } from "@/lib/site";
import { COPY } from "../data/copy";
import type { Lang } from "../data/tours";
import styles from "../brand.module.css";
import { Explorer } from "./Explorer";
import { Header } from "./Header";
import { HtmlLang } from "./HtmlLang";
import { Hero } from "./Hero";
import { Motion } from "./Motion";
import { Closing, Faq, Footer, Journal, Rhythm, Why } from "./Sections";
import { Tours } from "./Tours";
import { TripFinder } from "./TripFinder";
import { TripProvider } from "./TripProvider";

/** Trang chủ Rong Dặm. Hai bản VI/EN dùng chung dữ liệu và trạng thái (lưu ở localStorage), chỉ khác lớp chữ. */
export function Landing({ lang }: { lang: Lang }) {
  const consultHref = buildConsultHref("rong-dam");
  const t = COPY[lang];
  return (
    <TripProvider lang={lang}>
      {lang === "en" && <HtmlLang lang="en" />}
      <a href="#main" className={styles.skip}>{t.skip}</a>
      <Header lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Rhythm lang={lang} />
        <TripFinder />
        <Tours />
        <Explorer consultHref={consultHref} />
        <Journal lang={lang} />
        <Why lang={lang} />
        <Faq lang={lang} />
        <Closing lang={lang} consultHref={consultHref} />
      </main>
      <Footer lang={lang} consultHref={consultHref} signedName={siteConfig.fullName} />
      <Motion />
    </TripProvider>
  );
}
