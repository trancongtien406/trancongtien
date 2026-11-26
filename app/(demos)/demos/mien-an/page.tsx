import type { Metadata } from "next";
import { About } from "./components/About";
import { Appointment } from "./components/Appointment";
import { Combos } from "./components/Combos";
import { Closing } from "./components/Closing";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Motion } from "./components/Motion";
import { Oils } from "./components/Oils";
import { Policy } from "./components/Policy";
import { Prepare } from "./components/Prepare";
import { MienAnProvider } from "./components/Provider";
import { RitualFinder } from "./components/RitualFinder";
import { RitualGrid } from "./components/RitualGrid";
import { Ribbon } from "./components/Ribbon";
import { Sanctuary } from "./components/Sanctuary";
import { Session } from "./components/Session";

export const metadata: Metadata = {
  title: "Miên An Wellness — Spa massage & chăm sóc da tại Hải Châu, Đà Nẵng",
  description:
    "Miên An Wellness: spa & massage trị liệu tại Quận Hải Châu, Đà Nẵng. Bảng giá liệu trình 45–120 phút, combo, giờ mở cửa 9:00–20:00, chính sách đặt và huỷ, chọn giờ trên lịch hai phòng.",
  robots: { index: false, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Miên An Wellness — Spa massage & chăm sóc da tại Hải Châu, Đà Nẵng",
  inLanguage: "vi",
  description: "Bảng giá liệu trình, combo, giờ mở cửa và chính sách đặt lịch tại Miên An Wellness, Quận Hải Châu, Đà Nẵng.",
  mainEntity: {
    "@type": "CreativeWork",
    name: "Miên An Wellness",
    genre: "Spa & massage trị liệu",
    inLanguage: "vi",
    description: "Spa & massage trị liệu với hai phòng riêng.",
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
        <About />
        <RitualGrid />
        <Combos />
        <RitualFinder />
        <Session />
        <Prepare />
        <Oils />
        <Sanctuary />
        <Policy />
        <Appointment />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Motion />
    </MienAnProvider>
  );
}
