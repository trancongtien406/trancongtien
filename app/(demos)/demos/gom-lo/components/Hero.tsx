"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger, prefersReducedMotion, registerGsap } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { Engrave } from "./Engrave";
import { Fingerprint } from "./Fingerprint";
import { Pot } from "./Pot";
import { GLAZES } from "../lib/pot";
import { AREA, FACTS } from "../data/data";

export function Hero() {
  const [bulge, setBulge] = useState(0.62);
  const extra = useRef(0);
  const ring = useRef<SVGSVGElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion() || !root.current) return;
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top top", end: "bottom top", scrub: true,
      onUpdate: (self) => {
        extra.current = self.progress * 0.38;
        if (ring.current) ring.current.style.rotate = `${self.progress * 220}deg`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section id="top" ref={root} className={s.hero} aria-labelledby="hero-title">
      <div className={s.heroFibers} aria-hidden="true" />
      <Fingerprint className={s.heroPrint} strokeWidth={0.7} />
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroText}>
          <p className={s.hand} data-gl="fade">Xưởng gốm thủ công và workshop · {AREA}</p>
          <Engrave as="h1" id="hero-title" trigger="load" delay={350} className={s.heroTitle}>Xưởng gốm thủ công và workshop làm gốm.</Engrave>
          <p className={s.heroLead} data-gl="fade">
            Đất Mơ bán cốc, bát, bình làm tay và mở lớp nặn tay, bàn xoay, vẽ men cho người lớn, bạn bè và nhóm nhỏ. Chưa từng chạm vào đất cũng không sao: mỗi lớp có người hướng dẫn cầm tay.
          </p>
          <div className={s.ctaRow} data-gl="fade">
            <a className={s.btn} href="#buoi-lam-gom" data-cursor="Đặt">Đặt chỗ workshop</a>
            <a className={s.linkHand} href="#ke-gom">Xem gốm bán tại xưởng <span aria-hidden="true">→</span></a>
          </div>
          <ul className={s.heroFacts} data-gl="fade">
            {FACTS.map((f) => (<li key={f.b}><b>{f.b}</b><span>{f.s}</span></li>))}
          </ul>
        </div>

        <div className={s.heroStage}>
          <div className={s.stagePlate} aria-hidden="true" />
          <svg ref={ring} className={s.ring} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <defs><path id="gl-ring-path" d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1 -164 0" /></defs>
            <text className={s.ringText}><textPath href="#gl-ring-path" startOffset="0">nặn · xoay · phủ men · nung · chờ nguội · nặn · xoay · phủ men · nung · chờ nguội ·</textPath></text>
          </svg>
          <Pot className={s.heroPot} shape="bau" bulge={bulge} neck={0.5} glaze={GLAZES[0]} pattern="cham" intro extra={extra} onNudge={(d) => setBulge((b) => Math.min(1, Math.max(0, b + d)))} label="Chiếc bình gốm đang quay trên bàn xoay, kéo ngang để nặn phình hoặc thon" />
          <div className={s.nanBox}>
            <label className={s.sliderLabel} htmlFor="hero-bulge"><span className={s.hand}>Nặn thử: độ phình</span><output htmlFor="hero-bulge">{Math.round(bulge * 100)}%</output></label>
            <input id="hero-bulge" className={s.range} type="range" min={0} max={100} value={Math.round(bulge * 100)} onChange={(e) => setBulge(Number(e.target.value) / 100)} aria-valuetext={`${Math.round(bulge * 100)} phần trăm`} />
          </div>
          <figure className={s.heroPhoto}>
            <Image src="/images/demos/gom-lo/binh-dat-nung-1200.webp" alt="Những chiếc bình đất nung màu terracotta xếp sát nhau" width={1200} height={1500} sizes="(max-width: 900px) 40vw, 240px" priority />
          </figure>
        </div>
      </div>
      <div className={s.zigDark} aria-hidden="true" />
    </section>
  );
}
