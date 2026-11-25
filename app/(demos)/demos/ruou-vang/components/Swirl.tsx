"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SplitWords } from "@/features/showroom/effects";
import s from "../brand.module.css";

const BOWL = "M95 40C75 110 70 200 118 262c14 10 24 14 32 15 8-1 18-5 32-15 48-62 43-152 23-222z";

/**
 * Moment riêng: xoay ly bằng kéo. Kéo ngang (hoặc phím ←/→) tạo "năng lượng" xoay; mặt vang lắc theo,
 * hương bay lên, thước "Vang đã thở" đầy dần rồi nguội đi. rAF chỉ chạy khi còn năng lượng.
 */
export function Swirl() {
  const stage = useRef<HTMLDivElement>(null);
  const wineRef = useRef<SVGGElement>(null);
  const surfRef = useRef<SVGEllipseElement>(null);
  const aromaRef = useRef<SVGGElement>(null);
  const st = useRef({ energy: 0, phase: 0, breath: 0, raf: 0, last: 0, drag: false, x: 0 });
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState("Kéo ngang trên ly để xoay.");

  const render = useCallback(() => {
    const { energy, phase } = st.current;
    const sway = Math.sin(phase) * energy;
    wineRef.current?.setAttribute("transform", `translate(${sway * 5} 0) skewX(${sway * 7})`);
    const e = surfRef.current;
    if (e) {
      e.setAttribute("ry", String(8 + energy * 8));
      e.setAttribute("transform", `rotate(${Math.sin(phase + 1.2) * energy * 14} 150 128)`);
    }
    const a = aromaRef.current;
    if (a) a.setAttribute("style", `opacity:${Math.min(1, st.current.breath * 1.3 + energy * 0.5)}`);
  }, []);

  const loop = useCallback((t: number) => {
    const x = st.current;
    const dt = Math.min(0.05, (t - x.last) / 1000 || 0.016);
    x.last = t;
    x.phase += (2 + x.energy * 9) * dt;
    if (!x.drag) x.energy *= Math.pow(0.3, dt);
    x.breath = Math.min(1, Math.max(0, x.breath + (x.energy > 0.15 ? x.energy * dt * 0.22 : -dt * 0.04)));
    render();
    const p = Math.round(x.breath * 100);
    setPct((cur) => (cur === p ? cur : p));
    if (x.energy < 0.01 && !x.drag) {
      x.energy = 0; x.raf = 0; render();
      if (x.breath >= 0.999) setMsg("Vang đã thở. Một ngụm nhỏ nhé.");
      else if (x.breath > 0.05) setMsg("Xoay thêm vài vòng cho vang thở.");
      return;
    }
    x.raf = requestAnimationFrame(loop);
  }, [render]);

  const kick = useCallback((amount: number) => {
    const x = st.current;
    x.energy = Math.min(1, x.energy + amount);
    if (!x.raf) { x.last = performance.now(); x.raf = requestAnimationFrame(loop); }
  }, [loop]);

  useEffect(() => () => { cancelAnimationFrame(st.current.raf); st.current.raf = 0; }, []);
  useEffect(() => {
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(st.current.raf); st.current.raf = 0; st.current.drag = false; } };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const down = (e: React.PointerEvent) => {
    st.current.drag = true; st.current.x = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setMsg("Đang xoay...");
    kick(0.05);
  };
  const move = (e: React.PointerEvent) => {
    const x = st.current;
    if (!x.drag) return;
    const dx = Math.abs(e.clientX - x.x);
    x.x = e.clientX;
    if (dx) kick(Math.min(0.25, dx * 0.008));
  };
  const up = () => { st.current.drag = false; };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
      e.preventDefault();
      kick(0.35);
      setMsg("Đang xoay...");
    }
  };

  return (
    <section className={s.swirl} id="xoay-ly" aria-label="Xoay ly vang">
      <div className={`${s.wrap} ${s.swirlGrid}`}>
        <div className={s.swirlCopy}>
          <p className={s.kicker}>Thử xoay</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Cho vang thở trước khi nhấp.</SplitWords>
          <p className={s.mutedP}>Xoay ly giúp vang gặp không khí, hương bay lên rõ hơn. Kéo ngang trên ly bên cạnh, hoặc chọn ly rồi nhấn phím ← →.</p>
          <div className={s.breath} role="progressbar" aria-label="Vang đã thở" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
            <span className={s.breathBar}><i style={{ transform: `scaleX(${pct / 100})` }} /></span>
            <span className={s.breathNum}>{pct}%</span>
          </div>
          <p className={s.swirlMsg} aria-live="polite">{msg}</p>
        </div>
        <div className={s.swirlStage} ref={stage}>
          <div
            className={s.swirlGlass}
            role="button"
            tabIndex={0}
            aria-label="Ly vang, kéo ngang hoặc nhấn phím mũi tên để xoay"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onKeyDown={key}
          >
            <svg viewBox="0 -50 300 490" focusable="false" aria-hidden="true">
              <defs>
                <clipPath id="rv-bowl2"><path d={BOWL} /></clipPath>
                <linearGradient id="rv-wine2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9a2038" /><stop offset="1" stopColor="#3a0714" /></linearGradient>
                <linearGradient id="rv-glass2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f6e8cf" stopOpacity="0.45" /><stop offset="0.5" stopColor="#f6e8cf" stopOpacity="0.06" /><stop offset="1" stopColor="#f6e8cf" stopOpacity="0.3" /></linearGradient>
              </defs>
              <g ref={aromaRef} style={{ opacity: 0 }} className={s.aroma}>
                <path d="M120 24c-10-14 10-22 0-38M150 20c-10-14 10-22 0-38M180 24c-10-14 10-22 0-38" fill="none" stroke="#f0c88a" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g clipPath="url(#rv-bowl2)">
                <g ref={wineRef}>
                  <rect x="40" y="128" width="220" height="170" fill="url(#rv-wine2)" />
                  <ellipse ref={surfRef} cx="150" cy="128" rx="85" ry="8" fill="#b02a47" />
                </g>
              </g>
              <path d={BOWL} fill="url(#rv-glass2)" stroke="#e8d3ac" strokeWidth="2.2" />
              <path d="M150 277v110M92 394c28 10 88 10 116 0" fill="none" stroke="#e8d3ac" strokeWidth="2.6" strokeLinecap="round" />
              <ellipse cx="150" cy="392" rx="58" ry="9" fill="none" stroke="#e8d3ac" strokeWidth="2.2" />
              <path d="M96 70c-6 40-4 90 14 130" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
