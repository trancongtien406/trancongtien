import { FAQ } from "../data/content";
import styles from "../brand.module.css";

export function Faq() {
  return (
    <ul className={styles.faqList}>
      {FAQ.map((f, i) => (
        <li key={f.q}>
          <details className={styles.faqItem}>
            <summary><span className={styles.faqNo}>{String(i + 1).padStart(2, "0")}</span><span className={styles.faqQ}>{f.q}</span><span className={styles.faqIcon} aria-hidden="true" /></summary>
            <p>{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
