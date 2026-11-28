"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import s from "../brand.module.css";
import { HOTSPOTS, IMG } from "../data";

/** Cảnh gara tối: con trỏ là đèn pin, rê qua xe để lộ 4 chi tiết đang ẩn. */
export function Garage() {
  const stage = useRef<HTMLDivElement>(null);
  const [found, setFound] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);

  const reveal = (id: string) => { setFound((f) => (f.includes(id) ? f : [...f, id])); setActive(id); };

  const move = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    const rad = parseFloat(getComputedStyle(el).getPropertyValue("--r")) || 200;
    el.querySelectorAll<HTMLElement>("[data-hot]").forEach((b) => {
      const br = b.getBoundingClientRect();
      const d = Math.hypot(br.left + br.width / 2 - e.clientX, br.top + br.height / 2 - e.clientY);
      if (d < rad * 0.7) reveal(b.dataset.hot!);
    });
  };
  const act = HOTSPOTS.find((h) => h.id === active);

  return (
    <section id="dem-ga-ra" className={`${s.sec} ${s.garage}`} aria-labelledby="ga-h" style={{ padding: 0 }}>
      <div className={s.gWrap}>
        <div className={s.gCopy}>
          <p className={s.kick}><b>02</b><i />Gara đêm</p>
          <h2 id="ga-h" className={s.h2s}>Mang ánh sáng<br />tới đây.</h2>
          <p className={s.lead}>Rê con trỏ lên thân xe. Bốn chi tiết đang ẩn trong bóng tối, đợi ai đó rọi đèn tới.</p>
        </div>
      <div ref={stage} className={s.gStage} onPointerMove={move} onPointerDown={move} data-garage>
        <div className={s.gDark}><img className={s.img} src={`${IMG}garage.webp`} alt="Chiếc coupe bạc trong gara tối, chỉ lộ ra khi rọi đèn (ảnh minh hoạ)" width={1920} height={1080} loading="lazy" decoding="async" /></div>
        <div className={s.gLit} aria-hidden="true"><img className={s.img} src={`${IMG}garage.webp`} alt="" width={1920} height={1080} loading="lazy" decoding="async" /></div>
        {HOTSPOTS.map((h) => (
          <button key={h.id} type="button" className={s.hot} data-hot={h.id} data-found={found.includes(h.id) ? "1" : "0"} style={{ left: h.x, top: h.y }} onClick={() => reveal(h.id)} onFocus={() => reveal(h.id)} aria-label={`${h.t}: ${h.d}`} />
        ))}
        {act && (
          <div className={s.tip} role="status" style={{ left: act.x, top: act.y, transform: parseFloat(act.x) > 55 ? "translate(-108%,-50%)" : "translate(30px,-50%)" }}>
            <b>{act.t}</b>{act.d}
          </div>
        )}
        <p className={s.found}><b>{found.length}</b> / {HOTSPOTS.length} ĐÃ THẤY</p>
      </div>
      </div>
    </section>
  );
}
