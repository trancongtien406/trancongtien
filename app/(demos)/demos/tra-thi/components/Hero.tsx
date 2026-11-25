import Image from "next/image";
import { MagneticButton, SVGPathDraw, VelocityMarquee } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { InkReveal, InkTitle } from "./Ink";
import { Steam } from "./Steam";
import { TEAS } from "../data/tea";

const P = "/images/demos/tra-thi";

export function Hero() {
  return (
    <>
      <section id="top" className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div className={s.heroText}>
            <p className={s.kicker} data-tt="fade">Nhà trà · Đà Nẵng</p>
            <InkTitle as="h1" className={s.h1} trigger="load" delay={0.65} stagger={0.13}>Một chén trà, vạn khoảng lặng.</InkTitle>
            <SVGPathDraw mode="view" duration={1.6} stagger={0.3} className={s.heroBrush} viewBox="0 0 420 26" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 17C70 6 120 22 190 12S330 6 417 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M40 22C120 17 200 24 300 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity=".6" vectorEffect="non-scaling-stroke" />
            </SVGPathDraw>
            <p className={s.lead} data-tt="fade">
              Tịch Trà là một căn phòng nhỏ để ngồi xuống, nghe nước sôi và đợi hơi trà bay lên. Chọn trà theo tâm trạng của bạn, pha đúng nhiệt, đúng giờ.
            </p>
            <div className={s.ctaRow} data-tt="fade">
              <MagneticButton strength={0.35} max={12}>
                <a className={`${s.btn} ${s.btnPrimary}`} href="#ghep-tra" data-cursor="Chọn">Chọn trà cho hôm nay</a>
              </MagneticButton>
              <a className={`${s.btn} ${s.btnLine}`} href="#danh-muc">Xem danh mục trà</a>
            </div>
            <ul className={s.heroFacts} data-tt="fade">
              <li><b>{TEAS.length}</b> loại trà</li>
              <li><b>1 đến 8</b> người một bàn</li>
              <li>Nước đun tại bàn</li>
            </ul>
          </div>

          <div className={s.heroPanel}>
            <InkReveal className={s.heroImg} trigger="load" delay={0.5} duration={1.9}>
              <Image
                src={`${P}/am-dat-set-2000.webp`} alt="Ấm đất nung và chén nhỏ trên khay trà gỗ, nền tối"
                width={2000} height={1378} priority sizes="(max-width: 900px) 100vw, 46vw"
                className={s.cover} data-hero-img="" style={{ objectPosition: "58% 50%" }}
              />
            </InkReveal>
            <Steam className={s.steam} ox={53} oy={36} spread={30} />
            <span className={s.vert} aria-hidden="true">Tịch · Trà · Đà Nẵng</span>
            <span className={s.seal} aria-hidden="true">Tịch</span>
          </div>
        </div>
        <a className={s.cue} href="#tuyen-ngon" aria-label="Cuộn tới tuyên ngôn"><span>Cuộn</span><i /></a>
      </section>

      <div className={s.strip} aria-label="Các loại trà trong danh mục">
        <VelocityMarquee mode="css" duration={70} gap="clamp(28px, 4vw, 56px)" pauseOnHover controls pauseLabel="Dừng dải tên trà" playLabel="Chạy dải tên trà" buttonClassName={s.stripBtn}>
          {TEAS.map((t) => (
            <span key={t.id} className={s.stripItem}><i style={{ background: t.swatch }} />{t.name}</span>
          ))}
        </VelocityMarquee>
      </div>
    </>
  );
}
