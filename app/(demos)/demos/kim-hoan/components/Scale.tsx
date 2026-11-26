"use client";

import { useId, useState } from "react";
import { DEFAULT_GOLD_24K_PER_GRAM, LABOR_BASE, PURITY_24K, formatGram, formatVnd } from "../data/pricing";
import styles from "../brand.module.css";

const KARATS = [
  { k: "10K", p: 0.417 },
  { k: "14K", p: 0.585 },
  { k: "18K", p: 0.75 },
  { k: "24K", p: PURITY_24K },
] as const;
const GROUPS = [
  { id: "ring", label: "Nhẫn" },
  { id: "pendant", label: "Mặt dây" },
  { id: "earring", label: "Bông tai" },
  { id: "bracelet", label: "Lắc tay" },
] as const;
const WEIGHTS = [10, 5, 2, 1, 0.5];

/** Tách trọng lượng thành các quả cân (10 g, 5 g, 2 g, 1 g, 0,5 g) như khi cân tiểu ly. */
export function weightsFor(g: number): number[] {
  let left = Math.round(g * 2) / 2;
  const out: number[] = [];
  for (const w of WEIGHTS) {
    while (left + 1e-9 >= w) {
      out.push(w);
      left -= w;
    }
  }
  return out;
}

/**
 * Cân tiểu ly: kéo trọng lượng, chọn tuổi vàng; đòn cân lắc rồi cân bằng khi quả cân khớp trọng lượng món.
 * Bên dưới là công thức tiền vàng + công (tham khảo). Đơn giá vàng 24K nhập được (không phải giá thời gian thực).
 */
