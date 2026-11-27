"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";

const C = 400;
const SATS = [
  { id: "vt01", name: "VT-01 Quang học", orbit: "LEO", r: 140, alt: 520, v: 7.6, per: 95, dur: 17, dir: 1, a0: 20, job: "Ảnh quang học độ phân giải cao cho theo dõi mùa vụ và đô thị.", st: "Trực tuyến" },
  { id: "vt02", name: "VT-02 Radar", orbit: "LEO", r: 210, alt: 560, v: 7.5, per: 96, dur: 25, dir: -1, a0: 140, job: "Radar khẩu độ tổng hợp, quan sát xuyên mây và đêm tối.", st: "Trực tuyến" },
  { id: "vt03", name: "VT-03 Nhiệt hồng ngoại", orbit: "MEO", r: 285, alt: 1200, v: 7.1, per: 109, dur: 36, dir: 1, a0: 250, job: "Đo nhiệt bề mặt, phát hiện điểm nóng và hạn hán.", st: "Hiệu chuẩn" },
  { id: "vt04", name: "VT-04 Chuyển tiếp", orbit: "MEO", r: 350, alt: 2000, v: 6.9, per: 127, dur: 52, dir: -1, a0: 70, job: "Chuyển tiếp dữ liệu về trạm mặt đất khi vệ tinh ngoài tầm nhìn.", st: "Trực tuyến" },
] as const;

const fmt = (n: number, d = 0) => n.toLocaleString("vi-VN", { minimumFractionDigits: d, maximumFractionDigits: d });

