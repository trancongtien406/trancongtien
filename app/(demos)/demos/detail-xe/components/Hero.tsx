"use client";

import { useRef } from "react";
import Image from "next/image";
import { Counter, CursorSpotlight, ShineSweep, gsap, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { FACTS } from "../data/content";

const P = "/images/demos/detail-xe";

const Arrow = () => (
  <svg className={s.arrow} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
);

/**
 * Hero (khoảng 2.8s): nền carbon hiện, ảnh xe mở từ dưới lên đồng thời mờ -> nét và thu từ 1.12 về 1,
 * tiêu đề tách từ, dòng phụ, nút CTA kèm một lần quét sáng, cuối cùng một vệt sáng lướt qua thân xe.
 * Ánh sáng theo con trỏ trên ảnh (chỉ chuột). Reduced-motion: mọi thứ ở trạng thái cuối.
 */
export function Hero({ consultHref }: { consultHref: string }) {
  const ref = useRef<HTMLElement>(null);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) return;
    const q = (sel: string) => el.querySelectorAll<HTMLElement>(sel);
    const small = window.matchMedia("(max-width: 760px)").matches;
    const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power3.out" } });
    tl.from(q('[data-h="photo"]'), { clipPath: "inset(100% 0 0 0)", duration: 1.1, ease: "power3.inOut" }, 0.2)
      .from(q('[data-h="img"]'), { scale: 1.12, filter: `blur(${small ? 10 : 20}px)`, duration: 1.9, ease: "power2.out", clearProps: "filter,transform" }, 0.2)
      .from(q('[data-h="line"]'), { clipPath: "inset(0 100% 0 0)", duration: 1.0, stagger: 0.16, ease: "power2.inOut", clearProps: "clipPath" }, 0.95)
      .from(q('[data-h="fade"]'), { y: 22, opacity: 0, duration: 0.8, stagger: 0.12, clearProps: "transform,opacity" }, 1.3)
      .from(q('[data-h="spec"]'), { y: 30, opacity: 0, duration: 0.9, clearProps: "transform,opacity" }, 1.7)
      .fromTo(q('[data-h="streak"]'), { xPercent: -160, opacity: 0 }, { keyframes: { xPercent: [-160, 200, 560], opacity: [0, 0.9, 0], easeEach: "none" }, duration: 1.5, ease: "power1.inOut" }, 2.1);
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} id="top" className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroPhoto}>
      <CursorSpotlight style={{ position: "absolute", inset: 0 }} radius={380} color="rgba(220,230,245,0.16)">
        <div data-h="photo" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Image src={`${P}/den-chrome-dau-xe-2000.webp`} alt="Đèn pha và thân sơn đen bóng của một chiếc SUV" width={2000} height={1200} priority sizes="100vw" className={s.heroImg} data-h="img" />
          <span className={s.heroShade} aria-hidden="true" />
          <span className={s.heroCarbon} aria-hidden="true" />
          <span className={s.streak} data-h="streak" aria-hidden="true" />
        </div>
      </CursorSpotlight>
      </div>

      <div className={`${s.wrap} ${s.heroInner}`}>
        <p className={s.heroSub} data-h="fade"><span className={s.hairRed} aria-hidden="true" />&nbsp; Chăm sóc xe hơi · Quận Ngũ Hành Sơn, Đà Nẵng</p>
        <h1 id="hero-title" className={`${s.h1} ${s.heroTitle}`}>
          {["Rửa chi tiết,", "đánh bóng,", "phủ ceramic."].map((l) => <span key={l} className={s.chrome} data-h="line" style={{ display: "block" }}>{l}</span>)}
        </h1>
        <p className={`${s.lead} ${s.heroLead}`} data-h="fade">
          Cửa hàng chăm sóc xe hơi cho chủ xe cá nhân: sedan, SUV, bán tải và xe điện. Kiểm tra sơn dưới đèn, báo giá và các bước trước khi làm, nhận xe theo lịch hẹn.
        </p>
        <div className={s.ctaRow} data-h="fade">
          <ShineSweep trigger="loop" every={5} duration={1.1} color="rgba(255,255,255,0.75)" className={s.shineBtn}>
            <a className={`${s.btn} ${s.btnSolid}`} href={consultHref}>Đặt lịch kiểm tra xe <Arrow /></a>
          </ShineSweep>
          <a className={s.btn} href="#gia">Xem giá theo dòng xe</a>
        </div>
      </div>

      <div className={s.specBar} data-h="spec">
        <dl className={`${s.wrap} ${s.specGrid}`}>
          {FACTS.map((f) => (
            <div key={f.k} className={s.specCell}>
              <dt>{f.k}</dt>
              <dd>{typeof f.value === "number" ? <><Counter value={f.value} trigger="load" duration={1.8} /><small>{f.suffix}</small></> : f.text}</dd>
              <p className={s.specNote}>{f.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
