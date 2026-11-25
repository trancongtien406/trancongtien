"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import s from "../brand.module.css";

type Props = {
  value: number; onChange: (v: number) => void; label: string;
  min?: number; max?: number; step?: number; orientation?: "h" | "v";
  valueText?: (v: number) => string; className?: string; id?: string; describedBy?: string;
};

/** Fader kéo được: role="slider", chuột/bút/cảm ứng (Pointer Events + capture), phím mũi tên/Home/End/PageUp/PageDown. */
export function Fader({ value, onChange, label, min = 0, max = 100, step = 1, orientation = "h", valueText, className, id, describedBy }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const vertical = orientation === "v";
  const pct = ((value - min) / (max - min)) * 100;
  const snap = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const fromPointer = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const pad = 14;
    const f = vertical ? 1 - (e.clientY - r.top - pad) / Math.max(1, r.height - pad * 2) : (e.clientX - r.left - pad) / Math.max(1, r.width - pad * 2);
    onChange(snap(min + Math.min(1, Math.max(0, f)) * (max - min)));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId); e.currentTarget.focus({ preventScroll: true }); fromPointer(e);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) fromPointer(e); };
  const key = (e: KeyboardEvent) => {
    const big = Math.max(step, (max - min) / 10);
    const map: Record<string, number | undefined> = {
      ArrowRight: value + step, ArrowUp: value + step, ArrowLeft: value - step, ArrowDown: value - step,
      PageUp: value + big, PageDown: value - big, Home: min, End: max,
    };
    const nv = map[e.key];
    if (nv === undefined) return;
    e.preventDefault(); onChange(snap(nv));
  };
  return (
    <div
      ref={ref} id={id} role="slider" tabIndex={0} aria-label={label} aria-orientation={vertical ? "vertical" : "horizontal"}
      aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-valuetext={valueText ? valueText(value) : undefined} aria-describedby={describedBy}
      className={`${s.fader} ${vertical ? s.faderV : s.faderH} ${className ?? ""}`}
      style={{ ["--n" as string]: (pct / 100).toFixed(4) }}
      onPointerDown={down} onPointerMove={move} onKeyDown={key} data-cursor="Kéo"
    >
      <span className={s.faderRail} aria-hidden="true" />
      <span className={s.faderFill} aria-hidden="true" />
      <span className={s.faderCap} aria-hidden="true"><i /></span>
    </div>
  );
}
