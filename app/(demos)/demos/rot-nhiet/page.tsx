import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Beans } from "./components/Beans";
import { BrewTimer } from "./components/BrewTimer";
import { CoffeeSelector } from "./components/CoffeeSelector";
import { Header } from "./components/Header";
import { HeatStrip } from "./components/HeatStrip";
import { Hero } from "./components/Hero";
import { InteractiveMenu } from "./components/InteractiveMenu";
import { Motion } from "./components/Motion";
import { RoastDial } from "./components/RoastDial";
import { Space } from "./components/Space";
import { Wholesale } from "./components/Wholesale";
import { FAQSection, Final, Footer, Manifesto, Process } from "./components/Sections";
import { TrayDrawer } from "./components/TrayDrawer";
import { TrayProvider } from "./components/TrayProvider";

export const metadata: Metadata = {
  title: "Rót Nhiệt Coffee · Quán cà phê rang xay ở Sơn Trà, Đà Nẵng",
  description:
    "Quán cà phê rang xay ở Quận Sơn Trà, Đà Nẵng: menu 18 món, hạt rang 250g mang về, bán buôn từ 5 kg, giờ mở cửa 06:30–21:30.",
  alternates: { canonical: "/demos/rot-nhiet" },
};

export default function Page() {
  const consult = buildConsultHref("rot-nhiet");
  return (
    <div className={styles.brand} data-rn-root>
      <a className={styles.skip} href="#menu">Bỏ qua, tới menu</a>
      <TrayProvider>
        <Header consultHref={consult} />
        <main>
          <Hero />
          <HeatStrip />
          <InteractiveMenu />
          <CoffeeSelector />
          <Beans />
          <RoastDial />
          <Process />
          <BrewTimer />
          <Space />
          <Manifesto />
          <Wholesale consultHref={consult} />
          <FAQSection />
          <Final consultHref={consult} />
        </main>
        <Footer creditsHref="/demos/rot-nhiet/credits" />
        <TrayDrawer />
      </TrayProvider>
      <Motion />
    </div>
  );
}
