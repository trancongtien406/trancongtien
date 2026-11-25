"use client";

import { useState } from "react";
import { TiltCard } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { CATEGORIES, MENU, fmtVnd, type MenuCategory } from "../data/menu";
import { Treat } from "./Treat";

const BG = ["var(--mk-butter)", "var(--mk-pink-soft)", "var(--mk-lilac)", "var(--mk-paper)"];

export function Menu() {
  const [cat, setCat] = useState<MenuCategory | "all">("all");
  const [touched, setTouched] = useState(false);
  const items = MENU.filter((m) => cat === "all" || m.cat === cat);
  return (
    <div>
      <div className={s.chips} role="group" aria-label="Lọc theo nhóm món">
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" className={s.chip} aria-pressed={cat === c.id} onClick={() => { setCat(c.id); setTouched(true); }}>
            {c.label}
          </button>
        ))}
      </div>
      <p className={s.srOnly} role="status" aria-live="polite">Đang hiện {items.length} món</p>
      <ul className={s.menuGrid}>
        {items.map((m, i) => (
          <li key={`${cat}-${m.id}`} className={`${s.menuLi} ${touched ? s.popIn : ""}`} data-mk="pop" style={{ animationDelay: `${(i % 8) * 40}ms` }}>
            <TiltCard className={s.tilt} max={9} scale={1.02} glareColor="rgba(255,255,255,0.5)">
              <article className={s.menuCard} style={{ background: BG[i % BG.length] }}>
                <div className={s.menuArt}>
                  <Treat kind={m.kind} colors={m.colors} className={s.treat} />
                  {m.tag && <span className={s.menuTag}>{m.tag}</span>}
                </div>
                <div className={s.menuBody}>
                  <h3 className={s.menuName}>{m.name}</h3>
                  <p className={s.menuDesc}>{m.desc}</p>
                  <p className={s.menuPrice}>
                    <b>{fmtVnd(m.price)}</b>
                    <span>/{" "}{m.unit}</span>
                  </p>
                </div>
              </article>
            </TiltCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
