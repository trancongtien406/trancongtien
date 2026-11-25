import type { Metadata } from "next";
import { Appointment } from "./components/Appointment";
import { Closing } from "./components/Closing";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Motion } from "./components/Motion";
import { Philosophy } from "./components/Philosophy";
import { MienAnProvider } from "./components/Provider";
import { RitualFinder } from "./components/RitualFinder";
import { RitualGrid } from "./components/RitualGrid";
import { Ribbon } from "./components/Ribbon";
import { Sanctuary } from "./components/Sanctuary";
import { Story } from "./components/Story";

export const metadata: Metadata = {
  title: "Miên An Wellness — Spa & wellness",
  description:
    "Miên An Wellness: những nghi thức chăm sóc nhẹ nhàng, công cụ gợi ý liệu trình theo nhu cầu và tóm tắt lịch hẹn ngay trên trang.",
  robots: { index: false, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Miên An Wellness — Spa & wellness",
  inLanguage: "vi",
  description: "Nghi thức chăm sóc, gợi ý liệu trình và tóm tắt lịch hẹn tại Miên An Wellness.",
  mainEntity: {
    "@type": "CreativeWork",
    name: "Miên An Wellness",
    genre: "Spa & wellness",
    inLanguage: "vi",
    description: "Spa & wellness với các nghi thức chăm sóc nhẹ nhàng.",
  },
};

export default function MienAnPage() {
  return (
    <MienAnProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Ribbon />
      <Header />
      <main id="main">
        <Hero />
        <Philosophy />
        <RitualGrid />
        <RitualFinder />
        <Story />
        <Sanctuary />
        <Journey />
        <Appointment />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </MienAnProvider>
  );
}
