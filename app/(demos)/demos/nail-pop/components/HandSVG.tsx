"use client";

import { useId } from "react";
import type { Charm, Len, Pattern, Shape } from "../data/content";
import s from "../brand.module.css";

/** Bàn tay xem trước: SVG thuần, nhận cấu hình và vẽ lại ngay (không state nội bộ). */

type Finger = { x: number; y: number; rot: number; len: number; w: number };
const FINGERS: Finger[] = [
  { x: 118, y: 338, rot: -58, len: 124, w: 58 }, // cái
  { x: 168, y: 262, rot: -13, len: 150, w: 54 }, // trỏ
  { x: 220, y: 248, rot: -1, len: 168, w: 56 }, // giữa
  { x: 272, y: 258, rot: 11, len: 152, w: 52 }, // áp út
  { x: 312, y: 292, rot: 25, len: 116, w: 45 }, // út
];
const NAIL_H: Record<Len, number> = { ngan: 40, vua: 54, dai: 72 };
const CHARM_ORDER = [3, 0, 2, 1, 4];
const SKIN = "#ffd9c7";
const INK = "#0d0d0f";

export function nailPath(shape: Shape, w: number, h: number) {
  const hw = w / 2;
  const f = (n: number) => +n.toFixed(1);
  switch (shape) {
    case "oval":
      return `M${-hw},0 L${-hw},${f(-h * 0.55)} C${-hw},${f(-h * 0.92)} ${f(-w * 0.24)},${-h} 0,${-h} C${f(w * 0.24)},${-h} ${hw},${f(-h * 0.92)} ${hw},${f(-h * 0.55)} L${hw},0 Q0,7 ${-hw},0Z`;
    case "almond": {
      const t = w * 0.13;
      return `M${-hw},0 L${-hw},${f(-h * 0.34)} C${-hw},${f(-h * 0.7)} ${f(-t * 1.9)},${f(-h * 0.9)} ${f(-t)},${-h} Q0,${-h - 4} ${f(t)},${-h} C${f(t * 1.9)},${f(-h * 0.9)} ${hw},${f(-h * 0.7)} ${hw},${f(-h * 0.34)} L${hw},0 Q0,7 ${-hw},0Z`;
    }
    case "coffin":
      return `M${-hw},0 L${-hw},${f(-h * 0.42)} L${f(-w * 0.31)},${-h + 4} Q${f(-w * 0.31)},${-h} ${f(-w * 0.26)},${-h} L${f(w * 0.26)},${-h} Q${f(w * 0.31)},${-h} ${f(w * 0.31)},${-h + 4} L${hw},${f(-h * 0.42)} L${hw},0 Q0,7 ${-hw},0Z`;
    default:
      return `M${-hw},0 L${-hw},${-h + 7} Q${-hw},${-h} ${-hw + 7},${-h} L${hw - 7},${-h} Q${hw},${-h} ${hw},${-h + 7} L${hw},0 Q0,7 ${-hw},0Z`;
  }
}

const star = "M0,-9 Q1.6,-1.6 9,0 Q1.6,1.6 0,9 Q-1.6,1.6 -9,0 Q-1.6,-1.6 0,-9Z";
const heart = "M0,6 C-9,0 -8,-8 -3,-7 C-1,-6.5 0,-5 0,-4 C0,-5 1,-6.5 3,-7 C8,-8 9,0 0,6Z";

export type HandProps = {
  colors: string[]; // 5 màu gốc
  accent?: string;
  shape?: Shape;
  length?: Len;
  pattern?: Pattern;
  charm?: Charm;
  charmCount?: number;
  sparkle?: boolean;
  label: string;
  className?: string;
};

