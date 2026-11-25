import { useEffect, useRef, type RefObject } from "react";

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Vòng rAF chỉ chạy khi phần tử trong khung nhìn và tab hiện; dừng hẳn khi reduced-motion
 * (gọi cb đúng một lần với reduced = true để vẽ khung tĩnh, và vẽ lại khi đổi kích thước).
 * cb(t giây từ lúc mount, dt giây, reduced)
 */
export function useFrame(ref: RefObject<Element | null>, cb: (t: number, dt: number, reduced: boolean) => void, fps = 60) {
  const cbRef = useRef(cb);
  useEffect(() => { cbRef.current = cb; });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = reducedMotion();
    let raf = 0; let visible = false; let last = 0; const t0 = performance.now();
    const minGap = 1000 / fps - 2;
    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - last >= minGap) { const dt = Math.min(0.1, (now - last) / 1000); last = now; cbRef.current((now - t0) / 1000, dt, false); }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && visible && !document.hidden && !reduced) { last = performance.now() - 16; raf = requestAnimationFrame(loop); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }, { rootMargin: "80px" });
    io.observe(el);
    const still = () => { if (reduced) cbRef.current(0, 0, true); };
    still();
    const ro = new ResizeObserver(() => { still(); });
    ro.observe(el);
    const vis = () => kick();
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", vis); if (raf) cancelAnimationFrame(raf); };
  }, [ref, fps]);
}

/** Canvas co theo phần tử cha, DPR <= 2. Trả về kích thước CSS. */
export function fitCanvas(c: HTMLCanvasElement) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(c.clientWidth)); const h = Math.max(1, Math.round(c.clientHeight));
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
  const g = c.getContext("2d")!;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { g, w, h };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** Băm xác định 0..1 (không dùng Math.random để SSR/CSR khớp). */
export const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
/** Biên độ một thanh sóng âm giả lập, 0..1, mượt theo x và t. */
export function barAmp(x01: number, t: number, seed: number) {
  const slow = 0.55 + 0.45 * Math.sin(x01 * 9 + seed * 3 + t * 0.9);
  const fine = 0.35 + 0.65 * hash(Math.floor(x01 * 120) * 0.37 + seed + Math.floor(t * 6) * 0.11);
  const wob = 0.8 + 0.2 * Math.sin(x01 * 31 + t * 2.3 + seed);
  return clamp01(slow * fine * wob * 1.15);
}
