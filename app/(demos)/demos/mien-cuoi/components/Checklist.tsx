"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { PREPARE } from "../data/content";

/** Danh sách chuẩn bị trước khi đến: tick có nét vẽ, thanh tiến độ. Không lưu gì. */
export function Checklist() {
  const [done, setDone] = useState<boolean[]>(() => PREPARE.map(() => false));
  const n = done.filter(Boolean).length;
  return (
    <div className={styles.checkBox}>
      <div className={styles.checkHead}>
        <span className={styles.panelTitle}>Chuẩn bị trước khi đến</span>
        <span className={styles.panelStep} aria-live="polite" data-testid="prep-count">Đã chuẩn bị {n}/{PREPARE.length}</span>
      </div>
      <div className={styles.checkBar} aria-hidden="true"><span style={{ transform: `scaleX(${n / PREPARE.length})` }} /></div>
      <ul className={styles.checkList}>
        {PREPARE.map((txt, i) => (
          <li key={txt}>
            <label className={styles.checkItem} data-on={done[i] ? "1" : "0"}>
              <input type="checkbox" checked={done[i]} onChange={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))} />
              <svg viewBox="0 0 24 24" className={styles.checkSvg} aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="5" className={styles.checkRect} /><path d="M6 12.5l4 4 8-9" pathLength={1} className={styles.checkTick} /></svg>
              <span>{txt}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
