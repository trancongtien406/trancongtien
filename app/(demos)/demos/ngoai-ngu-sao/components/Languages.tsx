import { ClipReveal, SplitWords, TiltCard } from "@/features/showroom/effects";
import { LANG_CARDS } from "../data/content";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Languages() {
  return (
    <section id="ngon-ngu" className={`${styles.panel} ${styles.panelWhite}`} aria-labelledby="lang-title">
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Ba ngôn ngữ, một cách học</p>
        <h2 id="lang-title" className={styles.h2}><SplitWords as="span">Chọn ngôn ngữ, mình lo phần còn lại.</SplitWords></h2>
      </div>
      <div className={styles.langGrid}>
        {LANG_CARDS.map((c, i) => (
          <TiltCard key={c.id} className={`${styles.langCard} ${styles[`lc_${c.tone}`]} ${i === 0 ? styles.langBig : ""}`} max={5} glare={false} scale={1.01}>
            <article className={styles.langIn}>
              <div className={styles.langText}>
                <span className={`${styles.langGlyph} ${c.id === "ja" ? styles.ja : c.id === "ko" ? styles.ko : ""}`} aria-hidden="true">{c.glyph}</span>
                <h3 className={styles.h3}>{c.title}</h3>
                <p className={styles.langSub}>{c.sub}</p>
                <p className={styles.langLead}>{c.lead}</p>
                <ul className={styles.ticks}>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <a className={`${styles.btn} ${styles.btnNavy} ${styles.btnSm}`} href="#cong-cu">Xem lớp {c.title.toLowerCase()}<span aria-hidden="true"> →</span></a>
              </div>
              <ClipReveal variant="inset" from="bottom" className={styles.langPhotoWrap}>
                <div className={styles.langPhoto}><Photo file={c.img} alt={c.alt} sizes="(max-width: 900px) 90vw, 40vw" pos={c.pos} /></div>
              </ClipReveal>
            </article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
