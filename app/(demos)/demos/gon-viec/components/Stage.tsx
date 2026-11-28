"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

/**
 * Cửa sổ trình duyệt mô phỏng: dải tấm 3D (three.js) trôi lên -> tấm foil nhàu -> phẳng ra thành bảng việc isometric,
 * thẻ rơi xuống -> bảng trượt phải, chữ "Tạo thẻ, đặt hạn..." hiện bên trái. Một biến tiến độ cuộn điều khiển tất cả.
 */
export function Stage() {
  const rootRef = useRef<HTMLElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current, win = winRef.current, canvas = canvasRef.current;
    if (!root || !win || !canvas) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let disposed = false;
    let api: import("./scene").SceneApi | null = null;
    const el = (s: string) => win.querySelector<HTMLElement>(s)!;
    const hero = el("[data-hero]"), ready = el("[data-ready]"), create = el("[data-create]"), streak = el("[data-streak]"), hint = el("[data-hint]"), tag = el("[data-tag]");

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      root.dataset.live = "1";
      import("./scene").then(({ createScene }) => {
        if (disposed) return;
        try {
          api = createScene(canvas, win, {
            onFrame: (p) => {
              hero.style.opacity = String(Math.max(1 - seg(p, 0.02, 0.14), seg(p, 0.94, 0.99)));
              hero.style.transform = `translateY(${-seg(p, 0, 0.16) * 40 * (1 - seg(p, 0.94, 0.99))}px)`;
              ready.style.opacity = String(Math.max(1 - seg(p, 0.02, 0.12), seg(p, 0.95, 1)));
              ready.style.transform = `translateY(${-seg(p, 0, 0.14) * 60 * (1 - seg(p, 0.95, 1))}px)`;
              hint.style.opacity = String(Math.max(1 - seg(p, 0.02, 0.1), seg(p, 0.96, 1)));
              const c = seg(p, 0.72, 0.86);
              create.style.opacity = String(c * (1 - seg(p, 0.9, 0.95)));
              create.style.transform = `translateY(${(1 - c) * 24}px)`;
              create.style.pointerEvents = c > 0.8 ? "auto" : "none";
              streak.style.opacity = String(Math.max(0, seg(p, 0.46, 0.62) * (1 - seg(p, 0.78, 0.92))) * 0.9);
              tag.style.opacity = String(seg(p, 0.2, 0.3) * (1 - seg(p, 0.7, 0.8)));
            },
          });
          api.resize();
          api.start();
        } catch {
          root.dataset.live = "";
        }
      });
      const st = ScrollTrigger.create({
        trigger: root.querySelector("[data-track]"),
        start: "top top",
        end: "bottom bottom",
        onUpdate: (s) => api?.setTarget(s.progress),
        onRefresh: (s) => api?.setTarget(s.progress),
      });
      return () => { st.kill(); api?.dispose(); api = null; delete root.dataset.live; };
    });
    return () => { disposed = true; mm.revert(); };
  }, []);

  return (
    <section ref={rootRef} className={styles.stageRoot} id="gioi-thieu" aria-label="Giới thiệu Gọn Việc">
      <div className={styles.track} data-track>
        <div className={styles.sticky}>
          <div ref={winRef} className={styles.win}>
            <canvas ref={canvasRef} className={styles.cv} aria-hidden="true" />
            <i className={styles.streak} data-streak aria-hidden="true" />
            <p className={styles.idx} data-tag>002 — 004</p>
            <p className={styles.idx0}>001 — 004</p>
            <div className={styles.hero} data-hero>
              <h1 className={styles.h1}>TRẠM ĐIỀU PHỐI CÔNG VIỆC VÀ NĂNG SUẤT CỦA CẢ NHÓM.</h1>
              <p className={styles.badge}>▸ 2.4 MỚI RA MẮT</p>
              <p className={styles.heroP}>Đưa cả nhóm về cùng một trang. Giao việc trong vài giây và theo dõi tiến độ theo thời gian thực.</p>
            </div>
            <div className={styles.ready} data-ready>
              <p>Bạn đã sẵn sàng bước đầu tiên<br />và bắt đầu hành trình hôm nay?</p>
              <a href="#lien-he" className={styles.cta}>BẮT ĐẦU NGAY</a>
            </div>
            <div className={styles.create} data-create>
              <h2>TẠO THẺ, ĐẶT HẠN, GIAO NGƯỜI PHỤ TRÁCH.</h2>
              <p>Chuyển danh sách việc cũ thành bảng trực quan. Nhìn ra điểm nghẽn sớm và cùng ăn mừng từng cột mốc của nhóm.</p>
              <p className={styles.createB}>CÙNG LÀM, CÙNG XONG NHANH!</p>
              <a href="#bang-viec" className={styles.ghost}>XEM BẢNG MẪU</a>
            </div>
            <p className={styles.hint} data-hint><span>↓</span> KHÁM PHÁ THÊM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
