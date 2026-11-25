"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasParticles, hasFinePointer, on, prefersReducedMotion } from "@/features/showroom/effects";
import styles from "../brand.module.css";

/** Mốc màu nền theo độ sâu (m). Nội suy tuyến tính trong sRGB. */
const STOPS: Array<[number, [number, number, number]]> = [
  [0, [8, 122, 133]],
  [5, [10, 108, 130]],
  [12, [7, 81, 106]],
  [20, [6, 56, 78]],
  [30, [3, 25, 35]],
];
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function colorAt(d: number): [number, number, number] {
  const x = Math.min(30, Math.max(0, d));
  for (let i = 1; i < STOPS.length; i++) {
    if (x <= STOPS[i][0]) {
      const [d0, c0] = STOPS[i - 1], [d1, c1] = STOPS[i];
      const t = (x - d0) / (d1 - d0);
      return [mix(c0[0], c1[0], t), mix(c0[1], c1[1], t), mix(c0[2], c1[2], t)];
    }
  }
  return STOPS[STOPS.length - 1][1];
}
const rgb = (c: [number, number, number]) => `rgb(${c[0].toFixed(0)} ${c[1].toFixed(0)} ${c[2].toFixed(0)})`;

const RAIL_MARKS = [0, 5, 12, 20, 30];
const pad = (n: number) => String(Math.round(n)).padStart(2, "0");

type Anchor = { y: number; d: number; label: string };

/**
 * Hiệu ứng riêng: "đồng hồ độ sâu". Gom mọi thứ phụ thuộc độ sâu vào một chỗ:
 * nền gradient cố định đổi màu theo độ sâu, số đo 00 → 30 m (CSS var + DOM text, không setState theo pixel),
 * thanh độ sâu bên trái (desktop) / thanh dưới (mobile), ánh sáng caustics mờ dần, lớp bong bóng canvas.
 * Độ sâu = nội suy theo vị trí cuộn giữa các neo `[data-depth]` (tâm mỗi chương) và đỉnh trang (0 m).
 */
export function Depth() {
  const ref = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const fine = hasFinePointer();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBubbles(window.innerWidth >= 900 && fine ? 30 : 12);
  }, []);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('[data-site="lan-bien"]');
    const host = ref.current;
    if (!root || !host) return;
    const q = <T extends HTMLElement>(s: string) => host.querySelector<T>(s);
    const numEls = Array.from(root.querySelectorAll<HTMLElement>("[data-depth-num]"));
    const labelEls = Array.from(root.querySelectorAll<HTMLElement>("[data-depth-label]"));
    const marker = q("[data-depth-marker]");
    let anchors: Anchor[] = [];
    let y0 = 0, endY = 0;
    let lastNum = -1, lastLabel = "", raf = 0, lastDepth = -1;

    const measure = () => {
      const vh = window.innerHeight;
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
      anchors = els.map((el) => {
        const r = el.getBoundingClientRect();
        return { y: r.top + window.scrollY + r.height / 2 - vh / 2, d: Number(el.dataset.depth), label: el.dataset.depthName ?? "" };
      }).filter((a) => a.y > 0).sort((a, b) => a.y - b.y);
      y0 = 0;
      endY = anchors.length ? anchors[anchors.length - 1].y : 1;
    };

    const depthAt = (y: number) => {
      if (!anchors.length) return 0;
      if (y <= y0) return 0;
      let py = y0, pd = 0;
      for (const a of anchors) {
        if (y <= a.y) return mix(pd, a.d, (y - py) / Math.max(1, a.y - py));
        py = a.y; pd = a.d;
      }
      return pd;
    };

    const labelAt = (y: number) => {
      if (!anchors.length || y < anchors[0].y * 0.35) return "Mặt biển";
      let best = anchors[0], bd = Infinity;
      for (const a of anchors) { const d = Math.abs(a.y - y); if (d < bd) { bd = d; best = a; } }
      return best.label;
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const d = depthAt(y);
      if (Math.abs(d - lastDepth) < 0.02) return;
      lastDepth = d;
      const top = colorAt(d - 2), bot = colorAt(d + 7), solid = colorAt(d + 2);
      root.style.setProperty("--lb-sky-top", rgb(top));
      root.style.setProperty("--lb-sky-bot", rgb(bot));
      root.style.setProperty("--lb-sky-solid", rgb(solid));
      root.style.setProperty("--lb-p", (d / 30).toFixed(4));
      root.style.setProperty("--lb-caustic", (0.17 * (1 - d / 30) + 0.03).toFixed(3));
      const n = Math.round(d);
      if (n !== lastNum) {
        lastNum = n;
        numEls.forEach((e) => { e.textContent = pad(n); });
        host.setAttribute("data-depth-now", String(n));
      }
      const lb = labelAt(y);
      if (lb !== lastLabel) { lastLabel = lb; labelEls.forEach((e) => { e.textContent = lb; }); }
      if (marker) marker.setAttribute("data-m", String(n));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    measure(); update();
    host.setAttribute("data-depth-ready", "1");
    const remeasure = () => { measure(); lastDepth = -1; update(); };
    const offs = [
      on(window, "scroll", onScroll, { passive: true }),
      on(window, "resize", remeasure),
      on(window, "load", remeasure),
    ];
    const t1 = window.setTimeout(remeasure, 600);
    const t2 = window.setTimeout(remeasure, 2200);
    document.fonts?.ready.then(remeasure).catch(() => {});
    const ro = new ResizeObserver(() => remeasure());
    ro.observe(document.body);
    return () => {
      offs.forEach((f) => f());
      ro.disconnect();
      clearTimeout(t1); clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
      ["--lb-sky-top", "--lb-sky-bot", "--lb-sky-solid", "--lb-p", "--lb-caustic"].forEach((k) => root.style.removeProperty(k));
    };
  }, []);

  return (
    <div ref={ref} className={styles.depth} data-fx="DepthEngine" data-depth-now="0">
      <div className={styles.sky} aria-hidden="true" />
      <div className={styles.caustics} aria-hidden="true" />
      {bubbles > 0 && (
        <div className={styles.bubbles} aria-hidden="true">
          <CanvasParticles mode="bubbles" count={bubbles} color="rgba(220,250,244,0.9)" speed={0.7} maxDpr={1.5} />
        </div>
      )}
      <div className={styles.ghost} aria-hidden="true"><span data-depth-num>00</span><small>m</small></div>
      <aside className={styles.rail} aria-hidden="true">
        <div className={styles.railLine}>
          {RAIL_MARKS.map((m) => (
            <span key={m} className={styles.railTick} style={{ ["--t" as string]: m / 30 }}><i>{pad(m)}</i></span>
          ))}
          <span className={styles.railMarker} data-depth-marker="" />
        </div>
        <div className={styles.railRead}>
          <b data-depth-num>00</b><small>m</small>
          <em data-depth-label>Mặt biển</em>
        </div>
      </aside>
      <div className={styles.hud} aria-hidden="true">
        <span className={styles.hudNum}><b data-depth-num>00</b><small>m</small></span>
        <span className={styles.hudBar}><i /></span>
        <span className={styles.hudLabel} data-depth-label>Mặt biển</span>
      </div>
    </div>
  );
}
