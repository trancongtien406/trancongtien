"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";

const STEPS = [
  ["1", "Cài ứng dụng", "Thêm ứng dụng vào trình dựng web của bạn chỉ với vài cú bấm, rồi bắt đầu ngay."],
  ["2", "Kéo và thả", "Kéo hiệu ứng, cảnh 3D hoặc ánh sáng vào trang. Xem trước ngay trong lúc chỉnh."],
  ["3", "Dựng website ấn tượng", "Kết hợp chuyển động cuộn, 3D và chi tiết tương tác để website của bạn nổi bật."],
];

function RocketSvg() {
  return (
    <svg viewBox="-40 0 300 440" className={s.rocketSvg} role="img" aria-label="Tên lửa 3D đang phóng lên với ngọn lửa cam">
      <defs>
        <linearGradient id="ccr" x1="0" x2="1"><stop offset="0" stopColor="#0b2f6b" /><stop offset=".2" stopColor="#2f86d8" /><stop offset=".42" stopColor="#bfe6ff" /><stop offset=".6" stopColor="#4a9be6" /><stop offset=".85" stopColor="#12418a" /><stop offset="1" stopColor="#0a2559" /></linearGradient>
        <linearGradient id="ccn" x1="0" x2="1"><stop offset="0" stopColor="#c2410c" /><stop offset=".4" stopColor="#ffd08a" /><stop offset="1" stopColor="#c2410c" /></linearGradient>
        <linearGradient id="ccfin" x1="0" x2="1"><stop offset="0" stopColor="#ff9d2e" /><stop offset=".5" stopColor="#ff6a12" /><stop offset="1" stopColor="#c2410c" /></linearGradient>
        <linearGradient id="ccf" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".18" stopColor="#fff1a8" /><stop offset=".5" stopColor="#ffa31a" /><stop offset="1" stopColor="#ff3d00" stopOpacity="0" /></linearGradient>
        <radialGradient id="ccw" cx=".38" cy=".32"><stop offset="0" stopColor="#fff6cf" /><stop offset=".5" stopColor="#ffb94a" /><stop offset="1" stopColor="#d9641a" /></radialGradient>
        <radialGradient id="ccg" cx=".5" cy=".5"><stop offset="0" stopColor="#ffb347" stopOpacity=".9" /><stop offset="1" stopColor="#ff6a00" stopOpacity="0" /></radialGradient>
        <filter id="ccb" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id="ccb2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22" /></filter>
      </defs>
      <ellipse cx="110" cy="330" rx="120" ry="150" fill="url(#ccg)" filter="url(#ccb2)" opacity=".8" />
      <g data-flame="">
        <path d="M74 272 C58 340 96 410 110 438 C124 410 162 340 146 272Z" fill="url(#ccf)" filter="url(#ccb)" opacity=".9" />
        <path d="M84 270 C76 330 102 380 110 410 C118 380 144 330 136 270Z" fill="url(#ccf)" />
        <path d="M98 270 C96 306 106 330 110 346 C114 330 124 306 122 270Z" fill="#fffef0" />
      </g>
      <path d="M62 236 C40 262 24 296 20 326 C34 316 52 306 70 298Z" fill="url(#ccfin)" />
      <path d="M158 236 C180 262 196 296 200 326 C186 316 168 306 150 298Z" fill="url(#ccfin)" />
      <path d="M110 14 C70 56 58 140 64 274 L156 274 C162 140 150 56 110 14Z" fill="url(#ccr)" />
      <path d="M110 14 C94 36 86 56 82 84 L138 84 C134 56 126 36 110 14Z" fill="url(#ccn)" />
      <path d="M76 120 C92 128 128 128 144 120 L145 136 C128 144 92 144 75 136Z" fill="#0c2c66" opacity=".7" />
      <rect x="62" y="262" width="96" height="24" rx="7" fill="#0c2f69" /><rect x="62" y="262" width="96" height="6" rx="3" fill="#6fb7ff" opacity=".5" />
      <circle cx="110" cy="176" r="33" fill="#0a2352" /><circle cx="110" cy="176" r="27" fill="url(#ccw)" />
      <ellipse cx="102" cy="166" rx="9" ry="6" fill="#fff" opacity=".7" />
      <path d="M84 100 C80 160 82 220 88 262" stroke="#fff" strokeOpacity=".55" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M138 90 C142 150 140 210 136 262" stroke="#04132f" strokeOpacity=".35" strokeWidth="10" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Rocket() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    el.dataset.anim = "on";
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const vh = window.innerHeight;
      const steps = q("[data-step]");
      gsap.set(steps, { opacity: 0.25, y: 14 });
      gsap.set(q("[data-puff]"), { scale: 0.2, autoAlpha: 0, y: 0 });
      gsap.set(q("[data-fire]"), { autoAlpha: 0, scale: 0.4 });
      gsap.set(q("[data-flame]"), { scaleY: 0.35, transformOrigin: "50% 0%" });
      gsap.set(q("[data-rocket]"), { y: vh * 0.12 });
      gsap.timeline({ defaults: { ease: "power1.inOut" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .to(steps[0], { opacity: 1, y: 0, duration: 0.5 }, 0.1)
        .to(q("[data-flame]"), { scaleY: 1.5, duration: 1.6 }, 0.4)
        .to(q("[data-fire]"), { autoAlpha: 1, scale: 1, duration: 0.8 }, 0.5)
        .to(steps[1], { opacity: 1, y: 0, duration: 0.5 }, 1)
        .to(q("[data-puff]"), { scale: 1.3, autoAlpha: 0.85, stagger: { each: 0.12, from: "center" }, duration: 1.2 }, 0.8)
        .to(q("[data-rocket]"), { y: -vh * 0.85, duration: 2.2, ease: "power2.in" }, 1.6)
        .to(q("[data-fire]"), { scale: 1.8, duration: 1.2 }, 1.7)
        .to(steps[2], { opacity: 1, y: 0, duration: 0.5 }, 2)
        .to(q("[data-puff]"), { y: -30, scale: 1.7, autoAlpha: 0, duration: 1.4 }, 3)
        .to(q("[data-fire]"), { autoAlpha: 0, duration: 0.8 }, 3);
      gsap.to(q("[data-flame]"), { scaleX: 1.08, duration: 0.12, yoyo: true, repeat: -1, ease: "sine.inOut" });
    }, el);
    return () => { ctx.revert(); delete el.dataset.anim; };
  }, []);

  return (
    <section className={s.how} id="cach-bat-dau" ref={root} aria-labelledby="cc-how">
      <div className={s.howStick}>
        <div className={s.howInner}>
          <div className={s.howText}>
            <p className={s.pillTag}><i aria-hidden="true" />Bắt đầu cùng Cất Cánh Studio</p>
            <h2 id="cc-how" className={s.h2}>Cách <span>bắt đầu.</span></h2>
            <ol className={s.stepList}>
              {STEPS.map(([n, t, d]) => (
                <li key={n} data-step=""><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ol>
          </div>
          <div className={s.rocketBox}>
            <div className={s.rocketGlow} aria-hidden="true" />
            <div className={s.rocket} data-rocket=""><RocketSvg />
              <span className={s.fireGlow} data-fire="" aria-hidden="true" />
            </div>
            <div className={s.smoke} aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <i key={i} data-puff="" style={{ "--i": i } as React.CSSProperties} />)}
            </div>
            <p className={s.note} aria-hidden="true">Làm bằng<br />Dòng Chuyển Động</p>
          </div>
        </div>
      </div>
    </section>
  );
}
