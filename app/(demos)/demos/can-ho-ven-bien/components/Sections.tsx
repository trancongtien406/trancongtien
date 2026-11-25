import { ClipReveal, DraggableGallery, MagneticButton, SVGPathDraw, ScrollScrubText, ShineSweep } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import { buildConsultHref } from "@/features/showroom/consultation";
import { FAQ, NAV, SLUG } from "../data/content";
import { Photo } from "./Photo";
import { SeaLines, TowerElevation } from "./Art";
import styles from "../brand.module.css";

export function Manifesto() {
  return (
    <section className={styles.manifesto} aria-labelledby="cv-man-h">
      <div className={`${styles.wrap} ${styles.manGrid}`}>
        <div>
          <p className={styles.sheet} data-cv="reveal"><span>00</span><i aria-hidden="true" />Bản vẽ A-00 · Ý tưởng</p>
          <h2 id="cv-man-h" className={styles.srOnly}>Ý tưởng thiết kế</h2>
          <ScrollScrubText as="p" className={styles.manText} dim={0.18}>
            Một toà tháp không chỉ cao lên. Nó quay về một phía: nơi buổi sáng bắt đầu, nơi ánh sáng đi ngang qua từng căn phòng, và nơi bạn thôi phải đoán hôm nay biển mang màu gì.
          </ScrollScrubText>
        </div>
        <ClipReveal className={styles.manPhoto} from="right" duration={1.3} innerScale={1.1}>
          <div className={styles.manFrame}>
            <Photo file="thap-cong" alt="Mặt tiền kính cong của toà tháp, những dải ban công đồng ánh nắng chiều" sizes="(max-width: 900px) 80vw, 30vw" pos="50% 30%" w={1200} />
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}

const SHOTS = [
  { f: "bai-cat", a: "Bãi cát dài và sóng vỗ nhìn từ trên cao", c: "Dải bờ biển phía Đông" },
  { f: "thap-vang", a: "Toà tháp cao tầng nhuộm nắng vàng chiều", c: "Mặt tiền lúc xế chiều" },
  { f: "ban-cong-ghe", a: "Ban công hoàng hôn với ghế treo nhìn ra biển", c: "Ban công buổi chiều" },
  { f: "phong-ngoi", a: "Phòng ngồi tối giản nhìn ra biển", c: "Phòng ngồi nhìn ra biển" },
  { f: "ho-boi-hoang-hon", a: "Hồ bơi vô cực và mặt trời lặn", c: "Hồ bơi lúc hoàng hôn" },
];

export function Gallery() {
  return (
    <section className={styles.gallery} aria-labelledby="cv-gal-h">
      <div className={styles.wrap}>
        <header className={styles.secHead} data-cv="reveal">
          <p className={styles.sheet}><span>04b</span><i aria-hidden="true" />Bản vẽ A-04b · Khung nhìn</p>
          <h2 id="cv-gal-h" className={styles.h2}>Những khung nhìn từ các tầng.</h2>
        </header>
      </div>
      <DraggableGallery className={styles.galRoot} trackClassName={styles.galTrack} gap="clamp(14px, 2vw, 28px)" buttonClassName={styles.galBtn} label="Khung nhìn từ các tầng, kéo ngang hoặc dùng phím mũi tên" prevLabel="Ảnh trước" nextLabel="Ảnh sau">
        {SHOTS.map((s) => (
          <figure key={s.f} className={styles.galItem} data-cursor="Kéo">
            <div className={styles.galImg}><Photo file={s.f} alt={s.a} sizes="(max-width: 700px) 78vw, 30vw" w={1200} /></div>
            <figcaption>{s.c}</figcaption>
          </figure>
        ))}
      </DraggableGallery>
    </section>
  );
}

export function Faq() {
  return (
    <section className={styles.faq} id="hoi-dap" aria-labelledby="cv-faq-h">
      <div className={`${styles.wrap} ${styles.faqGrid}`}>
        <header data-cv="reveal">
          <p className={styles.sheet}><span>08</span><i aria-hidden="true" />Bản vẽ A-08 · Hỏi đáp</p>
          <h2 id="cv-faq-h" className={styles.h2}>Điều bạn có thể muốn biết trước.</h2>
        </header>
        <div className={styles.faqList} data-cv="reveal">
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary>{f.q}<span aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className={styles.final} aria-labelledby="cv-fin-h">
      <div className={styles.finalBg} aria-hidden="true">
        <Photo file="thap-chieu-muon" alt="" sizes="100vw" pos="50% 40%" />
        <span />
      </div>
      <SVGPathDraw mode="scroll" start="top 85%" end="bottom 55%" className={styles.finalTower} viewBox="0 0 520 600" aria-hidden="true" focusable="false">
        <TowerLines />
      </SVGPathDraw>
      <div className={`${styles.wrap} ${styles.finalGrid}`}>
        <div data-cv="reveal">
          <p className={styles.sheet}><span>09</span><i aria-hidden="true" />Bản vẽ A-09 · Gặp đội tư vấn</p>
          <h2 id="cv-fin-h" className={styles.h2Big}>Hẹn một buổi sáng để nhìn thấy biển từ chính căn bạn chọn.</h2>
          <p className={styles.lede}>Gửi cho chúng tôi cấu hình bạn vừa dựng. Đội tư vấn sẽ phản hồi bằng bảng giá chính thức, mặt bằng chi tiết và lịch xem nhà mẫu.</p>
          <div className={styles.finalCta}>
            <MagneticButton>
              <ShineSweep trigger="loop" every={4.5} color="rgba(255,236,210,.5)">
                <a className={`${styles.btn} ${styles.btnCopper} ${styles.btnLg}`} href={buildConsultHref(SLUG)} data-cursor="Đi tới">Nhận tư vấn về căn hộ</a>
              </ShineSweep>
            </MagneticButton>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="#mat-bang">Quay lại mặt bằng</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Các nét tháp dùng riêng cho vẽ-dần theo cuộn (không dùng TowerElevation vì nó tự là một <svg>). */
function TowerLines() {
  const floors = Array.from({ length: 35 }, (_, i) => 88 + (i + 1) * 12.2);
  return (
    <>
      <path d="M150 540V110l24-34h72l24 34v430" strokeWidth="1.8" strokeLinejoin="round" />
      {floors.map((y, i) => <path key={i} d={`M150 ${y.toFixed(1)}H${i % 3 === 0 ? 270 : 262}`} opacity={i % 3 === 0 ? 1 : 0.45} />)}
      <path d="M70 540V330h60M300 540V380h80v160" strokeLinejoin="round" />
      <path d="M30 540h470" />
      <path d="M110 90V540M104 90h12M104 232h12M104 386h12M104 540h12" stroke="var(--cv-copper-l)" />
    </>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SeaLines className={styles.footSea} rows={4} />
      <div className={`${styles.wrap} ${styles.footGrid}`}>
        <div className={styles.footBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/can-ho-ven-bien/identity/logo-primary-reversed.svg" alt="Vọng Triều" width={200} height={150} translate="no" loading="lazy" />
          <p>Căn hộ ven biển Đà Nẵng, thiết kế theo hướng nhìn.</p>
        </div>
        <nav aria-label="Liên kết chân trang" className={styles.footNav}>
          <p className={styles.footTitle}>Khám phá</p>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div className={styles.footContact}>
          <p className={styles.footTitle}>Liên hệ</p>
          <ul>
            <li>Ven biển Đà Nẵng</li>
            <li>Tư vấn: 0236 000 0000</li>
            <li>ban-hang@vongtrieu.example</li>
          </ul>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.footBase}`}>
        <p>© Vọng Triều. Thông tin, hình ảnh và giá chỉ mang tính tham khảo.</p>
        <p><a href="/demos/can-ho-ven-bien/credits">Ảnh &amp; ghi công</a><span aria-hidden="true"> · </span>Thiết kế website: {siteConfig.fullName}</p>
      </div>
    </footer>
  );
}
