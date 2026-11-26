import { CanvasParticles, CursorSpotlight } from "@/features/showroom/effects";
import { AREA, FACTS } from "../data/content";
import { Halo } from "./Halo";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

export function Hero() {
  return (
    <section className={styles.hero} data-dx="hero" aria-labelledby="hero-title">
      <CanvasParticles mode="bubbles" count={20} color="rgba(122,104,230,0.55)" speed={0.6} className={styles.heroBubbles} />
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div className={styles.heroCopy} data-dx="copy">
          <p className={styles.eyebrow} data-dx="eyebrow"><i aria-hidden="true" />Studio chăm sóc da cơ bản · {AREA}</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.heroLine} data-dx="line">Chăm da dịu dàng,</span>
            <span className={`${styles.heroLine} ${styles.heroAccent}`} data-dx="line">hiểu làn da hơn.</span>
          </h1>
          <p className={styles.heroLead} data-dx="lead">
            NÉA là studio làm sạch, cấp ẩm, phục hồi và chăm sóc vùng mắt, cổ cho người đi làm muốn chăm da đều tay, không thủ thuật xâm lấn. Mỗi buổi có phòng riêng, bắt đầu bằng soi da và trò chuyện, nói rõ từng bước trước khi làm.
          </p>
          <div className={styles.heroCtas}>
            <span data-dx="cta"><a className={`${styles.btn} ${styles.btnInk}`} href="#dat-lich">Đặt lịch chăm da</a></span>
            <span data-dx="cta"><a className={`${styles.btn} ${styles.btnGlass}`} href="#lieu-trinh">Xem các liệu trình</a></span>
          </div>
          <dl className={styles.heroFactsGrid} data-dx="facts">
            {FACTS.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd><b>{f.v}</b><span>{f.d}</span></dd></div>
            ))}
          </dl>
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
                <span className={styles.miniText}><b>Làm sạch dịu và cấp ẩm</b><small>60&nbsp;phút · giá tham khảo từ 380.000&nbsp;đ</small></span>
              </CursorSpotlight>
            </div>
          </div>
          <div className={`${styles.stageLayer} ${styles.sc2}`} data-depth="1.45">
            <div className={styles.floatB} data-dx="card">
              <CursorSpotlight className={`${styles.glass} ${styles.routineCard}`} radius={200} color="rgba(255,255,255,0.7)">
                <b>Một buổi tại studio</b>
                <span><em>1</em>Soi da, trò chuyện</span>
                <span><em>2</em>Làm sạch, liệu trình</span>
                <span><em>3</em>Dặn dò, ghi lại</span>
              </CursorSpotlight>
            </div>
          </div>
          <div className={`${styles.stageLayer} ${styles.sc3}`} data-depth="1.8">
            <div className={styles.floatC} data-dx="card">
              <span className={`${styles.glass} ${styles.pill}`}><i aria-hidden="true" />Phòng riêng, hẹn trước</span>
            </div>
          </div>
        </div>
      </div>
      <a className={styles.scrollHint} href="#ve-studio" data-dx="hint" aria-label="Cuộn xuống nội dung tiếp theo"><span aria-hidden="true" /></a>
    </section>
  );
}
