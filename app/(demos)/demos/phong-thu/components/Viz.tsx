"use client";

import { useEffect, useRef } from "react";
import { barAmp, clamp01, fitCanvas, hash, lerp, useFrame } from "../lib/frame";
import { readSpectrum } from "../lib/audio";

const ORANGE = "#ff8a1f";
const IVORY = "#f6f0e4";

/** Sóng âm hero: thanh đối xứng sinh bằng toán; bụng sóng đuổi theo con trỏ, biên độ/pha theo cuộn, phổ thật khi "Nghe thử". */
export function HeroWave({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ px: 0.5, tx: 0.5, boost: 0, tboost: 0, scroll: 0, pos: false });
  const spec = useRef(new Float32Array(96));

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const host = c.parentElement as HTMLElement;
    const s = st.current;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (e.clientY < r.top - 40 || e.clientY > r.bottom + 40) { s.tboost = 0; return; }
      s.tx = (e.clientX - r.left) / r.width; s.tboost = 1; s.pos = true;
    };
    const leave = () => { s.tboost = 0; };
    const sc = () => { const r = host.getBoundingClientRect(); s.scroll = clamp01(-r.top / Math.max(1, r.height)); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", sc, { passive: true }); sc();
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); window.removeEventListener("scroll", sc); };
  }, []);

  useFrame(ref, (t, dt, reduced) => {
    const c = ref.current; if (!c) return;
    const { g, w, h } = fitCanvas(c);
    const s = st.current;
    s.px = lerp(s.px, s.tx, 1 - Math.pow(0.0008, dt)); s.boost = lerp(s.boost, s.tboost, 1 - Math.pow(0.004, dt));
    const gap = w < 520 ? 5 : 7; const n = Math.max(24, Math.floor(w / gap));
    const lvl = reduced ? -1 : readSpectrum(spec.current);
    const intro = reduced ? 1 : clamp01(t / 1.5);
    const introE = 1 - Math.pow(1 - intro, 3);
    const flat = 1 - s.scroll * 0.75;
    const tt = t + s.scroll * 6;
    const phX = reduced ? 0.42 : (t * 0.06) % 1;
    g.clearRect(0, 0, w, h);
    const mid = h / 2;
    for (let i = 0; i < n; i++) {
      const x01 = i / (n - 1);
      const dist = Math.abs(x01 - 0.5) * 2;
      if (dist > introE) continue;
      let a = barAmp(x01, tt, 3.7) * 0.62;
      const d = x01 - s.px;
      a += Math.exp(-(d * d) / 0.012) * 0.62 * s.boost + Math.exp(-(d * d) / 0.05) * 0.2 * s.boost;
      if (lvl >= 0) a = a * 0.35 + spec.current[Math.min(spec.current.length - 1, Math.floor(x01 * spec.current.length))] * 1.05 * (0.5 + 0.5 * lvl);
      a = clamp01(a * flat);
      const bh = Math.max(3, a * h * 0.94);
      const edge = clamp01((introE - dist) * 6);
      const past = x01 <= phX;
      g.globalAlpha = (past ? 1 : 0.34) * edge;
      g.fillStyle = past ? ORANGE : IVORY;
      const x = i * gap + (w - n * gap) / 2;
      g.beginPath(); g.roundRect(x, mid - bh / 2, gap - 3, bh, (gap - 3) / 2); g.fill();
    }
    g.globalAlpha = 1;
    // playhead
    const px = phX * w;
    const grd = g.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, "rgba(255,138,31,0)"); grd.addColorStop(0.5, ORANGE); grd.addColorStop(1, "rgba(255,138,31,0)");
    g.fillStyle = grd; g.fillRect(px - 1, 0, 2, h);
  });
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/** Equalizer: cột nhảy theo "nhạc" mô phỏng; phổ thật khi nghe thử. Có vạch peak rơi chậm. */
export function EqBars({ bars = 28, className, mirror = false, color = ORANGE, seed = 1 }: { bars?: number; className?: string; mirror?: boolean; color?: string; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const val = useRef(new Float32Array(bars));
  const peak = useRef(new Float32Array(bars));
  const spec = useRef(new Float32Array(bars));
  useFrame(ref, (t, dt, reduced) => {
    const c = ref.current; if (!c) return;
    const { g, w, h } = fitCanvas(c);
    const lvl = reduced ? -1 : readSpectrum(spec.current);
    const gapPx = 3; const bw = (w - gapPx * (bars - 1)) / bars;
    g.clearRect(0, 0, w, h);
    const beat = 0.5 + 0.5 * Math.pow(Math.max(0, Math.sin(t * 5.2)), 4);
    for (let i = 0; i < bars; i++) {
      const x01 = i / (bars - 1);
      let target: number;
      if (reduced) target = 0.25 + 0.6 * hash(i * 1.9 + seed) * (1 - x01 * 0.5);
      else if (lvl >= 0) target = spec.current[i];
      else target = clamp01((0.25 + 0.75 * hash(i * 3.1 + seed + Math.floor(t * 7 + i * 0.3) * 0.7)) * (0.35 + 0.65 * beat) * (1 - x01 * 0.55) + 0.06);
      val.current[i] = lerp(val.current[i], target, 1 - Math.pow(0.0005, dt || 0.016));
      peak.current[i] = Math.max(val.current[i], peak.current[i] - dt * 0.35);
      const bh = Math.max(2, val.current[i] * h); const x = i * (bw + gapPx);
      g.fillStyle = color;
      if (mirror) { g.fillRect(x, h / 2 - bh / 2, bw, bh); } else g.fillRect(x, h - bh, bw, bh);
      g.globalAlpha = 0.9; g.fillStyle = IVORY;
      const py = mirror ? h / 2 - peak.current[i] * h / 2 - 3 : h - peak.current[i] * h - 3;
      g.fillRect(x, Math.max(0, py), bw, 2); g.globalAlpha = 1;
    }
  }, 40);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/** Đồng hồ VU dạng LED ngang: 20 đoạn, đoạn cuối chuyển đỏ cam, có giữ peak ngắn. */
export function Vu({ level, className, segs = 20, seed = 2 }: { level?: () => number; className?: string; segs?: number; seed?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const v = useRef(0); const pk = useRef(0); const hold = useRef(0);
  const spec = useRef(new Float32Array(8));
  useFrame(ref, (t, dt, reduced) => {
    const c = ref.current; if (!c) return;
    const { g, w, h } = fitCanvas(c);
    let target: number;
    const real = reduced ? -1 : readSpectrum(spec.current);
    if (reduced) target = 0.62;
    else if (level) target = level();
    else if (real >= 0) target = real;
    else target = clamp01(0.3 + 0.35 * Math.sin(t * 3 + seed) * Math.sin(t * 1.3 + seed * 2) + 0.35 * hash(Math.floor(t * 9) + seed));
    v.current = lerp(v.current, target, 1 - Math.pow(target > v.current ? 0.00002 : 0.002, dt || 0.016));
    if (v.current >= pk.current) { pk.current = v.current; hold.current = 0.5; } else { hold.current -= dt; if (hold.current < 0) pk.current = Math.max(v.current, pk.current - dt * 0.9); }
    g.clearRect(0, 0, w, h);
    const sw = w / segs; const on = Math.round(v.current * segs); const pkI = Math.min(segs - 1, Math.round(pk.current * segs) - 1);
    for (let i = 0; i < segs; i++) {
      const hot = i >= segs - 3; const warm = i >= segs - 7;
      const col = hot ? "#ff4d3d" : warm ? ORANGE : "#b99bf0";
      g.globalAlpha = i < on || i === pkI ? 1 : 0.16; g.fillStyle = col;
      g.fillRect(i * sw + 1, 0, sw - 2.5, h);
    }
    g.globalAlpha = 1;
  }, 40);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/** Clip sóng của một track trong hàng kênh: trôi chậm, biên độ theo fader gain, tắt khi mute. */
export function ClipWave({ seed, gain, muted, className }: { seed: number; gain: number; muted: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const g0 = useRef(gain); const m0 = useRef(muted); const cur = useRef(gain);
  useEffect(() => { g0.current = gain; m0.current = muted; }, [gain, muted]);
  useFrame(ref, (t, dt, reduced) => {
    const c = ref.current; if (!c) return;
    const { g, w, h } = fitCanvas(c);
    const want = m0.current ? 0.04 : g0.current;
    cur.current = reduced ? want : lerp(cur.current, want, 1 - Math.pow(0.001, dt || 0.016));
    g.clearRect(0, 0, w, h);
    const n = Math.floor(w / 4); const mid = h / 2;
    for (let i = 0; i < n; i++) {
      const x01 = i / n;
      const a = barAmp(x01 + (reduced ? 0 : t * 0.03), reduced ? 0 : t * 0.2, seed) * cur.current;
      const bh = Math.max(2, a * h * 0.92);
      g.fillStyle = m0.current ? "rgba(246,240,228,.3)" : ORANGE; g.globalAlpha = m0.current ? 0.5 : 0.35 + 0.65 * clamp01(a * 1.6);
      g.fillRect(i * 4, mid - bh / 2, 2.4, bh);
    }
    g.globalAlpha = 1;
  }, 30);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