export function HandSVG({ colors, accent = "#ffffff", shape = "almond", length = "vua", pattern = "tron", charm = "khong", charmCount = 0, sparkle = true, label, className }: HandProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const nh = NAIL_H[length];
  const charmSet = new Set(charm === "khong" ? [] : CHARM_ORDER.slice(0, charmCount));
  const hand = (
    <>
      {FINGERS.map((f, i) => (
        <rect key={i} x={f.x - f.w / 2} y={f.y - f.len} width={f.w} height={f.len + 40} rx={f.w / 2} transform={`rotate(${f.rot} ${f.x} ${f.y})`} />
      ))}
      <path d="M104 322 C100 280 132 262 176 270 L296 262 C330 280 344 330 340 372 C336 410 318 436 300 462 L130 462 C122 420 108 372 104 322Z" />
    </>
  );
  return (
    <svg className={`${s.hand} ${className ?? ""}`} viewBox="0 0 420 470" role="img" aria-label={label} data-hand="">
      <defs>
        {FINGERS.map((f, i) => {
          const w = f.w * 0.8;
          const d = nailPath(shape, w, nh);
          return (
            <g key={i}>
              <clipPath id={`${uid}c${i}`}><path d={d} /></clipPath>
              <linearGradient id={`${uid}o${i}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0.15" style={{ stopColor: colors[i], transition: "stop-color .3s" }} />
                <stop offset="1" style={{ stopColor: accent, transition: "stop-color .3s" }} />
              </linearGradient>
            </g>
          );
        })}
        <linearGradient id={`${uid}m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#9fb4ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* bóng cứng kiểu pop */}
      <g transform="translate(12 12)" fill={INK} stroke={INK} strokeWidth="10" strokeLinejoin="round">{hand}</g>
      <g fill={INK} stroke={INK} strokeWidth="10" strokeLinejoin="round">{hand}</g>
      <g fill={SKIN}>{hand}</g>
      <path d="M150 330 Q170 350 200 340 M232 336 Q262 352 290 336" fill="none" stroke="#e9b9a3" strokeWidth="4" strokeLinecap="round" />
      {FINGERS.map((f, i) => {
        const w = f.w * 0.8;
        const d = nailPath(shape, w, nh);
        const y0 = -f.len + 42;
        const baseFill = pattern === "ombre" ? `url(#${uid}o${i})` : colors[i];
        return (
          <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rot})`}>
            <g transform={`translate(0 ${y0})`}>
              <g data-nail="">
                <path d={d} transform="translate(4 4)" fill={INK} />
                <g clipPath={`url(#${uid}c${i})`}>
                  <rect x={-w} y={-nh - 4} width={w * 2} height={nh + 14} style={{ fill: baseFill, transition: "fill .3s" }} />
                  {pattern === "french" && (
                    <path d={`M${-w},${-nh - 4} H${w} V${-nh * 0.42} Q0,${-nh * 0.18} ${-w},${-nh * 0.42}Z`} style={{ fill: accent, transition: "fill .3s" }} />
                  )}
                  {pattern === "cham" &&
                    [[-0.22, 0.28], [0.2, 0.42], [-0.05, 0.62], [0.24, 0.8], [-0.24, 0.84]].map(([dx, dy], k) => (
                      <circle key={k} cx={dx * w} cy={-nh * (1 - dy)} r={w * 0.075} style={{ fill: accent, transition: "fill .3s" }} />
                    ))}
                  {pattern === "chrome" && <rect x={-w} y={-nh - 4} width={w * 2} height={nh + 14} fill={`url(#${uid}m)`} />}
                </g>
                <path d={d} fill="none" stroke={INK} strokeWidth="3.4" strokeLinejoin="round" />
                <path d={`M${-w * 0.26},${-nh * 0.22} L${-w * 0.26},${-nh * 0.62}`} stroke="#fff" strokeOpacity="0.85" strokeWidth="4" strokeLinecap="round" />
                {charmSet.has(i) && (
                  <g transform={`translate(0 ${-nh * 0.58})`} className={s.charm}>
                    {charm === "sao" && <path d={star} transform="scale(1.1)" fill="#e6ff00" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />}
                    {charm === "ngoc" && (<><circle r="6.5" fill="#fff" stroke={INK} strokeWidth="1.8" /><circle cx="-2" cy="-2" r="1.8" fill="#ffd9ec" /></>)}
                    {charm === "tim" && <path d={heart} transform="scale(1.1)" fill="#ff2e93" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />}
                  </g>
                )}
              </g>
            </g>
          </g>
        );
      })}
      {sparkle && (
        <g aria-hidden="true">
          {[[58, 120, 0], [372, 190, 0.7], [352, 70, 1.4], [78, 232, 2.1]].map(([x, y, dl], k) => (
            <g key={k} transform={`translate(${x} ${y}) scale(${k % 2 ? 1.5 : 1.9})`}>
              <path className={s.sparkle} d={star} style={{ animationDelay: `${dl}s` }} fill={k % 2 ? "#ff2e93" : "#1f3bff"} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/** Icon dáng móng nhỏ cho nút chọn dáng. */
export function ShapeIcon({ shape }: { shape: Shape }) {
  return (
    <svg viewBox="-24 -64 48 76" width="34" height="52" aria-hidden="true">
      <path d={nailPath(shape, 36, 56)} fill="#ff2e93" stroke={INK} strokeWidth="3.4" strokeLinejoin="round" />
    </svg>
  );
}
