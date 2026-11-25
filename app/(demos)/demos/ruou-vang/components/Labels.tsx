"use client";

import { useState } from "react";
import { SplitWords } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { KINDS, type WineKind } from "../data/wines";

const TILT = [-2.2, 1.2, -1, 2];

function Grape({ kind }: { kind: WineKind }) {
  // ký hiệu nho/bọt đơn giản cho từng loại
  return (
    <svg viewBox="0 0 48 48" className={s.labGrape} aria-hidden="true" focusable="false">
      {kind === "sui" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="24" cy="30" r="3" /><circle cx="17" cy="20" r="2.2" /><circle cx="31" cy="16" r="2.6" /><circle cx="22" cy="8" r="1.6" /><circle cx="14" cy="34" r="1.6" />
        </g>
      ) : (
        <g fill="currentColor" opacity={kind === "trang" ? 0.55 : kind === "hong" ? 0.75 : 1}>
          <circle cx="16" cy="22" r="5" /><circle cx="26" cy="22" r="5" /><circle cx="21" cy="30" r="5" /><circle cx="31" cy="30" r="5" /><circle cx="26" cy="38" r="5" />
          <path d="M22 17c0-6 4-9 9-9-1 5-4 8-9 9z" />
        </g>
      )}
    </svg>
  );
}

/** Moment riêng: nhãn chai lật. Mặt trước = nhãn giấy trên chai; mặt sau = ghi chú nếm + lối vào thực đơn. */
export function Labels() {
  const [flipped, setFlipped] = useState<Set<WineKind>>(new Set());
  const toggle = (k: WineKind, on?: boolean) =>
    setFlipped((cur) => {
      const n = new Set(cur);
      if (on ?? !n.has(k)) n.add(k); else n.delete(k);
      return n;
    });
  const goMenu = (k: WineKind) => {
    window.dispatchEvent(new CustomEvent("rv:tab", { detail: k }));
    document.getElementById("thuc-don")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  return (
    <section className={s.labels} id="bon-loi" aria-label="Bốn phong cách vang">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Bốn lối vào</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Chọn một nhãn, lật để đọc.</SplitWords>
          <p className={s.mutedP}>Mỗi nhãn là một phong cách. Lật mặt sau để xem vị chính và món hợp.</p>
        </header>
        <ul className={s.labelRow}>
          {KINDS.map((k, i) => {
            const on = flipped.has(k.id);
            return (
              <li key={k.id} className={s.labCell} style={{ "--tilt": `${TILT[i]}deg` } as React.CSSProperties}>
                <div className={s.lab} data-flipped={on || undefined}>
                  <button type="button" className={`${s.labFace} ${s.labFront}`} aria-expanded={on} aria-controls={`rv-lab-${k.id}`} onClick={() => toggle(k.id, true)} tabIndex={on ? -1 : 0}>
                    <span className={s.labRoman} aria-hidden="true">{k.roman}</span>
                    <Grape kind={k.id} />
                    <span className={s.labName}>{k.short}</span>
                    <span className={s.labGrapes}>{k.grapes}</span>
                    <span className={s.labHint}>Lật nhãn</span>
                  </button>
                  <div id={`rv-lab-${k.id}`} className={`${s.labFace} ${s.labBack}`} role="group" aria-label={`${k.label}, mặt sau nhãn`}>
                    <h3 className={s.h3}>{k.label}</h3>
                    <p>{k.note}</p>
                    <p className={s.labPairs}><b>Hợp với</b> {k.pairs}</p>
                    <div className={s.labActs}>
                      <button type="button" className={`${s.btn} ${s.btnGold} ${s.btnSm}`} onClick={() => goMenu(k.id)} tabIndex={on ? 0 : -1}>Xem {k.short.toLowerCase()} trong thực đơn</button>
                      <button type="button" className={s.linkBtn} onClick={() => toggle(k.id, false)} tabIndex={on ? 0 : -1}>Lật lại</button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
