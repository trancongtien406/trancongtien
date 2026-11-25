"use client";

import { memo, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, observeInView, registerGsap } from "@/features/showroom/effects";
import { HORIZON, clockText, moonAt, palette, phase, sunAt } from "../lib/sun";
import { skylinePath } from "./Art";
import styles from "../brand.module.css";

const PRESETS = [
  { label: "Bình minh", h: 6.3 },
  { label: "Giữa trưa", h: 12 },
  { label: "Chiều", h: 16 },
  { label: "Hoàng hôn", h: 18 },
  { label: "Đêm", h: 20.6 },
];

const STARS = Array.from({ length: 46 }, (_, i) => {
  const a = Math.sin(i * 91.7) * 43758.5453; const b = Math.sin(i * 12.9) * 24634.6345;
  return { x: Math.round((a - Math.floor(a)) * 12000) / 10, y: Math.round((b - Math.floor(b)) * 3000) / 10, r: 0.7 + ((i * 7) % 5) * 0.25 };
});
const FAR = skylinePath(11, 1500, HORIZON, 14, 96, 24, 64);
const MID = skylinePath(5, 1500, HORIZON, 8, 60, 30, 80);

const Tower = memo(function Tower() {
  const wins: React.ReactElement[] = [];
  const dim: React.ReactElement[] = [];
  for (let r = 0; r < 36; r++) {
    for (let c = 0; c < 5; c++) {
      const on = (r * 7 + c * 13) % 10 < 7;
      (on ? wins : dim).push(<rect key={`${r}-${c}`} x={517 + c * 33.4} y={100 + r * 12.2} width={22} height={7.4} />);
    }
  }
  return (
    <g>
      <g className={styles.winA}>{wins}</g>
      <g className={styles.winB}>{dim}</g>
    </g>
  );
});

const Static = memo(function Static() {
  const slabs = Array.from({ length: 36 }, (_, r) => <path key={r} d={`M505 ${(96 + r * 12.2).toFixed(1)}H695`} />);
  return <g className={styles.slabs}>{slabs}</g>;
});

