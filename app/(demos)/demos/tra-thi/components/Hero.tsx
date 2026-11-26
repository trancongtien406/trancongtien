import Image from "next/image";
import { SVGPathDraw } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { InkReveal, InkTitle } from "./Ink";
import { Steam } from "./Steam";

const P = "/images/demos/tra-thi";

export function Hero() {
  return (
    <>
      <section id="top" className={s.hero}>
        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div className={s.heroText}>
            <p className={s.kicker} data-tt="fade">Nhà trà · Quận Hải Châu, Đà Nẵng</p>
            <InkTitle as="h1" className={s.h1} trigger="load" delay={0.65} stagger={0.13}>Nhà trà để ngồi lại một chút.</InkTitle>
            <SVGPathDraw mode="view" duration={1.6} stagger={0.3} className={s.heroBrush} viewBox="0 0 420 26" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 17C70 6 120 22 190 12S330 6 417 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M40 22C120 17 200 24 300 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity=".6" vectorEffect="non-scaling-stroke" />
            </SVGPathDraw>
            <p className={s.lead} data-tt="fade">
              Tịch Trà là nhà trà ở Quận Hải Châu, Đà Nẵng: mười hai loại trà pha tại bàn, bánh trà ăn kèm, phòng trà riêng cho nhóm 4 đến 10 người và trà đóng gói mang về. Dành cho người đi một mình, cặp đôi, nhóm bạn và những buổi gặp nhỏ.
            </p>
            <div className={s.ctaRow} data-tt="fade">
              <a className={`${s.btn} ${s.btnPrimary}`} href="#buoi-tra" data-cursor="Đặt">Đặt bàn hoặc phòng trà</a>
              <a className={`${s.btn} ${s.btnLine}`} href="#danh-muc">Xem menu trà</a>
            </div>
            <ul className={s.heroFacts} data-tt="fade">
              <li>Mở cửa <b>8:30 đến 21:30</b></li>
              <li>Trà từ <b>100.000₫</b> một ấm</li>
              <li>Phòng riêng <b>4 đến 10</b> người</li>
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
        <a className={s.cue} href="#tuyen-ngon" aria-label="Cuộn xuống phần giới thiệu"><span>Cuộn</span><i /></a>
      </section>

    </>
  );
}
