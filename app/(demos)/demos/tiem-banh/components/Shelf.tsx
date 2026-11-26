"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { MENU, fmtVnd } from "../data/menu";
import { Treat } from "./Treat";

const IDS = ["kem-dau-may", "croissant-bo", "hop-macaron-6", "tiramisu-ly", "donut-hong-com", "cupcake-keo-bong", "tart-dau", "cookie-bo-dau-phong"];
const ITEMS = IDS.map((id) => MENU.find((m) => m.id === id)!);
const STEP = 360 / ITEMS.length;
const BG = ["var(--mk-butter)", "var(--mk-pink-soft)", "var(--mk-lilac)", "var(--mk-mint)"];

/** Kệ tủ kính xoay: kéo để quay vòng, nút Trước/Sau và phím mũi tên. Thả tay thì nảy về đúng ngăn. */
export function Shelf() {
  const [angle, setAngle] = useState(0);
  const [drag, setDrag] = useState(false);
  const st = useRef({ x: 0, a: 0, moved: false, id: -1 });
  const view = useRef<HTMLDivElement>(null);
  const active = ((Math.round(-angle / STEP) % ITEMS.length) + ITEMS.length) % ITEMS.length;
  const cur = ITEMS[active];

  const snap = (a: number) => Math.round(a / STEP) * STEP;
  const go = (dir: number) => setAngle((a) => snap(a) - dir * STEP);

  useEffect(() => {
    const el = view.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const down = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    st.current = { x: e.clientX, a: angle, moved: false, id: e.pointerId };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDrag(true);
  };
  const move = (e: React.PointerEvent) => {
    if (!drag || e.pointerId !== st.current.id) return;
    const dx = e.clientX - st.current.x;
    if (Math.abs(dx) > 3) st.current.moved = true;
    setAngle(st.current.a + dx * 0.35);
  };
  const up = (e: React.PointerEvent) => {
    if (e.pointerId !== st.current.id) return;
    setDrag(false);
    setAngle((a) => snap(a));
    st.current.id = -1;
  };

  return (
    <section className={`${s.sec} ${s.secPink}`} id="tu-kinh" aria-labelledby="h-shelf">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Tủ kính hôm nay</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-shelf">Xoay tủ kính, chọn món cho bàn tiệc</h2>
          <p className={s.lead}>Tám món bán chạy trong tủ. Kéo ngang hoặc bấm nút để xoay, món ở giữa là món bạn đang xem.</p>
        </div>
        <div className={s.shelfWrap}>
          <div
            ref={view}
            className={s.shelfView}
            role="group"
            aria-roledescription="carousel"
            aria-label="Tủ kính xoay, dùng phím mũi tên trái phải để đổi món"
            tabIndex={0}
            data-drag={drag ? "1" : undefined}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
          >
            <div className={s.shelfRing} style={{ transform: `translateZ(calc(var(--cw) * -1.25)) rotateY(${angle}deg)` }}>
              {ITEMS.map((m, i) => (
                <div key={m.id} className={s.shelfCard} data-on={i === active ? "1" : undefined} style={{ transform: `rotateY(${i * STEP}deg) translateZ(calc(var(--cw) * 1.25))`, background: BG[i % BG.length] }} aria-hidden={i === active ? undefined : true}>
                  <Treat kind={m.kind} colors={m.colors} className={s.shelfTreat} />
                  <b>{m.name}</b>
                </div>
              ))}
            </div>
            <div className={s.shelfGlass} aria-hidden="true" />
          </div>
          <div className={s.shelfInfo} aria-live="polite">
            <h3 className={`${s.display} ${s.h3}`}>{cur.name}</h3>
            <p>{cur.desc}</p>
            <p className={s.shelfPrice}><b>{fmtVnd(cur.price)}</b> / {cur.unit}</p>
            <div className={s.shelfBtns}>
              <button type="button" className={`${s.btn} ${s.btnWhite}`} onClick={() => go(-1)} aria-label="Món trước">←</button>
              <span className={s.shelfCount}>{active + 1} / {ITEMS.length}</span>
              <button type="button" className={`${s.btn} ${s.btnWhite}`} onClick={() => go(1)} aria-label="Món sau">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
