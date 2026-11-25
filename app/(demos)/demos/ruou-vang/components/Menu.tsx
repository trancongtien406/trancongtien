"use client";

import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { IMGS } from "../data/images";
import { KINDS, WINES, vnd, type WineKind } from "../data/wines";
import { Photo } from "./Photo";

const PHOTO: Record<WineKind, keyof typeof IMGS> = { do: "bottleDark", trang: "glassTrio", hong: "roseGlass", sui: "bubbles" };

export function Menu() {
  const [kind, setKind] = useState<WineKind>("do");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const on = (e: Event) => {
      const k = (e as CustomEvent<WineKind>).detail;
      if (KINDS.some((x) => x.id === k)) setKind(k);
    };
    window.addEventListener("rv:tab", on);
    return () => window.removeEventListener("rv:tab", on);
  }, []);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = KINDS.length;
    let j = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    if (j < 0) return;
    e.preventDefault();
    setKind(KINDS[j].id);
    tabs.current[j]?.focus();
  };

  const list = WINES.filter((w) => w.kind === kind);
  const info = KINDS.find((k) => k.id === kind)!;
  return (
    <section className={s.menu} id="thuc-don" aria-label="Thực đơn vang">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Thực đơn</p>
          <SplitWords as="h2" className={s.h2} trigger="view">Mười bốn ly và chai, chia theo phong cách.</SplitWords>
          <p className={s.mutedP}>Giá tham khảo, tính theo ly (150 ml) và theo chai (750 ml). Dành cho khách từ 18 tuổi.</p>
        </header>
        <div className={s.menuGrid}>
          <div className={s.menuMain}>
            <div className={s.tabs} role="tablist" aria-label="Loại vang">
              {KINDS.map((k, i) => (
                <button key={k.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`rv-tab-${k.id}`} aria-selected={kind === k.id} aria-controls="rv-panel" tabIndex={kind === k.id ? 0 : -1} className={s.tab} onClick={() => setKind(k.id)} onKeyDown={(e) => onKey(e, i)}>
                  {k.label} <small>{WINES.filter((w) => w.kind === k.id).length}</small>
                </button>
              ))}
            </div>
            <div id="rv-panel" role="tabpanel" aria-labelledby={`rv-tab-${kind}`} className={s.panel} tabIndex={0}>
              <p className={s.panelNote}>{info.note}</p>
              <ul className={s.wineList}>
                {list.map((w) => (
                  <li key={w.id} className={s.wine}>
                    <div className={s.wineTop}>
                      <h3 className={s.wineName}>{w.name}</h3>
                      <span className={s.dots} aria-hidden="true" />
                      <span className={s.prices}>
                        {w.glass ? <span><small>ly</small> {vnd(w.glass)}</span> : null}
                        <span><small>chai</small> {vnd(w.bottle)}</span>
                      </span>
                    </div>
                    <p className={s.wineNote}>{w.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.menuPhoto}>
            {(Object.keys(PHOTO) as WineKind[]).map((k) => (
              <div key={k} className={s.menuShot} data-on={kind === k || undefined} aria-hidden={kind !== k}>
                <Photo img={IMGS[PHOTO[k]]} sizes="(max-width: 900px) 90vw, 30vw" quality={1000} className={s.cover} />
              </div>
            ))}
            <span className={s.menuVig} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
