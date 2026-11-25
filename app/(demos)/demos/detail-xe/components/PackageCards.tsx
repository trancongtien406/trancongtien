"use client";

import { useRef, type PointerEvent } from "react";
import { ShineSweep } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { PACKAGES } from "../data/content";
import { formatVnd } from "../data/builder";

const PICK: Record<string, string> = { "01": "rua", "02": "danhbong", "03": "ceramic", "04": "noithat", "05": "khoangmay" };

/** Thẻ gói: ánh sáng phản chiếu bám theo con trỏ (vùng sáng nền + viền chrome sáng cục bộ). Chỉ chuột, chạm không kích hoạt. */
function Card({ p }: { p: (typeof PACKAGES)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.dataset.lit = "1";
  };
  const leave = () => { const el = ref.current; if (el) el.dataset.lit = "0"; };
  const pick = () => {
    try { window.dispatchEvent(new CustomEvent("dx-pick", { detail: PICK[p.no] })); } catch { /* bỏ qua */ }
  };
  return (
    <article ref={ref} className={s.pkg} onPointerMove={move} onPointerLeave={leave} data-dx="rise" data-lit="0">
      <span className={s.pkgNo} aria-hidden="true">{p.no}</span>
      <h3 className={`${s.h3} ${s.pkgName}`}>{p.name}</h3>
      <p className={s.pkgTag}>{p.tag}</p>
      <dl className={s.pkgSpecs}>
        <div><dt>Thời gian</dt><dd>{p.time}</dd></div>
        <div><dt>Số bước</dt><dd>{p.steps}</dd></div>
      </dl>
      <ul className={s.pkgList}>{p.list.map((x) => <li key={x}>{x}</li>)}</ul>
      <div className={s.pkgFoot}>
        <p className={s.price}><small>Giá từ</small>{formatVnd(p.from)}</p>
        <ShineSweep trigger="hover" color="rgba(255,255,255,0.7)">
          <a className={`${s.btn} ${s.btnSm}`} href="#chon-goi" onClick={pick}>Chọn gói này</a>
        </ShineSweep>
      </div>
    </article>
  );
}

export function PackageCards() {
  return <div className={s.pkgGrid}>{PACKAGES.map((p) => <Card key={p.no} p={p} />)}</div>;
}
