import type { Metadata } from "next";
import styles from "./brand.module.css";
import { Contact, Faq, SizeGuide } from "./components/Forms";
import { Band, Lookbook, Manifesto, Materials, Process, Reviews, SiteFooter, Team, Tiers } from "./components/Info";
import { Rack } from "./components/Rack";
import { Shop } from "./components/Shop";

export const metadata: Metadata = { alternates: { canonical: "/demos/ao-moc-xuong-pho" } };

export default function Page() {
  return (
    <div className={styles.brand} id="top">
      <a className={styles.skip} href="#cua-hang">Bỏ qua giá treo, tới cửa hàng</a>
      <Rack />
      <main>
        <Manifesto />
        <Shop />
        <Lookbook />
        <Materials />
        <Process />
        <Band />
        <Team />
        <Reviews />
        <Tiers />
        <SizeGuide />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
