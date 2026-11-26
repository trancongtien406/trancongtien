"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import s from "../brand.module.css";

/**
 * Trượt từ mặt bằng 2D sang phối cảnh: lớp bản vẽ nằm trên ảnh, kéo tay cầm (chuột, cảm ứng, bàn phím)
 * để mở dần. Lần đầu vào khung, tay cầm tự trượt một lượt để gợi ý thao tác (bỏ qua nếu reduced-motion).
 */
export function FloorplanSlider() {
  const [v, setV] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const setFromX = (x: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r || !r.width) return;
    touched.current = true;
    setV(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const run = (now: number) => {
        if (touched.current) return;
        const t = Math.min(1, (now - t0) / 2200);
        setV(50 + 38 * Math.sin(t * Math.PI * 2) * (1 - t * 0.4));
        if (t < 1) raf = requestAnimationFrame(run); else setV(50);
      };
      raf = requestAnimationFrame(run);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="floorplan" className={`${s.section} ${s.fpSection}`} aria-labelledby="fp-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>05 / Từ mặt bằng đến phối cảnh</p>
          <h2 id="fp-title" className={s.h2}>Bản vẽ phẳng, rồi thành căn phòng.</h2>
          <p className={s.secLead}>Ở bước 2 bạn nhận mặt bằng bố trí, ở bước 3 là phối cảnh 3D của chính không gian đó. Kéo thanh trượt để so sánh một góc bàn ăn trong căn hộ 78 m².</p>
        </div>
        <div
          ref={box}
          className={s.fpBox}
          data-testid="floorplan"
          onDragStart={(e) => e.preventDefault()}
          onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setFromX(e.clientX); }}
          onPointerMove={(e) => { if (dragging.current) setFromX(e.clientX); }}
          onPointerUp={() => { dragging.current = false; }}
          onPointerCancel={() => { dragging.current = false; }}
        >
          <div className={s.fpPhoto}>
            <Photo name="dining" sizes="(min-width: 1024px) 90vw, 100vw" position="50% 62%" alt="Phối cảnh phòng ăn: bàn tròn bằng gỗ, ghế trắng và nắng chiều chiếu xiên" />
          </div>
          <div className={s.fpPlan} style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }} aria-hidden="true">
            <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img">
              <rect width="800" height="500" fill="#EDEAE2" />
              <g stroke="#262824" strokeWidth="1" opacity=".12">{Array.from({ length: 16 }, (_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />)}{Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />)}</g>
              <g fill="none" stroke="#262824" strokeWidth="6" strokeLinejoin="miter">
                <rect x="60" y="50" width="680" height="400" />
                <path d="M420 50V250H740M420 330V450M200 250H420" strokeWidth="4" />
              </g>
              <g fill="none" stroke="#262824" strokeWidth="2">
                <path d="M395 250a45 45 0 0 0 -45 -45" opacity=".6" />
                <rect x="80" y="70" width="150" height="62" />
                <rect x="80" y="330" width="110" height="100" />
                <circle cx="300" cy="340" r="62" stroke="#A65338" strokeWidth="3" />
                {[0, 90, 180, 270].map((a) => <rect key={a} x="288" y="262" width="24" height="24" transform={`rotate(${a} 300 340)`} />)}
                <rect x="470" y="70" width="240" height="42" />
                <rect x="470" y="340" width="230" height="90" />
              </g>
              <g fontFamily="inherit" fontSize="14" fill="#262824" letterSpacing="1">
                <text x="100" y="200">PHÒNG KHÁCH</text>
                <text x="250" y="425" fill="#A65338">BÀN ĂN TRÒN · 4 CHỖ</text>
                <text x="470" y="150">BẾP</text>
                <text x="470" y="300">PHÒNG NGỦ 1</text>
                <text x="470" y="470">PHÒNG NGỦ 2</text>
                <text x="100" y="370">SOFA</text>
              </g>
              <g stroke="#262824" strokeWidth="1.5" fill="none"><path d="M60 480H740M60 472v16M740 472v16" /></g>
              <text x="400" y="494" textAnchor="middle" fontSize="13" fill="#262824" fontFamily="inherit">7.800</text>
            </svg>
          </div>
          <span className={s.fpTagL}>Mặt bằng 2D · bước 2</span>
          <span className={s.fpTagR}>Phối cảnh · bước 3</span>
          <div className={s.fpHandle} style={{ left: `${v}%` }} aria-hidden="true"><span>⇆</span></div>
        </div>
        <label className={s.fpRange}>
          <span>Kéo để so sánh mặt bằng và phối cảnh</span>
          <input type="range" min={0} max={100} step={1} value={Math.round(v)} onChange={(e) => { touched.current = true; setV(Number(e.target.value)); }} aria-valuetext={`${Math.round(v)}% mặt bằng`} data-testid="floorplan-range" />
        </label>
        <p className={s.figcap}>Ảnh phối cảnh là ảnh tham khảo phong cách; bản vẽ là ví dụ cho một căn hộ 2 phòng ngủ.</p>
      </div>
    </section>
  );
}
