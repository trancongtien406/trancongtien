"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WALK } from "../data/content";
import styles from "../brand.module.css";

/** Đường cong đi qua các điểm dừng: mỗi đoạn là một Q với điểm điều khiển lệch nhẹ. */
function buildPath() {
  let d = `M${WALK[0].x} ${WALK[0].y}`;
  for (let i = 1; i < WALK.length; i++) {
    const a = WALK[i - 1], b = WALK[i];
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const nx = -(b.y - a.y), ny = b.x - a.x;
    const k = (i % 2 ? 1 : -1) * 0.16;
    d += ` Q${(mx + nx * k).toFixed(1)} ${(my + ny * k).toFixed(1)} ${b.x} ${b.y}`;
  }
  return d;
}

/** Đường đi trong villa: bấm từng điểm (hoặc Tiếp/Trước) để người đi nhỏ di chuyển dọc lối và nét đường được vẽ dần. */
export function VillaWalk() {
  const [i, setI] = useState(0);
  const path = useMemo(buildPath, []);
  const pathRef = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const fr = useRef<number[]>(WALK.map((_, k) => k / (WALK.length - 1)));
  const pos = useRef(0);
  const raf = useRef(0);
  const [len, setLen] = useState(0);

  // Đo vị trí các điểm dừng dọc theo đường (phần trăm độ dài gần nhất).
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    const f = WALK.map((w) => {
      let best = 0, bd = Infinity;
      for (let s = 0; s <= 600; s++) {
        const pt = p.getPointAtLength((s / 600) * L);
        const dd = (pt.x - w.x) ** 2 + (pt.y - w.y) ** 2;
        if (dd < bd) { bd = dd; best = s / 600; }
      }
      return best;
    });
    f[0] = 0; f[f.length - 1] = 1;
    fr.current = f;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLen(L);
    place(f[0] * L);
    function place(at: number) {
      const pt = p!.getPointAtLength(at);
      dot.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (trail.current) trail.current.style.strokeDashoffset = String(L - at);
    }
    (p as unknown as { __place: (n: number) => void }).__place = place;
  }, []);

  useEffect(() => {
    const p = pathRef.current as (SVGPathElement & { __place?: (n: number) => void }) | null;
    if (!p || !p.__place || !len) return;
    const target = fr.current[i] * len;
    const from = pos.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    const D = reduce ? 0 : 900 + Math.abs(target - from) * 1.2;
    cancelAnimationFrame(raf.current);
    const tick = (now: number) => {
      const t = D === 0 ? 1 : Math.min(1, (now - t0) / D);
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      pos.current = from + (target - from) * e;
      p.__place!(pos.current);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [i, len]);

  const s = WALK[i];
  const total = WALK[WALK.length - 1].min;
  return (
    <section className={styles.walk} id="so-do" aria-labelledby="walk-h">
      <div className={styles.walkHead} data-hm="rise">
        <p className={styles.eyebrow}>Đi trong villa</p>
        <h2 id="walk-h" className={styles.h2}>Từ cổng đến bãi biển mất khoảng chín phút đi bộ.</h2>
        <p className={styles.lead}>Bấm từng điểm trên sơ đồ để biết ở đó có gì: chỗ đậu xe, sảnh nhận phòng, hồ bơi, dãy phòng, hiên gỗ và lối xuống bãi.</p>
      </div>
      <div className={styles.walkGrid} data-hm="rise">
        <figure className={styles.walkMap}>
          <svg viewBox="0 0 800 440" role="img" aria-label="Sơ đồ đường đi từ cổng đến lối xuống bãi biển qua bảy điểm dừng">
            <rect x="0" y="0" width="800" height="440" fill="none" />
            <path className={styles.walkSea} d="M640 440 C700 380 780 330 800 250 V440 Z" />
            <ellipse className={styles.walkPool} cx="452" cy="268" rx="62" ry="22" transform="rotate(-18 452 268)" />
            <path ref={pathRef} d={path} className={styles.walkRoad} />
            <path ref={trail} d={path} className={styles.walkTrail} pathLength={undefined} strokeDasharray={len || 2000} strokeDashoffset={len || 2000} />
            {WALK.map((w, k) => (
              <g key={w.t} className={styles.walkPin} data-on={k === i} data-done={k < i}>
                <circle cx={w.x} cy={w.y} r={k === i ? 11 : 7} />
                <text x={w.x} y={w.y + (k === 0 || k === 2 ? 28 : -18)} textAnchor="middle" className={styles.walkNo}>{k + 1}</text>
              </g>
            ))}
            <g ref={dot} className={styles.walker} aria-hidden="true">
              <circle r="9" />
              <circle r="3.4" />
            </g>
          </svg>
          <figcaption className={styles.srOnly}>Bảy điểm dừng: {WALK.map((w) => w.t).join(", ")}.</figcaption>
        </figure>
        <div className={styles.walkSide}>
          <ol className={styles.walkList}>
            {WALK.map((w, k) => (
              <li key={w.t}>
                <button type="button" aria-current={k === i ? "step" : undefined} data-on={k === i} onClick={() => setI(k)}>
                  <span className={styles.walkIdx}>{k + 1}</span>{w.t}
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.walkCard} role="status" aria-live="polite">
            <p className={styles.walkMin}>{s.min === 0 ? "Điểm xuất phát" : `Cách cổng khoảng ${s.min} phút đi bộ`}</p>
            <h3 className={styles.h3}>{s.t}</h3>
            <p>{s.d}</p>
            <div className={styles.walkBtns}>
              <button type="button" className={styles.btnLine} onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0}>Điểm trước</button>
              <button type="button" className={styles.btnLine} onClick={() => setI((v) => Math.min(WALK.length - 1, v + 1))} disabled={i === WALK.length - 1}>Điểm tiếp theo</button>
            </div>
            <p className={styles.walkTotal}>Toàn tuyến khoảng {total} phút đi bộ, lối lát đá phẳng, có đèn buổi tối.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
