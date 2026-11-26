import { DraggableGallery, ScrollScrubText } from "@/features/showroom/effects";
import { siteConfig } from "@/lib/site";
import { FAQ, NAV, OVERVIEW } from "../data/content";
import { Photo } from "./Photo";
import { SeaLines } from "./Art";
import styles from "../brand.module.css";

export function Overview() {
  return (
    <section id="tong-quan" className={styles.manifesto} aria-labelledby="cv-man-h">
      <div className={`${styles.wrap} ${styles.manGrid}`}>
        <div>
          <p className={styles.sheet} data-cv="reveal"><span>00</span><i aria-hidden="true" />Bản vẽ A-00 · Tổng quan dự án</p>
          <h2 id="cv-man-h" className={styles.srOnly}>Tổng quan dự án Vọng Triều</h2>
          <ScrollScrubText as="p" className={styles.manText} dim={0.18}>
            Một toà tháp không chỉ cao lên. Nó quay về một phía: nơi buổi sáng bắt đầu, nơi ánh sáng đi ngang qua từng căn phòng, và nơi bạn thôi phải đoán hôm nay biển mang màu gì.
          </ScrollScrubText>
          <dl className={styles.ovList} data-cv="reveal">
            {OVERVIEW.map((o) => (<div key={o.k}><dt>{o.k}</dt><dd>{o.v}</dd></div>))}
          </dl>
        </div>
        <div className={styles.manPhoto}>
          <div className={styles.manFrame}>
            <Photo file="thap-cong" alt="Mặt tiền kính cong của toà tháp, những dải ban công đồng ánh nắng chiều" sizes="(max-width: 900px) 80vw, 30vw" pos="50% 30%" w={1200} />
          </div>
        </div>
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
          <h2 id="cv-gal-h" className={styles.h2}>Những khung nhìn bạn sẽ có từ các tầng.</h2>
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
          <h2 id="cv-faq-h" className={styles.h2}>Điều người mua thường hỏi trước.</h2>
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

export function Footer() {
  return (
    <footer className={styles.footer}>
      <SeaLines className={styles.footSea} rows={4} />
      <div className={`${styles.wrap} ${styles.footGrid}`}>
        <div className={styles.footBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/demos/can-ho-ven-bien/identity/logo-primary-reversed.svg" alt="Vọng Triều" width={200} height={150} translate="no" loading="lazy" />
          <p>Dự án căn hộ ven biển một tháp 36 tầng, ở dải bờ phía Đông Đà Nẵng.</p>
        </div>
        <nav aria-label="Liên kết chân trang" className={styles.footNav}>
          <p className={styles.footTitle}>Khám phá</p>
          <ul>{NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
        </nav>
        <div className={styles.footContact}>
          <p className={styles.footTitle}>Liên hệ</p>
          <ul>
            <li>Nhà mẫu: dải ven biển Đà Nẵng, hẹn trước</li>
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
