import Image from "next/image";
import { MagneticButton, ParallaxLayer, SlotText, VelocityMarquee } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { BounceWords } from "./BounceWords";
import { DragSticker } from "./DragSticker";
import { Drip } from "./Drip";
import { SprinkleRain } from "./Sprinkles";
import { Treat } from "./Treat";

const SLOT = ["Croissant bơ", "Macaron mint", "Kem Dâu Mây", "Donut hồng cốm", "Cupcake kẹo bông"];

const Star = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" fill="currentColor" /></svg>
);

export function Hero() {
  return (
    <section className={s.hero} id="dau-trang" aria-label="Giới thiệu Mây Kẹo">
      <SprinkleRain className={s.heroCanvas} />
      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={s.pillTag}><span className={s.dotLive} aria-hidden="true" />Tiệm bánh ngọt làm tay · Đà Nẵng</p>
          <BounceWords
            className={`${s.display} ${s.heroTitle}`}
            lines={[["Bánh", "ngọt"], ["làm", "tay,"], ["vui", "từng", "miếng."]]}
          />
          <p className={s.heroLead}>
            Bột nhào bằng tay, kem đánh trong ngày, màu kẹo cho một chiếc bánh khiến bữa tiệc nhỏ cũng thành ngày hội. Chọn món có sẵn hoặc tự dựng chiếc bánh của bạn.
          </p>
          <div className={s.heroCtas}>
            <MagneticButton>
              <a className={`${s.btn} ${s.btnBig} ${s.btnChoco}`} href="#dung-banh" data-confetti="1">Dựng chiếc bánh của bạn</a>
            </MagneticButton>
            <a className={`${s.btn} ${s.btnBig} ${s.btnWhite}`} href="#tu-banh">Xem tủ bánh</a>
          </div>
          <p className={s.slotLine}>
            <span>Sáng nay có</span>
            <SlotText words={SLOT} interval={2400} className={s.slotWord} />
          </p>
        </div>

        <div className={s.heroArt}>
          <div className={s.photoBlob}>
            <ParallaxLayer distance={40} className={s.parallaxFill}>
              <Image src="/images/demos/tiem-banh/banh-hong-macaron-1200.webp" alt="Bánh kem hồng phủ macaron và kem bông trên nền hoa nổi" fill priority sizes="(max-width: 860px) 86vw, 520px" style={{ objectFit: "cover", objectPosition: "50% 38%" }} />
            </ParallaxLayer>
          </div>

          <div className={s.badge} aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs><path id="mk-circ" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" /></defs>
              <circle cx="100" cy="100" r="98" fill="#FFE27D" stroke="#46251A" strokeWidth="4" />
              <g className={s.badgeSpin}>
                <text fontSize="16" fontWeight="800" fill="#46251A" style={{ fontFamily: "var(--mk-display)" }}>
                  <textPath href="#mk-circ" textLength="468" lengthAdjust="spacing">NƯỚNG SÁNG NAY · LÀM TAY · ĐÀ NẴNG · </textPath>
                </text>
              </g>
              <g transform="translate(64 62) scale(3)" fill="#FF8FAE" stroke="#46251A" strokeWidth="1.3" strokeLinejoin="round"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" /></g>
            </svg>
          </div>

          <figure className={s.polaroid}>
            <div className={s.polaroidImg}>
              <Image src="/images/demos/tiem-banh/macaron-chong-600.webp" alt="Tháp macaron nhiều màu trên nền vải hồng" fill sizes="180px" style={{ objectFit: "cover" }} />
            </div>
            <figcaption>Macaron 6 vị</figcaption>
          </figure>

          <DragSticker label="Nhãn dán cherry" left={4} top={40} rot={-8} width="clamp(60px,7vw,84px)" className={s.sticker}>
            <svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="#46251A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M50 20c4 18 12 28 26 34M50 20c-4 16-14 26-28 34" fill="none" /><circle cx="74" cy="68" r="20" fill="#FF4D6D" /><circle cx="26" cy="68" r="20" fill="#FF4D6D" /><path d="M50 20c8-8 20-8 28-2-8 8-20 8-28 2z" fill="#6FD3A6" /></g></svg>
          </DragSticker>
          <DragSticker label="Nhãn dán mặt cười" left={92} top={48} rot={10} width="clamp(60px,7.4vw,92px)" className={s.sticker}>
            <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="#FFE27D" stroke="#46251A" strokeWidth="4" /><circle cx="36" cy="42" r="5" fill="#46251A" /><circle cx="64" cy="42" r="5" fill="#46251A" /><path d="M32 60q18 18 36 0" fill="none" stroke="#46251A" strokeWidth="5" strokeLinecap="round" /><circle cx="26" cy="56" r="6" fill="#FF8FAE" opacity=".8" /><circle cx="74" cy="56" r="6" fill="#FF8FAE" opacity=".8" /></svg>
          </DragSticker>
          <DragSticker label="Nhãn dán cupcake" left={96} top={74} rot={8} width="clamp(70px,9vw,104px)" className={s.sticker}>
            <Treat kind="cupcake" colors={["#F6D49B", "#8FE0BE", "#FF5E86"]} />
          </DragSticker>
          <DragSticker label="Nhãn dán mới ra lò" left={14} top={6} rot={-12} width="clamp(80px,10vw,120px)" className={s.sticker}>
            <svg viewBox="0 0 120 64" aria-hidden="true"><rect x="4" y="6" width="112" height="52" rx="26" fill="#8FE0BE" stroke="#46251A" strokeWidth="4" /><text x="60" y="41" textAnchor="middle" fontSize="23" fontWeight="800" fill="#46251A" style={{ fontFamily: "var(--mk-display)" }}>Mới ra lò</text></svg>
          </DragSticker>
          <p className={s.dragHint}>Thử kéo các nhãn dán</p>
        </div>
      </div>

      <div className={s.heroDrip}><Drip color="var(--mk-peach)" className={s.dripSvg} /></div>
      <div className={s.strip} aria-label="Một vài món trong tủ bánh">
        <VelocityMarquee mode="velocity" speed={60} boost={1.2} reverseOnScrollUp gap="2.2rem" controls pauseLabel="Dừng chạy chữ" playLabel="Chạy chữ" buttonClassName={s.marqueeBtn}>
          {["Kem Dâu Mây", "Macaron 6 vị", "Croissant bơ", "Donut hồng cốm", "Cupcake kẹo bông", "Tart dâu kem sữa", "Su kem vani"].map((t) => (
            <span key={t} className={s.stripItem}><Star />{t}</span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
