import type { Metadata } from "next";
import styles from "./brand.module.css";
import { ComboScroll } from "./components/ComboScroll";
import { OrderApp } from "./components/OrderApp";
import { BigFooter, Faq, Plans, Process, Reviews, Shops, Stats, Story, Team } from "./components/Sections";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Lineup } from "./components/Lineup";
import { StackScroll } from "./components/StackScroll";

export const metadata: Metadata = { alternates: { canonical: "/demos/banh-mi-tang" } };

export default function Page() {
  return (
    <div className={styles.brand}>
      <a className={styles.skip} href="#thuc-don">Bỏ qua, tới thực đơn</a>
      <Header />
      <main>
        <Hero />
        <StackScroll />
        <ComboScroll />
        <Lineup />
        <Story />
        <Stats />
        <Process />
        <OrderApp />
        <Plans />
        <Team />
        <Shops />
        <Reviews />
        <Faq />
      </main>
      <BigFooter />
    </div>
  );
}
