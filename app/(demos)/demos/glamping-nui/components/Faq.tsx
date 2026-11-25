import { SplitWords } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { FAQ } from "../data/content";

export function Faq() {
  return (
    <section id="giai-dap" className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header>
          <p className={styles.eyebrow}>Trước khi lên đường</p>
          <h2 id="faq-title" className={styles.h2}>
            <SplitWords as="span">Những điều bạn nên biết.</SplitWords>
          </h2>
        </header>
        <div className={styles.faqList}>
          {FAQ.map((f, i) => (
            <details key={f.q} className={styles.qa} name="gl-faq" open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
