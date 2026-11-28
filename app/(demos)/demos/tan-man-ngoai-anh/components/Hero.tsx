"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { HOME, PROJECTS } from "./data";
import { Scene } from "./Scene";

const BG_CHIPS = [
  { k: "p6615806", t: "23.3.25 15:41", x: "17%", y: "9%", w: "11%" },
  { k: "p5202049", t: "5.4.25 11:02", x: "36%", y: "14%", w: "13%" },
  { k: "p36492217", t: "28.2.25 13:49", x: "78%", y: "10%", w: "17%" },
  { k: "p28637678", t: "28.3.25 16:07", x: "62%", y: "44%", w: "12%" },
];

/** Hero 100svh: chữ dọc, ảnh rải nhoè theo con trỏ, danh sách dự án (rê = đổi nền, bấm = mở dự án bên dưới). */
export function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const activeRef = useRef<number | null>(null);
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const root = rootRef.current;
    const home = homeRef.current;
    if (!root || !home) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p = { x: -9999, y: -9999, tx: -1, ty: -1 };
    const cur = new Map<HTMLElement, number>();
    const move = (e: PointerEvent) => { p.tx = e.clientX; p.ty = e.clientY; if (p.x < -9000) { p.x = e.clientX; p.y = e.clientY; } };
    window.addEventListener("pointermove", move, { passive: true });
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(root);
    let raf = 0;
    const els = Array.from(home.querySelectorAll<HTMLElement>("[data-it]"));
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const vw = window.innerWidth, vh = window.innerHeight;
      if (p.tx < 0) { p.tx = vw * 0.5; p.ty = vh * 0.5; }
      p.x += (p.tx - p.x) * 0.12; p.y += (p.ty - p.y) * 0.12;
      const r = home.getBoundingClientRect();
      for (const el of els) {
        const xi = Number(el.dataset.x), yi = Number(el.dataset.y);
        const cx = r.left + (xi / 100) * r.width + el.offsetWidth / 2, cy = r.top + (yi / 100) * r.height + el.offsetHeight / 2;
        const d = Math.hypot(cx - p.x, cy - p.y);
        let target = reduce ? 0 : Math.min(17, Math.max(0, (d - 110) / 22));
        if (activeRef.current !== null && el.dataset.proj === String(activeRef.current)) target = 0;
        const prev = cur.get(el) ?? 22;
        const nxt = reduce ? 0 : prev + (target - prev) * 0.12;
        if (Math.abs(nxt - prev) > 0.15 || !cur.has(el)) { el.style.filter = nxt < 0.3 ? "none" : `blur(${nxt.toFixed(1)}px)`; cur.set(el, nxt); }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("pointermove", move); };
  }, []);

  const bgKind = active !== null ? PROJECTS[active].bg : null;
  const open = (i: number) => {
    window.dispatchEvent(new CustomEvent("tm:case", { detail: i }));
    document.getElementById("du-an")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section className={s.hero} ref={rootRef} data-dark={bgKind !== null} aria-label="Trang chủ">
      {PROJECTS.filter((x) => x.bg).map((x) => (
        <div key={x.n} className={s.bg} data-on={bgKind === x.bg} aria-hidden="true">
          <Scene kind={x.bg as string} />
          {bgKind === x.bg && BG_CHIPS.map((c) => (
            <figure key={c.k} className={s.chip} style={{ left: c.x, top: c.y, width: c.w }}>
              <Scene kind={c.k} />
              <figcaption><span>Thời gian</span><em>{c.t}</em><span>Nơi</span><em>Đà Nẵng</em></figcaption>
            </figure>
          ))}
        </div>
      ))}

      <h1 className={s.name}>thảo n.</h1>

      <div className={s.home} ref={homeRef} aria-hidden="true">
        {HOME.map((it) => (
          <div key={it.id} data-it="" data-x={it.x} data-y={it.y} data-proj={it.proj ?? ""} className={s.item} style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.w * 1.3}%`, aspectRatio: `${it.w} / ${it.h * 0.7}`, filter: "blur(22px)" }}>
            <Scene kind={it.kind} />
            {it.proj !== undefined && (
              <span className={s.idx}>{`{${PROJECTS[it.proj].n}}`}{active === it.proj && <em> {PROJECTS[it.proj].title}</em>}</span>
            )}
          </div>
        ))}
      </div>

      <aside className={s.list} aria-label="Dự án">
        <hr />
        <ul onMouseLeave={() => setActive(null)}>
          {PROJECTS.map((x, i) => (
            <li key={x.n} data-on={active === i}>
              <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)} onClick={() => open(i)}>
                <span className={i === 2 ? s.serif : undefined}>{x.title}</span><b>{`{${x.n}}`}</b>
                <small>{x.type}</small>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <footer className={s.foot}>
        <p>“Tản mạn” là cách tôi gọi lối làm việc của mình: đi chậm, nhặt chi tiết đời thường và ghép chúng thành thứ có hồn.<br />Định hình bởi những chi tiết tư liệu.</p>
        <p className={s.serifBig}>tản_mạn</p>
        <p>Nhắn tôi..<br /><a href="#lien-he">Email</a>/ <a href="#lien-he">Instagram</a>/ <a href="#lien-he">Linkedin</a></p>
      </footer>
    </section>
  );
}
