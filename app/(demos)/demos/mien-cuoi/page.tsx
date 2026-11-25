import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Header } from "./components/Header";
import { Motion } from "./components/Motion";
import { AppointmentSection, About, Closing, Environment, FaqSection, Footer, Hero, NavigatorSection, Pricing, Principles, Services, Team } from "./components/Sections";

export const metadata: Metadata = {
  title: "Miền Cười · Chăm sóc răng miệng rõ ràng, an tâm",
  description:
    "Care Navigator định hướng nhu cầu chăm sóc (không chẩn đoán) và công cụ tóm tắt lịch hẹn thăm khám. Giá chỉ để tham khảo.",
  alternates: { canonical: "/demos/mien-cuoi" },
};

export default function Page() {
  const consult = buildConsultHref("mien-cuoi");
  return (
    <div className={styles.brand} data-mc-root>
      <a className={styles.skip} href="#care-navigator">Bỏ qua, tới Care Navigator</a>
      <Header />
      <main>
        <Hero />
        <Principles />
        <NavigatorSection />
        <Services />
        <About />
        <Team />
        <Pricing />
        <AppointmentSection consultHref={consult} />
        <Environment />
        <FaqSection />
        <Closing consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <Motion />
    </div>
  );
}
