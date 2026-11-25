"use client";

import { useEffect, useId, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/features/showroom/effects";
import { PLAN_VIEW, ROOM_INFO, SCALE as S, SLOTS, UNITS, area, planOf, slotsOf, type Furnish, type SlotId, type UnitId } from "../data/plans";
import { num } from "../lib/finance";
import styles from "../brand.module.css";

type Box = { x: number; y: number; w: number; h: number };
const meta = (u: UnitId) => UNITS.find((x) => x.id === u)!;
const R = (x: number, y: number, w: number, h: number) => `M${x.toFixed(1)} ${y.toFixed(1)}h${w.toFixed(1)}v${h.toFixed(1)}h${(-w).toFixed(1)}z`;
const C = (cx: number, cy: number, r: number) => `M${(cx - r).toFixed(1)} ${cy.toFixed(1)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

function box(u: UnitId, s: SlotId): Box | null {
  const r = planOf(u)[s]; if (!r) return null;
  const m = meta(u);
  return { x: m.originX + r.x * S, y: m.originY + r.y * S, w: r.w * S, h: r.h * S };
}
function shell(u: UnitId): Box { const m = meta(u); return { x: m.originX, y: m.originY + 1.6 * S, w: m.inner.w * S, h: m.inner.h * S }; }
function collapsed(u: UnitId): Box { const b = shell(u); return { x: b.x + b.w / 2, y: b.y + b.h / 2, w: 0, h: 0 }; }
function windowEnd(u: UnitId) { return meta(u).originX + meta(u).inner.w * S; }

type Fx = { key: string; d: string };
function furniture(u: UnitId, furnish: Furnish): Fx[] {
  const out: Fx[] = [];
  const full = furnish === "day-du";
  for (const s of slotsOf(u)) {
    const b = box(u, s)!; const { x: X, y: Y, w: W, h: H } = b;
    const add = (k: string, d: string) => out.push({ key: `${s}-${k}`, d });
    if (s === "balcony" && full) { add("t", C(X + W * 0.72, Y + H * 0.5, 6)); add("c1", C(X + W * 0.55, Y + H * 0.5, 7)); add("c2", C(X + W * 0.89, Y + H * 0.5, 7)); }
    if (s === "living" && full) {
      add("sofa", R(X + W * 0.12, Y + H * 0.64, W * 0.52, H * 0.25)); add("back", R(X + W * 0.12, Y + H * 0.58, W * 0.52, H * 0.07));
      add("tab", R(X + W * 0.3, Y + H * 0.34, W * 0.2, H * 0.17)); add("tv", R(X + 3, Y + H * 0.25, 8, H * 0.35));
      if (u !== "1pn") { add("din", R(X + W * 0.68, Y + H * 0.3, W * 0.22, H * 0.34)); [0.36, 0.58].forEach((f, i) => { add(`dc${i}`, C(X + W * 0.64, Y + H * f, 4)); add(`dd${i}`, C(X + W * 0.94, Y + H * f, 4)); }); }
    }
    if (s === "kitchen") {
      add("cnt", R(X + 5, Y + H - 5 - H * 0.2, W - 10, H * 0.2)); add("sink", C(X + W * 0.6, Y + H - 5 - H * 0.1, 5));
      add("l", R(X + 5, Y + 5, W * 0.17, H - 10 - H * 0.2)); add("hob", C(X + 5 + W * 0.085, Y + H * 0.35, 5));
      if (full) { add("isl", R(X + W * 0.36, Y + H * 0.3, W * 0.42, H * 0.16)); add("s1", C(X + W * 0.46, Y + H * 0.56, 5)); add("s2", C(X + W * 0.66, Y + H * 0.56, 5)); }
    }
    if (s === "entry") {
      const hx = X + W * 0.2, ry = Y + H, rr = Math.min(W * 0.6, 40);
      add("door", `M${(hx + rr).toFixed(1)} ${ry.toFixed(1)}A${rr} ${rr} 0 0 0 ${hx.toFixed(1)} ${(ry - rr).toFixed(1)}M${hx.toFixed(1)} ${ry.toFixed(1)}V${(ry - rr).toFixed(1)}`);
      if (full) add("shoe", R(X + W - 12, Y + 6, 8, H * 0.4));
    }
    if (s === "bed1" && full) {
      add("bed", R(X + W * 0.26, Y + H * 0.14, W * 0.46, H * 0.66)); add("hd", R(X + W * 0.26, Y + H * 0.14, W * 0.46, 5));
      add("p1", R(X + W * 0.3, Y + H * 0.2, W * 0.17, H * 0.1)); add("p2", R(X + W * 0.51, Y + H * 0.2, W * 0.17, H * 0.1));
      add("n1", R(X + W * 0.14, Y + H * 0.14, 14, 14)); add("n2", R(X + W * 0.77, Y + H * 0.14, 14, 14)); add("w", R(X + 6, Y + H - 12, W - 12, 8));
    }
    if ((s === "bed2" || s === "bed3") && full) {
      add("bed", R(X + W * 0.18, Y + H * 0.2, W * 0.64, H * 0.52)); add("p", R(X + W * 0.24, Y + H * 0.25, W * 0.22, H * 0.1)); add("desk", R(X + W * 0.1, Y + H - 12, W * 0.8, 8));
    }
    if (s === "bath1" || s === "bath2") {
      const m = Math.min(W, H) * 0.42;
      add("wc", R(X + W - 24, Y + 6, 16, 11)); add("wcb", C(X + W - 16, Y + 24, 7));
      add("van", R(X + 6, Y + 6, Math.min(W * 0.42, 44), 16)); add("sh", R(X + 6, Y + H - 6 - m, m, m)); add("shd", `M${(X + 6).toFixed(1)} ${(Y + H - 6).toFixed(1)}L${(X + 6 + m).toFixed(1)} ${(Y + H - 6 - m).toFixed(1)}`);
    }
  }
  return out;
}

export function FloorPlan({ unit, furnish, active, onActive }: { unit: UnitId; furnish: Furnish; active: SlotId; onActive: (s: SlotId) => void }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const initial = useRef(unit).current;
  const prev = useRef(unit);
  const rects = useRef<Partial<Record<SlotId, SVGRectElement | null>>>({});
  const groups = useRef<Partial<Record<SlotId, SVGGElement | null>>>({});
  const shellRef = useRef<SVGRectElement>(null);
  const winRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    registerGsap();
    if (prev.current === unit) return;
    prev.current = unit;
    const still = prefersReducedMotion();
    const d = still ? 0 : 0.95;
    for (const s of SLOTS) {
      const el = rects.current[s]; if (!el) continue;
      const b = box(unit, s) ?? collapsed(unit);
      gsap.to(el, { attr: { x: b.x, y: b.y, width: b.w, height: b.h }, duration: d, ease: "power3.inOut", overwrite: true });
    }
    const sh = shell(unit);
    if (shellRef.current) gsap.to(shellRef.current, { attr: { x: sh.x, y: sh.y, width: sh.w, height: sh.h }, duration: d, ease: "power3.inOut", overwrite: true });
    if (winRef.current) gsap.to(winRef.current, { attr: { d: `M${sh.x} ${sh.y}H${windowEnd(unit)}` }, duration: d, ease: "power3.inOut", overwrite: true });
  }, [unit]);

  const present = slotsOf(unit);
  const sh = shell(unit);
  const dimY = sh.y + sh.h + 20;
  const keyNav = (e: React.KeyboardEvent, s: SlotId) => {
    const i = present.indexOf(s);
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % present.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + present.length) % present.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = present.length - 1;
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActive(s); return; }
    else return;
    e.preventDefault();
    groups.current[present[n]]?.focus();
    onActive(present[n]);
  };

  return (
    <svg className={styles.fp} viewBox={`0 0 ${PLAN_VIEW.w} ${PLAN_VIEW.h}`} role="group" aria-label={`Mặt bằng ${meta(unit).label}. Dùng phím mũi tên để chuyển giữa các phòng.`} data-unit={unit}>
      <defs>
        <pattern id={`g${uid}`} width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0V22" fill="none" stroke="currentColor" strokeOpacity=".08" /></pattern>
      </defs>
      <rect width={PLAN_VIEW.w} height={PLAN_VIEW.h} fill={`url(#g${uid})`} />
      <g className={styles.fpSea}>
        <path d="M230 14q10-7 20 0t20 0 20 0 20 0 20 0 20 0 20 0" />
        <text x="300" y="30" textAnchor="middle">PHÍA BIỂN</text>
      </g>

      <g className={styles.fpRooms}>
        {SLOTS.map((s) => {
          const here = present.includes(s);
          const b = box(initial, s) ?? collapsed(initial);
          const info = ROOM_INFO[s](unit);
          const r = planOf(unit)[s];
          return (
            <g
              key={s}
              ref={(el) => { groups.current[s] = el; }}
              className={styles.fpRoom}
              data-slot={s}
              data-present={here ? "1" : "0"}
              data-active={here && active === s ? "1" : "0"}
              role="button"
              tabIndex={here ? 0 : -1}
              aria-hidden={here ? undefined : true}
              aria-pressed={here && active === s}
              aria-label={r ? `${info.name}, ${num.format(area(r))} mét vuông` : undefined}
              data-cursor="Xem phòng"
              onPointerEnter={(e) => { if (e.pointerType === "mouse" && here) onActive(s); }}
              onFocus={() => here && onActive(s)}
              onClick={() => here && onActive(s)}
              onKeyDown={(e) => here && keyNav(e, s)}
            >
              <rect ref={(el) => { rects.current[s] = el; }} className={s === "balcony" ? styles.fpBalc : styles.fpRect} x={b.x} y={b.y} width={b.w} height={b.h} />
            </g>
          );
        })}
      </g>
      <rect ref={shellRef} className={styles.fpShell} x={shell(initial).x} y={shell(initial).y} width={shell(initial).w} height={shell(initial).h} />
      <path ref={winRef} className={styles.fpWin} d={`M${shell(initial).x} ${shell(initial).y}H${windowEnd(initial)}`} />

      <g key={`${unit}-${furnish}`} className={styles.fpFurn} aria-hidden="true">
        {furniture(unit, furnish).map((f, i) => <path key={f.key} pathLength={1} d={f.d} style={{ animationDelay: `${0.5 + i * 0.012}s` }} />)}
      </g>

      <g key={`${unit}-lab`} className={styles.fpLabels} aria-hidden="true">
        {present.map((s) => {
          const b = box(unit, s)!; const r = planOf(unit)[s]!;
          const small = b.w < 96 || b.h < 56;
          return (
            <text key={s} x={b.x + b.w / 2} y={b.y + b.h / 2 - (small ? 0 : 4)} textAnchor="middle" data-on={active === s ? "1" : "0"}>
              {!small && <tspan x={b.x + b.w / 2} dy="0" className={styles.fpName}>{ROOM_INFO[s](unit).name}</tspan>}
              <tspan x={b.x + b.w / 2} dy={small ? "0.35em" : "1.35em"} className={styles.fpArea}>{num.format(area(r))} m²</tspan>
            </text>
          );
        })}
      </g>

      <g key={`${unit}-dim`} className={styles.fpDim} aria-hidden="true">
        <path pathLength={1} d={`M${sh.x} ${dimY}H${sh.x + sh.w}M${sh.x} ${dimY - 5}v10M${sh.x + sh.w} ${dimY - 5}v10`} />
        <path pathLength={1} d={`M${sh.x - 18} ${sh.y}V${sh.y + sh.h}M${sh.x - 23} ${sh.y}h10M${sh.x - 23} ${sh.y + sh.h}h10`} />
        <text x={sh.x + sh.w / 2} y={dimY + 15} textAnchor="middle">{num.format(meta(unit).inner.w)} m</text>
        <text x={sh.x - 28} y={sh.y + sh.h / 2} textAnchor="middle" transform={`rotate(-90 ${sh.x - 28} ${sh.y + sh.h / 2})`}>{num.format(meta(unit).inner.h)} m</text>
      </g>
      <g className={styles.fpScale} aria-hidden="true">
        <path d="M486 498h88M486 493v10M530 493v10M574 493v10" /><text x="486" y="486">0</text><text x="574" y="486" textAnchor="end">2 m</text>
      </g>
    </svg>
  );
}
