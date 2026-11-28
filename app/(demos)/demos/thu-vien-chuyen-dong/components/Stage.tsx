"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { Poster } from "./Poster";

gsap.registerPlugin(ScrollTrigger);

const N = 26;
const GHOST = 4;
const LIST = ["Băng chuyền", "Vòng", "Lưới", "Cuộn", "Trường", "Hiệu ứng lộ", "Vệt"];
type Layout = "scatter" | "vortex" | "gridBig" | "carousel" | "ring" | "grid" | "roll" | "field" | "reveal" | "trail";
const STEPS: Layout[] = ["scatter", "vortex", "gridBig", "carousel", "ring", "grid", "roll", "field", "reveal", "trail"];
const CLIP: Partial<Record<Layout, string>> = { gridBig: "inset(0% 50% 0% 0%)", grid: "inset(0% 0% 0% 58%)" };
const rnd = (i: number, s = 1) => { const x = Math.sin(i * 91.7 + s * 13.3) * 43758.5453; return x - Math.floor(x); };

type T = { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number; o: number };
type W = { x: number; y: number; rx: number; ry: number; rz: number; s: number };
const deg = (r: number) => (r * 180) / Math.PI;

function layout(l: Layout, W_: number, H_: number): { world: W; items: T[] } {
  const pw = Math.max(56, Math.min(112, H_ * 0.118));
  const items: T[] = [];
  const push = (t: Partial<T>) => items.push({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 1, o: 1, ...t });
  const hide = () => push({ s: 0.2, o: 0 });
  const narrow = W_ < 760;
  const side = narrow ? 0 : W_ * 0.28;
  const base: W = { x: 0, y: 0, rx: 0, ry: 0, rz: 0, s: 1 };
  const dy = narrow ? -H_ * 0.2 : 0;
  switch (l) {
    case "scatter":
      for (let i = 0; i < N; i++) push({ x: (rnd(i, 1) - 0.5) * W_ * 0.9, y: narrow ? H_ * (0.02 + rnd(i, 2) * 0.46) : (rnd(i, 2) - 0.42) * H_ * 0.92, z: (rnd(i, 3) - 0.5) * 420, rx: (rnd(i, 4) - 0.5) * 70, ry: (rnd(i, 5) - 0.5) * 90, rz: (rnd(i, 6) - 0.5) * 80, s: (0.65 + rnd(i, 7) * 0.7) * (narrow ? 0.8 : 1), o: i < 16 ? (i % 3 === 0 ? 0.6 : 1) : 0 });
      return { world: base, items };
    case "vortex": {
      const R = pw * 3.2;
      for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; push({ x: Math.sin(a) * R, y: ((i * 7) % 5 - 2) * pw * 0.05, z: Math.cos(a) * R, ry: deg(a), s: 1.15 }); }
      return { world: { ...base, y: narrow ? dy * 0.5 : H_ * 0.07, rx: -30, s: narrow ? 0.7 : 1.5 }, items };
    }
    case "gridBig": {
      const cols = 7, rows = 4;
      for (let i = 0; i < N; i++) { const c = i % cols, r = Math.floor(i / cols); push({ x: (c - (cols - 1) / 2) * pw * 1.04, y: (r - (rows - 1) / 2) * pw * 1.4 }); }
      return { world: { ...base, x: narrow ? 0 : -W_ * 0.24, y: dy, rx: 50, rz: -28, s: narrow ? 0.55 : 1.7 }, items };
    }
    case "carousel": {
      const R = pw * 3.4, n = 12;
      for (let i = 0; i < N; i++) { if (i >= n) { hide(); continue; } const a = ((i / (n - 1)) - 0.5) * Math.PI * 1.15; push({ x: Math.sin(a) * R, z: Math.cos(a) * R - R, ry: deg(a), s: 1.2 }); }
      return { world: { ...base, y: dy, x: side * 1.05, rx: -7, ry: -16, s: narrow ? 0.62 : 0.95 }, items };
    }
    case "ring": {
      const n = 20, R = pw * 1.95;
      for (let i = 0; i < N; i++) { if (i >= n) { hide(); continue; } const a = (i / n) * Math.PI * 2; push({ x: Math.cos(a) * R, y: Math.sin(a) * R, z: Math.sin(a * 2) * 20, rz: deg(a) + 90, s: 0.92 }); }
      return { world: { ...base, y: dy, x: side * 1.05, rx: 6, ry: -6, s: narrow ? 0.62 : 0.85 }, items };
    }
    case "grid": {
      const s = narrow ? 2.2 : Math.max(2.4, (H_ * 0.75 / (pw * 4 / 3)));
      const w = pw * s * 1.012, h = pw * (4 / 3) * s * 1.012;
      for (let i = 0; i < N; i++) { if (i > 8) { hide(); continue; } const c = i % 3, r = Math.floor(i / 3); push({ x: (c - 1) * w, y: (r - 1) * h, s }); }
      return { world: { ...base, x: narrow ? 0 : W_ * 0.31, y: narrow ? -H_ * 0.12 : 0 }, items };
    }
    case "roll": {
      const R = pw * 2.3, n = 20;
      for (let i = 0; i < N; i++) { if (i >= n) { hide(); continue; } const a = (i / n) * Math.PI * 2; push({ y: Math.sin(a) * R, z: Math.cos(a) * R, rx: -deg(a) }); }
      return { world: { ...base, y: dy, x: side, ry: -28, s: narrow ? 0.6 : 0.9 }, items };
    }
    case "field":
      for (let i = 0; i < N; i++) {
        if (i < 9) push({ x: (rnd(i, 21) - 0.5) * pw * 2.6, y: (rnd(i, 22) - 0.5) * pw * 2.2, z: (rnd(i, 23) - 0.5) * 80, rz: (rnd(i, 24) - 0.5) * 10, s: 0.8 + rnd(i, 25) * 0.7 });
        else push({ x: (rnd(i, 11) - 0.5) * W_ * 0.5, y: (rnd(i, 12) - 0.5) * H_ * 0.92, z: (rnd(i, 13) - 0.5) * 300, rx: (rnd(i, 14) - 0.5) * 20, ry: (rnd(i, 15) - 0.5) * 40, rz: (rnd(i, 16) - 0.5) * 30, s: 0.22 + rnd(i, 17) * 0.24 });
      }
      return { world: { ...base, y: dy, x: side * 0.95, s: narrow ? 0.7 : 1 }, items };
    case "reveal":
      for (let i = 0; i < N; i++) { if (i > 5) { hide(); continue; } const k = 5 - i; push({ x: -k * pw * 0.34, y: k * pw * 0.1, z: -k * 30, s: 2.3 + (5 - k) * 0.02 }); }
      return { world: { ...base, x: side * 1.05, y: narrow ? dy : -H_ * 0.04, s: narrow ? 0.62 : 0.95 }, items };
    case "trail":
      for (let i = 0; i < N; i++) { if (i > 7) { hide(); continue; } const k = 7 - i; push({ x: -k * pw * 0.42, y: k * pw * 0.16, z: -k * 40, rz: -k * 1.5, s: 2.2 }); }
      return { world: { ...base, x: side * 1.05, y: narrow ? dy : -H_ * 0.04, s: narrow ? 0.62 : 0.95 }, items };
  }
}

