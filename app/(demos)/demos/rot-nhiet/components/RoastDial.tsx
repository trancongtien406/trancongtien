"use client";

import { useId, useState } from "react";
import { Odometer } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { BEANS } from "../data/beans";

const STOPS = [
  { at: 0, name: "Rang sáng", rgb: [196, 140, 76] },
  { at: 25, name: "Rang vừa sáng", rgb: [160, 102, 52] },
  { at: 50, name: "Rang vừa", rgb: [118, 70, 36] },
  { at: 75, name: "Rang vừa đậm", rgb: [78, 44, 24] },
  { at: 100, name: "Rang đậm", rgb: [38, 22, 14] },
];
const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
function at(v: number) {
  const i = Math.min(3, Math.floor(v / 25));
  const t = (v - STOPS[i].at) / 25;
  return { rgb: mix(STOPS[i].rgb, STOPS[i + 1].rgb, t), name: STOPS[Math.round(v / 25)].name };
}

/** Chọn độ rang bằng thanh kéo: hạt đổi màu, nhiệt độ lăn số, độ chua giảm, độ đậm tăng, khớp với loại hạt đang bán. */
export function RoastDial() {
  const id = useId();
  const [v, setV] = useState(50);
  const c = at(v);
  const temp = Math.round(196 + (v / 100) * 34);
  const acid = Math.max(1, Math.round(5 - (v / 100) * 4));
  const body = Math.max(1, Math.round(1 + (v / 100) * 4));
  const bean = BEANS[v < 34 ? 2 : v < 67 ? 1 : 0];
  const fill = `rgb(${c.rgb.join(",")})`;
  const hi = `rgb(${mix(c.rgb, [255, 236, 200], 0.28).join(",")})`;
  const oil = Math.max(0, (v - 55) / 45);
  return (
    <section id="do-rang" className={`${styles.section} ${styles.roastSection}`} aria-labelledby="rn-roast-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead} data-rn-reveal>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>04 / ĐỘ RANG</span>
            <h2 id="rn-roast-h" className={`${styles.display} ${styles.h2}`}>Rang đến đâu?</h2>
          </div>
          <div>
            <p className={styles.lead}>Kéo thanh để xem hạt đổi màu, nhiệt độ rang, độ chua và độ đậm thay đổi thế nào, rồi xem loại hạt của quán gần mức đó nhất.</p>
          </div>
        </div>
        <div className={styles.roastGrid}>
          <figure className={styles.roastBean} data-testid="roast-bean" style={{ ["--bean" as string]: fill, ["--bean-hi" as string]: hi }}>
            <svg viewBox="0 0 240 240" role="img" aria-label={`Hạt cà phê ở mức ${c.name.toLowerCase()}`}>
              <g transform="rotate(-24 120 120)">
                <ellipse cx="120" cy="120" rx="78" ry="104" fill={fill} stroke="#1d1d1b" strokeWidth="6" />
                <ellipse cx="96" cy="84" rx="26" ry="44" fill={hi} opacity={0.55 - oil * 0.3} transform="rotate(14 96 84)" />
                <path d="M120 22C96 70 144 112 118 150S142 204 120 218" fill="none" stroke="#1d1d1b" strokeWidth="9" strokeLinecap="round" />
                <ellipse cx="146" cy="168" rx="9" ry="22" fill="#fff" opacity={oil * 0.55} transform="rotate(20 146 168)" />
              </g>
            </svg>
            <figcaption className={styles.roastName} aria-hidden="true">{c.name}</figcaption>
          </figure>
          <div className={styles.roastPanel}>
            <label htmlFor={`${id}-r`} className={styles.label}>Mức rang</label>
            <input id={`${id}-r`} className={styles.roastRange} type="range" min={0} max={100} step={1} value={v}
              onChange={(e) => setV(Number(e.target.value))} aria-valuetext={`${c.name}, khoảng ${temp} độ C`} data-testid="roast-range" />
            <div className={styles.roastScale} aria-hidden="true"><span>Sáng</span><span>Vừa</span><span>Đậm</span></div>
            <dl className={styles.roastStats}>
              <div className={styles.roastTemp}>
                <dt>Nhiệt độ xuống hạt, tham khảo</dt>
                <dd><Odometer value={temp} trigger="load" duration={0.5} /><span>°C</span></dd>
              </div>
              <div><dt>Độ chua</dt><dd><span className={styles.pips} role="img" aria-label={`${acid} trên 5`}>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= acid ? styles.pipOn : ""} />)}</span></dd></div>
              <div><dt>Độ đậm</dt><dd><span className={styles.pips} role="img" aria-label={`${body} trên 5`}>{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= body ? styles.pipOn : ""} />)}</span></dd></div>
            </dl>
            <div className={styles.roastMatch} data-testid="roast-match" aria-live="polite">
              <span className={styles.label}>Hạt của quán gần nhất</span>
              <strong>{bean.name}</strong>
              <span>{bean.roast} · {bean.notes} · {bean.brew}</span>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href="#hat-ca-phe">Xem {bean.name} ({bean.weight})</a>
            </div>
            <p className={styles.helper}>Con số nhiệt độ chỉ là mức tham khảo cho cà phê rang nói chung.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
