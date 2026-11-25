"use client";

import { useEffect, useState } from "react";
import { ClipReveal, MagneticButton, SplitWords, TextScramble } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { IMGS } from "../data/images";
import { elapsed, startAudition, stopAudition, useAudition } from "../lib/audio";
import { EqBars, HeroWave, Vu } from "./Viz";
import { Photo } from "./Photo";

const tc = (sec: number) => {
  const m = Math.floor(sec / 60), r = Math.floor(sec % 60), f = Math.floor((sec % 1) * 25);
  return [m, r, f].map((n) => String(n).padStart(2, "0")).join(":");
};

/** Nút nghe thử: AudioContext chỉ được tạo trong lúc xử lý cú bấm này. */
export function AuditionButton({ className }: { className?: string }) {
  const playing = useAudition();
  const [fail, setFail] = useState(false);
  const toggle = async () => {
    if (playing) { stopAudition(); return; }
    setFail(!(await startAudition()));
  };
  return (
    <>
      <button type="button" className={`${s.btn} ${s.btnGhost} ${className ?? ""}`} aria-pressed={playing} onClick={toggle} data-pt="audition">
        <span className={s.playGlyph} aria-hidden="true" data-on={playing || undefined} />
        {playing ? "Dừng nghe" : "Nghe thử"}
      </button>
      <span className={s.srOnly} role="status" aria-live="polite">
        {playing ? "Đang phát âm thanh thử, âm lượng thấp." : fail ? "Trình duyệt chưa phát được âm thanh." : ""}
      </span>
    </>
  );
}

function Clock() {
  const playing = useAudition();
  const [v, setV] = useState("00:00:00");
  useEffect(() => {
    if (!playing) { const id = setTimeout(() => setV("00:00:00"), 0); return () => clearTimeout(id); }
    const id = setInterval(() => setV(tc(elapsed())), 80);
    return () => clearInterval(id);
  }, [playing]);
  return <span className={s.tcBig} aria-hidden="true">{v}</span>;
}

export function Hero() {
  const playing = useAudition();
  return (
    <section id="top" className={s.hero} data-pt="hero">
      <div className={s.heroGrid}>
        <div className={s.heroCopy} data-pt="copy">
          <p className={s.kicker} data-pt="rv-hero">
            <span className={s.recDot} aria-hidden="true" />
            <TextScramble trigger="load" className={s.mono}>CH 01 · VOCAL · TÍN HIỆU SẴN SÀNG</TextScramble>
          </p>
          <h1 className={s.h1}>
            <SplitWords as="span" trigger="load" className={s.h1Line} delay={0.15}>Bắt đúng</SplitWords>
            <SplitWords as="span" trigger="load" className={`${s.h1Line} ${s.hot}`} delay={0.3}>tần số</SplitWords>
            <SplitWords as="span" trigger="load" className={s.h1Line} delay={0.45}>của bạn.</SplitWords>
          </h1>
          <p className={s.lead} data-pt="rv-hero">
            Phòng thu âm tại Đà Nẵng cho giọng hát, band, podcast và voice-over. Thu sạch, mix gọn, master đúng chất bạn muốn nghe.
          </p>
          <div className={s.heroCta} data-pt="rv-hero">
            <MagneticButton><a className={`${s.btn} ${s.btnHot}`} href="#uoc-tinh">Ước tính buổi thu</a></MagneticButton>
            <AuditionButton />
          </div>
        </div>
        <figure className={s.heroShot} data-pt="shot">
          <ClipReveal variant="circle" from="center" origin="30% 60%" duration={1.3} innerScale={1.18} className={s.heroClip}>
            <Photo img={IMGS.hero} sizes="(max-width: 900px) 100vw, 46vw" priority quality={1200} className={s.heroImg} />
          </ClipReveal>
          <span className={s.scan} aria-hidden="true" />
          <figcaption className={s.shotTag}><span className={s.recDot} aria-hidden="true" /> <span className={s.mono}>REC · BUỒNG THU GIỌNG</span></figcaption>
          <div className={s.shotMeters} aria-hidden="true">
            <span className={s.mono}>L</span><Vu className={s.vuSm} seed={1} />
            <span className={s.mono}>R</span><Vu className={s.vuSm} seed={4} />
          </div>
        </figure>
      </div>
      <div className={s.heroWave} data-pt="wave">
        <div className={s.ruler} aria-hidden="true" />
        <HeroWave className={s.heroCanvas} />
        <p className={s.waveHint} aria-hidden="true">Rê chuột qua sóng, hoặc cuộn trang để đổi nhịp.</p>
      </div>
      <div className={s.transport} data-pt="rv-hero" role="group" aria-label="Bảng chạy thử">
        <Clock />
        <EqBars bars={32} className={s.transportEq} />
        <p className={s.transportNote}>
          <span className={s.mono}>{playing ? "ĐANG PHÁT" : "DỪNG"}</span>
          Âm thanh tổng hợp bằng trình duyệt, âm lượng thấp. Chỉ phát khi bạn bấm.
        </p>
      </div>
    </section>
  );
}
