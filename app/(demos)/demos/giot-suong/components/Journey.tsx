"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "../brand.module.css";
import { Bottle } from "./Bottle";

/** Chữ khổng lồ: mỗi ô là [chữ cũ, chữ mới]. "MẤT ẨM" -> "CẤP ẨM" (như DEHYDRATED -> HYDRATED trong bản gốc). */
const WORD: [string, string][] = [["M", "C"], ["Ấ", "Ấ"], ["T", "P"], [" ", " "], ["Ẩ", "Ẩ"], ["M", "M"]];
const FINAL = "CẤP ẨM";

/**
 * Hành trình cuộn (sân khấu dính): kính mờ sương lau được -> tan thành mặt nước nhiễu xạ ->
 * chữ rộng sau chai đổi từ MẤT ẨM sang CẤP ẨM -> chai phóng to, ống nhỏ giọt nâng lên, giọt rơi ->
 * nền xanh thẳm. Không JS / giảm chuyển động: các cảnh xếp dọc, đọc được đủ.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);
  const fogRef = useRef<HTMLCanvasElement>(null);
  const waterRef = useRef<HTMLCanvasElement>(null);
  const dropperRef = useRef<SVGGElement>(null);
  const dropRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const el = root.current;
    const fog = fogRef.current;
    const water = waterRef.current;
    if (!el || !fog || !water) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // ---- Nước nhiễu xạ (canvas 2D độ phân giải thấp): nền ngọc lam nhạt, vệt sáng hồng-trắng ----
    const wctx = water.getContext("2d");
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(el);
    cleanups.push(() => io.disconnect());
    if (wctx) {
      const W = 320, H = 190;
      water.width = W; water.height = H;
      const img = wctx.createImageData(W, H);
      let raf = 0, last = 0;
      const draw = (t: number) => {
        raf = requestAnimationFrame(draw);
        if (!visible || t - last < 45) return;
        last = t;
        const tt = reduce ? 4 : t / 1000;
        const d = img.data;
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const u = (x / W) * 16, v = (y / H) * 9.5;
            const a = Math.sin(u * 1.3 + Math.sin(v * 1.1 + tt * 0.6) * 1.4 + tt * 0.5);
            const b = Math.sin(v * 1.7 + Math.sin(u * 0.9 - tt * 0.45) * 1.6 - tt * 0.4);
            const c = Math.sin((u + v) * 1.1 + tt * 0.35 + a);
            const r = 1 - Math.abs((a + b + c) / 3);
            const k = Math.min(0.62, Math.pow(Math.max(0, r), 7) * 1.1);
            // mây mờ nền (tần số thấp)
            const cl = 0.5 + 0.5 * Math.sin(u * 0.45 + Math.sin(v * 0.6 + tt * 0.2) * 2 + tt * 0.15);
            const bR = 150 + cl * 26, bG = 186 + cl * 18, bB = 178 + cl * 18;
            const i = (y * W + x) * 4;
            d[i] = bR + k * (247 - bR); d[i + 1] = bG + k * (228 - bG); d[i + 2] = bB + k * (226 - bB); d[i + 3] = 255;
          }
        }
        wctx.putImageData(img, 0, 0);
      };
      raf = requestAnimationFrame(draw);
      cleanups.push(() => cancelAnimationFrame(raf));
    }

    // ---- Kính mờ sương: lau bằng chuột / ngón tay; chữ "viết bằng ngón tay" ----
    const fctx = fog.getContext("2d");
    const fogTex = new Image();
    fogTex.src = "/images/demos/giot-suong/suong.webp";
    const paintFog = () => {
      if (!fctx) return;
      const w = fog.clientWidth, h = fog.clientHeight;
      if (!w || !h) return;
      const sc = 0.5;
      fog.width = Math.round(w * sc); fog.height = Math.round(h * sc);
      fctx.globalCompositeOperation = "source-over";
      fctx.fillStyle = "rgba(228,176,178,0.8)";
      fctx.fillRect(0, 0, fog.width, fog.height);
      for (let i = 0; i < 1400; i++) {
        fctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
        fctx.fillRect(Math.random() * fog.width, Math.random() * fog.height, 1 + Math.random() * 2, 1 + Math.random() * 2);
      }
      if (fogTex.complete && fogTex.naturalWidth) {
        fctx.globalAlpha = 0.4; fctx.globalCompositeOperation = "soft-light";
        fctx.drawImage(fogTex, 0, 0, fog.width, fog.height);
        fctx.globalAlpha = 1;
      }
      fctx.globalCompositeOperation = "destination-out";
      fctx.filter = "blur(1px)";
      fctx.fillStyle = "rgba(0,0,0,1)";
      const fam = getComputedStyle(el).getPropertyValue("--gs-fh").trim() || "sans-serif";
      const wide = w >= 820;
      fctx.font = `400 ${Math.round(fog.width * (wide ? 0.115 : 0.17))}px ${fam}, sans-serif`;
      fctx.textBaseline = "middle";
      fctx.fillText("SƯƠNG", fog.width * (wide ? 0.06 : 0.08), fog.height * (wide ? 0.5 : 0.2));
      // vệt nước chảy xuống từ chữ
      fctx.fillStyle = "rgba(0,0,0,0.6)";
      [0.2, 0.37].forEach((fx) => fctx.fillRect(fog.width * fx, fog.height * (wide ? 0.55 : 0.26), 2, fog.height * 0.16));
      fctx.filter = "none";
    };
    if (document.fonts?.ready) document.fonts.ready.then(paintFog); else paintFog();
    const onResize = () => paintFog();
    window.addEventListener("resize", onResize);
    fogTex.onload = paintFog;
    cleanups.push(() => window.removeEventListener("resize", onResize));
    let lx = -1, ly = -1;
    const wipe = (ev: PointerEvent) => {
      if (!fctx) return;
      const r = fog.getBoundingClientRect();
      const x = (ev.clientX - r.left) * (fog.width / r.width);
      const y = (ev.clientY - r.top) * (fog.height / r.height);
      fctx.globalCompositeOperation = "destination-out";
      fctx.lineCap = "round"; fctx.lineJoin = "round";
      fctx.lineWidth = Math.max(18, fog.width * 0.035);
      fctx.strokeStyle = "rgba(0,0,0,0.85)";
      fctx.beginPath();
      fctx.moveTo(lx < 0 ? x : lx, ly < 0 ? y : ly);
      fctx.lineTo(x, y);
      fctx.stroke();
      lx = x; ly = y;
    };
    const up = () => { lx = -1; ly = -1; };
    fog.addEventListener("pointermove", wipe);
    fog.addEventListener("pointerleave", up);
    cleanups.push(() => { fog.removeEventListener("pointermove", wipe); fog.removeEventListener("pointerleave", up); });

    // ---- Cuộn: timeline scrub ----
    if (!reduce) {
      gsap.registerPlugin(ScrollTrigger);
      el.dataset.anim = "on";
      const ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        const mm = gsap.matchMedia();
        mm.add({ wide: "(min-width: 820px)", narrow: "(max-width: 819.98px)" }, (c) => {
          const wide = !!c.conditions?.wide;
          gsap.set(q("[data-sc='2'], [data-sc='3'], [data-sc='4'], [data-cap]"), { autoAlpha: 0 });
          gsap.set(q("[data-ch]"), { yPercent: 70, autoAlpha: 0 });
          gsap.set(q("[data-new]"), { autoAlpha: 0, yPercent: 40 });
          gsap.set(dropRef.current, { autoAlpha: 0 });
          const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 } });
          tl
            // 1 -> 2: sương tan, nền hồng thành nước, chữ khổng lồ hiện sau chai
            .to(q("[data-sc='1']"), { autoAlpha: 0, y: -40, duration: 0.9 }, 0.2)
            .to(fog, { autoAlpha: 0, duration: 1.2 }, 0.2)
            .to(q("[data-pink]"), { autoAlpha: 0, duration: 1.2 }, 0.2)
            .to(q("[data-sc='2']"), { autoAlpha: 1, duration: 0.1 }, 0.8)
            .to(q("[data-ch]"), { yPercent: 0, autoAlpha: 1, stagger: 0.1, duration: 0.7 }, 0.9)
            .to(q("[data-cap='1']"), { autoAlpha: 1, y: 0, duration: 0.6 }, 1.5)
            // 2: MẤT ẨM -> CẤP ẨM
            .to(q("[data-cap='1']"), { autoAlpha: 0, duration: 0.4 }, 2.6)
            .to(q("[data-old]"), { autoAlpha: 0, yPercent: -40, stagger: 0.15, duration: 0.6 }, 2.7)
            .to(q("[data-new]"), { autoAlpha: 1, yPercent: 0, stagger: 0.15, duration: 0.6 }, 2.8)
            .to(q("[data-cap='2']"), { autoAlpha: 1, duration: 0.6 }, 3.2)
            .to(q("[data-cap='2']"), { autoAlpha: 0, duration: 0.4 }, 4.4)
            .to(q("[data-cap='3']"), { autoAlpha: 1, duration: 0.6 }, 4.7)
            // 3: chữ tan lên thành sương, chai phóng to, nền đá chìm xuống
            .to(q("[data-cap='3']"), { autoAlpha: 0, duration: 0.5 }, 5.8)
            .to(q("[data-sc='2'] [data-word]"), { yPercent: -70, autoAlpha: 0, filter: "blur(14px)", duration: 1.3 }, 5.6)
            .to(q("[data-floor]"), { yPercent: 80, autoAlpha: 0, duration: 1.4 }, 5.6)
            .to(q("[data-bottle]"), { scale: wide ? 1.75 : 1.5, duration: 1.8 }, 5.6)
            .to(q("[data-sc='3']"), { autoAlpha: 1, duration: 0.6 }, 6.4)
            // ống nhỏ giọt nâng lên
            .to(dropperRef.current, { y: -215, duration: 1.8 }, 6.6)
            .to(q("[data-sc='3']"), { autoAlpha: 0, duration: 0.5 }, 8.1)
            .to(dropRef.current, { autoAlpha: 1, duration: 0.3 }, 8.3)
            .to(q("[data-sc='4']"), { autoAlpha: 1, duration: 0.7 }, 8.4)
            .to(dropRef.current, { y: 52, autoAlpha: 0, duration: 1.0, ease: "power1.in" }, 8.9)
            // chuyển sang xanh thẳm
            .to(q("[data-deep]"), { autoAlpha: 1, duration: 1 }, 10.0)
            .to(q("[data-bottle]"), { autoAlpha: 0, duration: 0.8 }, 10.0)
            .to(q("[data-sc='4']"), { autoAlpha: 0, duration: 0.6 }, 10.0);
        });
      }, el);
      cleanups.push(() => { ctx.revert(); delete el.dataset.anim; });
    }
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className={s.journey} ref={root} id="top" aria-label="Giới thiệu serum Giọt Sương">
      <div className={s.stage}>
        <div className={s.waterBg} aria-hidden="true"><canvas ref={waterRef} className={s.waterCanvas} /></div>
        <div className={s.pinkBg} data-pink="" aria-hidden="true" />
        <div className={s.floor} data-floor="" aria-hidden="true" />
        <div className={s.bottleWrap} data-bottle="" aria-hidden="true">
          <div className={s.bottleShadow}><Bottle id="gss" /></div>
          <div className={s.bottleSvg}><Bottle id="gsj" dropperRef={dropperRef} dropRef={dropRef} /></div>
        </div>
        <canvas ref={fogRef} className={s.fog} aria-hidden="true" />
        <div className={s.deep} data-deep="" aria-hidden="true" />

        <div className={`${s.scene} ${s.sc1}`} data-sc="1">
          <h1 className={s.h1}>Da căng khô <span>trước trưa?</span></h1>
          <p className={s.lead}>Da đang thiếu nước. Giọt Sương trả lại độ ẩm chỉ trong ba giọt.</p>
          <a className={s.cta} href="#mua"><span>Mua serum</span><b>590.000đ</b></a>
        </div>

        <div className={`${s.scene} ${s.sc2}`} data-sc="2">
          <p className={s.word} data-word="" aria-label={FINAL}>
            {WORD.map(([a, b], i) => (
              <span key={i} className={s.chWrap} data-ch="" aria-hidden="true">
                {a === b ? <span>{a === " " ? " " : a}</span> : (<><span data-old="" className={s.chOld}>{a}</span><span data-new="" className={s.chNew}>{b}</span></>)}
              </span>
            ))}
          </p>
          <div className={s.cap} data-cap="1"><p className={s.capH}>Khô. Xỉn. Bong tróc.</p><p className={s.capS}>Da chẳng còn giọt nước nào.</p></div>
          <div className={s.cap} data-cap="2"><p className={s.capH}>Mềm mịn đến nửa đêm.</p><p className={s.capS}>Hyaluronic acid giữ nước ngay trong da.</p></div>
          <div className={s.cap} data-cap="3"><p className={s.capH}>Ba giọt, <br />sáng và tối.</p><p className={s.capS}>Một chai dùng được hai tháng.</p></div>
        </div>

        <div className={`${s.scene} ${s.sc3}`} data-sc="3">
          <p className={s.mid}>2% hyaluronic acid. <br />Không hương liệu.</p>
          <p className={s.small}>Dành cho cả làn da nhạy cảm.</p>
        </div>

        <div className={`${s.scene} ${s.sc4}`} data-sc="4">
          <p className={s.mid}>Dùng thử 30 ngày.</p>
          <p className={s.small}>Không hợp? Gửi lại.</p>
          <a className={`${s.cta} ${s.ctaSm}`} href="#mua"><span>Thêm vào giỏ</span><b>590.000đ</b></a>
        </div>
      </div>
    </section>
  );
}
