"use client";

import { useRef } from "react";
import Image from "next/image";
import { Counter, CursorSpotlight, ShineSweep, SplitWords, gsap, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";

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
        <p className={s.heroSub} data-h="fade"><span className={s.hairRed} aria-hidden="true" />&nbsp; Auto detailing · Đà Nẵng</p>
        <h1 id="hero-title" className={`${s.h1} ${s.heroTitle}`}>
          <SplitWords as="span" trigger="load" delay={1.0} duration={0.95} stagger={0.07} className={s.chrome}>Vẻ đẹp nằm ở từng chi tiết.</SplitWords>
        </h1>
        <p className={`${s.lead} ${s.heroLead}`} data-h="fade">
          Từ làm sạch chuyên sâu, hiệu chỉnh sơn đến bảo vệ ceramic. Mỗi quy trình được chọn dựa trên tình trạng thực tế của chiếc xe, không làm thừa một bước nào.
        </p>
        <div className={s.ctaRow} data-h="fade">
          <ShineSweep trigger="loop" every={5} duration={1.1} color="rgba(255,255,255,0.75)" className={s.shineBtn}>
            <a className={`${s.btn} ${s.btnSolid}`} href="#chon-goi">Chọn gói cho xe của bạn <Arrow /></a>
          </ShineSweep>
          <a className={s.btn} href={consultHref}>Đặt lịch kiểm tra xe</a>
        </div>
      </div>

      <div className={s.specBar} data-h="spec">
        <dl className={`${s.wrap} ${s.specGrid}`}>
          <div className={s.specCell}><dt>Gói chăm sóc</dt><dd><Counter value={5} trigger="load" duration={1.4} /></dd></div>
          <div className={s.specCell}><dt>Bước tối đa</dt><dd><Counter value={24} trigger="load" duration={1.8} /><small>&nbsp;bước</small></dd></div>
          <div className={s.specCell}><dt>Thời gian</dt><dd><Counter value={90} trigger="load" duration={1.6} /><small>&nbsp;phút đến 2 ngày</small></dd></div>
          <div className={s.specCell}><dt>Giá từ</dt><dd><Counter value={350000} trigger="load" duration={1.8} /><small>&nbsp;₫</small></dd></div>
        </dl>
      </div>
    </section>
  );
}
