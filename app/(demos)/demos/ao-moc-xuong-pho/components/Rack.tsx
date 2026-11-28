"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "../brand.module.css";
import { Garment, PRODUCTS, fmtVnd } from "./Garments";

export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 56" role="img" aria-label="Áo Mộc Xuống Phố">
      <g transform="rotate(-5 60 28)" fontWeight="900" fontSize="30" textAnchor="middle">
        <text x="62" y="36" fill="#0b2a00" stroke="#0b2a00" strokeWidth="9" strokeLinejoin="round">ÁO MỘC</text>
        <text x="60" y="34" fill="#6bff2a" stroke="#6bff2a" strokeWidth="2" strokeLinejoin="round">ÁO MỘC</text>
        <text x="62" y="49" fontSize="10" fill="#ff7ab8" stroke="#0b2a00" strokeWidth="3" paintOrder="stroke" letterSpacing="1">XUỐNG PHỐ</text>
      </g>
    </svg>
  );
}

const MQ = "LÀ TA · KHÔNG PHẢI HỌ · HÀNG MỚI VỀ · MIỄN PHÍ ĐỔI SIZE · LÀ TA · KHÔNG PHẢI HỌ · GIAO 2 NGÀY · ÁO MỘC XUỐNG PHỐ · ";

export function Rack() {
  const stage = useRef<HTMLElement>(null);
  const arts = useRef<(HTMLDivElement | null)[]>([]);
  const dArt = useRef<HTMLDivElement>(null);
  const dInner = useRef<HTMLDivElement>(null);
  const ui = useRef<HTMLDivElement>(null);
  const backBtn = useRef<HTMLButtonElement>(null);
  const prev = useRef<number | null>(null);

  const [focus, setFocus] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [ci, setCi] = useState<Record<string, number>>({});
  const [wipe, setWipe] = useState<{ from: number; to: number } | null>(null);
  const [back, setBack] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    if (rm) return;
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.cell}`, { y: -180, opacity: 0, duration: 0.95, ease: "back.out(1.25)", stagger: 0.08, delay: 0.1, clearProps: "opacity,transform" });
    }, stage);
    return () => ctx.revert();
  }, []);

  const cur = focus === null ? null : PRODUCTS[focus];
  const curCi = cur ? ci[cur.id] ?? 0 : 0;
  const color = cur ? cur.colors[curCi] : null;

  /* mở / đổi / đóng chi tiết */
  useLayoutEffect(() => {
    const el = dArt.current;
    const prevI = prev.current;
    if (focus !== null && el) {
      if (prevI === null) {
        const from = arts.current[focus]?.getBoundingClientRect();
        const to = el.getBoundingClientRect();
        if (!reduced && from && to.width) {
          const s = from.height / to.height;
          gsap.fromTo(el, { x: from.left + from.width / 2 - (to.left + to.width / 2), y: from.top + from.height / 2 - (to.top + to.height / 2), scale: s, opacity: 1, filter: "blur(0px)" }, { x: 0, y: 0, scale: 1, duration: 0.95, ease: "power3.inOut", overwrite: true });
        } else gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1 });
      } else if (prevI !== focus && !reduced) {
        gsap.fromTo(el, { x: 90, opacity: 0, filter: "blur(10px)" }, { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out", overwrite: true });
      }
    } else if (el && prevI !== null) {
      const to = arts.current[prevI]?.getBoundingClientRect();
      const from = el.getBoundingClientRect();
      if (!reduced && to && from.width) {
        const s = to.height / from.height;
        gsap.to(el, { x: to.left + to.width / 2 - (from.left + from.width / 2), y: to.top + to.height / 2 - (from.top + from.height / 2), scale: s, opacity: 0, duration: 0.8, ease: "power3.inOut", overwrite: true, onComplete: () => { gsap.set(el, { clearProps: "all" }); } });
      } else gsap.set(el, { opacity: 0 });
    }
    if (ui.current) gsap.to(ui.current, { opacity: focus === null ? 0 : 1, y: focus === null ? 10 : 0, duration: reduced ? 0 : 0.6, delay: focus === null ? 0 : 0.45 });
    if (focus !== null && prevI === null) backBtn.current?.focus({ preventScroll: true });
    if (focus === null && prevI !== null) {
      const b = stage.current?.querySelectorAll<HTMLButtonElement>(`.${styles.gm}`)[prevI];
      b?.focus({ preventScroll: true });
    }
    prev.current = focus;
    setBack(false);
    setWipe(null);
  }, [focus, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (focus === null) return;
      if (e.key === "Escape") setFocus(null);
      if (e.key === "ArrowRight") setFocus((f) => (f === null ? f : (f + 1) % PRODUCTS.length));
      if (e.key === "ArrowLeft") setFocus((f) => (f === null ? f : (f - 1 + PRODUCTS.length) % PRODUCTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focus]);

  const pickColor = (idx: number) => {
    if (!cur || idx === curCi) return;
    const from = curCi;
    setCi((m) => ({ ...m, [cur.id]: idx }));
    if (reduced) return;
    setWipe({ from, to: idx });
  };

  /* quét đổi màu từ dưới lên */
  const wipeRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const w = wipeRef.current;
    if (!wipe || !w) return;
    const o = { v: -50 };
    const t = gsap.to(o, { v: 22, duration: 1, ease: "power2.inOut", onUpdate: () => { w.style.setProperty("--mp", `${o.v}%`); }, onComplete: () => setWipe(null) });
    w.style.setProperty("--mp", "-50%");
    return () => { t.kill(); };
  }, [wipe]);

  const flip = useCallback((toBack: boolean) => {
    const el = dInner.current;
    if (!el || reduced) { setBack(toBack); return; }
    gsap.timeline()
      .to(el, { rotateY: 90, duration: 0.28, ease: "power2.in" })
      .add(() => setBack(toBack))
      .fromTo(el, { rotateY: -90 }, { rotateY: 0, duration: 0.4, ease: "power2.out" });
  }, [reduced]);

  const wallVar = color ? color.wall : "#ead9d0";

  return (
    <section ref={stage} id="gia-treo" className={`${styles.stage} ${focus !== null ? styles.focused : ""}`} style={{ ["--wall" as string]: wallVar }} aria-label="Giá treo áo">
      <div className={styles.wall} aria-hidden="true" />
      <header className={styles.top}>
        <a href="#top" aria-label="Áo Mộc Xuống Phố, về đầu trang"><Logo className={styles.logo} /></a>
        <nav className={styles.topNav} aria-label="Điều hướng chính">
          <a href="#cua-hang">Cửa hàng</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#chat-lieu">Chất liệu</a>
          <a href="#size">Chọn size</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
      </header>

      <div className={styles.rail} aria-hidden="true"><i /></div>
      <ul className={styles.row} style={{ ["--n" as string]: PRODUCTS.length }}>
        {PRODUCTS.map((it, i) => {
          const c = it.colors[ci[it.id] ?? 0];
          return (
            <li key={it.id} className={styles.cell} data-hov={hover === i ? "1" : undefined} data-on={focus === i ? "1" : undefined} style={{ ["--d" as string]: `${(i * 0.7) % 3}s` }}>
              <button
                type="button"
                className={styles.gm}
                aria-label={`${it.short}, ${fmtVnd(it.price)}. Bấm để xem chi tiết`}
                tabIndex={focus !== null ? -1 : 0}
                onClick={() => setFocus(i)}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setHover(i); }}
                onPointerLeave={() => setHover((h) => (h === i ? null : h))}
                onFocus={() => setHover(i)}
                onBlur={() => setHover((h) => (h === i ? null : h))}
              >
                <span className={styles.amb}>
                  <span ref={(n) => { arts.current[i] = n as HTMLDivElement | null; }} className={styles.art}>
                    <Garment kind={it.kind} pal={c.pal} backText={it.backText} title={it.short} />
                  </span>
                </span>
              </button>
              <span className={styles.cap} aria-hidden="true">{it.short}</span>
            </li>
          );
        })}
      </ul>

      <a className={styles.pill} href="#cua-hang" tabIndex={focus === null ? 0 : -1}>Xem còn hàng</a>

      {/* chi tiết */}
      <div className={styles.dWrap} aria-hidden={focus === null}>
        <div ref={dArt} className={styles.dArt} style={{ opacity: 0 }}>
          <div className={styles.dShadow} aria-hidden="true">{cur && <Garment kind={cur.kind} pal={cur.colors[curCi].pal} back={back} backText={cur.backText} />}</div>
          <div ref={dInner} className={styles.dInner}>
            {cur && (
              <>
                {wipe && <div className={styles.dBase}><Garment kind={cur.kind} pal={cur.colors[wipe.from].pal} back={back} backText={cur.backText} /></div>}
                <div ref={wipeRef} className={wipe ? styles.dWipe : styles.dBase}>
                  <Garment kind={cur.kind} pal={cur.colors[curCi].pal} back={back} backText={cur.backText} title={`${cur.name}, màu ${cur.colors[curCi].name.toLowerCase()}, mặt ${back ? "sau" : "trước"}`} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div ref={ui} className={styles.dUi} style={{ opacity: 0 }} inert={focus === null}>
        <div className={styles.tags} role="group" aria-label="Chọn màu">
          {cur && cur.colors.map((c, k) => (
            <button key={c.name} type="button" className={`${styles.tag} ${k === curCi ? styles.tagOn : ""}`} style={{ ["--tc" as string]: c.swatch, ["--tf" as string]: c.tagInk, ["--tk" as string]: k }} aria-label={`Màu ${c.name.toLowerCase()}`} aria-pressed={k === curCi} onClick={() => pickColor(k)}>
              <i />
              <b>{c.name}</b>
            </button>
          ))}
        </div>
        <div className={styles.panel} aria-live="polite">
          <h2>{cur ? cur.name : ""}</h2>
          <div className={styles.seg} role="group" aria-label="Mặt áo">
            <button type="button" aria-pressed={!back} onClick={() => back && flip(false)}>Mặt trước</button>
            <button type="button" aria-pressed={back} onClick={() => !back && flip(true)}>Mặt sau</button>
          </div>
          <p>{cur ? `${fmtVnd(cur.price)} · ${cur.note}` : ""}</p>
          <a href="#cua-hang" className={styles.avail}>Xem còn hàng <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.nav2}>
          <button type="button" onClick={() => setFocus((f) => (f === null ? f : (f - 1 + PRODUCTS.length) % PRODUCTS.length))} aria-label="Áo trước">‹</button>
          <button type="button" onClick={() => setFocus((f) => (f === null ? f : (f + 1) % PRODUCTS.length))} aria-label="Áo sau">›</button>
        </div>
      </div>
      <button ref={backBtn} type="button" className={styles.back} onClick={() => setFocus(null)} aria-label="Quay lại giá treo" tabIndex={focus === null ? -1 : 0} style={{ opacity: focus === null ? 0 : 1, pointerEvents: focus === null ? "none" : "auto" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M8.5 2 3.5 7l5 5M4 7h8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.mTrack}>
          {Array.from({ length: 2 }).map((_, k) => <span key={k}>{MQ}{MQ}</span>)}
        </div>
      </div>
    </section>
  );
}
