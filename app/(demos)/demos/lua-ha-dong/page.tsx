import type { Metadata } from "next";
import styles from "./brand.module.css";
import { DropCursor } from "./components/DropCursor";
import { Collection } from "./components/Collection";
import { Footer } from "./components/Footer";
import { Hero, Loader } from "./components/Top";
import { Ink } from "./components/Ink";
import { Faq, Contact, Shop } from "./components/Interactive";
import { Journey } from "./components/Journey";
import { Craft, Materials, Plans, Reviews, Services, Story } from "./components/More";
import { Printer } from "./components/Printer";
import { Process } from "./components/Process";
import { Signature } from "./components/Signature";

export const metadata: Metadata = { alternates: { canonical: "/demos/lua-ha-dong" } };

export default function Page() {
  return (
    <div className={styles.brand}>
      <a className={styles.skip} href="#bo-suu-tap">Bỏ qua, tới bộ sưu tập</a>
      <Loader />
      <DropCursor />
      <main>
        <Hero />
        <Printer />
        <Ink />
        <Collection />
        <Process />
        <Signature />
        <Journey />
        <Story />
        <Shop />
        <Services />
        <Materials />
        <Craft />
        <Reviews />
        <Plans />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