export function Scale() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [grams, setGrams] = useState(5);
  const [karat, setKarat] = useState<(typeof KARATS)[number]["k"]>("18K");
  const [group, setGroup] = useState<(typeof GROUPS)[number]["id"]>("ring");
  const [rate, setRate] = useState(String(DEFAULT_GOLD_24K_PER_GRAM));
  const [swing, setSwing] = useState(0);

  const p = KARATS.find((x) => x.k === karat)!.p;
  const unit = Number(rate.replace(/[^0-9]/g, ""));
  const bad = !(unit > 0);
  const metal = bad ? 0 : grams * p * unit;
  const labor = LABOR_BASE[group] * (grams / 3 > 1.6 ? 1.6 : Math.max(0.7, grams / 3));
  const wts = weightsFor(grams);
  const pct = String(Math.round(p * 1000) / 10).replace(".", ",");

  const onGrams = (v: number) => {
    setGrams(v);
    setSwing((n) => n + 1);
  };

  return (
    <div className={styles.scale} data-kn="scale" data-testid="scale">
      <div className={styles.scaleStage} aria-hidden="true">
        <svg viewBox="0 0 400 250" focusable="false">
          <defs>
            <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6e49a" />
              <stop offset=".5" stopColor="#c9a227" />
              <stop offset="1" stopColor="#8a6d12" />
            </linearGradient>
          </defs>
          <path d="M200 50V214M150 222h100" stroke="#8a6d12" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M184 222c2-18 30-18 32 0z" fill="#8a6d12" />
          <g key={swing} className={styles.beam} style={{ transformOrigin: "200px 50px" }}>
            <path d="M52 50H348" stroke="#c9a227" strokeWidth="5" strokeLinecap="round" />
            <circle cx="200" cy="50" r="7" fill={`url(#${uid}-g)`} />
            {/* đĩa trái: vàng */}
            <g className={styles.pan}>
              <path d="M52 50L18 150M52 50L86 150" stroke="#b9b09b" strokeWidth="1" />
              <path d="M10 150h84c-4 16-20 24-42 24s-38-8-42-24z" fill={`url(#${uid}-g)`} />
              <g transform={`translate(52 ${150 - 12 - Math.min(grams, 12) * 1.6})`}>
                <rect x={-14 - grams * 0.9} y="0" width={28 + grams * 1.8} height={12 + Math.min(grams, 12) * 1.6} rx="2" fill="#ebd57e" stroke="#8a6d12" />
              </g>
            </g>
            {/* đĩa phải: quả cân */}
            <g className={styles.pan}>
              <path d="M348 50L314 150M348 50L382 150" stroke="#b9b09b" strokeWidth="1" />
              <path d="M306 150h84c-4 16-20 24-42 24s-38-8-42-24z" fill="#5c4a12" />
              {wts.slice(0, 6).map((w, i) => (
                <g key={i} transform={`translate(${322 + (i % 3) * 22} ${140 - Math.floor(i / 3) * 18})`}>
                  <rect width="18" height="16" rx="2" fill="#c9a227" stroke="#0a0a0a" strokeWidth=".6" />
                  <text x="9" y="11.5" textAnchor="middle" fontSize="8" fill="#0a0a0a" fontFamily="sans-serif" fontWeight="600">{String(w).replace(".", ",")}</text>
                </g>
              ))}
            </g>
          </g>
        </svg>
        <p className={styles.scaleWts}>
          Quả cân: {wts.map((w) => `${String(w).replace(".", ",")} g`).join(" + ")}
        </p>
      </div>

      <div className={styles.scaleCtl}>
        <div className={styles.rangeRow}>
          <label htmlFor={`${uid}-w`}>Trọng lượng món</label>
          <output htmlFor={`${uid}-w`} data-testid="scale-g">{formatGram(grams)} g</output>
          <input id={`${uid}-w`} type="range" min={1} max={12} step={0.5} value={grams} onChange={(e) => onGrams(Number(e.target.value))} />
        </div>
        <fieldset className={styles.fs}>
          <legend>Tuổi vàng</legend>
          <div className={styles.chips} style={{ ["--cols" as string]: 4 }}>
            {KARATS.map((x) => (
              <label key={x.k} className={styles.chip}>
                <input type="radio" name={`${uid}-karat`} checked={karat === x.k} onChange={() => setKarat(x.k)} />
                <span><b>{x.k}</b></span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={styles.fs}>
          <legend>Công chế tác theo nhóm</legend>
          <div className={styles.chips} style={{ ["--cols" as string]: 4 }}>
            {GROUPS.map((x) => (
              <label key={x.id} className={styles.chip}>
                <input type="radio" name={`${uid}-grp`} checked={group === x.id} onChange={() => setGroup(x.id)} />
                <span><b>{x.label}</b></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={styles.priceRow}>
          <label htmlFor={`${uid}-r`}>Đơn giá vàng 24K tham khảo (đồng mỗi gam)</label>
          <input id={`${uid}-r`} inputMode="numeric" value={rate} onChange={(e) => setRate(e.target.value)} aria-invalid={bad} aria-describedby={`${uid}-rn`} />
          <p id={`${uid}-rn`} className={bad ? styles.err : styles.fsHint}>
            {bad ? "Nhập đơn giá lớn hơn 0 để tính." : "Mức tham khảo do tiệm đặt, bạn chỉnh được. Không phải giá vàng thời gian thực."}
          </p>
        </div>
      </div>

      <div className={styles.scaleMath} aria-live="polite" data-testid="scale-math">
        <p className={styles.mathLine}>
          <span>Tiền vàng</span>
          <b>{formatGram(grams)} g × {pct}% × {bad ? "?" : formatVnd(unit)}</b>
          <em>{bad ? "—" : formatVnd(metal)}</em>
        </p>
        <p className={styles.mathLine}>
          <span>Công chế tác (khoảng)</span>
          <b>theo nhóm {GROUPS.find((x) => x.id === group)!.label.toLowerCase()}</b>
          <em>{formatVnd(labor)}</em>
        </p>
        <p className={`${styles.mathLine} ${styles.mathTotal}`}>
          <span>Chưa gồm đá, cộng lại</span>
          <b />
          <em>{bad ? "—" : formatVnd(metal + labor)}</em>
        </p>
      </div>
    </div>
  );
}
