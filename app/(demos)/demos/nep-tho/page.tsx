import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Finder } from "./components/Finder";
import { Header } from "./components/Header";
import { Motion } from "./components/Motion";
import { ScrollProgress } from "@/features/showroom/effects";
import { Breath, Classes, Closing, FaqSection, FinderIntro, FirstVisit, Footer, Guides, Hero, Membership, Rules, Story, TimetableIntro } from "./components/Sections";
import { Timetable } from "./components/Timetable";

export const metadata: Metadata = {
  title: "Nếp Thở · Studio Pilates & Yoga lớp nhỏ tại Sơn Trà, Đà Nẵng",
  description:
    "Studio Pilates và Yoga lớp nhỏ tại quận Sơn Trà, Đà Nẵng: Reformer, Mat Pilates, Yoga, thời khoá biểu tuần, gói tập giá tham khảo và buổi tập thử. Không thay thế tư vấn y tế.",
  alternates: { canonical: "/demos/nep-tho" },
};

export default function Page() {
  const consult = buildConsultHref("nep-tho");
  return (
    <div className={styles.brand} data-nt-root>
      <a className={styles.skip} href="#lich-tap">Bỏ qua, tới thời khoá biểu</a>
      <Header />
      <main>
        <ScrollProgress variant="bar" className={styles.progress} label="Tiến độ cuộn trang" />
        <Hero consultHref={consult} />
        <section className={styles.wrap} id="lich-tap" aria-labelledby="nt-h-tt" style={{ scrollMarginTop: 90 }}>
          <div className={styles.ttSection}>
            <div id="nt-h-tt"><TimetableIntro /></div>
            <Timetable consultHref={consult} />
            <div className={styles.ttCta}>
              <p><b>Chưa biết nên chọn lớp nào?</b>Trả lời vài câu hỏi ngắn để khám phá lớp tập có thể phù hợp với bạn.</p>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#tim-lop">Tìm lớp cho mình</a>
            </div>
          </div>
        </section>
        <Classes />
        <section className={styles.wrap} id="tim-lop" aria-label="Tìm lớp phù hợp" style={{ scrollMarginTop: 90 }}>
          <div className={styles.finderWrap} style={{ paddingBlock: 0 }}>
            <div className={styles.finder}>
              <FinderIntro />
              <Finder consultHref={consult} />
            </div>
          </div>
        </section>
        <Story />
        <Breath />
        <Guides />
        <Membership consultHref={consult} />
        <FirstVisit consultHref={consult} />
        <Rules />
        <FaqSection />
        <Closing consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <Motion />
    </div>
  );
}
