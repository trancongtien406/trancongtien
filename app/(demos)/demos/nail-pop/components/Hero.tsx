"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SlotText, prefersReducedMotion } from "@/features/showroom/effects";
import { HERO_FACTS, STUDIO, SWATCHES, swatchById, type SwatchId } from "../data/content";
import { HandSVG } from "./HandSVG";
import { GlitchImage } from "./Glitch";
import s from "../brand.module.css";

const WORDS = ["XINH.", "CHẤT LỪ.", "CHẤM PHÁ.", "BẬT MOOD."];

export function Hero() {
  const [pick, setPick] = useState<SwatchId>("hong");
  const [mix, setMix] = useState(false);
  const root = useRef<HTMLElement>(null);
  const start = SWATCHES.findIndex((x) => x.id === pick);
  const colors = Array.from({ length: 5 }, (_, i) => (mix ? SWATCHES[(start + i * 3) % SWATCHES.length].hex : swatchById(pick).hex));

  // đồng bộ màu đang chọn ra toàn trang (con trỏ, điểm nhấn)
  useEffect(() => {
    document.querySelector<HTMLElement>("[data-np-root]")?.style.setProperty("--np-pick", swatchById(pick).hex);
  }, [pick]);

  // choreography hero: dấu chấm halftone lớn dần, tay hiện, móng rơi lần lượt
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.setAttribute("data-fx", "HeroChoreo");
    if (prefersReducedMotion()) { el.setAttribute("data-fx-ready", "static"); return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-disc]", { scale: 0.6, opacity: 0, duration: 0.7, ease: "back.out(1.6)" })
        .from("[data-hand]", { y: 40, opacity: 0, duration: 0.6 }, "-=0.35")
        .from("[data-nail]", { scale: 0, transformOrigin: "50% 100%", duration: 0.45, stagger: 0.09, ease: "back.out(2.4)" }, "-=0.2")
        .from("[data-chip]", { y: 20, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.5");
      el.setAttribute("data-fx-ready", "1");
    }, el);
    return () => ctx.revert();
  }, []);

  const useColor = () => {
    window.dispatchEvent(new CustomEvent("np:preset", { detail: { color: pick } }));
  };

  return (
    <section ref={root} className={s.hero} id="top" aria-labelledby="np-h1">
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.chip} data-chip=""><span aria-hidden="true" className={s.dotLive} /> Tiệm nail · {STUDIO.area}</p>
          <h1 id="np-h1" className={s.heroTitle}>
            <span className={s.heroLine}>Móng</span>
            <span className={s.slotBox}><SlotText words={WORDS} interval={2400} duration={0.55} className={s.slot} /></span>
          </h1>
          <p className={s.lead}>Chấm Chanh là tiệm nail nhỏ ở {STUDIO.area}: sơn gel, đắp gel nối móng, nail art vẽ tay, chrome và charm. Báo giá rõ trước khi làm, đặt lịch theo khung giờ trống.</p>
          <div className={s.ctaRow}>
            <a className={`${s.btn} ${s.btnInk} ${s.btnBig}`} href="#dat-lich" data-cursor="Đặt lịch">Đặt lịch làm móng →</a>
            <a className={`${s.btn} ${s.btnLine} ${s.btnBig}`} href="#dich-vu">Xem bảng giá</a>
          </div>
          <a className={s.heroTry} href="#builder" onClick={useColor} data-cursor="Dựng">Hoặc dựng thử bộ móng trên bàn tay để chọn màu trước</a>
          <dl className={s.heroFacts} data-chip="">
            {HERO_FACTS.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd><dd className={s.heroFactSub}>{f.sub}</dd></div>
            ))}
          </dl>
        </div>

        <div className={s.heroStage}>
          <div className={s.disc} data-disc="" aria-hidden="true">
            <i className={s.dotsA} />
            <i className={s.dotsB} />
          </div>
          <HandSVG colors={colors} shape="almond" length="vua" pattern="tron" label={`Bàn tay xem trước với màu ${mix ? "trộn 5 màu" : swatchById(pick).name}`} />
          <div className={s.photoSticker}>
            <GlitchImage file="tay-cam-son-cmy" alt="Bàn tay móng chấm bi cầm ba lọ sơn hồng, vàng, xanh" sizes="(max-width: 900px) 46vw, 300px" priority ratio="4 / 3" />
          </div>
          <div className={s.picker} data-chip="" role="group" aria-label="Chọn màu móng">
            <div className={s.swatches} role="radiogroup" aria-label="Màu móng">
              {SWATCHES.map((c) => (
                <button key={c.id} type="button" role="radio" aria-checked={pick === c.id} aria-label={c.name} title={c.name} className={s.swatch} data-on={pick === c.id ? "1" : "0"} style={{ background: c.hex }} onClick={() => setPick(c.id)} data-cursor={c.name} />
              ))}
            </div>
            <div className={s.pickerRow}>
              <p className={s.pickName} aria-live="polite">{mix ? "Trộn 5 màu" : swatchById(pick).name}</p>
              <button type="button" className={`${s.btn} ${s.btnMini}`} aria-pressed={mix} onClick={() => setMix((v) => !v)}>Trộn màu</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
