"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { FAQ } from "../data/content";

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <ul className={styles.faqList}>
      {FAQ.map((f, i) => {
        const on = open === i;
        return (
          <li key={f.q} className={styles.faqItem}>
            <h3 className={styles.faqQ}>
              <button type="button" aria-expanded={on} aria-controls={`tm-faq-${i}`} id={`tm-faq-btn-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                <span className={styles.faqNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span>{f.q}</span>
                <span className={styles.faqIcon} aria-hidden="true" data-on={on ? "1" : "0"} />
              </button>
            </h3>
            <div id={`tm-faq-${i}`} role="region" aria-labelledby={`tm-faq-btn-${i}`} hidden={!on} className={styles.faqA}><p>{f.a}</p></div>
          </li>
        );
      })}
    </ul>
  );
}
