"use client";

import { useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, registerGsap, useFx } from "@/features/showroom/effects";
import { LOAD_STEPS } from "../data/content";
import styles from "../brand.module.css";

/**
 * Thanh tạ SVG nâng theo cuộn. Khung ghim 100svh trong một vùng cao ~300svh; tiến độ cuộn:
 * thanh nâng từ sàn lên cao, từng đĩa trượt vào (20, 15, 10 kg mỗi bên), số kg đếm theo, mỗi đĩa chạm có rung nhẹ.
 * SSR / no-JS / reduced-motion: thanh đủ đĩa, 110 kg, không ghim.
 */
const PLATES = [
  { kg: 20, w: 30, h: 300, tone: "acid" },
  { kg: 15, w: 24, h: 250, tone: "chalk" },
  { kg: 10, w: 18, h: 200, tone: "mid" },
] as const;
const FULL = LOAD_STEPS[LOAD_STEPS.length - 1].total;

export function Barbell() {
  const ref = useRef<HTMLElement>(null);

  useFx(ref, (root) => {
    registerGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.setAttribute("data-mode", "scrub");
      const rig = root.querySelector<SVGGElement>("[data-sg='rig']")!;
      const plates = Array.from(root.querySelectorAll<SVGGElement>("[data-sg='plate']"));
      const kgEl = root.querySelector<HTMLElement>("[data-sg='kg']")!;
      const live = root.querySelector<HTMLElement>("[data-sg='kg-live']");
      const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-sg='step']"));
      const fine = hasFinePointer();
      const thr = [0.18, 0.4, 0.62]; // tiến độ để mỗi đĩa bắt đầu trượt vào
      const dur = 0.16;
      const sides = (g: SVGGElement) => (g.dataset.side === "l" ? -1 : 1);

      kgEl.textContent = "20";
      steps.forEach((s, i) => s.setAttribute("data-on", i === 0 ? "1" : "0"));
      if (live) live.textContent = `${LOAD_STEPS[0].title}, ${LOAD_STEPS[0].total} kg`;
      gsap.set(rig, { y: fine ? 150 : 90 });
      plates.forEach((g) => gsap.set(g, { x: sides(g) * 260, opacity: 0 }));
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      tl.to(rig, { y: -10, duration: 1 }, 0);
      plates.forEach((g) => {
        const i = Number(g.dataset.i);
        tl.to(g, { x: 0, opacity: 1, duration: dur, ease: "power2.out" }, thr[i]);
      });
      const total = (p: number) => {
        let t = 20;
        PLATES.forEach((pl, i) => { t += 2 * pl.kg * Math.min(1, Math.max(0, (p - thr[i]) / dur)); });
        return t;
      };
      let lastStep = -1, lastShown = -1;
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root, start: "top top", end: "bottom bottom", scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            const kg = Math.round(total(p) / 5) * 5;
            if (kg !== lastShown) { lastShown = kg; kgEl.textContent = String(kg); }
            const step = p < thr[0] ? 0 : p < thr[1] ? 1 : p < thr[2] ? 2 : 3;
            if (step !== lastStep) {
              lastStep = step;
              steps.forEach((s, i) => s.setAttribute("data-on", i === step ? "1" : i < step ? "done" : "0"));
              if (live) live.textContent = `${LOAD_STEPS[step].title}, ${LOAD_STEPS[step].total} kg`;
              if (step > 0 && !prefersReducedMotion()) {
                gsap.fromTo(rig, { rotation: 0 }, { keyframes: [{ rotation: -0.5 }, { rotation: 0.5 }, { rotation: 0 }], duration: 0.22, ease: "power1.inOut", overwrite: "auto", transformOrigin: "50% 50%" });
              }
            }
          },
        },
      });
      st.add(tl, 0);
      root.setAttribute("data-fx-ready", "1");
      return () => {
        root.removeAttribute("data-mode");
        gsap.set([rig, ...plates], { clearProps: "all" });
        kgEl.textContent = String(FULL);
        steps.forEach((s) => s.removeAttribute("data-on"));
      };
    });
    if (!root.hasAttribute("data-fx-ready")) root.setAttribute("data-fx-ready", "static");
    return () => mm.revert();
  }, []);

  const plate = (pl: (typeof PLATES)[number], i: number, side: "l" | "r") => {
    // đĩa nằm từ trong ra ngoài: 20 kg gần tay cầm nhất
    const gap = PLATES.slice(0, i).reduce((a, p) => a + p.w + 4, 0);
    const x = side === "r" ? 640 + gap : 360 - gap - pl.w;
    return (
      <g key={`${side}${i}`} data-sg="plate" data-i={i} data-side={side}>
        <rect x={x} y={210 - pl.h / 2} width={pl.w} height={pl.h} className={styles[`plate_${pl.tone}` as keyof typeof styles]} />
        <rect x={x + pl.w / 2 - 1} y={210 - pl.h / 2 + 14} width="2" height={pl.h - 28} className={styles.plateEdge} />
        <text x={x + pl.w / 2} y={210 + 4} className={styles.plateText} transform={`rotate(-90 ${x + pl.w / 2} 210)`} textAnchor="middle">{pl.kg}</text>
      </g>
    );
  };

  return (
    <section ref={ref} className={styles.load} id="tai" aria-labelledby="tai-title" data-fx="BarbellLift">
      <div className={styles.loadStage}>
        <div className={styles.loadCopy}>
          <p className={styles.label} data-sg="stencil"><span>06</span> Tăng tải</p>
          <h2 id="tai-title" className={styles.loadTitle}>Thêm một đĩa. Rồi mới thêm đĩa nữa.</h2>
          <ol className={styles.loadSteps}>
            {LOAD_STEPS.map((s, i) => (
              <li key={s.title} data-sg="step" data-on={i === LOAD_STEPS.length - 1 ? "1" : "done"}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <div><h3>{s.title}</h3><p>{s.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.loadViz}>
          <p className={styles.kgRead} aria-hidden="true"><span data-sg="kg">{FULL}</span><small>kg trên thanh</small></p>
          <p data-sg="kg-live" role="status" className={styles.srOnly}>{LOAD_STEPS[LOAD_STEPS.length - 1].title}, {FULL} kg</p>
          <svg className={styles.barSvg} viewBox="0 40 1000 350" role="img" aria-label="Thanh tạ với ba cặp đĩa 20, 15 và 10 kg mỗi bên, tổng cộng 110 kg">
            <rect x="0" y="372" width="1000" height="24" className={styles.barFloor} />
            <g data-sg="rig">
              <rect x="40" y="203" width="920" height="14" className={styles.barShaft} />
              <rect x="40" y="198" width="320" height="24" className={styles.barSleeve} />
              <rect x="640" y="198" width="320" height="24" className={styles.barSleeve} />
              <rect x="360" y="191" width="8" height="38" className={styles.barCollar} />
              <rect x="632" y="191" width="8" height="38" className={styles.barCollar} />
              {[420, 450, 480, 510, 540, 570].map((x) => <rect key={x} x={x} y="203" width="4" height="14" className={styles.barKnurl} />)}
              {PLATES.map((pl, i) => plate(pl, i, "l"))}
              {PLATES.map((pl, i) => plate(pl, i, "r"))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
