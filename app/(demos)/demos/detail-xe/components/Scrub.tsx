"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { STAGES } from "../data/content";

const P = "/images/demos/detail-xe";
const TOTAL_H = 8;
const TOTAL_STEPS = 8;
const EDGE = (p: number) => p * 140 - 18; // vị trí mép trên của vệt lau (%), khớp với clip-path trong CSS

/**
 * Scroll-scrub: một ảnh xe, lớp bụi bẩn (bản sepia tối + hạt bụi, là đồ hoạ phủ lên ảnh) bị quét bay theo tiến độ cuộn.
 * Bên cạnh là bốn giai đoạn quy trình, đồng hồ giờ làm và số bước chạy theo cùng tiến độ.
 * Chỉ ghi CSS var --p và vài thuộc tính SVG, không tác động layout. Reduced-motion: giữ trạng thái sạch, bỏ ghim.
 */
export function Scrub() {
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [still, setStill] = useState(false);

  useFxLayout(root, (el) => {
    if (prefersReducedMotion()) { setStill(true); return; }
    const hours = el.querySelector<HTMLElement>("[data-sc=hours]");
    const steps = el.querySelector<HTMLElement>("[data-sc=steps]");
    const line = el.querySelector<SVGLineElement>("[data-sc=edge]");
    const bar = el.querySelector<HTMLElement>("[data-sc=bar]");
    let last = -1;
    const apply = (p: number) => {
      el.style.setProperty("--p", String(p));
      if (hours) hours.textContent = (p * TOTAL_H).toFixed(1).replace(".", ",");
      if (steps) steps.textContent = String(Math.round(p * TOTAL_STEPS));
      if (line) {
        const x = EDGE(p);
        line.setAttribute("x1", String(x));
        line.setAttribute("x2", String(x - 16));
        line.style.opacity = p <= 0.01 || p >= 0.995 ? "0" : "1";
      }
      if (bar) bar.style.transform = `scaleX(${p})`;
      const idx = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length * 0.999));
      if (idx !== last) { last = idx; setStage(idx); }
    };
    apply(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => apply(self.progress),
    });
    return () => { st.kill(); el.style.setProperty("--p", "1"); };
  }, []);

  return (
    <section ref={root} id="quy-trinh" className={`${s.scrub} ${still ? s.scrubStatic : ""}`} aria-labelledby="scrub-title" data-dx-scrub="">
      <div className={s.scrubStick}>
        <div className={`${s.wrap} ${s.scrubGrid}`}>
          <div className={s.scrubFrame} role="img" aria-label="Một chiếc sedan đen: lớp bụi bẩn tan dần thành bề mặt sạch khi cuộn trang">
            <Image src={`${P}/sedan-den-1200.webp`} alt="" fill sizes="(max-width: 900px) 100vw, 46vw" className={s.scrubImg} />
            <div className={s.scrubDirt} aria-hidden="true">
              <Image src={`${P}/sedan-den-1200.webp`} alt="" fill sizes="(max-width: 900px) 100vw, 46vw" className={s.scrubImg} />
              <span className={s.dust} />
            </div>
            <svg className={s.scrubEdge} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line data-sc="edge" x1="-18" y1="0" x2="-34" y2="100" style={{ opacity: 0 }} />
            </svg>
          </div>

          <div>
            <p className={`${s.kicker} ${s.kickerRed}`}>Một ngày làm việc với xe</p>
            <h2 id="scrub-title" className={s.h2}>Từ bụi đường đến <span className={s.chrome}>mặt gương</span></h2>
            <dl className={s.meter}>
              <div><dt>Giờ làm</dt><dd><span data-sc="hours">8,0</span><small>&nbsp;giờ</small></dd></div>
              <div><dt>Bước</dt><dd><span data-sc="steps">8</span><small>&nbsp;/ {TOTAL_STEPS}</small></dd></div>
            </dl>
            <ol className={s.stageList}>
              {STAGES.map((g, i) => (
                <li key={g.t} className={s.stage} data-on={still || stage === i ? "1" : "0"}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <h3>{g.t}</h3>
                  <p>{g.d}</p>
                </li>
              ))}
            </ol>
            <p className={s.scrubNote}>Kéo trang xuống để xem từng giai đoạn. Một gói đầy đủ cho xe sedan mất khoảng 8 giờ làm việc.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
