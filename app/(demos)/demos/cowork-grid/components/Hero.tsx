"use client";

import Image from "next/image";
import { useRef } from "react";
import { Counter, MagneticButton, TextScramble, gsap, registerGsap, useFxLayout } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { HERO, IMG, SPECS } from "../data/content";

const COLS = 6;
const ROWS = 4;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/+";

/**
 * Hero: bản vẽ dựng dần. Thứ tự (khoảng 1,8 giây): đường lưới vẽ ra, nhãn toạ độ giải mã, tiêu đề lên từng dòng,
 * mô tả và nút lên, các ô che ảnh mở theo đường chéo, ô cam sáng cuối cùng rồi tắt.
 * Reduced-motion: mọi thứ hiện sẵn, không chuyển động. Trạng thái ẩn chỉ đặt bằng JS.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const consult = buildConsultHref("cowork-grid");

  useFxLayout(root, (el) => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
      const vl = q("[data-hv]");
      const hl = q("[data-hh]");
      const lines = q("[data-hline] > span");
      const cells = q("[data-hcell]");
      const fade = q("[data-hfade]");
      const ctas = q("[data-hcta]");
      const ticks = q("[data-hticks]");
      gsap.set(vl, { scaleY: 0, transformOrigin: "50% 0" });
      gsap.set(hl, { scaleX: 0, transformOrigin: "0 50%" });
      gsap.set(lines, { yPercent: 112 });
      gsap.set(fade, { opacity: 0, y: 16 });
      gsap.set(ctas, { opacity: 0, y: 22 });
      gsap.set(ticks, { opacity: 0 });
      gsap.set(cells, { opacity: 1 });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(vl, { scaleY: 1, duration: 0.75, stagger: 0.07 }, 0.15)
        .to(hl, { scaleX: 1, duration: 0.75, stagger: 0.07 }, 0.2)
        .to(ticks, { opacity: 1, duration: 0.4 }, 0.45)
        .to(lines, { yPercent: 0, duration: 0.8, stagger: 0.14, ease: "expo.out" }, 0.5)
        .to(fade, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.0)
        .to(ctas, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 1.25);
      cells.forEach((c) => {
        const r = Number(c.dataset.r), k = Number(c.dataset.c);
        tl.to(c, { opacity: 0, scale: 0.94, duration: 0.45, ease: "power2.inOut" }, 0.5 + (r + k) * 0.095 + Math.random() * 0.1);
      });
      return () => { gsap.set([...vl, ...hl, ...lines, ...fade, ...ctas, ...ticks, ...cells], { clearProps: "all" }); };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={s.hero} id="top" aria-labelledby="cg-h1">
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <span className={s.heroLinesV} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => <i key={i} data-hv style={{ left: `${i * 25}%` }} />)}
        </span>
        <span className={s.heroLinesH} aria-hidden="true">
          {[0, 1].map((i) => <i key={i} data-hh style={{ top: `${i * 100}%` }} />)}
        </span>

        <div className={s.heroText}>
          <p className={s.heroKicker} data-hfade>
            <TextScramble trigger="load" duration={0.9} charset={CHARS}>{HERO.kicker}</TextScramble>
          </p>
          <h1 id="cg-h1" className={s.h1}>
            {HERO.h1.map((l, i) => (
              <span key={l} className={s.h1Line} data-hline>
                <span>{l}{i === HERO.h1.length - 1 && <em className={s.dot}>.</em>}</span>
              </span>
            ))}
          </h1>
          <p className={s.heroLead} data-hfade>{HERO.lead}</p>
          <ul className={s.heroChips} data-hfade aria-label="Các loại chỗ">
            {HERO.chips.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <div className={s.heroCtas}>
            <span data-hcta>
              <MagneticButton strength={0.3} max={10}>
                <a className={`${s.btn} ${s.btnOrange}`} href="#so-do">Chọn chỗ trên sơ đồ</a>
              </MagneticButton>
            </span>
            <span data-hcta><a className={`${s.btn} ${s.btnLine}`} href={consult}>Đặt lịch tham quan</a></span>
          </div>
        </div>

        <figure className={s.heroFig}>
          <div className={s.figRulerTop} aria-hidden="true" data-hticks>
            {"ABCDEF".split("").map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className={s.figRulerLeft} aria-hidden="true" data-hticks>
            {[1, 2, 3, 4].map((n) => <span key={n}>{n}</span>)}
          </div>
          <div className={s.figFrame}>
            <Image
              src={IMG("ban-dai-go", 2000)}
              alt="Dãy bàn gỗ dài với ghế công thái học và laptop, ánh sáng từ cửa sổ"
              fill priority sizes="(max-width: 1024px) 100vw, 620px" className={s.figImg}
            />
            <div className={s.cells} aria-hidden="true">
              {Array.from({ length: ROWS * COLS }, (_, i) => {
                const r = Math.floor(i / COLS), c = i % COLS;
                return <i key={i} data-hcell data-r={r} data-c={c} data-accent={r === 1 && c === 3 ? "1" : undefined} />;
              })}
            </div>
            <span className={s.figMark} aria-hidden="true">+</span>
          </div>
          <figcaption className={s.figCap} data-hfade>
            <span><i className={s.sq} aria-hidden="true" />A1 · KHU MỞ, DÃY BÀN DÀI</span>
            <span>10 CHỖ MỖI DÃY</span>
          </figcaption>
        </figure>

        <ul className={s.specs} aria-label="Quy mô không gian">
          {SPECS.map((sp) => (
            <li key={sp.k} data-hfade>
              <span className={s.specK}>{sp.k}</span>
              <Counter value={sp.value} className={s.specN} duration={1.2} />
              <span className={s.specL}>{sp.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
