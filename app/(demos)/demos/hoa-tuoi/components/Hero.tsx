import Image from "next/image";
import { BlobMorph, MagneticButton } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { BloomText } from "./BloomText";
import { HeroMotion } from "./HeroMotion";
import { PetalMask } from "./PetalMask";
import { BLOOM_PATHS, Leaf } from "./Shapes";

const RING = "DỰNG BÓ HOA CỦA RIÊNG BẠN · BOUQUET BUILDER · ";

export function Hero() {
  return (
    <section id="dau-trang" className={s.hero} data-leaf-scope="" aria-labelledby="h1">
      <div className={s.heroLeaves} aria-hidden="true">
        <div className={`${s.hl} ${s.hlA}`} data-h="leaf"><div data-leaf="" data-y="-90" data-x="30" data-r="5" className={s.leafWrap}><Leaf kind="fern" className={s.leafFern} /></div></div>
        <div className={`${s.hl} ${s.hlB}`} data-h="leaf"><div data-leaf="" data-y="-160" data-x="-20" data-r="-6" className={s.leafWrap}><Leaf kind="lance" className={s.leafLance} /></div></div>
        <div className={`${s.hl} ${s.hlC}`} data-h="leaf"><div data-leaf="" data-y="-40" data-x="-50" data-r="9" className={s.leafWrap}><Leaf kind="round" className={s.leafRound} /></div></div>
        <div className={`${s.hl} ${s.hlD}`} data-h="leaf"><div data-leaf="" data-y="-220" data-x="40" data-r="-8" className={s.leafWrap}><Leaf kind="lance" className={s.leafLance2} /></div></div>
      </div>

      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow} data-h="fade">Hoa tươi · Đà Nẵng</p>
          <h1 id="h1" className={s.heroTitle}>
            <BloomText trigger="load" delay={1.0} accent={["nở"]} accentClassName={s.accent}>Hoa cho những điều đang nở.</BloomText>
          </h1>
          <p className={s.lead} data-h="fade">
            Những bó hoa được tạo nên từ sắc màu, hình dáng và cảm xúc. Tự nhiên một chút, khác biệt một chút, dành riêng cho những khoảnh khắc đáng nhớ.
          </p>
          <div className={s.heroCtas}>
            <span data-h="cta"><MagneticButton><a className={`${s.btn} ${s.btnVerm} ${s.btnBig}`} href="#bo-hoa">Tự tay dựng bó hoa</a></MagneticButton></span>
            <span data-h="cta"><a className={`${s.btn} ${s.btnLine} ${s.btnBig}`} href="#vuon">Xem khu vườn</a></span>
          </div>
        </div>

        <div className={s.heroArt}>
          <div className={s.heroBlob} data-h="blob" aria-hidden="true">
            <BlobMorph paths={BLOOM_PATHS} duration={2.4} className={s.blobSvg} />
          </div>
          <PetalMask shape="flower" className={s.heroFlower} trigger="load" delay={0.3} outline outlineClassName={s.heroOutline}>
            <Image src="/images/demos/hoa-tuoi/mau-don-hong-1200.webp" alt="Mẫu đơn hồng sen nở rộ, cánh còn đọng sương" fill priority sizes="(max-width: 900px) 86vw, 46vw" style={{ objectFit: "cover" }} />
          </PetalMask>
          <a className={s.ring} href="#bo-hoa" data-h="ring" aria-label="Dựng bó hoa của riêng bạn bằng Bouquet Builder">
            <svg viewBox="0 0 200 200" className={s.ringSvg} data-spin="" aria-hidden="true" focusable="false">
              <defs><path id="nr-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
              <text className={s.ringText}><textPath href="#nr-ring" startOffset="0" textLength="482" lengthAdjust="spacing">{RING}</textPath></text>
            </svg>
            <svg viewBox="0 0 40 40" className={s.ringBloom} aria-hidden="true" focusable="false">
              {[0, 72, 144, 216, 288].map((r) => <path key={r} d="M20 19C15 14 16 6 20 1C24 6 25 14 20 19Z" fill="currentColor" transform={`rotate(${r} 20 20)`} />)}
            </svg>
          </a>
        </div>
      </div>

      <p className={`${s.wrap} ${s.heroFoot}`} data-h="fade">Hoa cắt theo mùa · Cắm tay từng bó · Gói giấy kraft và dây gai</p>
      <HeroMotion />
    </section>
  );
}
