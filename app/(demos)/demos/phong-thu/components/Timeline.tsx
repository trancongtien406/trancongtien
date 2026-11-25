"use client";

import { useEffect, useRef } from "react";
import s from "../brand.module.css";
import { STAGES } from "../data/content";
import { clamp01, reducedMotion } from "../lib/frame";

const LANES = ["Chuẩn bị", "Thu âm", "Biên tập", "Mix", "Master"] as const;

/** Playhead quét theo cuộn: tiến độ p (0..1) của khối đi qua khung nhìn; các clip/bước sáng lên khi playhead đi qua. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-from]"));
    let raf = 0;
    const apply = (p: number) => {
      el.style.setProperty("--p", p.toFixed(4));
      items.forEach((n) => { const hit = p >= Number(n.dataset.from) + 0.001; if (hit !== (n.dataset.hit === "1")) n.dataset.hit = hit ? "1" : "0"; });
    };
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      apply(clamp01((vh * 0.75 - r.top) / (r.height + vh * 0.3)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    if (reducedMotion()) { apply(1); return; }
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className={s.tl} data-pt="timeline">
      <div className={s.tlLanes} aria-hidden="true">
        <div className={s.tlRuler}>{Array.from({ length: 16 }, (_, i) => (<span key={i}>{i + 1}</span>))}</div>
        {LANES.map((l, i) => {
          const st = STAGES.find((x) => x.lane === i)!;
          return (
            <div key={l} className={s.tlLane}>
              <span className={`${s.mono} ${s.tlLabel}`}>{l}</span>
              <div className={s.tlTrack}>
                <div className={s.tlClip} data-from={st.from} style={{ left: `${st.from * 100}%`, width: `${(st.to - st.from) * 100}%` }}><span className={s.mono}>{st.n} · {st.short}</span></div>
              </div>
            </div>
          );
        })}
        <div className={s.tlHeadWrap}><div className={s.tlHead}><span className={s.tlHeadFlag}>▶</span></div></div>
      </div>
      <ol className={s.tlSteps}>
        {STAGES.map((st) => (
          <li key={st.n} className={s.tlStep} data-from={st.from}>
            <span className={`${s.mono} ${s.tlN}`}>{st.n}</span>
            <h3 className={s.h4}>{st.name}</h3>
            <p>{st.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
