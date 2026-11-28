"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";
import { STATS } from "../data";

const TOWERS = [
  { x: -0.62, z: 0.1, w: 0.2, h: 0.5, f: 18 },
  { x: 0, z: -0.05, w: 0.22, h: 1.0, f: 38 },
  { x: 0.62, z: 0.12, w: 0.2, h: 0.72, f: 26 },
];

export function Studio() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = cv.current; const wrap = box.current;
    if (!canvas || !wrap) return;
    const c = canvas.getContext("2d");
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 760;
    let W = 0, H = 0; const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = () => { const r = wrap.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * dpr; canvas.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    const ro = new ResizeObserver(size); ro.observe(wrap);
    let prog = reduce ? 1 : 0; let visible = true; let raf = 0; const t0 = performance.now();
    const pts = small ? 3 : 6;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = reduce ? 0.9 : (now - t0) / 1000;
      c.clearRect(0, 0, W, H);
      const cx = W * 0.5, base = H * 0.8, sc = Math.min(W * 0.46, H * 0.5);
      const th = 0.6 + t * 0.16; const cs = Math.cos(th), sn = Math.sin(th);
      const P = (x: number, y: number, z: number): [number, number] => [cx + (x * cs - z * sn) * sc, base - y * sc * 1.25 + (x * sn + z * cs) * sc * 0.3];
      c.strokeStyle = "rgba(232,194,122,.4)"; c.setLineDash([5, 6]); c.lineWidth = 1;
      c.beginPath(); for (let a = 0; a <= 90; a++) { const an = (a / 90) * Math.PI * 2; const [px, py] = P(Math.cos(an) * 1.18, 0, Math.sin(an) * 1.18); if (a) c.lineTo(px, py); else c.moveTo(px, py); } c.stroke(); c.setLineDash([]);
      const cr = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      TOWERS.forEach((tw, ti) => {
        const lp = Math.min(1, Math.max(0, prog * 1.5 - ti * 0.16));
        const built = Math.floor(lp * tw.f); const fh = tw.h / tw.f;
        for (let f = 0; f <= built; f++) {
          const y = f * fh; const top = f === built;
          const q = cr.map(([a, b]) => P(tw.x + a * tw.w, y, tw.z + b * tw.w));
          c.strokeStyle = `rgba(255,224,160,${top ? 0.9 : 0.32})`; c.beginPath(); q.forEach(([px, py], i) => { if (i) c.lineTo(px, py); else c.moveTo(px, py); }); c.closePath(); c.stroke();
          for (let e = 0; e < 4; e++) {
            const [ax, ay] = q[e]; const [bx, by] = q[(e + 1) % 4];
            for (let k = 0; k < pts; k++) { const u = k / pts; const jx = ((f * 7 + e * 3 + k) % 5) * 0.2; c.fillStyle = (f + k + ti) % 4 === 0 ? "rgba(255,238,196,.95)" : "rgba(255,208,130,.55)"; c.fillRect(ax + (bx - ax) * u - 0.8 + jx, ay + (by - ay) * u - 0.8, 1.7, 1.7); }
          }
        }
        if (built > 0) {
          c.strokeStyle = "rgba(232,194,122,.38)";
          cr.forEach(([a, b]) => { const [x1, y1] = P(tw.x + a * tw.w, 0, tw.z + b * tw.w); const [x2, y2] = P(tw.x + a * tw.w, built * fh, tw.z + b * tw.w); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); });
        }
      });
    };
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "80px" }); io.observe(wrap);
    const st = reduce ? null : ScrollTrigger.create({ trigger: "#xuong", start: "top 75%", end: "center 40%", scrub: true, onUpdate: (self) => { prog = self.progress; } });
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); st?.kill(); };
  }, []);

  return (
    <section id="xuong" className={s.studio} aria-labelledby="st-h">
      <div className={s.studioGrid}>
        <div className={s.studioText}>
          <p className={s.mono}><i className={s.dash} />Xưởng thiết kế</p>
          <h2 id="st-h" className={s.srOnly}>Vì sao có tên Hoàng Hôn</h2>
          <p className={s.words} data-words>Hoàng Hôn là ánh sáng đầu tiên bạn thấy khi mặt trời khuất núi. Chúng tôi lấy tên này vì công việc của mình được đánh giá đúng vào giờ ấy: khi cần cẩu đã đi, giàn giáo đã tháo, và một toà nhà phải tự đứng được, trong thứ ánh sáng nó được thiết kế để đón, cho một trăm năm tới.</p>
          <p className={s.mono} style={{ opacity: 0.6 }}>Tháp Hoàng Hôn · Thành lập 2004 · Ven sông</p>
        </div>
        <div ref={box} className={s.towerBox} role="img" aria-label="Ba toà tháp dựng dần bằng giàn giáo điểm sáng, quay chậm">
          <canvas ref={cv} /><i className={`${s.corner} ${s.c1}`} /><i className={`${s.corner} ${s.c2}`} />
          <p className={s.figLabel}>FIG. 01 · Cụm Ánh Hà</p>
        </div>
      </div>
      <ul className={s.stats} data-stats>
        {STATS.map((x) => (
          <li key={x.l}><strong><span data-count={x.v}>{x.v}</span>{x.suf}</strong><p>{x.l}</p></li>
        ))}
      </ul>
    </section>
  );
}
