import { CanvasParticles, MagneticButton, SplitWords } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { IMGS } from "../data/images";
import { Candle } from "./Candle";
import { Photo } from "./Photo";

/**
 * Hero "bức tranh dưới đèn rọi": khung ảnh treo tường có đèn rọi đồng, nến nhấp nháy trên kệ gỗ,
 * bụi sáng canvas. Choreography (sau rèm ~1,2 s): đèn rọi bật 0,9 s -> khung hiện -> chữ -> nút.
 */
export function Hero() {
  return (
    <section className={s.hero} id="top" aria-label="Mộc Vang, wine bar Đà Nẵng">
      <div className={s.heroBg} aria-hidden="true">
        <div className={s.heroWall} />
        <CanvasParticles mode="particles" count={34} color="#f0c88a" speed={0.5} className={s.dust} />
      </div>
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroText}>
          <p className={`${s.eyebrow} ${s.rise}`} style={{ "--d": "1.25s" } as React.CSSProperties}>
            <span className={s.eyebrowLine} aria-hidden="true" /> Wine bar · Đà Nẵng
          </p>
          <SplitWords as="h1" className={s.h1} trigger="load" delay={1.3} stagger={0.07}>
            Chậm lại một ly vang.
          </SplitWords>
          <p className={`${s.lead} ${s.rise}`} style={{ "--d": "1.75s" } as React.CSSProperties}>
            Một căn phòng nhỏ ánh nến, bàn gỗ sẫm và danh sách vang ngắn, chia theo phong cách thay vì tên gọi khó nhớ. Bạn nói món và dịp, Mộc Vang gợi ý ly hợp.
          </p>
          <div className={`${s.heroCtas} ${s.rise}`} style={{ "--d": "1.95s" } as React.CSSProperties}>
            <MagneticButton>
              <a className={`${s.btn} ${s.btnGold}`} href="#dat-ban">Đặt bàn tối nay</a>
            </MagneticButton>
            <a className={`${s.btn} ${s.btnGhost}`} href="#chon-vang">Tìm ly hợp vị</a>
          </div>
          <ul className={`${s.facts} ${s.rise}`} style={{ "--d": "2.1s" } as React.CSSProperties}>
            <li>14 ly và chai theo phong cách</li>
            <li>Dành cho khách từ 18 tuổi</li>
          </ul>
        </div>
        <div className={s.heroArt}>
          <div className={s.lamp} aria-hidden="true">
            <svg viewBox="0 0 320 70" focusable="false">
              <path d="M24 34h272" stroke="#c08a4a" strokeWidth="4" strokeLinecap="round" />
              <path d="M110 34c0-14 20-22 50-22s50 8 50 22z" fill="#8a5f2c" />
              <rect x="148" y="2" width="24" height="12" rx="3" fill="#c08a4a" />
            </svg>
            <span className={s.cone} />
          </div>
          <figure className={s.frame}>
            <div className={s.frameInner}>
              <Photo img={IMGS.heroTealights} sizes="(max-width: 900px) 80vw, 34vw" priority quality={1000} className={s.frameImg} />
              <span className={s.frameVig} aria-hidden="true" />
            </div>
          </figure>
          <div className={s.shelf} aria-hidden="true">
            <Candle className={s.heroCandle} delay={0} />
            <Candle className={`${s.heroCandle} ${s.heroCandle2}`} delay={0.7} small />
          </div>
        </div>
      </div>
      <a className={s.scrollCue} href="#cau-chuyen" aria-label="Cuộn xuống câu chuyện"><span aria-hidden="true" /></a>
    </section>
  );
}
