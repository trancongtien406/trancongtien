"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { addToCart, useCart } from "./cart";
import { HOTSPOTS, PRODUCTS, REGION_LABEL, fmtVnd } from "./data";
import type { StoreApi } from "./scene";

const STOPS = [
  { label: "Thanh toán", p: 0.0 },
  { label: "Miền Bắc", p: 0.24 },
  { label: "Miền Trung", p: 0.5 },
  { label: "Nam & Tây Nguyên", p: 0.9 },
];

function Logo() {
  return (
    <a className={styles.logo} href="#top" aria-label="Chợ Ba Miền, về đầu trang">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0b4ccf" />
        <path d="M6 22 12 10l5 8 3-5 6 9z" fill="#fff" />
        <path d="M6 24h20" stroke="#d0212e" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className={styles.logoText}>Chợ Ba Miền</span>
      <span className={styles.logoSub}>Siêu thị đặc sản</span>
    </a>
  );
}

export function StoreWalk() {
  const wrap = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<StoreApi | null>(null);
  const [hot, setHot] = useState<number | null>(null);
  const [zone, setZone] = useState("Khu thanh toán tự động");
  const cart = useCart();
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const [gl, setGl] = useState<"loading" | "ok" | "fail">("loading");
  const [reduced, setReduced] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);
    let disposed = false;
    let ctx: gsap.Context | null = null;
    let io: IntersectionObserver | null = null;
    let ro: ResizeObserver | null = null;
    let onMove: ((e: PointerEvent) => void) | null = null;
    let unbind: (() => void) | null = null;

    (async () => {
      try {
        if (document.fonts?.ready) await document.fonts.ready;
        const { createStore } = await import("./scene");
        if (disposed) return;
        const s = createStore({
          canvas: cv,
          reduced: rm,
          onHot: setHot,
          onZone: setZone,
        });
        api.current = s;
        s.resize();
        setGl("ok");
        ro = new ResizeObserver(() => s.resize());
        ro.observe(cv);
        io = new IntersectionObserver(([e]) => s.setActive(!!e?.isIntersecting && !rm), { threshold: 0 });
        io.observe(cv);
        if (rm) {
          s.setProgress(0.24);
          setPct(0.24);
        } else {
          gsap.registerPlugin(ScrollTrigger);
          ctx = gsap.context(() => {
            ScrollTrigger.create({
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              onUpdate: (self) => {
                s.setProgress(self.progress);
                setPct(self.progress);
              },
            });
          }, el);
          // kéo chuột/ngón tay: ngang = quay đầu nhìn quanh, dọc = bước tới/lui; không kéo thì nhìn theo con trỏ
          let drag: { x: number; y: number } | null = null;
          let lookX = 0;
          let lookY = 0;
          const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
          onMove = (e: PointerEvent) => {
            const r = cv.getBoundingClientRect();
            if (drag) {
              lookX = clamp(lookX + ((e.clientX - drag.x) / r.width) * 3.2, 2.4);
              lookY = clamp(lookY + ((e.clientY - drag.y) / r.height) * 1.2, 1);
              window.scrollBy(0, -(e.clientY - drag.y) * 2.4);
              drag = { x: e.clientX, y: e.clientY };
              s.setLook(lookX, lookY);
              return;
            }
            lookX = ((e.clientX - r.left) / r.width - 0.5) * 2;
            lookY = ((e.clientY - r.top) / r.height - 0.5) * 2;
            s.setLook(lookX, lookY);
          };
          const down = (e: PointerEvent) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            drag = { x: e.clientX, y: e.clientY };
            cv.setPointerCapture(e.pointerId);
            cv.style.cursor = "grabbing";
          };
          const up = () => {
            drag = null;
            cv.style.cursor = "";
          };
          const key = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              const r = cv.getBoundingClientRect();
              if (r.bottom < 0 || r.top > window.innerHeight) return;
              lookX = clamp(lookX + (e.key === "ArrowLeft" ? -0.8 : 0.8), 2.4);
              s.setLook(lookX, lookY);
            }
          };
          cv.addEventListener("pointermove", onMove);
          cv.addEventListener("pointerdown", down);
          cv.addEventListener("pointerup", up);
          cv.addEventListener("pointercancel", up);
          window.addEventListener("keydown", key);
          unbind = () => {
            cv.removeEventListener("pointerdown", down);
            cv.removeEventListener("pointerup", up);
            cv.removeEventListener("pointercancel", up);
            window.removeEventListener("keydown", key);
          };
        }
      } catch {
        if (!disposed) setGl("fail");
      }
    })();

    return () => {
      disposed = true;
      if (onMove) cv.removeEventListener("pointermove", onMove);
      unbind?.();
      io?.disconnect();
      ro?.disconnect();
      ctx?.revert();
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  const jump = useCallback(
    (p: number) => {
      const el = wrap.current;
      if (!el) return;
      if (reduced) {
        api.current?.setProgress(p);
        setPct(p);
        return;
      }
      const top = el.offsetTop + p * (el.offsetHeight - window.innerHeight);
      window.scrollTo({ top, behavior: "smooth" });
    },
    [reduced],
  );

  const add = (typeId: number) => {
        addToCart(typeId);
    setJustAdded(typeId);
    window.setTimeout(() => setJustAdded((v) => (v === typeId ? null : v)), 1400);
  };

  const prod = hot === null ? null : PRODUCTS[HOTSPOTS[hot].type];

  return (
    <section ref={wrap} id="top" className={`${styles.walk} ${reduced ? styles.walkStatic : ""}`} aria-label="Dạo siêu thị 3D">
      <div className={styles.stage}>
        <canvas ref={canvas} className={styles.canvas} role="img" aria-label="Cảnh 3D siêu thị đặc sản: lối đi giữa các kệ hàng, giỏ hàng ở phía trước" />
        {gl !== "ok" && (
          <div className={styles.glFallback}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/cho-ba-mien/sieu-thi-loi-di.webp" alt="Lối đi giữa các kệ hàng trong siêu thị (ảnh minh hoạ)" width={900} height={1200} />
            <p>{gl === "fail" ? "Trình duyệt không hiển thị được cảnh 3D. Bạn vẫn xem được danh sách đặc sản bên dưới." : "Đang dựng siêu thị…"}</p>
          </div>
        )}

        <header className={styles.appbar}>
          <Logo />
          <nav className={styles.appNav} aria-label="Điều hướng">
            <a href="#ba-mien">Ba miền</a>
            <a href="#dac-san">Đặc sản</a>
            <a href="#qua-tang">Quà biếu</a>
            <a href="#giao-hang">Giao hàng</a>
            <a href="#hoi-dap">Hỏi đáp</a>
          </nav>
          <div className={styles.appRight}>
            <span className={styles.lang} aria-label="Ngôn ngữ: Tiếng Việt">VI</span>
            <a className={styles.cartPill} href="#dat-hang" aria-live="polite">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4h2l2.4 11h10.4L20 7H6" />
                <circle cx="9" cy="19" r="1.4" />
                <circle cx="17" cy="19" r="1.4" />
              </svg>
              <span className={styles.cartText}>
                <b>Giỏ hàng</b>
                <small>{cart.n === 0 ? "Chưa có món" : `${cart.n} món · ${fmtVnd(cart.total)}`}</small>
              </span>
              <span className={styles.cartCount}>{cart.n}</span>
            </a>
          </div>
        </header>

        <div className={styles.zone} aria-live="polite">
          <span className={styles.zoneDot} />
          {zone}
        </div>

        <ul className={styles.stops} aria-label="Đi nhanh tới khu">
          {STOPS.map((s, i) => {
            const next = STOPS[i + 1]?.p ?? 1.01;
            const on = pct >= s.p - 0.001 && pct < next - 0.001;
            return (
              <li key={s.label}>
                <button type="button" className={`${styles.stop} ${on ? styles.stopOn : ""}`} onClick={() => jump(s.p)} aria-current={on ? "true" : undefined}>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className={styles.hint} aria-hidden="true">
          <span>{reduced ? "Chọn khu để đi tới" : "Cuộn để bước tiếp"}</span>
          <i style={{ ["--p" as string]: pct }} />
        </div>

        <div className={`${styles.card} ${prod ? styles.cardOn : ""}`} role="group" aria-label="Sản phẩm đang đứng trước mặt" aria-hidden={prod ? undefined : true}>
          {prod && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.thumb} src={`/images/demos/cho-ba-mien/sp-${prod.id}.webp`} alt="" width={48} height={60} />
              <span className={styles.cardInfo}>
                <small>{REGION_LABEL[prod.region]}</small>
                <strong>{prod.name}</strong>
                <em>
                  {fmtVnd(prod.price)} · {prod.note}
                </em>
              </span>
              <button type="button" className={styles.addBtn} onClick={() => add(prod.id)} tabIndex={prod ? 0 : -1}>
                {justAdded === prod.id ? "Đã thêm" : "Thêm vào giỏ"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
