"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, observeInView, prefersReducedMotion, registerGsap } from "@/features/showroom/effects";
import { SESSION, ZONES } from "../data/content";
import styles from "../brand.module.css";

const TOTAL = SESSION.reduce((a, x) => a + x.min, 0);
const STARTS = SESSION.map((_, i) => SESSION.slice(0, i).reduce((a, x) => a + x.min, 0));
const mmss = (m: number) => `${String(Math.floor(m)).padStart(2, "0")}:${String(Math.floor((m % 1) * 60)).padStart(2, "0")}`;

/**
 * Đồng hồ buổi tập 60 phút: kim chạy qua 5 chặng khi section vào khung (một lần), bấm chặng để nhảy tới đầu chặng.
 * Reduced-motion: không tự chạy, mặc định chặng đầu, bấm vẫn đổi.
 */
export function SessionClock() {
  const root = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const tw = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const apply = (m: number) => {
    if (head.current) head.current.style.left = `${(m / TOTAL) * 100}%`;
    if (clock.current) clock.current.textContent = mmss(m);
    let idx = 0;
    for (let i = 0; i < STARTS.length; i++) if (m >= STARTS[i]) idx = i;
    if (idx !== activeRef.current) { activeRef.current = idx; setActive(idx); }
  };

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const st = { m: 0 };
    const off = observeInView(el, (v) => {
      if (!v || tw.current) return;
      tw.current = gsap.to(st, { m: TOTAL, duration: 9, ease: "none", onUpdate: () => apply(st.m) });
    }, { once: true });
    return () => { off(); tw.current?.kill(); tw.current = null; };
  }, []);

  const jump = (i: number) => {
    tw.current?.kill();
    tw.current = null;
    apply(STARTS[i]);
  };

  const seg = SESSION[active];
  return (
    <div ref={root} className={styles.sess} data-testid="session">
      <div className={styles.sessTop}>
        <span className={styles.sessClock} data-testid="session-clock" aria-hidden="true"><span ref={clock}>00:00</span> / {TOTAL}:00</span>
        <p className={styles.sessNow} role="status" aria-live="polite"><b data-testid="session-active">{seg.label}</b> · {seg.min} phút</p>
      </div>
      <div className={styles.sessBar} role="group" aria-label="Các chặng của một buổi 60 phút">
        {SESSION.map((x, i) => (
          <button key={x.id} type="button" className={styles.sessSeg} style={{ flexGrow: x.min }} aria-pressed={i === active} data-done={i < active ? "1" : "0"} onClick={() => jump(i)}>
            <small>{String(STARTS[i]).padStart(2, "0")}'</small>
            <span>{x.label}</span>
          </button>
        ))}
        <div ref={head} className={styles.sessHead} aria-hidden="true" />
      </div>
      <p className={styles.sessText}>{seg.text}</p>
    </div>
  );
}

/**
 * Sơ đồ sàn tập: bấm khu để xem dụng cụ; khu được chọn "đóng dấu" (nảy + rung ngắn) bằng gsap.
 */
const POS: Record<string, { x: number; y: number; w: number; h: number }> = {
  rack: { x: 12, y: 12, w: 220, h: 130 },
  rig: { x: 244, y: 12, w: 244, h: 130 },
  wod: { x: 12, y: 154, w: 300, h: 150 },
  mob: { x: 324, y: 154, w: 164, h: 90 },
  don: { x: 324, y: 256, w: 164, h: 48 },
};
const SHORT: Record<string, string> = { rack: "RACK", rig: "XÀ + DÂY", wod: "SÀN WOD", mob: "MOBILITY", don: "QUẦY" };

export function FloorPlan() {
  const [id, setId] = useState<string>("wod");
  const svg = useRef<SVGSVGElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = svg.current?.querySelector<SVGGElement>(`[data-zone="${id}"]`);
    if (!el || prefersReducedMotion()) return;
    const p = POS[id];
    const o = `${p.x + p.w / 2}px ${p.y + p.h / 2}px`;
    const tl = gsap.timeline();
    tl.fromTo(el, { scale: 1.08, transformOrigin: o }, { scale: 1, transformOrigin: o, duration: 0.45, ease: "bounce.out" }, 0)
      .fromTo(el, { x: -4 }, { keyframes: [{ x: 4 }, { x: -3 }, { x: 0 }], duration: 0.2, ease: "power1.inOut" }, 0);
    return () => { tl.kill(); gsap.set(el, { clearProps: "transform" }); };
  }, [id]);
  const z = ZONES.find((x) => x.id === id)!;
  return (
    <div className={styles.plan2}>
      <svg ref={svg} viewBox="0 0 500 316" className={styles.planSvg} role="img" aria-label={`Sơ đồ sàn tập, đang chọn: ${z.name}`}>
        <rect x="2" y="2" width="496" height="312" className={styles.planWall} />
        {ZONES.map((x) => {
          const p = POS[x.id];
          return (
            <g key={x.id} data-zone={x.id} data-on={x.id === id ? "1" : "0"} className={styles.planZone}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} />
              <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 6} textAnchor="middle">{SHORT[x.id]}</text>
            </g>
          );
        })}
      </svg>
      <div className={styles.planSide}>
        <div className={styles.zoneBtns} role="group" aria-label="Chọn khu trên sàn tập">
          {ZONES.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === id} onClick={() => setId(x.id)} className={styles.zoneBtn}>{x.name}</button>
          ))}
        </div>
        <p className={styles.zoneNote} data-testid="zone-note"><b>{z.name}</b>{z.note}</p>
      </div>
    </div>
  );
}
