import styles from "../brand.module.css";
import { FAQ } from "../data/content";

export function FaqList() {
  return (
    <div className={styles.faqList}>
      {FAQ.map((f, i) => (
        <details key={f.q} className={styles.faqItem}>
          <summary><i>{String(i + 1).padStart(2, "0")}</i><span>{f.q}</span><b aria-hidden="true" /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
