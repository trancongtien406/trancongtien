"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import styles from "../brand.module.css";

const PATHS = [
  { id: "p1", d: "M196 150 C 390 150, 390 330, 530 330", n: 7, dur: 4.2 },
  { id: "p2", d: "M196 510 C 390 510, 390 330, 530 330", n: 7, dur: 4.6 },
  { id: "p3", d: "M670 330 C 830 330, 830 510, 1004 510", n: 7, dur: 4.0 },
  { id: "p4", d: "M670 330 C 830 330, 830 150, 1004 150", n: 6, dur: 4.4 },
  { id: "p5", d: "M1100 204 L 1100 456", n: 4, dur: 3.2 },
] as const;

type Mode = "sun" | "wind" | "night";
const MODES: Record<Mode, { label: string; hint: string; flow: number[]; gen: number; load: number; bat: number; grid: number; note: string }> = {
  sun: { label: "Nắng trưa", hint: "Pin mặt trời đạt đỉnh, dư điện nạp pin và bán lên lưới.", flow: [1, 0.35, 1, 1, 0], gen: 186, load: 94, bat: 82, grid: -52, note: "Dư điện: nạp pin và phát lên lưới" },
  wind: { label: "Gió chiều", hint: "Turbine gió bù lúc nắng yếu, pin giữ nhịp ổn định.", flow: [0.3, 1, 1, 0.5, 0], gen: 128, load: 96, bat: 64, grid: -18, note: "Gió bù khi nắng yếu" },
  night: { label: "Ban đêm", hint: "Pin xả cho xưởng, thiếu bao nhiêu kéo từ lưới bấy nhiêu.", flow: [0, 0.25, 0.8, 0, 1], gen: 22, load: 88, bat: 31, grid: 48, note: "Pin xả, mua bổ sung từ lưới" },
};

function Num({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const cur = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = String(value); cur.current = value; return; }
    const o = { v: cur.current };
    const tw = gsap.to(o, { v: value, duration: 0.9, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(o.v)); cur.current = o.v; } });
    return () => { tw.kill(); };
  }, [value]);
  return <span ref={ref}>{value}{suffix}</span>;
}

