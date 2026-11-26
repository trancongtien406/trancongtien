"use client";

import { useEffect, useState } from "react";
import { MagneticButton, TextScramble } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { AREA, FACTS } from "../data/content";
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
            <TextScramble trigger="load" className={s.mono}>PHÒNG THU ÂM · QUẬN HẢI CHÂU, ĐÀ NẴNG</TextScramble>
          </p>
          <h1 className={s.h1}>
            <span className={s.h1Line} data-pt="hl">Phòng thu âm</span>
            <span className={`${s.h1Line} ${s.hot}`} data-pt="hl">bắt đúng tần số</span>
            <span className={`${s.h1Line} ${s.h1Sub}`} data-pt="hl">của bạn.</span>
          </h1>
          <p className={s.lead} data-pt="rv-hero">
            Phòng thu âm tại {AREA}, dành cho ca sĩ, ban nhạc, podcaster và đơn vị làm quảng cáo: thu giọng, thu band, podcast, voice-over, sản xuất beat, mix và master.
          </p>
          <div className={s.heroCta} data-pt="rv-hero">
            <MagneticButton><a className={`${s.btn} ${s.btnHot}`} href={buildConsultHref("phong-thu")}>Đặt lịch thu</a></MagneticButton>
            <a className={`${s.btn} ${s.btnGhost}`} href="#bang-gia">Xem bảng giá</a>
            <AuditionButton />
          </div>
          <ul className={s.facts} data-pt="rv-hero" aria-label="Thông tin nhanh">
            {FACTS.map((f) => (<li key={f.k}><span className={`${s.mono} ${s.factK}`}>{f.k}</span><b>{f.v}</b><span>{f.s}</span></li>))}
          </ul>
        </div>
        <figure className={s.heroShot} data-pt="shot">
          <div className={s.heroClip} data-pt="rise-hero">
            <Photo img={IMGS.hero} sizes="(max-width: 900px) 100vw, 46vw" priority quality={1200} className={s.heroImg} />
          </div>
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
