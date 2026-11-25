"use client";

import { useRef } from "react";
import Image from "next/image";
import { Counter, MagneticButton, Odometer, ShineSweep, gsap, prefersReducedMotion, useFxLayout } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { BIKES } from "../data/fleet";
import { ROUTES } from "../data/content";
import { SpeedLines } from "./SpeedLines";
import { INTRO_KEY } from "./Preloader";

const P = "/images/demos/phuot-xe";
const FROM = Math.min(...BIKES.map((b) => b.perDay));

/**
 * Hero: ảnh mở bằng nhát cắt chéo, ba dòng tiêu đề trượt vào nghiêng, vệt tốc độ bùng lên rồi lắng,
 * cụm số (odometer) chạy khi tới nơi. Nếu lần đầu trong phiên thì chờ cờ caro xong (0.9s).
 * Reduced-motion: mọi thứ ở trạng thái cuối.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useFxLayout(ref, (el) => {
    if (prefersReducedMotion()) return;
    let first = false;
    try { first = sessionStorage.getItem(INTRO_KEY) !== "1"; } catch { /* riêng tư */ }
    const d = first ? 0.9 : 0.05;
    const q = (sel: string) => el.querySelectorAll<HTMLElement>(sel);
    const root = el.closest<HTMLElement>("[data-vx-root]");
    const tl = gsap.timeline({ delay: d, defaults: { ease: "power4.out" } });
    tl.from(q('[data-h="photo"]'), { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", duration: 0.95, ease: "power3.inOut" }, 0)
      .from(q('[data-h="img"]'), { scale: 1.32, duration: 1.7, ease: "power2.out" }, 0)
      .from(q('[data-h="line"]'), { yPercent: 115, skewX: -16, duration: 0.85, stagger: 0.12 }, 0.2)
      .from(q('[data-h="fade"]'), { y: 26, opacity: 0, duration: 0.8, stagger: 0.09, clearProps: "transform,opacity" }, 0.75)
      .from(q('[data-h="flag"]'), { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power3.out" }, 0.9);
    if (root) {
      tl.set(root, { "--vx-v": 1 }, 0.1).to(root, { "--vx-v": 0, duration: 1.6, ease: "power2.out" }, 0.4);
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} id="top" className={s.hero}>
      <div className={s.heroPhoto} data-h="photo">
        <div className={s.heroImgBox}>
          <Image
            src={`${P}/hoang-hon-tay-lai-2000.webp`} alt="Người lái mô tô đội mũ bảo hiểm, dừng trên đường ven biển lúc hoàng hôn"
            width={2000} height={1333} priority sizes="(max-width: 900px) 100vw, 62vw" className={s.cover} data-h="img" style={{ objectPosition: "42% 40%" }}
          />
        </div>
        <SpeedLines className={s.heroSpeed} />
        <span className={s.heroShade} aria-hidden="true" />
      </div>

      <div className={`${s.wrap} ${s.heroInner}`}>
        <p className={s.kicker} data-h="fade">Thuê xe máy &amp; mô tô phượt · Đà Nẵng</p>
        <h1 className={s.h1} aria-label="Chọn xe. Lên đường. Vọt đi.">
          <span className={s.h1Line} aria-hidden="true"><span data-h="line">CHỌN XE.</span></span>
          <span className={s.h1Line} aria-hidden="true"><span data-h="line">LÊN ĐƯỜNG.</span></span>
          <span className={`${s.h1Line} ${s.h1Hot}`} aria-hidden="true"><span data-h="line">VỌT ĐI.</span></span>
        </h1>
        <p className={s.lead} data-h="fade">
          Xe số, tay ga, côn tay và mô tô phượt cho những ngày ở Đà Nẵng. Giá ngày, giá tuần rõ từng dòng, tính xong là biết cọc bao nhiêu.
        </p>
        <div className={s.ctaRow} data-h="fade">
          <MagneticButton strength={0.35} max={14}>
            <ShineSweep trigger="loop" every={4.2} color="rgba(255,255,255,.7)" className={s.shineBtn}>
              <a className={`${s.btn} ${s.btnYellow}`} href="#doi-xe">Chọn xe ngay</a>
            </ShineSweep>
          </MagneticButton>
          <a className={`${s.btn} ${s.btnGhost}`} href="#tinh-gia">Tính giá thuê</a>
        </div>
      </div>

      <div className={`${s.wrap} ${s.odo}`} data-h="fade">
        <span className={s.flag} data-h="flag" aria-hidden="true" />
        <dl className={s.odoRow}>
          <div><dt>Mẫu xe</dt><dd><Odometer value={BIKES.length} trigger="load" className={s.odoNum} /></dd></div>
          <div><dt>Cung đường gợi ý</dt><dd><Odometer value={ROUTES.length} trigger="load" className={s.odoNum} /></dd></div>
          <div><dt>Thuê từ</dt><dd className={s.odoPrice}><Counter value={FROM} trigger="load" duration={1.6} className={s.odoNum} /><small>&nbsp;₫ / ngày</small></dd></div>
          <div><dt>Giá tuần</dt><dd className={s.odoText}>rẻ hơn 7 ngày lẻ</dd></div>
        </dl>
      </div>
    </section>
  );
}
