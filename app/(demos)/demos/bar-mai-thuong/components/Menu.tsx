"use client";

import { useState } from "react";
import { CursorSpotlight } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { DRINKS, FLAVORS, GROUPS, vnd, type GroupId } from "../data/menu";

type Tab = GroupId;

export function Menu() {
  const [tab, setTab] = useState<Tab>("signature");
  const list = DRINKS.filter((d) => d.group === tab);
  const note = GROUPS.find((g) => g.id === tab)?.note;
  return (
    <section className={s.menu} id="thuc-don" aria-label="Thực đơn">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Thực đơn</p>
          <h2 className={s.h2} data-tm="lit">Thực đơn cocktail, mocktail và món nhắm</h2>
          <p className={s.mutedP}>Bốn nhóm: ly signature của quầy, cocktail cổ điển, đồ uống không cồn và món nhắm. Thanh bốn vạch bên phải mỗi ly là độ ngọt, chua, đắng, khói.</p>
        </header>
        <div className={s.tabs} role="group" aria-label="Lọc thực đơn">
          {GROUPS.map((t) => (
            <button key={t.id} type="button" className={s.tab} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
              <span className={s.tabCount}>{DRINKS.filter((d) => d.group === t.id).length}</span>
            </button>
          ))}
        </div>
        <p className={s.groupNote} aria-live="polite">{note}</p>
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
        <p className={s.menuNote}>Giá tham khảo, đã gồm VAT, có thể đổi theo mùa nguyên liệu. Đồ uống có cồn dành cho khách từ 18 tuổi. Happy hour 17:00–19:00 từ thứ Hai đến thứ Sáu: cocktail cổ điển đồng giá 110.000₫.</p>
      </div>
    </section>
  );
}
