"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ClipReveal, MagneticButton } from "@/features/showroom/effects";
import { GREETINGS, IMG } from "../data/content";
import styles from "../brand.module.css";

const HOLD_MS = 2300;

function Kinetic() {
  const [cur, setCur] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [userPause, setUserPause] = useState(false);
  const [hoverPause, setHoverPause] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [note, setNote] = useState("");
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const prev = useRef(0);
  const mounted = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    const vis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => { mq.removeEventListener("change", on); document.removeEventListener("visibilitychange", vis); };
  }, []);

  const paused = userPause || hoverPause || hidden || reduced;

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => go((cur + 1) % GREETINGS.length), HOLD_MS);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur, paused]);

  function go(next: number) {
    if (next === cur) return;
    setLeaving(cur);
    setCur(next);
  }

  useLayoutEffect(() => {
    if (!mounted.current) { mounted.current = true; prev.current = cur; return; }
    const from = prev.current;
    prev.current = cur;
    if (reduced) { setLeaving(null); return; }
    const ctx = gsap.context(() => {
      const inChars = words.current[cur]?.querySelectorAll("[data-ch]");
      const outChars = words.current[from]?.querySelectorAll("[data-ch]");
      if (outChars?.length) gsap.to(outChars, { yPercent: -120, rotate: -8, opacity: 0, duration: 0.32, stagger: 0.025, ease: "power2.in", onComplete: () => setLeaving((l) => (l === from ? null : l)) });
      else setLeaving(null);
      if (inChars?.length) gsap.fromTo(inChars, { yPercent: 120, rotate: 8, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.6, stagger: 0.04, delay: 0.22, ease: "back.out(1.7)" });
    });
    return () => ctx.revert();
  }, [cur, reduced]);

  const label = userPause ? "Tiếp tục chữ chào" : "Tạm dừng chữ chào";
  return (
    <div
      className={styles.kinetic}
      data-fx="KineticGreeting"
      data-fx-ready="1"
      data-paused={paused ? "1" : "0"}
      aria-live="off"
      onMouseEnter={() => setHoverPause(true)}
      onMouseLeave={() => setHoverPause(false)}
      onFocus={() => setHoverPause(true)}
      onBlur={() => setHoverPause(false)}
    >
      <p className={styles.srOnly}>Xin chào, Hello, こんにちは, 안녕하세요: lời chào bằng bốn ngôn ngữ.</p>
      <div className={styles.kStage} aria-hidden="true">
        {GREETINGS.map((g, idx) => (
          <span
            key={g.text}
            ref={(el) => { words.current[idx] = el; }}
            className={`${styles.kWord} ${g.lang === "ja" ? styles.ja : g.lang === "ko" ? styles.ko : ""}`}
            data-tone={g.tone}
            data-on={idx === cur || idx === leaving ? "1" : "0"}
            lang={g.lang}
          >
            {Array.from(g.text).map((c, k) => (
              <span key={k} className={styles.kMask}><span data-ch="" className={styles.kCh}>{c}</span></span>
            ))}
          </span>
        ))}
      </div>
      <div className={styles.kControls}>
        <div className={styles.kDots} role="group" aria-label="Chọn câu chào">
          {GREETINGS.map((g, idx) => (
            <button
              key={g.text} type="button" className={styles.kDot} aria-pressed={idx === cur} lang={g.lang}
              onClick={() => { setUserPause(true); go(idx); setNote(`Đang hiển thị: ${g.sr}`); }}
            >
              <span className={styles.srOnly}>{g.sr}</span><i aria-hidden="true" />
            </button>
          ))}
        </div>
        {!reduced && (
          <button type="button" className={styles.kPause} aria-pressed={userPause} onClick={() => setUserPause((v) => !v)}>
            <span aria-hidden="true" className={styles.kPauseIcon} data-paused={userPause ? "1" : "0"} />
            {label}
          </button>
        )}
      </div>
      <p className={styles.srOnly} role="status">{note}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.chip}><span className={styles.chipDot} aria-hidden="true" />Trung tâm ngoại ngữ · Đà Nẵng</p>
          <Kinetic />
          <h1 id="hero-title" className={styles.heroTitle}>Mở lời bằng một ngôn ngữ mới, nói trước rồi hoàn thiện sau.</h1>
          <p className={styles.heroLead}>Tiếng Anh, tiếng Nhật và tiếng Hàn qua thẻ từ vựng, hội thoại tình huống thật và lớp nhóm nhỏ. Làm bài kiểm tra nhanh để biết bạn nên bắt đầu từ cấp nào.</p>
          <div className={styles.heroActions}>
            <MagneticButton><a className={`${styles.btn} ${styles.btnYellow} ${styles.btnLg}`} href="#cong-cu">Kiểm tra cấp độ trong 3 phút</a></MagneticButton>
            <a className={`${styles.btn} ${styles.btnGhostW} ${styles.btnLg}`} href="#the-tu">Lật thử thẻ từ vựng</a>
          </div>
        </div>
        <div className={styles.heroArt}>
          <ClipReveal variant="inset" from="bottom" className={styles.heroPhotoWrap}>
            <div className={styles.heroPhoto}>
              <Image src={`${IMG}/ban-do-viet-1200.webp`} alt="Bàn tay ghi chép vào sổ đặt trên bản đồ thế giới với chữ cái nhiều màu" fill priority sizes="(max-width: 900px) 92vw, 40vw" style={{ objectFit: "cover", objectPosition: "45% 50%" }} />
            </div>
          </ClipReveal>
          <span className={`${styles.sticker} ${styles.st1}`} aria-hidden="true">A</span>
          <span className={`${styles.sticker} ${styles.st2} ${styles.ja}`} aria-hidden="true">あ</span>
          <span className={`${styles.sticker} ${styles.st3} ${styles.ko}`} aria-hidden="true">가</span>
          <span className={`${styles.sticker} ${styles.st4}`} aria-hidden="true">?</span>
          <div className={styles.heroBubble} aria-hidden="true">
            <b>Hello!</b> <span>Bạn tên gì?</span>
          </div>
        </div>
      </div>
    </section>
  );
}
