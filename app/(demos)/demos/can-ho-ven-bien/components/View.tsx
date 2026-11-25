"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/features/showroom/effects";
import { SEA_ARC } from "../data/plans";
import { skylinePath } from "./Art";
import styles from "../brand.module.css";

const CX = 100, CY = 100, R = 74;
const pt = (deg: number, r: number) => { const a = ((deg - 90) * Math.PI) / 180; return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const; };
const arc = (a: number, b: number, r: number) => {
  const [x1, y1] = pt(a, r), [x2, y2] = pt(b, r);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${b - a > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};
const wedge = (c: number, w: number) => {
  const [x1, y1] = pt(c - w / 2, R - 6), [x2, y2] = pt(c + w / 2, R - 6);
  return `M${CX} ${CY}L${x1.toFixed(2)} ${y1.toFixed(2)}A${R - 6} ${R - 6} 0 ${w > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}Z`;
};

const NEAR = skylinePath(31, 700, 150, 22, 70, 22, 48);
const FAR = skylinePath(9, 700, 70, 8, 36, 16, 38);

/** La bàn hướng nhìn: cung nhìn xoay theo hướng và tầng; dải cảnh bên cạnh đổi đường chân trời theo tầng. */
export function ViewPanel({ center, width, city, sea, label }: { center: number; width: number; city: number; sea: number; label: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const wedgeRef = useRef<SVGPathElement>(null);
  const cityRef = useRef<SVGGElement>(null);
  const state = useRef({ c: center, w: width, y: city });
  const first = useRef(true);

  useEffect(() => {
    registerGsap();
    const st = state.current;
    const paint = () => wedgeRef.current?.setAttribute("d", wedge(st.c, st.w));
    if (first.current || prefersReducedMotion()) {
      first.current = false;
      st.c = center; st.w = width; st.y = city; paint();
      cityRef.current?.setAttribute("transform", `translate(0 ${city})`);
      return;
    }
    const t = gsap.to(st, { c: center, w: width, y: city, duration: 1.1, ease: "power3.inOut", onUpdate: () => { paint(); cityRef.current?.setAttribute("transform", `translate(0 ${st.y})`); } });
    return () => { t.kill(); };
  }, [center, width, city]);

  const ticks = Array.from({ length: 24 }, (_, i) => { const d = i * 15; const [a, b] = pt(d, R), [c, e] = pt(d, R - (d % 90 === 0 ? 9 : 5)); return <path key={d} d={`M${a.toFixed(1)} ${b.toFixed(1)}L${c.toFixed(1)} ${e.toFixed(1)}`} />; });
  const cards: [string, number][] = [["B", 0], ["Đ", 90], ["N", 180], ["T", 270]];

  return (
    <div className={styles.viewPanel}>
      <svg className={styles.compass} viewBox="0 0 200 200" role="img" aria-label={`La bàn hướng nhìn: ${label}`}>
        <circle cx={CX} cy={CY} r={R} className={styles.cmpRing} />
        <circle cx={CX} cy={CY} r={R - 22} className={styles.cmpRing} opacity=".4" />
        <path d={arc(SEA_ARC[0], SEA_ARC[1], R + 6)} className={styles.cmpSea} />
        <g className={styles.cmpTicks}>{ticks}</g>
        <path ref={wedgeRef} d={wedge(center, width)} className={styles.cmpWedge} />
        {cards.map(([t, d]) => { const [x, y] = pt(d, R + 17); return <text key={t} x={x} y={y + 4} textAnchor="middle" className={styles.cmpCard}>{t}</text>; })}
        <circle cx={CX} cy={CY} r="3" className={styles.cmpDot} />
      </svg>
      <div className={styles.pano}>
        <svg viewBox="0 0 350 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`ps${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#35598a" /><stop offset="1" stopColor="#d8b08a" /></linearGradient>
            <linearGradient id={`pw${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a5a86" /><stop offset="1" stopColor="#12304f" /></linearGradient>
          </defs>
          <rect width="350" height="190" fill={`url(#ps${uid})`} />
          <rect y="78" width="350" height="112" fill={`url(#pw${uid})`} />
          <path d={FAR} transform="translate(-30 20)" fill="#2b4568" opacity=".75" />
          <g ref={cityRef}><path d={NEAR} transform="translate(-60 -50)" fill="#0d1d37" /><rect y="100" width="350" height="260" fill="#0d1d37" /></g>
          <g fill="none" stroke="#e8c9a4" strokeOpacity=".5" strokeWidth="1"><path d="M0 78H350" /><path d="M175 0V190M0 95H350" opacity=".35" /></g>
        </svg>
        <span className={styles.panoTag}>Khung nhìn từ cửa sổ</span>
      </div>
      <p className={styles.seaPct}><b>{Math.round(sea * 100)}%</b><span>góc nhìn mở ra biển, ước tính theo hướng và tầng</span></p>
    </div>
  );
}
