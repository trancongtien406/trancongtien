"use client";

import { useRef } from "react";
import { ScrollTrigger, clamp, gsap, markReady, prefersReducedMotion, useFx } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { SCENES } from "../data/content";
import { makeStars } from "./stars";
import { trees } from "../lib/scenery";
import { Photo } from "./Photo";

const STARS = makeStars(70, 7, 70);

/** Mốc màu trời theo tiến độ 0..1 (06:00 → 21:00). */
const SKY: { p: number; top: string; bot: string; far: string; mid: string; near: string }[] = [
  { p: 0.0, top: "#5c7e78", bot: "#e9b480", far: "#6f9488", mid: "#4a7860", near: "#27503a" },
  { p: 0.17, top: "#6f9c92", bot: "#cdd8b6", far: "#5c8a7a", mid: "#3f6f55", near: "#234a34" },
  { p: 0.33, top: "#5c9a95", bot: "#b9d3be", far: "#4f8478", mid: "#386a50", near: "#204632" },
  { p: 0.5, top: "#7ea08a", bot: "#d9c68f", far: "#58806c", mid: "#385f48", near: "#1f4030" },
  { p: 0.66, top: "#8c6d78", bot: "#f08a3c", far: "#5b4a4f", mid: "#3a3a3c", near: "#1d2a22" },
  { p: 0.8, top: "#2a2b45", bot: "#7a3a35", far: "#2d2a3a", mid: "#1f2430", near: "#101c17" },
  { p: 0.9, top: "#141c33", bot: "#1f2b3a", far: "#16202c", mid: "#10202a", near: "#0b1713" },
  { p: 1.0, top: "#0b1424", bot: "#0f2a1d", far: "#10202a", mid: "#0c1f22", near: "#08140f" },
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
function sky(p: number) {
  let i = 0;
  while (i < SKY.length - 2 && p > SKY[i + 1].p) i++;
  const a = SKY[i], b = SKY[i + 1];
  const t = clamp((p - a.p) / (b.p - a.p), 0, 1);
  return { top: mix(a.top, b.top, t), bot: mix(a.bot, b.bot, t), far: mix(a.far, b.far, t), mid: mix(a.mid, b.mid, t), near: mix(a.near, b.near, t) };
}
const ramp = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

const T0 = SCENES[0].minutes, T1 = SCENES[SCENES.length - 1].minutes;
const fmtClock = (min: number) => { const t = Math.round(min / 5) * 5; return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; };

const HILL_FAR = "M0 300V190C120 150 200 170 320 140C440 110 520 160 640 150C760 140 840 90 980 110C1100 128 1180 170 1300 150C1400 134 1500 100 1600 120V300Z";
const HILL_MID = "M0 300V220L40 170L60 200L96 140L130 214L190 240L250 190L270 150L296 200L330 130L366 210L430 250L520 236L580 180L610 140L640 196L676 120L716 208L790 250L880 238L940 190L972 150L1000 196L1036 126L1080 214L1150 250L1240 232L1290 180L1318 140L1344 196L1380 118L1420 210L1500 246L1600 230V300Z";

const NEAR_TREES = trees(72, 41, 4800, 300, 250, 70, 160);

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  useFx(ref, (el) => {
    const stage = el.querySelector<HTMLElement>("[data-stage]")!;
    const track = el.querySelector<HTMLElement>("[data-track]")!;
    const viewport = el.querySelector<HTMLElement>("[data-viewport]")!;
    const starsEl = el.querySelector<HTMLElement>("[data-stars]")!;
    const sun = el.querySelector<HTMLElement>("[data-sun]")!;
    const moon = el.querySelector<HTMLElement>("[data-moon]")!;
    const far = el.querySelector<HTMLElement>("[data-far]")!;
    const mid = el.querySelector<HTMLElement>("[data-mid]")!;
    const near = el.querySelector<HTMLElement>("[data-near]")!;
    const clock = el.querySelector<HTMLElement>("[data-clock]")!;
    const phaseEl = el.querySelector<HTMLElement>("[data-phase]")!;
    const ticks = Array.from(el.querySelectorAll<HTMLButtonElement>("[data-tick]"));
    const panels = Array.from(el.querySelectorAll<HTMLElement>("[data-scene]"));
    const mm = gsap.matchMedia();
    let lastActive = -1, lastClock = "";

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const apply = (p: number) => {
        const c = sky(p);
        stage.style.setProperty("--sky-top", c.top);
        stage.style.setProperty("--sky-bot", c.bot);
        stage.style.setProperty("--hill-far", c.far);
        stage.style.setProperty("--hill-mid", c.mid);
        stage.style.setProperty("--hill-near", c.near);
        track.style.transform = `translate3d(${(-dist() * p).toFixed(1)}px,0,0)`;
        far.style.transform = `translate3d(${(-p * 5).toFixed(2)}%,0,0)`;
        mid.style.transform = `translate3d(${(-p * 14).toFixed(2)}%,0,0)`;
        near.style.transform = `translate3d(${(-p * 28).toFixed(2)}%,0,0)`;
        // Mặt trời đi theo cung 06:00 → 18:00; mặt trăng mọc từ p≈0.68.
        const min = T0 + p * (T1 - T0);
        const st = clamp((min - 360) / 720, 0, 1);
        sun.style.transform = `translate3d(${(8 + 84 * st).toFixed(1)}vw,${(70 - 56 * Math.sin(Math.PI * st)).toFixed(1)}svh,0)`;
        sun.style.opacity = String(1 - ramp(p, 0.62, 0.78));
        const mt = ramp(p, 0.68, 1);
        moon.style.transform = `translate3d(${(88 - 40 * mt).toFixed(1)}vw,${(60 - 40 * mt).toFixed(1)}svh,0)`;
        moon.style.opacity = String(ramp(p, 0.72, 0.86));
        starsEl.style.opacity = String(ramp(p, 0.64, 0.92));
        const ck = fmtClock(min);
        if (ck !== lastClock) { clock.textContent = ck; lastClock = ck; }
        const idx = clamp(Math.round(p * (SCENES.length - 1)), 0, SCENES.length - 1);
        if (idx !== lastActive) {
          lastActive = idx;
          panels.forEach((pn, i) => pn.setAttribute("data-active", i === idx ? "true" : "false"));
          ticks.forEach((t, i) => t.setAttribute("aria-current", i === idx ? "step" : "false"));
          phaseEl.textContent = SCENES[idx].label;
        }
      };
      apply(0);
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin: true, scrub: true, start: "top top", anticipatePin: 1, invalidateOnRefresh: true,
          end: () => "+=" + Math.round(dist() * 1.05),
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        },
      });
      st.to({}, { duration: 1 });
      const trig = st.scrollTrigger!;
      const onTick = (i: number) => () => {
        const p = i / (SCENES.length - 1);
        window.scrollTo({ top: trig.start + p * (trig.end - trig.start), behavior: "smooth" });
      };
      const handlers = ticks.map((t, i) => { const f = onTick(i); t.addEventListener("click", f); return () => t.removeEventListener("click", f); });
      // Tab tới thẻ nằm ngoài khung: cuộn trang tới đúng tiến độ.
      const onFocus = (e: FocusEvent) => {
        const pn = (e.target as HTMLElement).closest<HTMLElement>("[data-scene]");
        if (!pn || !dist()) return;
        const p = clamp((pn.offsetLeft - 80) / dist(), 0, 1);
        window.scrollTo({ top: trig.start + p * (trig.end - trig.start), behavior: "instant" });
      };
      track.addEventListener("focusin", onFocus);
      el.setAttribute("data-mode", "pinned");
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        handlers.forEach((f) => f());
        track.removeEventListener("focusin", onFocus);
        [track, far, mid, near, sun, moon, starsEl].forEach((n) => { n.style.transform = ""; n.style.opacity = ""; });
        ["--sky-top", "--sky-bot", "--hill-far", "--hill-mid", "--hill-near"].forEach((v) => stage.style.removeProperty(v));
      };
    });
    mm.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => { el.setAttribute("data-mode", "native"); });
    markReady(el, prefersReducedMotion() ? "static" : "1");
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} id="hanh-trinh" className={styles.journey} aria-labelledby="journey-title" data-fx="PinnedDayNight" data-mode="native">
      <div className={styles.jStage} data-stage="">
        <div className={styles.jSky} data-sky="" aria-hidden="true" />
        <svg className={styles.jStars} data-stars="" aria-hidden="true" focusable="false">
          {STARS.map((s, i) => (
            <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#f5f0e5" opacity={s.o} className={s.tw ? styles.twinkle : undefined} style={s.tw ? { animationDelay: `${s.d}s` } : undefined} />
          ))}
        </svg>
        <div className={styles.jSun} data-sun="" aria-hidden="true" />
        <div className={styles.jMoon} data-moon="" aria-hidden="true" />
        <svg className={`${styles.jHill} ${styles.jFar}`} data-far="" viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d={HILL_FAR} fill="var(--hill-far)" /></svg>
        <svg className={`${styles.jHill} ${styles.jMid}`} data-mid="" viewBox="0 0 1600 300" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d={HILL_MID} fill="var(--hill-mid)" /></svg>

        <p className={styles.jClock} aria-hidden="true"><span data-clock="">06:00</span><span data-phase="" className={styles.jPhase}>Bình minh</span></p>

        <div className={styles.jViewport} data-viewport="" role="region" aria-label="Hành trình trong một ngày và một đêm">
          <div className={styles.jTrack} data-track="">
            <div className={styles.jBoard}>
              <p className={styles.eyebrow}>Từ nắng sớm tới ánh sao</p>
              <h2 id="journey-title" className={styles.h2}>Một ngày. Một đêm. Nhiều điều đáng nhớ.</h2>
              <p className={styles.jIntro}>Theo bước ánh sáng qua từng khoảnh khắc của một chuyến đi giữa núi rừng.</p>
              <p className={styles.jNote}>Các khung giờ là gợi ý, có thể thay đổi theo mùa, thời tiết và chương trình thực tế.</p>
            </div>
            <ol className={styles.jScenes}>
            {SCENES.map((s, i) => (
              <li key={s.id} className={styles.jScene} data-scene="" data-active={i === 0 ? "true" : "false"} data-phase-name={s.phase} style={{ "--ph": PHASE_ACCENT[s.phase] } as React.CSSProperties}>
                <article>
                  <div className={styles.jPhoto}>
                    <Photo name={s.photo} alt={s.alt} sizes="(max-width: 899px) 92vw, 420px" position={s.position} />
                    <span className={styles.jTime}><span className={styles.jTimeNum}>{s.time}</span> {s.label}</span>
                  </div>
                  <div className={styles.jText}>
                    <span className={styles.jIndex} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </article>
              </li>
            ))}
            </ol>
          </div>
        </div>

        <svg className={`${styles.jHill} ${styles.jNear}`} data-near="" viewBox="0 0 4800 300" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d={NEAR_TREES} fill="var(--hill-near)" /></svg>

        <ol className={styles.jRail} aria-label="Các mốc trong ngày">
          {SCENES.map((s, i) => (
            <li key={s.id}>
              <button type="button" className={styles.jTick} data-tick="" aria-current={i === 0 ? "step" : "false"} aria-label={`Tới mốc ${s.time}, ${s.label}`}>
                <span aria-hidden="true">{s.time}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const PHASE_ACCENT: Record<string, string> = {
  dawn: "#e9b480", morning: "#cdd8b6", noon: "#b9d3be", afternoon: "#d9c68f", dusk: "#f08a3c", night: "#ff7a1a", late: "#8fb4ff",
};
