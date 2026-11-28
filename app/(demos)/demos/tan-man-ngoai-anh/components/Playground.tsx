"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";
import { Doodle } from "./Doodle";
import { PLAY } from "./data";
import { Scene } from "./Scene";

/** Sân chơi: bảng rộng trôi theo con trỏ (máy cảm ứng thì kéo), ảnh nhoè theo khoảng cách. */
export function Playground() {
  const wrap = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current, b = boardRef.current;
    if (!root || !b) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const p = { x: 0, y: 0, tx: 0, ty: 0, has: false, drag: false, sx: 0, sy: 0, ox: 0, oy: 0, panX: 0, panY: 0, nx: 0, ny: 0 };
    const els = Array.from(b.querySelectorAll<HTMLElement>("[data-it]"));
    const cur = new Map<HTMLElement, number>();
    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      p.tx = e.clientX - r.left; p.ty = e.clientY - r.top;
      if (!p.has) { p.x = p.tx; p.y = p.ty; p.has = true; }
      if (p.drag) { p.panX = p.ox + (e.clientX - p.sx); p.panY = p.oy + (e.clientY - p.sy); }
    };
    const down = (e: PointerEvent) => { if (e.pointerType === "mouse") return; p.drag = true; p.sx = e.clientX; p.sy = e.clientY; p.ox = p.panX; p.oy = p.panY; };
    const up = () => { p.drag = false; };
    window.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up);
    let visible = false;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(root);
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const vw = root.clientWidth, vh = root.clientHeight;
      const cw = b.offsetWidth, ch = b.offsetHeight;
      if (!p.has) { p.tx = vw / 2; p.ty = vh / 2; p.x = vw / 2; p.y = vh / 2; }
      p.x += (p.tx - p.x) * 0.12; p.y += (p.ty - p.y) * 0.12;
      let tx: number, ty: number;
      if (reduce) { tx = -(cw - vw) / 2; ty = -(ch - vh) / 2; }
      else if (coarse) { p.panX = Math.min(0, Math.max(vw - cw, p.panX)); p.panY = Math.min(0, Math.max(vh - ch, p.panY)); tx = p.panX; ty = p.panY; }
      else { tx = -(p.tx / vw) * (cw - vw); ty = -(p.ty / vh) * (ch - vh); }
      if (!p.nx && !p.ny) { p.nx = tx; p.ny = ty; }
      p.nx += (tx - p.nx) * 0.08; p.ny += (ty - p.ny) * 0.08;
      b.style.transform = `translate3d(${p.nx.toFixed(1)}px, ${p.ny.toFixed(1)}px, 0)`;
      for (const el of els) {
        const xi = Number(el.dataset.x), yi = Number(el.dataset.y);
        const cx = p.nx + (xi / 100) * cw + el.offsetWidth / 2, cy = p.ny + (yi / 100) * ch + el.offsetHeight / 2;
        const d = Math.hypot(cx - p.x, cy - p.y);
        const target = reduce ? 0 : Math.min(13, Math.max(0, (d - 90) / 38));
        const prev = cur.get(el) ?? 22;
        const nxt = reduce ? 0 : prev + (target - prev) * 0.12;
        if (Math.abs(nxt - prev) > 0.15 || !cur.has(el)) { el.style.filter = nxt < 0.3 ? "none" : `blur(${nxt.toFixed(1)}px)`; cur.set(el, nxt); }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("pointermove", move); root.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); };
  }, []);

  return (
    <section className={s.play} id="choi-dua" ref={wrap} aria-labelledby="tm-play">
      <div className={s.playHead}><span>{"{03}"}</span><h2 id="tm-play" className={s.serif}>Chơi đùa</h2></div>
      <div className={s.board} ref={boardRef} aria-hidden="true">
        {PLAY.map((it) => (
          <figure key={it.id} data-it="" data-x={it.x} data-y={it.y} className={s.pItem} style={{ left: `${it.x}%`, top: `${it.y}%`, width: `${it.w}%`, filter: "blur(22px)" }}>
            <div style={{ aspectRatio: it.doodle ? "4 / 3" : `${it.w} / ${it.h * 0.56}` }}>{it.doodle ? <Doodle kind={it.doodle} /> : <Scene kind={it.kind} />}</div>
            {it.cap && <figcaption>{it.cap.split("|").map((c, i) => <span key={i} className={i === 1 ? s.serif : undefined}>{c}</span>)}</figcaption>}
          </figure>
        ))}
      </div>
      <p className={s.playHint}>Rê chuột để lướt, ảnh gần con trỏ sẽ nét lại. Trên điện thoại hãy kéo.</p>
    </section>
  );
}
