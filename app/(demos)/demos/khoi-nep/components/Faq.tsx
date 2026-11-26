"use client";

import { useState } from "react";
import { FAQ } from "../data/content";
import s from "../brand.module.css";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className={`${s.section} ${s.faq}`} aria-labelledby="faq-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.faqGrid}>
          <div>
            <p className={s.label}>10 / Câu hỏi thường gặp</p>
            <h2 id="faq-title" className={s.h2}>
              Trước khi bắt đầu.
            </h2>
          </div>
          <ul className={s.faqList}>
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className={s.faqItem}>
                  <h3>
                    <button
                      type="button"
                      className={s.faqBtn}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      id={`faq-q-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className={s.idx}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={s.faqQ}>{f.q}</span>
                      <span className={s.faqSign} aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen} className={s.faqA}>
                    <p>{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
