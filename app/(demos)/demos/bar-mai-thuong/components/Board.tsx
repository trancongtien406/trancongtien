"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { DRINKS } from "../data/menu";

const STEPS = ["Đá", "Rượu nền", "Lên vị", "Trang trí"];
const POOL = DRINKS.filter((d) => d.kind !== "bite");
type T = { id: number; idx: number; prog: number; hold: number };

const pick = (n: number) => POOL[(n * 7 + 3) % POOL.length];
const seed = (): T[] => [
  { id: 41, idx: 0, prog: 2, hold: 0 },
  { id: 42, idx: 1, prog: 1, hold: 0 },
  { id: 43, idx: 2, prog: 0, hold: 0 },
];

export function Board() {
  const [tickets, setTickets] = useState<T[]>(seed);
  const [run, setRun] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setRun(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setTickets((cur) => {
        const out = cur
          .map((t) => (t.prog < 4 ? { ...t, prog: t.prog + 1 } : { ...t, hold: t.hold + 1 }))
          .filter((t) => t.hold < 4);
        const making = out.filter((t) => t.prog < 4).length;
        if (making < 3) {
          const id2 = (out.reduce((m, t) => Math.max(m, t.id), 40) + 1);
          out.push({ id: id2, idx: id2 - 41, prog: 0, hold: 0 });
        }
        return out;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, [run]);

  const making = tickets.filter((t) => t.prog < 4);
  const ready = tickets.filter((t) => t.prog >= 4);
  const card = (t: T) => {
    const d = pick(t.idx);
    return (
      <li key={t.id} className={`${s.ticketCard} ${s[`tone_${d.tone}` as keyof typeof s]}`} data-ready={t.prog >= 4 ? "1" : undefined}>
        <span className={s.tkNo}>#{t.id}</span>
        <b className={s.tkName}>{d.name}</b>
        <ol className={s.tkSteps} aria-label={t.prog >= 4 ? "Đã xong" : `Bước ${Math.min(t.prog + 1, 4)} trên 4: ${STEPS[Math.min(t.prog, 3)]}`}>
          {STEPS.map((x, i) => <li key={x} data-on={i < t.prog ? "1" : undefined}><i /><span>{x}</span></li>)}
        </ol>
      </li>
    );
  };

  return (
    <section className={s.board} aria-label="Bảng pha chế tại quầy">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Sau quầy bar</p>
          <h2 className={s.h2} data-tm="lit">Một ly đi qua bốn bước trước khi ra bàn</h2>
          <p className={s.mutedP}>Bảng phía sau quầy chia mỗi ly thành bốn bước: đá, rượu nền, lên vị, trang trí. Ly signature mất khoảng bốn phút từ lúc gọi tới lúc bưng ra, ly cổ điển nhanh hơn.</p>
        </header>
        <div ref={box} className={s.boardBox}>
          <div className={s.boardCol}>
            <h3 className={s.boardHead}><span className={s.boardDot} aria-hidden="true" /> Đang pha <b>{making.length}</b></h3>
            <ul className={s.tickets}>{making.map(card)}</ul>
          </div>
          <div className={s.boardCol}>
            <h3 className={s.boardHead}><span className={`${s.boardDot} ${s.boardDotOk}`} aria-hidden="true" /> Sẵn sàng ra bàn <b>{ready.length}</b></h3>
            <ul className={s.tickets}>{ready.length ? ready.map(card) : <li className={s.tkEmpty}>Chờ ly tiếp theo</li>}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
