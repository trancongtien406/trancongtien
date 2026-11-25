import type { Metadata } from "next";
import { buildConsultHref } from "@/features/showroom/consultation";
import styles from "./brand.module.css";
import { Finder } from "./components/Finder";
import { Header } from "./components/Header";
import { Motion } from "./components/Motion";
import { Classes, Closing, FaqSection, FinderIntro, FirstVisit, Footer, Guides, Hero, Membership, Ribbon, Story, TimetableIntro } from "./components/Sections";
import { Timetable } from "./components/Timetable";

export const metadata: Metadata = {
  title: "Nếp Thở · Studio pilates & yoga, chuyển động theo nhịp của bạn",
  description:
    "Studio pilates và yoga: thời khoá biểu lọc lớp theo loại, cấp độ, huấn luyện viên, xem chi tiết từng lớp và Class Finder gợi ý lớp tập. Không thay thế tư vấn y tế.",
  alternates: { canonical: "/demos/nep-tho" },
};

export default function Page() {
  const consult = buildConsultHref("nep-tho");
  return (
    <div className={styles.brand} data-nt-root>
      <a className={styles.skip} href="#lich-tap">Bỏ qua, tới thời khoá biểu</a>
      <Header />
      <main>
        <Hero />
        <Ribbon />
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
        <section className={styles.wrap} id="tim-lop" aria-label="Class Finder" style={{ scrollMarginTop: 90 }}>
          <div className={styles.finderWrap} style={{ paddingBlock: 0 }}>
            <div className={styles.finder}>
              <FinderIntro />
              <Finder consultHref={consult} />
            </div>
          </div>
        </section>
        <Story />
        <Guides />
        <Membership consultHref={consult} />
        <FirstVisit />
        <FaqSection />
        <Closing consultHref={consult} />
      </main>
      <Footer consultHref={consult} />
      <Motion />
    </div>
  );
}
