"use client";
import { useEffect, useRef } from "react";
import styles from "../brand.module.css";

const LOGOS = ["Hạt Giống", "Sao Băng", "Nhân Tâm", "Lam Sơn Tech", "Vạn Lộc", "Đại Dương Số", "Phù Sa Corp", "Gió Mới", "Thiên Hà", "Bình Minh"];

/** Logo (tên giả) trôi trên một cung tròn lớn, nghiêng theo tiếp tuyến. */
export function Trusted() {
  const box = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, vis = true, off = 0;
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }, { threshold: 0 }); io.observe(el);
    const layout = () => {
      const w = el.clientWidth, h = el.clientHeight, n = items.length, span = Math.max(w * 1.1, 160 * n);
      items.forEach((it, i) => {
        let x = ((i / n) * span + off) % span; x -= (span - w) / 2 + 0; if (x > span * 0.5 + w * 0.0) x -= span;
        const u = (x - w / 2) / (w * 0.62);
        const y = h * 0.78 - (1 - Math.min(1, u * u)) * h * 0.55 + 0;
        it.style.transform = `translate(${x - it.offsetWidth / 2}px,${y}px) rotate(${u * 14}deg)`;
        it.style.opacity = String(Math.max(0, 1 - Math.abs(u) * 0.8));
      });
    };
    layout();
    const loop = () => { raf = requestAnimationFrame(loop); if (!vis) return; off += 0.35; layout(); };
    if (!reduced) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", layout);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", layout); };
  }, []);
  return (
    <section className={styles.trusted} aria-labelledby="vc-h-trust">
      <h2 id="vc-h-trust">Được tin dùng bởi các doanh nghiệp dẫn đầu</h2>
      <p>Thúc đẩy đổi mới cho các công ty trên khắp thế giới</p>
      <ul ref={box} className={styles.arc}>{LOGOS.map((l) => <li key={l}>{l}</li>)}</ul>
    </section>
  );
}
