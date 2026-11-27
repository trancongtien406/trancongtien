"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";

const NOTES = [
  { k: "Hương đầu", t: "Cam đắng, tiêu hồng, lá cà chua", d: "Mở ra trong mười lăm phút đầu: sáng, se và hơi bất ngờ." },
  { k: "Hương giữa", t: "Hoa nhài đêm, trà đen, hồng nhung", d: "Quyện vào da, giữ nhịp trong nhiều giờ: ấm và mềm." },
  { k: "Hương cuối", t: "Tuyết tùng, hổ phách, xạ hương trắng", d: "Còn lại sau cùng, như mùi áo len treo cạnh cửa sổ." },
];

/* Vị trí tâm các giọt trong mặt nạ (viewBox 1600x900). */
const BLOBS: [number, number][] = [[800, 450], [420, 300], [1180, 330], [560, 640], [1060, 620], [800, 120], [800, 800]];

function Bottle({ body, line, accent }: { body: string; line: string; accent: string }) {
  return (
    <g transform="translate(800 470)">
      <ellipse cx="0" cy="238" rx="150" ry="16" fill="#000" opacity=".25" />
      <rect x="-110" y="-120" width="220" height="350" rx="34" fill={body} stroke={line} strokeWidth="2" />
      <rect x="-82" y="-86" width="164" height="226" rx="18" fill="none" stroke={line} strokeWidth="1.5" opacity=".7" />
      <path d="M-60 40 Q0 -40 60 40" fill="none" stroke={accent} strokeWidth="2" />
      <rect x="-34" y="-168" width="68" height="52" rx="6" fill={body} stroke={line} strokeWidth="2" />
      <rect x="-56" y="-232" width="112" height="70" rx="14" fill={accent} />
      <text x="0" y="160" textAnchor="middle" className={styles.svgTiny} fill={line}>HƯƠNG ẨN · No.7</text>
    </g>
  );
}

export function LiquidStage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const m1 = gsap.utils.toArray<SVGCircleElement>("[data-m1] circle");
      const m2 = gsap.utils.toArray<SVGCircleElement>("[data-m2] circle");
      const notes = gsap.utils.toArray<HTMLElement>("[data-note]");
      const blur = el.querySelector("[data-blur]");
      el.setAttribute("data-pinned", "1");
      gsap.set([...m1, ...m2], { attr: { r: 0 } });
      gsap.set(notes, { autoAlpha: (i) => (i === 0 ? 1 : 0.28) });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: el, start: "top top", end: "+=320%", pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
      });
      const open = (circles: SVGCircleElement[], at: number) => {
        tl.to(circles, { attr: { r: (i: number) => 520 + i * 90 }, duration: 1.6, stagger: 0.12 }, at);
        tl.fromTo(blur, { attr: { stdDeviation: 0 } }, { attr: { stdDeviation: 9 }, duration: 0.8, yoyo: true, repeat: 1 }, at + 0.3);
      };
      tl.to(notes[0], { autoAlpha: 1, duration: 0.1 }, 0);
      open(m1, 0.6);
      tl.to(notes[0], { autoAlpha: 0.28, duration: 0.4 }, 1.2).to(notes[1], { autoAlpha: 1, duration: 0.4 }, 1.4);
      open(m2, 3.2);
      tl.to(notes[1], { autoAlpha: 0.28, duration: 0.4 }, 3.8).to(notes[2], { autoAlpha: 1, duration: 0.4 }, 4);
      tl.to({}, { duration: 1 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.liquid} aria-labelledby="ha-liquid-h" id="hanh-trinh">
      <h2 id="ha-liquid-h" className={styles.srOnly}>Hành trình ba tầng hương của No.7</h2>
      <svg className={styles.stage} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <filter id="ha-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="26" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" />
          </filter>
          <filter id="ha-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur data-blur stdDeviation="0" />
          </filter>
          <radialGradient id="ha-g0" cx="30%" cy="30%" r="80%"><stop offset="0" stopColor="#3a2a35" /><stop offset="1" stopColor="#241B21" /></radialGradient>
          <radialGradient id="ha-g1" cx="70%" cy="25%" r="85%"><stop offset="0" stopColor="#e3b8bd" /><stop offset="1" stopColor="#C799A0" /></radialGradient>
          <radialGradient id="ha-g2" cx="50%" cy="20%" r="90%"><stop offset="0" stopColor="#fff4ea" /><stop offset="1" stopColor="#F5E6D8" /></radialGradient>
          <mask id="ha-mask1" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
            <g data-m1 filter="url(#ha-goo)" fill="#fff">{BLOBS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="0" />)}</g>
          </mask>
          <mask id="ha-mask2" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900">
            <g data-m2 filter="url(#ha-goo)" fill="#fff">{BLOBS.map(([x, y], i) => <circle key={i} cx={x + (i % 2 ? 90 : -90)} cy={y + (i % 3 ? 40 : -40)} r="0" />)}</g>
          </mask>
        </defs>
        <g filter="url(#ha-blur)">
          <rect width="1600" height="900" fill="url(#ha-g0)" />
          <text x="800" y="560" textAnchor="middle" className={styles.svgBig} fill="#C799A0" opacity=".16">Mở</text>
          <Bottle body="#2e222a" line="#C799A0" accent="#C799A0" />
        </g>
        <g mask="url(#ha-mask1)">
          <rect width="1600" height="900" fill="url(#ha-g1)" />
          <text x="800" y="560" textAnchor="middle" className={styles.svgBig} fill="#241B21" opacity=".14">Quyện</text>
          <Bottle body="#d9a9ae" line="#241B21" accent="#241B21" />
        </g>
        <g mask="url(#ha-mask2)">
          <rect width="1600" height="900" fill="url(#ha-g2)" />
          <text x="800" y="560" textAnchor="middle" className={styles.svgBig} fill="#241B21" opacity=".1">Lưu</text>
          <Bottle body="#f0d9c7" line="#241B21" accent="#a8636f" />
        </g>
      </svg>
      <ol className={styles.notes}>
        {NOTES.map((n, i) => (
          <li key={n.k} data-note className={styles.note}>
            <span className={styles.noteNo}>0{i + 1}</span>
            <strong>{n.k}</strong>
            <em>{n.t}</em>
            <span>{n.d}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
