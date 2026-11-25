import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import { Header } from "./components/Header";
import { Hero, Manifesto, Process, Closing, Footer } from "./components/Sections";
import { Spaces } from "./components/Spaces";
import { Services } from "./components/Services";
import { Estimator } from "./components/Estimator";
import { Materials } from "./components/Materials";
import { BoardBuilder } from "./components/BoardBuilder";
import { Faq } from "./components/Faq";
import { Motion } from "./components/Motion";
import s from "./brand.module.css";

export const metadata: Metadata = {
  title: "Khối Nếp — Studio thiết kế không gian & nội thất",
  description:
    "Studio thiết kế không gian và nội thất: công cụ dự toán ngân sách tham khảo và bảng vật liệu tương tác.",
  alternates: { canonical: "/demos/khoi-nep" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Khối Nếp — Studio thiết kế không gian & nội thất",
  description: "Studio thiết kế không gian và nội thất.",
  inLanguage: "vi",
  isPartOf: { "@type": "WebSite", name: "Khối Nếp" },
};

export default function KhoiNepPage() {
  const consultHref = buildConsultHref("khoi-nep");
  return (
    <>
      <Header />
      <main id="main" className={s.main}>
        <Hero consultHref={consultHref} />
        <Manifesto />
        <Spaces />
        <Services />
        <Estimator consultHref={consultHref} />
        <Materials />
        <BoardBuilder />
        <Process />
        <Faq />
        <Closing consultHref={consultHref} />
      </main>
      <Footer />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
