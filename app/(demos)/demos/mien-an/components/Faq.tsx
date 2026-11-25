"use client";

import { useState } from "react";
import { FAQ } from "../data/content";
import styles from "../brand.module.css";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <div className={styles.faqHead} data-reveal>
          <p className={styles.eyebrow}>Good to know</p>
          <h2 id="faq-title" className={styles.h2}>
            Những điều bạn <em>có thể muốn biết.</em>
          </h2>
        </div>
        <div className={styles.faqList}>
          {FAQ.map((f, i) => (
            <div key={f.q} className={styles.faqItem}>
              <h3 style={{ margin: 0 }}>
                <button type="button" className={styles.faqQ} aria-expanded={open === i} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={styles.faqA} hidden={open !== i}>
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
