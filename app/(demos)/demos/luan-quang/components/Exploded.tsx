"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { LAYERS } from "./Parts";

/**
 * Hiệu ứng chủ đạo: ScrollTrigger ghim khung, đồng hồ nghiêng 3D rồi tách 7 lớp linh kiện theo trục Z (translate3d),
 * sau đó sáng lần lượt từng lớp trong khi bánh răng quay theo tiến độ cuộn.
 */
export function Exploded() {
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = sec.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const stage = root.querySelector<HTMLElement>("[data-stage]")!;
      const scene = root.querySelector<HTMLElement>("[data-scene]")!;
      const world = root.querySelector<HTMLElement>("[data-world]")!;
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", root);
      const items = gsap.utils.toArray<HTMLElement>("[data-item]", root);
      const gears = gsap.utils.toArray<SVGGElement>("[data-gear]", root);
      const bal = root.querySelector<SVGGElement>("[data-balance]");
      const sec1 = root.querySelector<SVGGElement>("[data-sec]");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        root.setAttribute("data-pinned", "");
        const n = layers.length;
        const size = () => scene.clientHeight;
        gsap.set(world, { rotationX: 0, rotationZ: 0, scale: 1, transformPerspective: 1800 });
        gsap.set(layers, { z: 0 });
        gsap.set(items[0], { attr: { "data-active": "" } });
        let cur = -2;
        const setActive = (idx: number) => {
          if (idx === cur) return;
          cur = idx;
          layers.forEach((l, i) => gsap.to(l, { opacity: idx < 0 || i === idx ? 1 : 0.22, duration: 0.35, overwrite: "auto" }));
          items.forEach((it, i) => (i === idx ? it.setAttribute("data-active", "") : it.removeAttribute("data-active")));
        };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "+=520%", pin: stage, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (s) => { const p = s.progress; setActive(p < 0.4 || p > 0.97 ? -1 : Math.min(n - 1, Math.floor(((p - 0.4) / 0.57) * n))); } },
        });
        tl.to(world, { rotationX: 58, rotationZ: -34, scale: 0.92, duration: 0.3, ease: "power2.inOut" }, 0.14);
        layers.forEach((l, i) => tl.to(l, { z: () => i * size() * 0.095, duration: 0.25, ease: "power2.inOut" }, 0.2));
        tl.to(world, { rotationZ: -34 + 40, duration: 0.4 }, 0.5);
        tl.to(layers, { z: (i: number) => i * size() * 0.12, duration: 0.45 }, 0.45);
        tl.to(world, { rotationX: 40, rotationZ: 0, scale: 1, duration: 0.28, ease: "power2.inOut" }, 0.9);
        tl.to(layers, { z: (i: number) => i * size() * 0.05, duration: 0.28 }, 0.9);
        gears.forEach((g) => { const d = Number(g.dataset.dir); tl.to(g, { rotation: d * 220, svgOrigin: `${g.dataset.cx} ${g.dataset.cy}`, duration: 1 }, 0); });
        tl.fromTo("[data-intro]", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.1 }, 0.14);
        const osc = bal ? gsap.fromTo(bal, { rotation: -140, svgOrigin: "230 230" }, { rotation: 140, duration: 0.55, ease: "sine.inOut", yoyo: true, repeat: -1 }) : null;
        const sw = sec1 ? gsap.to(sec1, { rotation: 360, svgOrigin: "230 230", duration: 60, ease: "none", repeat: -1 }) : null;
        return () => { osc?.kill(); sw?.kill(); root.removeAttribute("data-pinned"); gsap.set([world, ...layers], { clearProps: "all" }); };
      });
      return () => mm.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className={styles.ex} id="tach-lop" aria-labelledby="ex-t">
      <div className={styles.exStage} data-stage>
        <div className={styles.exHead} data-intro>
          <p className={styles.eyebrow}>Bên trong Luân Quang</p>
          <h2 id="ex-t" className={styles.h2}>Bảy lớp, <em>một nhịp</em></h2>
          <p className={styles.exHint}>Cuộn để tháo từng lớp linh kiện</p>
        </div>
        <div className={styles.exScene} data-scene>
          <div className={styles.exWorld} data-world role="img" aria-label="Đồng hồ cơ khí tách thành bảy lớp: đáy máy, bộ máy, bánh cân bằng, mặt số, kim, kính và vỏ">
            {LAYERS.map((L, i) => (
              <div key={L.key} className={styles.exLayer} data-layer style={{ ["--i" as string]: i }}><L.C /></div>
            ))}
          </div>
        </div>
        <ol className={styles.exList}>
          {LAYERS.map((L, i) => (
            <li key={L.key} data-item><span className={styles.exNum}>{String(i + 1).padStart(2, "0")}</span><div><h3>{L.name}</h3><p>{L.desc}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
