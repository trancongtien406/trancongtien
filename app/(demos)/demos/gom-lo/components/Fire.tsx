"use client";

import { useRef } from "react";
import { ScrollTrigger, clamp, markReady, prefersReducedMotion, useFx } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { STEPS } from "../data/data";
import { Engrave } from "./Engrave";
import { Fingerprint } from "./Fingerprint";

const PTS: [number, number][] = [[0, 25], [0.3, 60], [0.55, 950], [0.8, 1240], [1, 1240]];
const tempAt = (p: number) => {
  for (let i = 1; i < PTS.length; i++) if (p <= PTS[i][0]) { const [a, ta] = PTS[i - 1], [b, tb] = PTS[i]; return ta + ((tb - ta) * (p - a)) / (b - a || 1); }
  return PTS[PTS.length - 1][1];
};
const STAGES = ["Đất sống", "Đang nung mộc", "Chín lửa", "Phủ men"];

/**
 * Vết nung chuyển màu theo cuộn: nền đi từ đất sống -> lửa -> men ngọc bằng ba lớp gradient đổi opacity theo tiến độ cuộn,
 * cùng nhiệt kế và tên giai đoạn. Không có JS / reduced-motion: giữ trạng thái đất sống, nội dung đủ.
 */
export function Fire() {
  const ref = useRef<HTMLElement>(null);
  useFx(ref, (el) => {
    if (prefersReducedMotion()) { markReady(el, "static"); return; }
    const temp = el.querySelector<HTMLElement>("[data-temp]")!;
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;
    const mer = el.querySelector<HTMLElement>("[data-mercury]")!;
    const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const fmt = new Intl.NumberFormat("vi-VN");
    const curve = el.querySelector<SVGPathElement>("[data-curve]")!;
    const dot = el.querySelector<SVGCircleElement>("[data-dot]")!;
    const curveLen = curve.getTotalLength();
    curve.setAttribute("pathLength", "1");
    curve.style.strokeDasharray = "1";
    curve.style.strokeDashoffset = "1";
    ScrollTrigger.create({
      trigger: el, start: "top 70%", end: "bottom 60%", scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        el.style.setProperty("--o2", String(clamp(p / 0.4, 0, 1)));
        el.style.setProperty("--o3", String(clamp((p - 0.62) / 0.25, 0, 1)));
        if (curve) { curve.style.strokeDashoffset = String(1 - p); const pt = curve.getPointAtLength(p * curveLen); dot.setAttribute("cx", pt.x.toFixed(1)); dot.setAttribute("cy", pt.y.toFixed(1)); dot.style.opacity = "1"; }
        temp.textContent = fmt.format(Math.round(tempAt(p) / 5) * 5);
        const si = p < 0.28 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3;
        if (stage.textContent !== STAGES[si]) stage.textContent = STAGES[si];
        mer.style.transform = `scaleY(${Math.max(0.03, tempAt(p) / 1240)})`;
        steps.forEach((st, i) => st.toggleAttribute("data-on", i === Math.min(3, Math.floor(p * 4.2))));
      },
    });
    markReady(el, "1");
  }, []);

  return (
    <section id="tu-dat-den-men" ref={ref} className={s.fire} aria-labelledby="fire-title" style={{ ["--o2" as string]: 0, ["--o3" as string]: 0 }}>
      <div className={`${s.fireLayer} ${s.fireRaw}`} aria-hidden="true" />
      <div className={`${s.fireLayer} ${s.fireHot}`} aria-hidden="true" />
      <div className={`${s.fireLayer} ${s.fireGlaze}`} aria-hidden="true" />
      <div className={`${s.wrap} ${s.fireGrid}`}>
        <div className={s.fireSticky}>
          <p className={s.hand}>Từ đất đến men</p>
          <Engrave as="h2" id="fire-title" className={s.h2}>Một món gốm đi qua lửa hai lần.</Engrave>
          <div className={s.gauge} role="group" aria-label="Nhiệt kế lò nung, đổi theo khi bạn cuộn">
            <div className={s.thermo} aria-hidden="true"><i data-mercury="" /></div>
            <div>
              <p className={s.tempNum}><span data-temp="">25</span><small> °C</small></p>
              <p className={s.stageName} data-stage="" aria-live="off">Đất sống</p>
              <p className={s.fine}>Mức nhiệt tham khảo, tuỳ đất và men.</p>
            </div>
          </div>
          <svg className={s.kilnCurve} viewBox="0 0 240 90" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">
            <path d="M4 86H236" strokeWidth="1" opacity=".45" />
            <path data-curve="" d="M4 82C40 80 60 78 84 70C110 60 118 24 150 16C180 10 200 12 236 12" strokeWidth="2.4" strokeLinecap="round" />
            <circle data-dot="" r="5" fill="#ffd9a0" stroke="none" style={{ opacity: 0 }} />
          </svg>
        </div>
        <ol className={s.steps}>
          {STEPS.map((st) => (
            <li key={st.no} className={s.step} data-step="">
              <span className={s.stepNo}>{st.no}</span>
              <div>
                <h3 className={s.h3}>{st.name}</h3>
                <p className={s.stepTemp}>{st.temp}</p>
                <p>{st.text}</p>
              </div>
              <Fingerprint className={s.stepPrint} strokeWidth={1.2} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
