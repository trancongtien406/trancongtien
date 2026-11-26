"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { FLAVORS, SIZES } from "../data/builder";
import { fmtVnd } from "../data/menu";

const SLICES: Record<string, number> = { s14: 6, s18: 10, s22: 16, t2: 24 };
const LEAD: Record<string, string> = { s14: "2 ngày", s18: "2 ngày", s22: "2 ngày", t2: "4 ngày" };
const R: Record<string, number> = { s14: 104, s18: 128, s22: 150, t2: 150 };

function wedge(r: number, a0: number, a1: number) {
  const p = (a: number) => [Math.cos(a) * r, Math.sin(a) * r];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M0 0L${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z`;
}

/** Cắt bánh theo cuộn: kéo trang xuống thì dao đi qua bánh, các lát tách ra dần. Chọn size để đổi số lát. */
export function Slice() {
  const [size, setSize] = useState("s18");
  const box = useRef<HTMLDivElement>(null);
  const n = SLICES[size];
  const r = R[size];
  const cut = useRef<HTMLSpanElement>(null);

  const slices = useMemo(() => {
    const a = (Math.PI * 2) / n;
    return Array.from({ length: n }, (_, i) => {
      const a0 = -Math.PI / 2 + i * a, a1 = a0 + a, mid = (a0 + a1) / 2;
      const q = (v: number) => Math.round(v * 1000) / 1000;
      return { d: wedge(r, a0, a1), dx: q(Math.cos(mid)), dy: q(Math.sin(mid)), rot: (i % 2 ? 1 : -1) * 3, i };
    });
  }, [n, r]);

  useEffect(() => {
    const el = box.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    el.setAttribute("data-live", "1");
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 45%",
        scrub: 0.4,
        onUpdate: (self) => {
          el.style.setProperty("--p", String(self.progress));
          const c = cut.current;
          if (c) c.textContent = String(Math.min(SLICES[el.dataset.size || "s18"], Math.floor(self.progress * SLICES[el.dataset.size || "s18"] * 1.05)));
        },
      });
      el.style.setProperty("--p", "0");
    }, el);
    return () => { ctx.revert(); el.removeAttribute("data-live"); el.style.removeProperty("--p"); };
  }, []);

  return (
    <section className={`${s.sec} ${s.secPeach}`} id="bang-gia" aria-labelledby="h-slice">
      <div className={s.wrap}>
        <div className={s.secHead}>
          <span className={s.eyebrow}>Bánh sinh nhật theo size</span>
          <h2 className={`${s.display} ${s.h2}`} id="h-slice">Chọn size theo số người, giá từ 320.000₫</h2>
          <p className={s.lead}>Bảng giá tham khảo cho bánh kem vị vani dâu, phủ kem mịn. Đổi vị, kiểu kem và trang trí sẽ cộng thêm, tiệm báo giá cuối khi xác nhận mẫu.</p>
        </div>
        <div className={s.sliceGrid} ref={box} data-size={size}>
          <div className={s.sliceInfo}>
            <div className={s.sizeTable} role="radiogroup" aria-label="Chọn size bánh kem">
              {SIZES.map((z) => (
                <button key={z.id} type="button" role="radio" aria-checked={size === z.id} className={s.sizeRow} onClick={() => setSize(z.id)}>
                  <b className={s.sizeName}>{z.label}</b>
                  <span>{z.serves[0]} đến {z.serves[1]} người, {SLICES[z.id]} lát</span>
                  <span className={s.sizePrice}>{fmtVnd(z.price)}</span>
                  <small>Đặt trước {LEAD[z.id]}</small>
                </button>
              ))}
            </div>
            <div className={s.addons}>
              <h3 className={`${s.display} ${s.h3}`}>Đổi vị, cộng thêm</h3>
              <ul>
                {FLAVORS.map((f) => (
                  <li key={f.id}><span>{f.label}</span><b>{f.extra ? `+${fmtVnd(f.extra)}` : "đã gồm"}</b></li>
                ))}
              </ul>
              <p className={s.fineNote}>Viết chữ lên bánh +20.000₫. Bánh 2 tầng và bánh vẽ theo hình riêng cần báo trước 4 ngày. Bánh nhỏ, bánh mì, cookie không cần đặt trước.</p>
            </div>
            <a className={`${s.btn} ${s.btnBig} ${s.btnChoco}`} href="#dung-banh">Dựng bánh theo ý bạn</a>
          </div>
          <div className={s.sliceStage}>
            <svg viewBox="-190 -190 380 380" className={s.sliceSvg} role="img" aria-label={`Bánh ${SIZES.find((z) => z.id === size)?.label} chia ${n} lát`}>
              <ellipse cx="0" cy="12" rx={r + 8} ry={r + 8} fill="rgba(70,37,26,.18)" />
              {slices.map((sl) => (
                <g key={sl.i} className={s.slice} style={{ "--dx": Math.round(sl.dx * 22 * 100) / 100, "--dy": Math.round(sl.dy * 22 * 100) / 100, "--rot": sl.rot } as React.CSSProperties}>
                  <path d={sl.d} fill="#F6D49B" stroke="#46251A" strokeWidth="3.5" strokeLinejoin="round" />
                  <path d={wedge(r * 0.88, -Math.PI / 2 + (sl.i + 0.12) * ((Math.PI * 2) / n), -Math.PI / 2 + (sl.i + 0.88) * ((Math.PI * 2) / n))} fill={sl.i % 3 === 0 ? "#FFE3EC" : sl.i % 3 === 1 ? "#FFD1DE" : "#FFF3EC"} />
                  <circle cx={Math.round(sl.dx * r * 0.7 * 100) / 100} cy={Math.round(sl.dy * r * 0.7 * 100) / 100} r="6" fill="#FF5E86" stroke="#46251A" strokeWidth="2.5" />
                </g>
              ))}
              {size === "t2" && <circle r={r * 0.55} fill="none" stroke="#46251A" strokeWidth="3" strokeDasharray="6 6" opacity=".5" />}
            </svg>
            <p className={s.sliceCount} aria-live="off"><span ref={cut}>{n}</span> / {n} lát</p>
          </div>
        </div>
      </div>
    </section>
  );
}
