import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Header } from "./components/Header";
import { Motion } from "./components/Motion";
import { About, AppointmentSection, Closing, Environment, FaqSection, Footer, Hero, NavigatorSection, PolicySection, Prepare, Pricing, ProcessSection, Services, Team } from "./components/Sections";

export const metadata: Metadata = {
  title: "Miền Cười · Phòng khám nha khoa tại Hải Châu, Đà Nẵng",
  description:
    "Phòng khám nha khoa tại Quận Hải Châu, Đà Nẵng: khám và lấy cao răng, trám, nhổ răng, niềng, tẩy trắng, tư vấn implant. Quy trình khám, chi phí tham khảo và đặt lịch.",
  alternates: { canonical: "/demos/mien-cuoi" },
};

export default function Page() {
  const consult = buildConsultHref("mien-cuoi");
  return (
    <div className={styles.brand} data-mc-root>
      <a className={styles.skip} href="#main">Bỏ qua tới nội dung</a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <ProcessSection />
        <Prepare />
        <Pricing />
        <NavigatorSection />
        <AppointmentSection consultHref={consult} />
        <About />
        <Team />
        <Environment />
        <PolicySection />
        <FaqSection />
        <Closing consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <Motion />
    </div>
  );
}
