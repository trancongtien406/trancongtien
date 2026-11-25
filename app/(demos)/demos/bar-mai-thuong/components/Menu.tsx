"use client";

import { useState } from "react";
import { CursorSpotlight, SplitWords } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { DRINKS, FLAVORS, vnd, type Drink } from "../data/menu";

const TABS = [
  { id: "all", label: "Tất cả" },
  { id: "alc", label: "Có cồn" },
  { id: "zero", label: "Không cồn" },
  { id: "bite", label: "Món nhắm" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const filt = (t: Tab, d: Drink) => t === "all" || (t === "alc" && d.kind === "cocktail") || (t === "zero" && d.kind === "mocktail") || (t === "bite" && d.kind === "bite");

export function Menu() {
  const [tab, setTab] = useState<Tab>("all");
  const list = DRINKS.filter((d) => filt(tab, d));
  return (
    <section className={s.menu} id="thuc-don" aria-label="Thực đơn">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Phòng pha chế</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Mỗi ly một sắc thái</SplitWords>
          <p className={s.mutedP}>Từ những ly tươi sáng, dễ làm quen đến các kết hợp đậm và nhiều lớp. Giá ghi là giá tham khảo.</p>
        </header>
        <div className={s.tabs} role="group" aria-label="Lọc thực đơn">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={s.tab} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
              <span className={s.tabCount}>{DRINKS.filter((d) => filt(t.id, d)).length}</span>
            </button>
          ))}
        </div>
        <CursorSpotlight className={s.menuBox} radius={340} color="rgba(255,60,172,0.13)">
          <ul className={s.menuList} aria-live="polite">
            {list.map((d, i) => (
              <li key={d.id} className={`${s.menuRow} ${s[`tone_${d.tone}` as keyof typeof s]}`}>
                <span className={s.menuNo}>{String(i + 1).padStart(2, "0")}</span>
                <div className={s.menuMain}>
                  <h3 className={s.menuName}>{d.name}</h3>
                  <p>{d.desc}</p>
                </div>
                {d.kind !== "bite" ? (
                  <ul className={s.flavs} aria-label={`Vị: ${FLAVORS.map((f) => `${f.label.toLowerCase()} ${d[f.key]} trên 3`).join(", ")}`}>
                    {FLAVORS.map((f) => (
                      <li key={f.key} title={`${f.label} ${d[f.key]}/3`}>
                        <i style={{ "--v": d[f.key] / 3 } as React.CSSProperties} aria-hidden="true" />
                        <span aria-hidden="true">{f.label.slice(0, 1)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className={s.flavsNone} aria-hidden="true" />
                )}
                <span className={s.menuPrice}>{vnd(d.price)}</span>
              </li>
            ))}
          </ul>
        </CursorSpotlight>
        <p className={s.menuNote}>Giá tham khảo, có thể thay đổi theo mùa nguyên liệu. Dành cho khách từ 18 tuổi.</p>
      </div>
    </section>
  );
}
