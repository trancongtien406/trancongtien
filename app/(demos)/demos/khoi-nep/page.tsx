import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import { Header } from "./components/Header";
import { Hero, Manifesto, Process, Closing, Footer } from "./components/Sections";
import { Spaces } from "./components/Spaces";
import { Quote, Services } from "./components/Services";
import { FloorplanSlider } from "./components/FloorplanSlider";
import { Estimator } from "./components/Estimator";
import { Materials } from "./components/Materials";
import { BoardBuilder } from "./components/BoardBuilder";
import { Faq } from "./components/Faq";
import { Motion } from "./components/Motion";
import s from "./brand.module.css";

export const metadata: Metadata = {
  title: "Khối Nếp — Thiết kế & thi công nội thất tại Đà Nẵng",
  description:
    "Công ty thiết kế và thi công nội thất tại Đà Nẵng: căn hộ, nhà phố, văn phòng, cửa hàng. Quy trình 5 bước, báo giá theo khảo sát, ước tính chi phí và bảng vật liệu.",
  alternates: { canonical: "/demos/khoi-nep" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Khối Nếp — Thiết kế & thi công nội thất tại Đà Nẵng",
  description: "Thiết kế và thi công nội thất tại Đà Nẵng.",
  inLanguage: "vi",
  isPartOf: { "@type": "WebSite", name: "Khối Nếp" },
};

export default function KhoiNepPage() {
  const consultHref = buildConsultHref("khoi-nep");
  return (
    <>
      <Header consultHref={consultHref} />
      <main id="main" className={s.main}>
        <Hero consultHref={consultHref} />
        <Manifesto />
        <Services />
        <Spaces />
        <Process />
        <FloorplanSlider />
        <Quote />
        <Estimator consultHref={consultHref} />
        <Materials />
        <BoardBuilder />
        <Faq />
        <Closing consultHref={consultHref} />
      </main>
      <Footer />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
