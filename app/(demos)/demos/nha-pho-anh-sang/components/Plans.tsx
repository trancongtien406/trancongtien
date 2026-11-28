"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import gsap from "gsap";
import s from "../brand.module.css";
import { IMG, PLANS } from "../data";

export function Plans() {
  const pic = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const mx = useRef<((v: number) => void) | null>(null);
  const my = useRef<((v: number) => void) | null>(null);

  const move = (e: React.PointerEvent) => {
    const el = pic.current;
    if (!el || e.pointerType !== "mouse") return;
    if (!mx.current) {
      mx.current = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      my.current = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    }
    mx.current(e.clientX + 36);
    my.current?.(e.clientY - 120);
  };
  const show = (i: number) => { setCur(i); if (pic.current) gsap.to(pic.current, { autoAlpha: 1, duration: 0.3 }); };
  const hide = () => { if (pic.current) gsap.to(pic.current, { autoAlpha: 0, duration: 0.25 }); };

  return (
    <section id="can-ho" className={`${s.sec} ${s.dark} ${s.plans}`} aria-labelledby="ch-h" onPointerMove={move}>
      <div className={s.plansTop}>
        <div>
          <p className={s.label}><b>[03]</b> — Căn hộ</p>
          <h2 id="ch-h" className={s.disp}>Mỗi mặt bằng bắt đầu <em>từ hiên nắng.</em></h2>
        </div>
        <p className={s.side}>48 căn từ 98 đến 285 m². Mặt bằng mở, sáng hai phía, vật liệu ấm.</p>
      </div>
      <ul className={s.rows} onPointerLeave={hide}>
        {PLANS.map((p, i) => (
          <li key={p.code}>
            <a className={s.row} href="#dat-lich" data-row onPointerEnter={(e) => { if (e.pointerType === "mouse") show(i); }} onFocus={() => setCur(i)}>
              <span className={s.rCode}>{p.code}</span>
              <h3>{p.name}</h3>
              <span className={s.rSpec}>{p.spec.map((x) => (<span key={x}>{x}</span>))}</span>
              <span className={s.rArrow} aria-hidden="true">↗</span>
              <span className={s.rDesc}>{p.d}</span>
              <span className={s.rThumb}><img className={s.img} src={`${IMG}${p.img}.webp`} alt={p.alt} width={1200} height={800} loading="lazy" decoding="async" /></span>
            </a>
          </li>
        ))}
      </ul>
      <div ref={pic} className={s.hoverPic} aria-hidden="true">
        <img className={s.img} src={`${IMG}${PLANS[cur].img}.webp`} alt="" width={1200} height={800} />
      </div>
    </section>
  );
}
