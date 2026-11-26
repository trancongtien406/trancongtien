"use client";

import { useEffect, useRef, useState } from "react";
import { TIME_STOPS } from "../data/content";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const MIN = 5 * 60;
const MAX = 22 * 60;

type Key = [number, number, number, number, number];
/** [phút, r, g, b, alpha] của lớp phủ màu trời */
const TINT: Key[] = [
  [300, 24, 36, 90, 0.5], [350, 220, 140, 110, 0.2], [480, 255, 250, 235, 0], [960, 255, 250, 235, 0],
  [1090, 210, 120, 60, 0.16], [1170, 30, 36, 86, 0.36], [1320, 6, 12, 38, 0.66],
];
function tintAt(m: number) {
  let a = TINT[0], b = TINT[TINT.length - 1];
  for (let i = 0; i < TINT.length - 1; i++) if (m >= TINT[i][0] && m <= TINT[i + 1][0]) { a = TINT[i]; b = TINT[i + 1]; break; }
  const t = b[0] === a[0] ? 0 : (m - a[0]) / (b[0] - a[0]);
  const l = (i: 1 | 2 | 3 | 4) => a[i] + (b[i] - a[i]) * t;
  return `rgba(${Math.round(l(1))},${Math.round(l(2))},${Math.round(l(3))},${l(4).toFixed(3)})`;
}
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const stopOf = (m: number) => { let k = 0; TIME_STOPS.forEach((s, i) => { if (m >= s.from) k = i; }); return k; };

/** Cảnh nhìn đổi theo giờ trong ngày: kéo thanh giờ, ảnh đổi theo mốc, màu trời đổi liên tục. */
export function TimeOfDay() {
  const [m, setM] = useState(17 * 60 + 40);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const cur = stopOf(m);
  const s = TIME_STOPS[cur];

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const from = MIN;
    const DUR = reduce ? 4000 : 11000;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DUR);
      setM(Math.round((from + (MAX - from) * p) / 10) * 10);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [playing]);

  return (
    <section className={styles.tod} id="mot-ngay" aria-labelledby="day-h" data-hm="tod">
      <div className={styles.todMedia}>
        {TIME_STOPS.map((t, i) => (
          <div key={t.title} className={styles.todImg} data-on={i === cur} aria-hidden="true" style={t.night ? { filter: "brightness(0.55) saturate(0.7)" } : undefined}>
            <Photo name={t.image} alt="" sizes="100vw" pos={t.pos} />
          </div>
        ))}
        <div className={styles.todTint} style={{ background: tintAt(m) }} aria-hidden="true" />
        <div className={styles.sceneShade} aria-hidden="true" />
      </div>
      <div className={styles.todHead}>
        <p className={styles.eyebrowLight}>Một ngày ở Hiên</p>
        <h2 id="day-h" className={styles.h2Light}>Cảnh nhìn ra biển đổi theo giờ.</h2>
        <p className={styles.leadLight}>Kéo thanh giờ để xem ban mai, buổi chiều bên hồ, hoàng hôn và đêm ở Hiên Mặn, kèm việc nên làm vào giờ đó.</p>
      </div>
      <div className={styles.todBody}>
        <p className={styles.todClock} aria-hidden="true">{hhmm(m)}</p>
        <div className={styles.todInfo} role="status" aria-live="polite" aria-atomic="true">
          <h3 className={styles.sceneTitle}>{s.title}</h3>
          <p className={styles.sceneText}>{s.text}</p>
          <p className={styles.todTodo}><b>Nên làm:</b> {s.todo}</p>
        </div>
        <div className={styles.todCtl}>
          <button type="button" className={styles.todPlay} onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
            {playing ? "Dừng" : "Chạy một ngày"}
          </button>
          <label className={styles.todRange}>
            <span className={styles.srOnly}>Giờ trong ngày</span>
            <input type="range" min={MIN} max={MAX} step={10} value={m} onChange={(e) => { setPlaying(false); setM(Number(e.target.value)); }} aria-valuetext={`${hhmm(m)}, ${s.title}`} />
          </label>
          <div className={styles.todMarks}>
            {TIME_STOPS.map((t, i) => (
              <button key={t.title} type="button" className={styles.todMark} aria-pressed={i === cur} onClick={() => { setPlaying(false); setM(i === 0 ? 5 * 60 + 50 : i === 1 ? 14 * 60 + 30 : i === 2 ? 18 * 60 + 10 : 21 * 60); }}>
                <b>{t.time}</b> {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
