"use client";

import { useState } from "react";
import { CursorSpotlight } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { FEELS, TREATMENTS, type Feel } from "../data/content";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const VND = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });

/**
 * Danh mục liệu trình: chọn một liệu trình thì nền đổi sắc (các lớp tint cross-fade),
 * ảnh đổi bằng cross-fade + phóng nhẹ, chữ blur-fade. Radio thật nên bàn phím mũi tên hoạt động.
 */
export function Treatments() {
  const [i, setI] = useState(0);
  const [feel, setFeel] = useState<Feel | null>(null);
  const t = TREATMENTS[i];
  const pickFeel = (f: Feel | null) => {
    setFeel(f);
    if (f) { const n = TREATMENTS.findIndex((x) => x.feels.includes(f)); if (n >= 0) setI(n); }
  };
  const href = buildConsultHref("da-xanh");
  return (
    <section id="lieu-trinh" className={styles.treat} aria-labelledby="treat-title" data-dx-active={t.id}>
      <div className={styles.treatTints} aria-hidden="true">
        {TREATMENTS.map((x, n) => <i key={x.id} className={styles.treatTint} style={{ background: `radial-gradient(60% 70% at 72% 45%, ${x.tint}, transparent 72%)`, opacity: n === i ? 1 : 0 }} />)}
      </div>
      <div className={`${styles.wrap} ${styles.treatGrid}`}>
        <div className={styles.treatSide}>
          <p className={styles.kicker} data-bf="">Danh mục liệu trình</p>
          <h2 id="treat-title" className={styles.h2} data-bf="">Bảy liệu trình cơ bản, chọn theo cảm giác của da.</h2>
          <p className={styles.lede} data-bf="" data-bf-delay="0.1">Làm sạch, cấp ẩm, phục hồi, chăm sóc vùng mắt và cổ, thư giãn, kèm một buổi tư vấn thói quen da. Không thủ thuật xâm lấn. Giá là giá tham khảo cho mỗi buổi.</p>
          <fieldset className={styles.feelRow} data-bf="" data-bf-delay="0.12">
            <legend>Da bạn đang thế nào?</legend>
            {FEELS.map((f) => (
              <label key={f.id} className={styles.feel}>
                <input type="radio" name="dx-feel" checked={feel === f.id} onChange={() => pickFeel(f.id)} />
                <span>{f.label}</span>
              </label>
            ))}
            <button type="button" className={styles.feelClear} onClick={() => pickFeel(null)} disabled={!feel}>Bỏ chọn</button>
          </fieldset>
          <fieldset className={styles.treatList} data-bf="" data-bf-delay="0.15">
            <legend className={styles.srOnly}>Chọn liệu trình để xem chi tiết</legend>
            {TREATMENTS.map((x, n) => (
              <label key={x.id} className={styles.treatOpt} data-match={feel ? (x.feels.includes(feel) ? "1" : "0") : undefined}>
                <input type="radio" name="dx-treat" value={x.id} checked={n === i} onChange={() => setI(n)} />
                <span className={styles.treatOptBody}>
                  <span className={styles.treatNum} aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
                  <span className={styles.treatName}>{x.name}</span>
                  <span className={styles.treatMeta}>{x.group} · {x.minutes}&nbsp;phút{feel && x.feels.includes(feel) ? " · hợp với bạn" : ""}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className={styles.treatStage}>
          <div className={styles.treatTilt}>
            <div className={`${styles.glass} ${styles.treatPhotoFrame}`}>
              <div className={styles.treatPhoto}>
                {TREATMENTS.map((x, n) => (
                  <div key={x.id} className={styles.treatImg} data-on={n === i ? "1" : "0"} aria-hidden={n === i ? undefined : "true"}>
                    <Photo file={x.img} alt={n === i ? x.alt : ""} sizes="(max-width: 900px) 92vw, 560px" pos={x.pos} w={1200} />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <a className={`${styles.btn} ${styles.btnInk} ${styles.treatCta}`} href={href}>Đặt lịch cho liệu trình này</a>
          </CursorSpotlight>
        </div>
      </div>
    </section>
  );
}
