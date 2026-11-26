"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, VOCAB, type Lang } from "../data/content";
import { VocabIcon } from "./Icons";
import styles from "../brand.module.css";

const cls = (l: Lang) => (l === "ja" ? styles.ja : l === "ko" ? styles.ko : "");

export function Vocab() {
  const [lang, setLang] = useState<Lang>("en");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const root = useRef<HTMLDivElement>(null);
  const cards = VOCAB[lang];
  const count = cards.filter((c) => flipped[`${lang}-${c.word}`]).length;
  const allOn = count === cards.length;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setFlipped({}); };
    el.addEventListener("keydown", key);
    return () => el.removeEventListener("keydown", key);
  }, []);

  const toggle = (k: string) => setFlipped((f) => ({ ...f, [k]: !f[k] }));
  const setAll = (on: boolean) => setFlipped((f) => { const n = { ...f }; cards.forEach((c) => { n[`${lang}-${c.word}`] = on; }); return n; });

  return (
    <section id="the-tu" className={`${styles.panel} ${styles.panelMist}`} aria-labelledby="vocab-title" ref={root as never}>
      <div className={styles.panelHead}>
        <p className={styles.kicker}>Phương pháp: ôn từ vựng</p>
        <h2 id="vocab-title" className={styles.h2}>Thẻ từ vựng lật, cách lớp ôn từ mỗi buổi.</h2>
        <p className={styles.lede}>Bấm hoặc nhấn Enter, Space để lật. Nhấn Esc để úp hết thẻ.</p>
      </div>
      <div className={styles.vocabBar}>
        <div className={styles.segment} role="group" aria-label="Chọn ngôn ngữ thẻ từ vựng">
          {LANGS.map((l) => (
            <button key={l.id} type="button" className={styles.segBtn} aria-pressed={lang === l.id} onClick={() => setLang(l.id)}>
              {l.name}
            </button>
          ))}
        </div>
        <div className={styles.vocabTools}>
          <span className={styles.vocabCount} role="status">Đã lật {count}/{cards.length} thẻ</span>
          <button type="button" className={`${styles.btn} ${styles.btnGhostN} ${styles.btnSm}`} onClick={() => setAll(!allOn)}>{allOn ? "Úp lại tất cả" : "Lật tất cả"}</button>
        </div>
      </div>
      <ul className={styles.cardGrid} data-fx="FlipCards" data-fx-ready="1">
        {cards.map((c, i) => {
          const k = `${lang}-${c.word}`;
          const on = !!flipped[k];
          return (
            <li key={k} className={styles.flipItem} style={{ ["--i" as string]: i }}>
              <button type="button" className={styles.flip} aria-pressed={on} data-on={on ? "1" : "0"} onClick={() => toggle(k)} lang={lang === "en" ? "en" : lang}>
                <span className={styles.flipInner}>
                  <span className={`${styles.face} ${styles.front}`} aria-hidden={on}>
                    <span className={styles.faceIcon}><VocabIcon name={c.icon} size={92} /></span>
                    <span className={`${styles.word} ${cls(lang)}`}>{c.word}</span>
                    <span className={styles.say}>{c.say}</span>
                    <span className={styles.hint}>Bấm để xem nghĩa</span>
                  </span>
                  <span className={`${styles.face} ${styles.back}`} aria-hidden={!on}>
                    <span className={styles.meaning}>{c.mean}</span>
                    <span className={`${styles.ex} ${cls(lang)}`}>{c.ex}</span>
                    <span className={styles.exVi}>{c.exVi}</span>
                    <span className={styles.hint}>Bấm để lật lại</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
