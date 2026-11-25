import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Beans } from "./components/Beans";
import { CoffeeSelector } from "./components/CoffeeSelector";
import { Header } from "./components/Header";
import { HeatStrip } from "./components/HeatStrip";
import { Hero } from "./components/Hero";
import { InteractiveMenu } from "./components/InteractiveMenu";
import { Motion } from "./components/Motion";
import { FAQSection, Final, Footer, Manifesto, Process } from "./components/Sections";
import { TrayDrawer } from "./components/TrayDrawer";
import { TrayProvider } from "./components/TrayProvider";

export const metadata: Metadata = {
  title: "Rót Nhiệt Coffee · Cà phê rang theo gu của bạn",
  description:
    "Cà phê rang: menu 18 món có bộ lọc và khay tạm tính, Coffee Selector 3 câu hỏi gợi ý hạt và cách pha hợp gu.",
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
          <Process />
          <Manifesto />
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