export function EnergyFlow() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("sun");
  const api = useRef<{ apply: (m: Mode) => void } | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tick: (() => void) | null = null;
    const ctx = gsap.context(() => {
      const tweens: gsap.core.Tween[][] = PATHS.map(() => []);
      const speed = { boost: 1 };
      PATHS.forEach((p, pi) => {
        const path = el.querySelector<SVGPathElement>(`#mx-${p.id}`);
        const dots = gsap.utils.toArray<SVGCircleElement>(`[data-dot="${p.id}"]`, el);
        dots.forEach((c, i) => {
          const tw = gsap.to(c, { motionPath: { path: path!, align: path!, alignOrigin: [0.5, 0.5] }, duration: p.dur, ease: "none", repeat: -1 });
          tw.progress(i / dots.length);
          if (reduce) tw.pause();
          tweens[pi].push(tw);
        });
      });
      let active = false;
      let state: Mode = "sun";
      const base = () => MODES[state].flow;
      const setScales = () => tweens.forEach((arr, pi) => arr.forEach((tw) => tw.timeScale(Math.max(0.05, base()[pi]) * speed.boost)));
      const apply = (m: Mode) => {
        state = m;
        const f = MODES[m].flow;
        PATHS.forEach((p, pi) => {
          gsap.to(el.querySelectorAll(`[data-dot="${p.id}"]`), { autoAlpha: f[pi] > 0 ? 1 : 0, duration: 0.5, overwrite: "auto" });
          gsap.to(el.querySelector(`#mx-${p.id}`), { opacity: 0.18 + f[pi] * 0.6, duration: 0.5 });
        });
        gsap.to("[data-node=sun]", { opacity: f[0] > 0.2 ? 1 : 0.35, duration: 0.5 });
        gsap.to("[data-node=wind]", { opacity: f[1] > 0.2 ? 1 : 0.35, duration: 0.5 });
        gsap.to("[data-node=grid]", { opacity: f[3] > 0.2 || f[4] > 0.2 ? 1 : 0.5, duration: 0.5 });
        setScales();
      };
      api.current = { apply };
      apply("sun");
      if (!reduce) {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => { active = self.isActive; tweens.flat().forEach((tw) => tw.paused(!active)); },
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 700, 5);
            if (v > speed.boost) { speed.boost = 1 + v; setScales(); }
          },
        });
        tick = () => {
          if (active && speed.boost > 1.01) { speed.boost += (1 - speed.boost) * 0.06; setScales(); }
        };
        gsap.ticker.add(tick);
      }
    }, el);
    return () => { api.current = null; if (tick) gsap.ticker.remove(tick); ctx.revert(); };
  }, []);

  useEffect(() => { api.current?.apply(mode); }, [mode]);

  const m = MODES[mode];
  return (
    <div ref={root} className={styles.flow}>
      <div className={styles.modes} role="group" aria-label="Chọn tình huống vận hành">
        {(Object.keys(MODES) as Mode[]).map((k) => (
          <button key={k} type="button" aria-pressed={mode === k} onClick={() => setMode(k)} className={styles.modeBtn}>{MODES[k].label}</button>
        ))}
      </div>
      <div className={styles.diagram}>
        <svg viewBox="0 0 1200 660" role="img" aria-label="Sơ đồ dòng năng lượng từ mặt trời và gió, qua bộ lưu trữ, tới xưởng và lưới điện" className={styles.svgFlow}>
          <defs>
            <filter id="mx-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {PATHS.map((p) => <path key={p.id} id={`mx-${p.id}`} d={p.d} className={styles.rail} fill="none" />)}
          {PATHS.map((p) => Array.from({ length: p.n }, (_, i) => <circle key={`${p.id}${i}`} data-dot={p.id} r="6" className={styles.dot} filter="url(#mx-glow)" />))}
          {/* nodes */}
          <g data-node="sun" transform="translate(40 96)"><rect width="156" height="108" rx="20" className={styles.nodeBox} /><circle cx="78" cy="42" r="17" className={styles.nodeIcon} /><g className={styles.nodeStroke}>{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="78" y1="14" x2="78" y2="6" transform={`rotate(${a} 78 42)`} />)}</g><text x="78" y="86" textAnchor="middle" className={styles.nodeText}>Mặt trời</text></g>
          <g data-node="wind" transform="translate(40 456)"><rect width="156" height="108" rx="20" className={styles.nodeBox} /><g transform="translate(78 42)" className={styles.nodeStroke}><circle r="4" className={styles.nodeIcon} />{[0, 120, 240].map((a) => <path key={a} d="M0 0 C 6 -10, 6 -22, 0 -28 C -6 -22, -6 -10, 0 0" transform={`rotate(${a})`} fill="none" />)}</g><text x="78" y="86" textAnchor="middle" className={styles.nodeText}>Gió</text></g>
          <g transform="translate(530 250)"><rect width="140" height="160" rx="24" className={styles.hubBox} /><rect x="38" y="30" width="64" height="94" rx="10" fill="none" className={styles.nodeStroke} /><rect x="58" y="20" width="24" height="10" rx="3" className={styles.nodeIcon} /><rect className={styles.batFill} x="46" y={`${38 + (1 - m.bat / 100) * 78}`} width="48" height={`${(m.bat / 100) * 78}`} rx="4" /><text x="70" y="148" textAnchor="middle" className={styles.nodeText}>Pin lưu trữ</text></g>
          <g data-node="grid" transform="translate(1004 96)"><rect width="156" height="108" rx="20" className={styles.nodeBox} /><path d="M78 16 L62 78 M78 16 L94 78 M66 48 H90 M62 78 H94 M50 30 H106" className={styles.nodeStroke} fill="none" /><text x="78" y="98" textAnchor="middle" className={styles.nodeText}>Lưới điện</text></g>
          <g transform="translate(1004 456)"><rect width="156" height="108" rx="20" className={styles.nodeBox} /><path d="M40 70 V40 L62 54 V40 L84 54 V40 L106 54 V70 Z" className={styles.nodeStroke} fill="none" /><text x="78" y="96" textAnchor="middle" className={styles.nodeText}>Xưởng</text></g>
        </svg>
      </div>
      <p className={styles.flowHint} aria-live="polite"><strong>{m.label}.</strong> {m.hint}</p>
      <dl className={styles.readouts}>
        <div><dt>Phát điện</dt><dd><Num value={m.gen} /> <small>kW</small></dd></div>
        <div><dt>Xưởng dùng</dt><dd><Num value={m.load} /> <small>kW</small></dd></div>
        <div><dt>Mức pin</dt><dd><Num value={m.bat} /> <small>%</small></dd></div>
        <div><dt>{m.grid < 0 ? "Bán lên lưới" : "Mua từ lưới"}</dt><dd><Num value={Math.abs(m.grid)} /> <small>kW</small></dd></div>
      </dl>
      <p className={styles.fnote}>Số liệu minh hoạ cho bố cục, không phải số đo thực tế.</p>
    </div>
  );
}
