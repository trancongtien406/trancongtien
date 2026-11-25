import { MagneticButton } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { IMGS } from "../data/images";
import { Photo } from "./Photo";
import { Skyline } from "./Skyline";

/**
 * Hero: "đêm lên đèn". Toàn bộ choreography là CSS (không chớp nội dung trước hydrate):
 * 0.0s nền tối → 0.15s skyline nhô lên → 0.3s hai đèn quét bật → 0.5-1.5s chữ neon "châm" lần lượt
 * (chuỗi opacity có kiểm soát) → 0.9s khung cửa vòm mở → 1.3s đoạn dẫn và nút hiện.
 */
export function Hero() {
  return (
    <section className={s.hero} id="top" aria-labelledby="tm-h1">
      <div className={s.heroSky} aria-hidden="true">
        <div className={`${s.beam} ${s.beamA}`} />
        <div className={`${s.beam} ${s.beamB}`} />
        <div className={s.heroGlow} />
        <div className={s.skylineWrap} data-tm="sky"><Skyline /></div>
      </div>
      <div className={s.heroGrid}>
        <div className={s.heroText}>
          <p className={`${s.eyebrow} ${s.heroFade}`} style={{ "--d": "0.5s" } as React.CSSProperties}>
            <span className={s.dot} aria-hidden="true" /> Rooftop bar &amp; cocktail · Đà Nẵng
          </p>
          <h1 id="tm-h1" className={s.h1}>
            <span className={s.h1Row}>
              <span className={`${s.ignite} ${s.nWhite}`} style={{ "--d": "0.55s" } as React.CSSProperties}>Chạm</span>{" "}
              <span className={`${s.ignite} ${s.nPink} ${s.flickA}`} style={{ "--d": "0.8s" } as React.CSSProperties}>tầng mây,</span>
            </span>
            <span className={s.h1Row}>
              <span className={`${s.ignite} ${s.nWhite}`} style={{ "--d": "1.15s" } as React.CSSProperties}>chạm</span>{" "}
              <span className={`${s.ignite} ${s.nCyan} ${s.flickB}`} style={{ "--d": "1.35s" } as React.CSSProperties}>vị đêm.</span>
            </span>
          </h1>
          <p className={`${s.lead} ${s.heroFade}`} style={{ "--d": "1.5s" } as React.CSSProperties}>
            Thành phố lên đèn, một ly vừa gu và một khoảng trời dành riêng cho bạn. Tầng Mây pha cocktail ngẫu hứng trên mái nhà Đà Nẵng, mở vào buổi tối.
          </p>
          <div className={`${s.heroCtas} ${s.heroFade}`} style={{ "--d": "1.65s" } as React.CSSProperties}>
            <MagneticButton>
              <a className={`${s.btn} ${s.btnPink}`} href="#dat-ban">Giữ chỗ trên mái</a>
            </MagneticButton>
            <a className={`${s.btn} ${s.btnGhost}`} href="#chon-ly">Chọn ly theo vị</a>
          </div>
          <ul className={`${s.heroFacts} ${s.heroFade}`} style={{ "--d": "1.8s" } as React.CSSProperties}>
            <li>Cocktail · Không cồn · Món nhắm</li>
            <li>Dành cho khách từ 18 tuổi</li>
          </ul>
        </div>
        <div className={s.heroArt}>
          <div className={s.arch} data-tm="arch">
            <div className={s.archInner}>
              <Photo img={IMGS.hero} sizes="(max-width: 900px) 70vw, 36vw" priority quality={1000} className={s.archImg} />
              <div className={s.archShade} aria-hidden="true" />
            </div>
            <span className={`${s.archTube}`} aria-hidden="true" />
          </div>
          <p className={s.vertical} aria-hidden="true">Rooftop · Đà Nẵng · Đêm nay lên đèn</p>
        </div>
      </div>
      <a className={s.scrollCue} href="#nhip" aria-label="Cuộn xuống">
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
