import { CanvasParticles, CursorSpotlight, MagneticButton, SplitWords } from "@/features/showroom/effects";
import { Halo } from "./Halo";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-dx="hero" aria-labelledby="hero-title">
      <CanvasParticles mode="bubbles" count={20} color="rgba(122,104,230,0.55)" speed={0.6} className={styles.heroBubbles} />
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy} data-dx="copy">
          <p className={styles.eyebrow} data-dx="eyebrow"><i aria-hidden="true" />Skincare studio · Đà Nẵng</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <SplitWords as="span" className={styles.heroLine} trigger="load" delay={0.55} duration={1} stagger={0.09}>Chăm da dịu dàng,</SplitWords>
            <SplitWords as="span" className={`${styles.heroLine} ${styles.heroAccent}`} trigger="load" delay={0.95} duration={1} stagger={0.09}>hiểu làn da hơn.</SplitWords>
          </h1>
          <p className={styles.heroLead} data-dx="lead">
            NÉA là studio chăm sóc da cơ bản. Chúng mình lắng nghe trước, chọn vài bước vừa đủ và nói rõ từng bước trước khi làm, không thủ thuật xâm lấn và không hứa những điều kỳ diệu.
          </p>
          <div className={styles.heroCtas}>
            <span data-dx="cta"><MagneticButton><a className={`${styles.btn} ${styles.btnInk}`} href="#routine">Thử Skin Routine Builder</a></MagneticButton></span>
            <span data-dx="cta"><a className={`${styles.btn} ${styles.btnGlass}`} href="#lieu-trinh">Xem các liệu trình</a></span>
          </div>
          <ul className={styles.heroFacts} data-dx="facts">
            <li>Không thủ thuật xâm lấn</li>
            <li>Giá tham khảo rõ ràng</li>
            <li>Biết khi nào nên hỏi bác sĩ da liễu</li>
          </ul>
        </div>

        <div className={styles.stage} data-dx="stage">
          <div className={styles.stageLayer} data-depth="0.3"><i className={`${styles.orb} ${styles.orbA}`} aria-hidden="true" /></div>
          <div className={styles.stageLayer} data-depth="0.2"><i className={`${styles.orb} ${styles.orbB}`} aria-hidden="true" /></div>
          <div className={`${styles.stageLayer} ${styles.stageMain}`} data-depth="0.55">
            <div data-dx="halo" className={styles.stageHalo}>
              <Halo className={styles.stageHaloInner}>
                <div className={styles.arch} data-dx="arch">
                  <div className={styles.archImg} data-dx="arch-img">
                    <Photo file="serum-gel" alt="Giọt tinh chất màu lilac nhỏ từ ống pipet xuống một vệt gel trong suốt" sizes="(max-width: 900px) 70vw, 460px" priority pos="62% 38%" w={1200} />
                  </div>
                </div>
              </Halo>
            </div>
          </div>

          <div className={`${styles.stageLayer} ${styles.sc1}`} data-depth="1.05">
            <div className={styles.floatA} data-dx="card">
              <CursorSpotlight className={`${styles.glass} ${styles.miniCard}`} radius={180} color="rgba(255,255,255,0.7)">
                <span className={styles.miniIcon} aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2.5C9.6 7 5.5 10.2 5.5 14.4a6.5 6.5 0 0 0 13 0C18.5 10.2 14.4 7 12 2.5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg></span>
                <span className={styles.miniText}><b>Làm sạch dịu &amp; cấp ẩm</b><small>60&nbsp;phút · giá tham khảo từ 380.000&nbsp;đ</small></span>
              </CursorSpotlight>
            </div>
          </div>
          <div className={`${styles.stageLayer} ${styles.sc2}`} data-depth="1.45">
            <div className={styles.floatB} data-dx="card">
              <CursorSpotlight className={`${styles.glass} ${styles.routineCard}`} radius={200} color="rgba(255,255,255,0.7)">
                <b>Routine vừa đủ</b>
                <span><em>Sáng</em>Làm sạch, dưỡng ẩm, chống nắng</span>
                <span><em>Tối</em>Làm sạch, tinh chất, dưỡng ẩm</span>
              </CursorSpotlight>
            </div>
          </div>
          <div className={`${styles.stageLayer} ${styles.sc3}`} data-depth="1.8">
            <div className={styles.floatC} data-dx="card">
              <span className={`${styles.glass} ${styles.pill}`}><i aria-hidden="true" />Nhẹ nhàng, từng bước</span>
            </div>
          </div>
        </div>
      </div>
      <a className={styles.scrollHint} href="#triet-ly" data-dx="hint" aria-label="Cuộn xuống nội dung tiếp theo"><span aria-hidden="true" /></a>
    </section>
  );
}