export function Orbital() {
  const root = useRef<HTMLElement>(null);
  const [sel, setSel] = useState(0);
  const [tick, setTick] = useState(0);
  const tweens = useRef<gsap.core.Tween[]>([]);
  const selRef = useRef(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<SVGGElement>("[data-orbit]", el);
      groups.forEach((g, i) => {
        const s = SATS[i];
        gsap.set(g, { rotation: s.a0, svgOrigin: `${C} ${C}` });
        if (reduce) return;
        const tw = gsap.to(g, { rotation: s.a0 + 360 * s.dir, svgOrigin: `${C} ${C}`, duration: s.dur, ease: "none", repeat: -1 });
        tweens.current[i] = tw;
      });
      gsap.set("[data-tilt]", { transformPerspective: 1500, rotationX: 0 });
      if (reduce) return;
      gsap.fromTo("[data-plane]", { rotationZ: -26, scale: 0.9 }, { rotationZ: 18, scale: 1.04, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      ScrollTrigger.create({
        trigger: el, start: "top bottom", end: "bottom top",
        onToggle: (self) => tweens.current.forEach((t) => t.paused(!self.isActive)),
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 600, 4);
          tweens.current.forEach((t, i) => gsap.to(t, { timeScale: (i === selRef.current ? 0.2 : 1) * boost, duration: 0.6, overwrite: true }));
        },
      });
      const rx = gsap.quickTo("[data-tilt]", "rotationX", { duration: 0.9, ease: "power3.out" });
      const ry = gsap.quickTo("[data-tilt]", "rotationY", { duration: 0.9, ease: "power3.out" });
      const mv = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const b = el.getBoundingClientRect();
        ry(((e.clientX - b.left) / b.width - 0.5) * 14);
        rx(-((e.clientY - b.top) / b.height - 0.5) * 12);
      };
      el.addEventListener("pointermove", mv);
      return () => el.removeEventListener("pointermove", mv);
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    selRef.current = sel;
    tweens.current.forEach((t, i) => t && gsap.to(t, { timeScale: i === sel ? 0.2 : 1, duration: 0.8 }));
  }, [sel]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1100);
    return () => window.clearInterval(id);
  }, []);

  const s = SATS[sel];
  const jitter = (seed: number, amp: number) => Math.sin(tick * 1.7 + seed) * amp;

  return (
    <section ref={root} className={styles.obs} id="dai-quan-sat" aria-labelledby="dqs">
      <div className={styles.head}>
        <p className={styles.eyebrow}>Đài quan sát</p>
        <h2 id="dqs" className={styles.h2}>Bốn vệ tinh, một bảng điều khiển</h2>
        <p className={styles.sub}>Di chuột để nghiêng mặt phẳng quỹ đạo, cuộn để xoay, chọn một vệ tinh để khoá và xem thông số.</p>
      </div>
      <div className={styles.obsGrid}>
        <div className={styles.stageWrap}>
          <div className={styles.tilt} data-tilt>
            <div className={styles.plane} data-plane>
              <svg viewBox="0 0 800 800" className={styles.orbitSvg} aria-hidden="true" focusable="false">
                <defs>
                  <radialGradient id="vt-earth" cx="35%" cy="30%" r="80%"><stop offset="0" stopColor="#7f9bff" /><stop offset=".55" stopColor="#2c43c7" /><stop offset="1" stopColor="#0a1250" /></radialGradient>
                  <radialGradient id="vt-halo"><stop offset=".7" stopColor="#5271FF" stopOpacity=".5" /><stop offset="1" stopColor="#5271FF" stopOpacity="0" /></radialGradient>
                  <clipPath id="vt-clip"><circle cx={C} cy={C} r="86" /></clipPath>
                </defs>
                <circle cx={C} cy={C} r="132" fill="url(#vt-halo)" />
                <circle cx={C} cy={C} r="86" fill="url(#vt-earth)" />
                <g clipPath="url(#vt-clip)" fill="none" stroke="#DCE8FF" strokeOpacity=".28" strokeWidth="1">
                  {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={C} cy={C} rx={86 - k * 18} ry="86" />)}
                  {[-54, -27, 0, 27, 54].map((y) => <line key={y} x1={C - 90} x2={C + 90} y1={C + y} y2={C + y} />)}
                </g>
                {SATS.map((o, i) => (
                  <g key={o.id} data-orbit className={sel === i ? styles.orbitOn : styles.orbit}>
                    <circle cx={C} cy={C} r={o.r} className={styles.orbitLine} fill="none" />
                    <g transform={`translate(${C + o.r} ${C})`} className={styles.sat} onClick={() => setSel(i)}>
                      <circle r="30" fill="transparent" />
                      <circle r="19" className={styles.lock} fill="none" />
                      <rect x="-14" y="-3" width="9" height="6" className={styles.panel} /><rect x="5" y="-3" width="9" height="6" className={styles.panel} />
                      <rect x="-5" y="-5" width="10" height="10" rx="2" className={styles.body} />
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.panelCol}>
          <ul className={styles.satList} aria-label="Danh sách vệ tinh minh hoạ">
            {SATS.map((o, i) => (
              <li key={o.id}>
                <button type="button" aria-pressed={sel === i} onClick={() => setSel(i)} className={styles.satBtn}>
                  <span className={styles.mono}>{o.id.toUpperCase()}</span>
                  <span>{o.name}</span>
                  <span className={styles.mono}>{o.orbit}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.telemetry}>
            <h3 aria-live="polite">{s.name}</h3>
            <p className={styles.job}>{s.job}</p>
            <dl>
              <div><dt>Độ cao</dt><dd>{fmt(s.alt + jitter(1, 1.8), 1)} <small>km</small></dd></div>
              <div><dt>Vận tốc</dt><dd>{fmt(s.v + jitter(2, 0.015), 2)} <small>km/s</small></dd></div>
              <div><dt>Chu kỳ</dt><dd>{s.per} <small>phút</small></dd></div>
              <div><dt>Trạng thái</dt><dd className={s.st === "Trực tuyến" ? styles.live : styles.warn}>{s.st}</dd></div>
            </dl>
            <p className={styles.fnote}>Thông số hư cấu, dùng để minh hoạ giao diện.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
