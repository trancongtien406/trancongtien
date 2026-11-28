"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "../brand.module.css";

const COLS = ["31,75,255", "58,110,255", "255,95,210", "140,90,255", "90,170,255"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = root.current; const canvas = cv.current;
    if (!el || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = canvas.getContext("2d"); if (!c) return;
    const small = window.innerWidth < 760;
    let W = 0, H = 0;
    const size = () => { const r = el.getBoundingClientRect(); const k = small ? 0.5 : 0.6; W = Math.max(1, Math.floor(r.width * k)); H = Math.max(1, Math.floor(r.height * k)); canvas.width = W; canvas.height = H; };
    size();
    const ro = new ResizeObserver(size); ro.observe(el);
    let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const N = small ? 10 : 18;
    const st = Array.from({ length: N }, (_, i) => ({ y: 0.2 + rnd() * 0.75, amp: 0.03 + rnd() * 0.12, fr: 0.8 + rnd() * 1.6, ph: rnd() * 6, sp: 0.05 + rnd() * 0.18, w: 1 + rnd() * 5, col: COLS[i % COLS.length], a: 0.25 + rnd() * 0.6, tilt: -0.28 + rnd() * 0.5, x0: rnd() * 0.5, len: 0.35 + rnd() * 0.6 }));
    let vis = true; let raf = 0; let last = performance.now(); let T = 0;
    const draw = () => {
      c.globalCompositeOperation = "source-over";
      const g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, "#02071f"); g.addColorStop(0.6, "#06124a"); g.addColorStop(1, "#030a2e");
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";
      // vệt sáng lớn nằm ngang
      const gy = H * 0.5; const hg = c.createLinearGradient(0, 0, W * 0.85, 0);
      hg.addColorStop(0, "rgba(120,210,255,0.95)"); hg.addColorStop(0.35, "rgba(50,100,255,.55)"); hg.addColorStop(1, "rgba(30,70,255,0)");
      c.fillStyle = hg; c.fillRect(0, gy - 2, W * 0.85, 3);
      c.globalAlpha = 0.25; c.fillRect(0, gy - 14, W * 0.7, 28); c.globalAlpha = 1;
      for (const k of st) {
        const x1 = (k.x0 + ((T * k.sp) % 1.2) - 0.1) * W; const x2 = x1 + k.len * W;
        const g2 = c.createLinearGradient(x1, 0, x2, 0);
        g2.addColorStop(0, `rgba(${k.col},0)`); g2.addColorStop(0.5, `rgba(${k.col},${k.a})`); g2.addColorStop(1, `rgba(${k.col},0)`);
        for (const [m, al] of [[3, 0.15], [1.6, 0.35], [0.6, 1]] as const) {
          c.strokeStyle = g2; c.globalAlpha = al; c.lineWidth = k.w * m * (W / 900); c.lineCap = "round";
          c.beginPath();
          for (let i = 0; i <= 24; i++) { const u = i / 24; const x = x1 + (x2 - x1) * u; const y = (k.y + k.tilt * (x / W - 0.5)) * H + Math.sin(u * k.fr * 3 + k.ph + T * 0.3) * k.amp * H; if (i) c.lineTo(x, y); else c.moveTo(x, y); }
          c.stroke();
        }
      }
      c.globalAlpha = 1;
    };
    const loop = (now: number) => { raf = requestAnimationFrame(loop); if (!vis) { last = now; return; } T += Math.min(0.05, (now - last) / 1000); last = now; draw(); };
    if (reduce) { T = 2; draw(); } else raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(el);

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from("[data-h1] > span", { autoAlpha: 0, y: 16, filter: "blur(8px)", duration: 1.1, stagger: 0.12, ease: "power3.out" });
      gsap.from("[data-hin]", { autoAlpha: 0, y: 20, duration: 1, stagger: 0.12, delay: 0.5, ease: "power3.out" });
    }, el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); ctx.revert(); };
  }, []);

  return (
    <section ref={root} id="top" className={s.hero} aria-labelledby="h1">
      <canvas ref={cv} className={s.streaks} aria-hidden="true" />
      <div className={s.heroShade} aria-hidden="true" />
      <div className={s.heroCopy}>
        <h1 id="h1" data-h1><span>Kiến tạo tương lai</span> <span>sáng <em>cho Ngân hàng</em></span></h1>
        <p data-hin>Đồng hành cùng các tổ chức tài chính bằng đổi mới, niềm tin và trải nghiệm số liền mạch.</p>
        <div className={s.heroBtns} data-hin>
          <a className={s.btnWhite} href="#dang-ky">Dùng thử miễn phí</a><span aria-hidden="true" className={s.vbar} /><a className={s.btnText} href="#san-pham">Tìm hiểu thêm</a>
        </div>
      </div>
      <aside className={s.revCard} aria-label="Thẻ doanh thu minh hoạ" data-hin>
        <p><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 12l4-4 3 3 7-7M10 4h5v5" fill="none" stroke="#fff" strokeWidth="1.6" /></svg> Doanh thu <i aria-hidden="true" /></p>
        <div><b>₫10,6 tỷ</b><small>30 ngày qua</small></div>
        <div><span className={s.chip}>+26%</span><small>so với 30 ngày trước</small></div>
      </aside>
      <div className={s.heroFoot}>
        <a href="#gioi-thieu" className={s.scrollHint}>Cuộn <span aria-hidden="true">↓</span></a>
        <p>Gặp hơn 10 cố vấn tài chính <span className={s.vbar} aria-hidden="true" />
          <span className={s.avs}>{["av1", "av2", "av3"].map((a) => (<img key={a} src={`/images/demos/vi-nguon/${a}.webp`} width={34} height={34} alt="" loading="eager" />))}</span> Chuyên gia tài chính</p>
      </div>
    </section>
  );
}
