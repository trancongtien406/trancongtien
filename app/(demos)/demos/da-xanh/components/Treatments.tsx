"use client";

import { useState } from "react";
import { CursorSpotlight, TiltCard } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { TREATMENTS } from "../data/content";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const VND = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

/**
 * Danh mục liệu trình: chọn một liệu trình thì nền đổi sắc (các lớp tint cross-fade),
 * ảnh đổi bằng cross-fade + phóng nhẹ, chữ blur-fade. Radio thật nên bàn phím mũi tên hoạt động.
 */
export function Treatments() {
  const [i, setI] = useState(0);
  const t = TREATMENTS[i];
  const href = buildConsultHref("da-xanh");
  return (
    <section id="lieu-trinh" className={styles.treat} aria-labelledby="treat-title" data-dx-active={t.id}>
      <div className={styles.treatTints} aria-hidden="true">
        {TREATMENTS.map((x, n) => <i key={x.id} className={styles.treatTint} style={{ background: `radial-gradient(60% 70% at 72% 45%, ${x.tint}, transparent 72%)`, opacity: n === i ? 1 : 0 }} />)}
      </div>
      <div className={`${styles.wrap} ${styles.treatGrid}`}>
        <div className={styles.treatSide}>
          <p className={styles.kicker} data-bf="">Danh mục liệu trình</p>
          <h2 id="treat-title" className={styles.h2} data-bf="">Chăm sóc cơ bản, chọn theo cảm giác của bạn.</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Sáu buổi nhẹ nhàng, không thủ thuật xâm lấn. Giá là giá tham khảo, có thể thay đổi theo tình trạng da và buổi hẹn.</p>
          <fieldset className={styles.treatList} data-bf="" data-bf-delay="0.15">
            <legend className={styles.srOnly}>Chọn liệu trình để xem chi tiết</legend>
            {TREATMENTS.map((x, n) => (
              <label key={x.id} className={styles.treatOpt}>
                <input type="radio" name="dx-treat" value={x.id} checked={n === i} onChange={() => setI(n)} />
                <span className={styles.treatOptBody}>
                  <span className={styles.treatNum} aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                  <span className={styles.treatName}>{x.name}</span>
                  <span className={styles.treatMeta}>{x.minutes}&nbsp;phút</span>
                </span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className={styles.treatStage}>
          <TiltCard max={5} glare glareColor="rgba(255,255,255,0.4)" scale={1.01} className={styles.treatTilt}>
            <div className={`${styles.glass} ${styles.treatPhotoFrame}`}>
              <div className={styles.treatPhoto}>
                {TREATMENTS.map((x, n) => (
                  <div key={x.id} className={styles.treatImg} data-on={n === i ? "1" : "0"} aria-hidden={n === i ? undefined : "true"}>
                    <Photo file={x.img} alt={n === i ? x.alt : ""} sizes="(max-width: 900px) 92vw, 560px" pos={x.pos} w={1200} />
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
          <CursorSpotlight className={`${styles.glass} ${styles.treatCard}`} radius={300} color="rgba(255,255,255,0.65)">
            <div key={t.id} className={styles.treatSwap}>
              <div className={styles.treatHead}>
                <h3>{t.name}</h3>
                <p className={styles.price}><small>Giá tham khảo</small><strong>{VND.format(t.price)}</strong><span>{t.minutes}&nbsp;phút</span></p>
              </div>
              <p className={styles.treatSummary}>{t.summary}</p>
              <ol className={styles.treatSteps}>
                {t.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
              <p className={styles.treatSuits}><b>Phù hợp khi:</b> {t.suits}</p>
              <p className={styles.treatNote}>{t.note}</p>
            </div>
            <a className={`${styles.btn} ${styles.btnInk} ${styles.treatCta}`} href={href}>Hỏi lịch cho liệu trình này</a>
          </CursorSpotlight>
        </div>
      </div>
    </section>
  );
}