export function SunScene() {
  const [hour, setHour] = useState(17.6);
  const root = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const proxy = useRef({ h: 17.6 });
  const tween = useRef<gsap.core.Tween | null>(null);
  const pal = palette(hour);
  const sun = sunAt(hour);
  const moon = moonAt(hour);
  const ph = phase(hour);
  const wLeft = sun ? Math.min(1, Math.max(0, (600 - sun.x) / 420 + 0.5)) : 0.5;
  const litBase = sun ? 0.95 : 0.28;

  const goTo = (h: number, dur = 0.9) => {
    tween.current?.kill();
    if (prefersReducedMotion()) { proxy.current.h = h; setHour(h); return; }
    tween.current = gsap.to(proxy.current, { h, duration: dur, ease: "power2.inOut", onUpdate: () => setHour(proxy.current.h) });
  };

  useEffect(() => {
    registerGsap();
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const off = observeInView(el, (v) => {
      if (!v || touched.current) return;
      proxy.current.h = 6;
      setHour(6);
      tween.current = gsap.to(proxy.current, { h: 17.6, duration: 5.2, ease: "power1.inOut", delay: 0.2, onUpdate: () => setHour(proxy.current.h) });
    }, { once: true, threshold: 0.45 });
    return () => { off(); tween.current?.kill(); };
  }, []);

  const reflect = sun ? Math.min(1, pal.glow * 1.1 + sun.elev * 0.25) : 0;

  return (
    <section className={styles.sun} id="mat-tien" aria-labelledby="cv-sun-h" ref={root} data-cv="sun">
      <div className={styles.wrap}>
        <header className={styles.secHead} data-cv="reveal">
          <p className={styles.sheet}><span>05</span><i aria-hidden="true" />Bản vẽ A-05 · Mặt tiền theo giờ</p>
          <h2 id="cv-sun-h" className={styles.h2}>Mặt tiền đổi màu theo từng giờ nắng.</h2>
          <p className={styles.lede}>Kính, lam đồng và những dải sàn ban công bắt ánh sáng khác nhau ở mỗi thời điểm. Kéo thanh giờ để xem toà tháp từ lúc bình minh tới khi lên đèn.</p>
        </header>

        <div className={styles.stage} data-stage="1">
          <svg className={styles.stageSvg} viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Toà tháp ven biển lúc ${clockText(hour)}, ${ph.name.toLowerCase()}`}>
            <defs>
              <linearGradient id="cvSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={pal.sky1} /><stop offset="0.85" stopColor={pal.sky2} /></linearGradient>
              <linearGradient id="cvSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={pal.sea1} /><stop offset="1" stopColor={pal.sea2} /></linearGradient>
              <linearGradient id="cvLitL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={pal.facL} /><stop offset="1" stopColor={pal.facL} stopOpacity="0" /></linearGradient>
              <linearGradient id="cvLitR" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor={pal.facL} /><stop offset="1" stopColor={pal.facL} stopOpacity="0" /></linearGradient>
              <radialGradient id="cvHalo"><stop offset="0" stopColor="#ffd9a0" stopOpacity=".95" /><stop offset="0.35" stopColor="#ffb870" stopOpacity=".35" /><stop offset="1" stopColor="#ff9a50" stopOpacity="0" /></radialGradient>
              <clipPath id="cvSeaClip"><rect x="0" y={HORIZON} width="1200" height={640 - HORIZON} /></clipPath>
            </defs>
            <rect width="1200" height="640" fill="url(#cvSky)" />
            <g fill="#f4f1ea" opacity={pal.stars}>{STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} />)}</g>
            <path d="M200 392Q600 -270 1000 392" fill="none" stroke="#cfe0ee" strokeOpacity=".28" strokeWidth="1" strokeDasharray="3 7" />
            {sun && (
              <g transform={`translate(${sun.x.toFixed(1)} ${sun.y.toFixed(1)})`}>
                <circle r={120 + pal.glow * 140} fill="url(#cvHalo)" opacity={0.35 + pal.glow * 0.65} />
                <circle r="26" fill="#fff0cf" />
              </g>
            )}
            {!sun && (
              <g transform={`translate(${moon.x.toFixed(1)} ${moon.y.toFixed(1)})`} opacity={Math.min(1, pal.stars + 0.2)}>
                <circle r="38" fill="#cfe0ee" opacity=".1" /><circle r="17" fill="#e8f0f7" />
              </g>
            )}
            <g data-cv-par="0.5" opacity=".5"><path d={FAR} fill={pal.facS} transform="translate(-100 0)" /></g>
            <g data-cv-par="0.3" opacity=".8"><path d={MID} fill={pal.shore} transform="translate(-150 0)" /></g>
            <rect x="0" y={HORIZON} width="1200" height={640 - HORIZON} fill="url(#cvSea)" />
            {sun && (
              <g clipPath="url(#cvSeaClip)" stroke="#ffe2b0" strokeLinecap="round" opacity={reflect} className={styles.reflect}>
                {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${(sun.x - (90 - i * 8)).toFixed(1)} ${HORIZON + 8 + i * 22}h${(180 - i * 16).toFixed(1)}`} strokeWidth={2.4 - i * 0.12} opacity={1 - i * 0.07} />)}
              </g>
            )}
            <g fill="none" stroke="#cfe0ee" strokeOpacity=".16" strokeWidth="1" className={styles.waves}>
              <path d="M0 440q60-6 120 0t120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0" />
              <path d="M0 480q80-8 160 0t160 0 160 0 160 0 160 0 160 0 160 0" />
              <path d="M0 520q100-9 200 0t200 0 200 0 200 0 200 0 200 0" />
            </g>

            {/* toà tháp */}
            <g>
              <path d="M505 548V92l30-38h130l30 38v456z" fill={pal.facS} />
              <path d="M505 548V92l30-38h130l30 38v456z" fill="url(#cvLitL)" opacity={wLeft * litBase} />
              <path d="M505 548V92l30-38h130l30 38v456z" fill="url(#cvLitR)" opacity={(1 - wLeft) * litBase} />
              <g fill="#fff3d6" opacity={pal.win} style={{ mixBlendMode: "screen" }}><Tower /></g>
              <Static />
              <path d="M505 548V92l30-38h130l30 38v456z" fill="none" stroke="#e8c9a4" strokeOpacity=".55" strokeWidth="1.4" />
              <path d="M598 54V30M602 54V30" stroke="#e8c9a4" strokeOpacity=".7" />
            </g>
            <path d={`M0 ${560}Q300 530 600 552T1200 538V640H0Z`} fill={pal.shore} />
            <path d="M380 560V500h90v60M730 556V516h70v40" fill={pal.shore} stroke="#cfe0ee" strokeOpacity=".2" />

            {/* đường kích thước kỹ thuật */}
            <g fill="none" stroke="#e8c9a4" strokeOpacity=".7" strokeWidth="1">
              <path d="M468 54V548M460 54h16M460 200h16M460 350h16M460 548h16" />
            </g>
            <g className={styles.dimText} fill="#e8c9a4">
              <text x="452" y="58" textAnchor="end">T36</text><text x="452" y="204" textAnchor="end">T24</text><text x="452" y="354" textAnchor="end">T12</text><text x="452" y="552" textAnchor="end">T01</text>
              <text x="28" y={HORIZON - 12}>Đông · bình minh</text><text x="1172" y={HORIZON - 12} textAnchor="end">Tây · hoàng hôn</text>
            </g>
          </svg>
          <div className={styles.clock} aria-hidden="true"><b>{clockText(hour)}</b><span>{ph.name}</span></div>
        </div>

        <div className={styles.sunCtl} data-cv="reveal">
          <div className={styles.sunSlider}>
            <label htmlFor="cv-hour">Giờ trong ngày</label>
            <input
              id="cv-hour" type="range" min={5.5} max={21} step={0.1} value={hour}
              aria-valuetext={`${clockText(hour)}, ${ph.name.toLowerCase()}`}
              onPointerDown={() => { touched.current = true; tween.current?.kill(); }}
              onKeyDown={() => { touched.current = true; tween.current?.kill(); }}
              onChange={(e) => { touched.current = true; proxy.current.h = Number(e.target.value); setHour(proxy.current.h); }}
              style={{ ["--p" as string]: `${((hour - 5.5) / 15.5) * 100}%` }}
            />
            <div className={styles.sunScale} aria-hidden="true"><span>05:30</span><span>12:00</span><span>21:00</span></div>
          </div>
          <div className={styles.presets} role="group" aria-label="Chọn nhanh thời điểm">
            {PRESETS.map((p) => (
              <button key={p.label} type="button" className={styles.chip} data-on={Math.abs(hour - p.h) < 0.35 ? "1" : "0"} aria-pressed={Math.abs(hour - p.h) < 0.35} onClick={() => { touched.current = true; goTo(p.h); }}>{p.label}</button>
            ))}
          </div>
          <p className={styles.sunNote} aria-live="polite"><b>{clockText(hour)} · {ph.name}.</b> {ph.note}</p>
        </div>
      </div>
    </section>
  );
}