export function Stage() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const curRef = useRef(-1);
  const [step, setStep] = useState(0);

  const apply = useCallback((idx: number, instant: boolean) => {
    const el = stage.current, wd = world.current, cp = clip.current;
    if (!el || !wd || !cp) return;
    const { width, height } = el.getBoundingClientRect();
    const l = STEPS[idx];
    const { world: wt, items } = layout(l, width, height);
    const posters = Array.from(wd.children) as HTMLElement[];
    const d = instant ? 0 : 1.15;
    gsap.to(wd, { x: wt.x, y: wt.y, rotationX: wt.rx, rotationY: wt.ry, rotationZ: wt.rz, scale: wt.s, duration: d, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(cp, { clipPath: width < 760 ? "inset(0% 0% 0% 0%)" : CLIP[l] ?? "inset(0% 0% 0% 0%)", duration: d, ease: "power3.inOut", overwrite: "auto" });
    const gp = [[-0.12, -0.2, -12, 1.5], [0.04, 0.1, 60, 1.25], [0.22, -0.04, 20, 1], [-0.3, 0.18, 35, 1.1]];
    posters.forEach((p, i) => {
      if (i >= N) {
        const g = gp[i - N];
        gsap.to(p, { x: g[0] * width, y: g[1] * height, z: 0, rotationZ: g[2], scale: g[3], opacity: l === "scatter" ? 1 : 0, duration: d, ease: "power3.inOut", overwrite: "auto" });
        return;
      }
      const t = items[i];
      gsap.to(p, { x: t.x, y: t.y, z: t.z, rotationX: t.rx, rotationY: t.ry, rotationZ: t.rz, scale: t.s, opacity: t.o, duration: d, delay: instant ? 0 : i * 0.014, ease: "power3.inOut", overwrite: "auto" });
    });
    if (!instant) { el.classList.add(styles.moving); gsap.delayedCall(d + 0.4, () => el.classList.remove(styles.moving)); }
  }, []);

  const go = useCallback((idx: number, instant = false) => {
    if (curRef.current === idx && !instant) return;
    curRef.current = idx; setStep(idx); apply(idx, instant);
  }, [apply]);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    go(r ? 2 : 0, true);
    const onResize = () => apply(curRef.current < 0 ? 0 : curRef.current, true);
    window.addEventListener("resize", onResize);
    if (r) return () => window.removeEventListener("resize", onResize);
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root.current, start: "top top", end: () => "+=" + window.innerHeight * 0.8 * STEPS.length, pin: stage.current, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => go(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))),
      });
      stRef.current = st;
    }, root);
    return () => { ctx.revert(); stRef.current = null; window.removeEventListener("resize", onResize); };
  }, [go, apply]);

  const pick = (listIdx: number) => {
    const idx = 3 + listIdx;
    const st = stRef.current;
    if (st) window.scrollTo({ top: st.start + ((idx + 0.5) / STEPS.length) * (st.end - st.start), behavior: "smooth" });
    else go(idx);
  };
  const activeList = step >= 3 ? step - 3 : -1;

  return (
    <div ref={root} className={styles.stageRoot} id="tm-top">
      <div ref={stage} className={styles.stage} data-step={step}>
        <div ref={clip} className={styles.clipper}>
          <div className={styles.world} ref={world} aria-hidden="true">
            {Array.from({ length: N }, (_, i) => <div className={styles.pHolder} key={i}><Poster v={i * 3 + (i >> 1)} /></div>)}
            {Array.from({ length: GHOST }, (_, i) => <div className={styles.pHolder} key={`g${i}`}><i className={styles.ghost} /></div>)}
          </div>
        </div>

        <noscript><p className={styles.noscript}>Bắt đầu từ phần hay nhất. Kiểu chuyển động: {LIST.join(", ")}.</p></noscript>
        <div className={`${styles.txt} ${styles.hero} ${step === 0 ? styles.on : ""}`}>
          <h1><span>Thiết kế</span><br /><span>xong rồi.</span></h1>
          <h2><span>Giờ cho nó</span><br /><span>(<em className={styles.glitch}>chuyển động</em>).</span></h2>
          <p className={styles.hp1}>Thư Viện Chuyển Động biến thiết kế đã hoàn thiện thành chuyển động trau chuốt, không đẩy bạn vào phần mềm dựng video.</p>
          <p className={styles.hp2}>Thả tác phẩm vào. Chọn một điểm xuất phát. Đi xa tới đâu tuỳ bạn.</p>
          <p className={styles.hp3}>Không cần tài khoản</p>
        </div>
        <div className={`${styles.txt} ${styles.good} ${step === 2 ? styles.on : ""}`}>
          <h2>Bắt đầu<br />từ phần<br />hay nhất</h2>
          <p className={styles.gp1}>Hàng trăm mẫu chuyển động làm tay, dành cho người thiết kế.</p>
          <p className={styles.gp2}>Chọn chuyển động. Thả tác phẩm vào. Bỏ qua dòng thời gian trống.</p>
        </div>
        <div className={`${styles.txt} ${styles.listBox} ${step >= 3 ? styles.on : ""}`} style={{ ["--n" as string]: activeList }}>
          <i className={styles.lRuler} aria-hidden="true" />
          <ul aria-label="Kiểu chuyển động">
            {LIST.map((t, i) => {
              const d = activeList < 0 ? 3 : Math.abs(activeList - i);
              return (
                <li key={t}><button type="button" aria-current={activeList === i ? "true" : undefined} style={{ ["--c" as string]: Math.max(0.16, 0.72 - d * 0.11) }} onClick={() => pick(i)}><i aria-hidden="true">→</i>{t}</button></li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
