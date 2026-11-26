"use client";

import { useState } from "react";
import { AMENITY_LEVELS } from "../data/content";
import styles from "../brand.module.css";

const FLOORS = 36;
const TOP = 30, BOT = 520, FH = (BOT - TOP) / FLOORS;

/**
 * Mặt cắt tháp: chọn một nhóm tầng thì dải đồng trượt tới đúng nhóm tầng trên mặt cắt 36 tầng
 * (translate + scaleY, không đổi layout), thẻ bên cạnh đổi thành mô tả tiện ích của nhóm đó.
 */
export function Tower() {
  const [id, setId] = useState<string>(AMENITY_LEVELS[3].id);
  const cur = AMENITY_LEVELS.find((l) => l.id === id)!;
  const y = TOP + (FLOORS - cur.to) * FH;
  const h = (cur.to - cur.from + 1) * FH;
  const move = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % AMENITY_LEVELS.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i + AMENITY_LEVELS.length - 1) % AMENITY_LEVELS.length;
    else return;
    e.preventDefault();
    setId(AMENITY_LEVELS[n].id);
    (e.currentTarget.parentElement?.querySelectorAll("button")[n] as HTMLElement | undefined)?.focus();
  };
  return (
    <section id="tien-ich" className={styles.tw} aria-labelledby="cv-tw-h">
      <div className={`${styles.wrap} ${styles.twGrid}`}>
        <div className={styles.twHead} data-cv="reveal">
          <p className={styles.sheet}><span>02b</span><i aria-hidden="true" />Bản vẽ A-02b · Tiện ích</p>
          <h2 id="cv-tw-h" className={styles.h2}>Mỗi nhóm tầng một công năng.</h2>
          <p className={styles.lede}>Chọn một nhóm tầng để xem vị trí của nó trên mặt cắt toà tháp và những gì nằm ở đó.</p>
        </div>
        <figure className={styles.twFig}>
          <svg viewBox="0 0 320 560" role="img" aria-label={`Mặt cắt toà tháp 36 tầng, đang chọn ${cur.label.toLowerCase()}: ${cur.name}`} className={styles.twSvg}>
            <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5">
              {Array.from({ length: FLOORS + 1 }, (_, i) => <path key={i} d={`M92 ${(TOP + i * FH).toFixed(1)}H${i % 6 === 0 ? 236 : 228}`} opacity={i % 6 === 0 ? 1 : 0.55} />)}
              <path d="M92 30V520M228 30V520" strokeWidth="1.8" opacity="0.9" />
              <path d="M30 520H300" strokeWidth="1.8" />
            </g>
            <rect className={styles.twBand} x="92" y="0" width="136" height="100" style={{ transform: `translateY(${y}px) scaleY(${h / 100})` }} />
            <g className={styles.twTicks}>
              {[36, 30, 24, 18, 12, 6, 1].map((f) => (
                <text key={f} x="250" y={(TOP + (FLOORS - f) * FH + FH * 0.7).toFixed(1)}>T{String(f).padStart(2, "0")}</text>
              ))}
            </g>
          </svg>
        </figure>
        <div className={styles.twList}>
          <div role="radiogroup" aria-label="Nhóm tầng" className={styles.twTabs}>
            {AMENITY_LEVELS.map((l, i) => (
              <button key={l.id} type="button" role="radio" aria-checked={l.id === id} tabIndex={l.id === id ? 0 : -1} className={styles.twTab} onClick={() => setId(l.id)} onKeyDown={(e) => move(e, i)} data-cursor="Chọn">
                <small>{l.label}</small><b>{l.name}</b>
              </button>
            ))}
          </div>
          <p className={styles.twText} aria-live="polite"><b>{cur.label} · {cur.name}.</b> {cur.text}</p>
        </div>
      </div>
    </section>
  );
}
