"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { RITUALS } from "../data/rituals";
import { formatVnd } from "../lib/format";
import { Close } from "./Icons";
import { useMienAn } from "./Provider";
import styles from "../brand.module.css";

export function RitualGrid() {
  const { openDetail } = useMienAn();
  return (
    <section id="rituals" className={`${styles.section} ${styles.linen}`} aria-labelledby="rituals-title">
      <div className={styles.container}>
        <div className={styles.ritualHead} data-reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p className={styles.eyebrow}>Signature rituals</p>
            <h2 id="rituals-title" className={styles.h2}>
              Những nghi thức <em>dành cho bạn.</em>
            </h2>
          </div>
          <div>
            <p className={styles.lead}>
              Mỗi cơ thể có một nhịp điệu riêng. Khám phá những nghi thức được xây dựng quanh cảm giác thư giãn, sự nhẹ nhàng và thời gian chăm sóc bản thân.
            </p>
            <p className={styles.priceNote}>Giá tham khảo, có thể điều chỉnh theo thời điểm.</p>
          </div>
        </div>
        <ul className={styles.ritualGrid}>
          {RITUALS.map((r, i) => (
            <li key={r.id} className={styles.ritualCard} data-reveal>
              <div className={styles.ritualImg}>
                <Image src={`${r.image}-1200.webp`} alt={r.imageAlt} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw" loading={i < 2 ? "eager" : "lazy"} />
              </div>
              <div className={styles.ritualBody}>
                <span className={styles.ritualId}>{r.id}</span>
                <h3 className={styles.h3}>{r.name}</h3>
                <p className={styles.ritualSub}>{r.subtitle}</p>
                <p className={styles.ritualMeta}>
                  {r.durationMinutes}&nbsp;phút · {formatVnd(r.priceVnd)}
                </p>
                <button type="button" className={styles.link} onClick={() => openDetail(r.id)} aria-label={`Xem nghi thức ${r.name}`}>
                  Xem nghi thức <span className={styles.arrow} aria-hidden="true">↗</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <RitualDialog />
    </section>
  );
}

function RitualDialog() {
  const { detailId, closeDetail, choose } = useMienAn();
  const ref = useRef<HTMLDialogElement>(null);
  const ritual = RITUALS.find((r) => r.id === detailId) ?? null;
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (ritual && !d.open) {
      last.current = document.activeElement as HTMLElement | null;
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!ritual && d.open) d.close();
  }, [ritual]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="ritual-dlg-title"
      onClose={() => {
        document.documentElement.style.overflow = "";
        closeDetail();
        last.current?.focus?.();
      }}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      {ritual && (
        <div className={styles.dialogGrid}>
          <button type="button" className={styles.dialogClose} onClick={() => ref.current?.close()} aria-label="Đóng">
            <Close />
          </button>
          <div className={styles.dialogImg}>
            <Image src={`${ritual.image}-1200.webp`} alt={ritual.imageAlt} fill sizes="(min-width: 800px) 430px, 92vw" />
          </div>
          <div className={styles.dialogBody}>
            <p className={styles.ritualId}>
              {ritual.id} · {ritual.subtitle}
            </p>
            <h3 id="ritual-dlg-title" className={styles.h2} style={{ fontSize: "clamp(36px,4vw,52px)" }}>
              {ritual.name}
            </h3>
            <p>{ritual.description}</p>
            <div className={styles.stepsBar} aria-hidden="true">
              {ritual.steps.map((s) => (
                <i key={s.label} style={{ flex: s.minutes }} />
              ))}
            </div>
            <dl className={styles.facts}>
              <div><dt>Thời lượng</dt><dd>{ritual.durationMinutes}&nbsp;phút</dd></div>
              <div><dt>Giá tham khảo</dt><dd>{formatVnd(ritual.priceVnd)}</dd></div>
              <div><dt>Áp lực</dt><dd>{ritual.pressureLabel}</dd></div>
              <div><dt>Trình tự</dt><dd>{ritual.steps.map((s) => `${s.minutes} phút ${s.label.toLowerCase()}`).join(" · ")}</dd></div>
              <div><dt>Phù hợp với</dt><dd>{ritual.suitableFor}</dd></div>
              {ritual.notes.length > 0 && <div><dt>Lưu ý</dt><dd>{ritual.notes.join(" ")}</dd></div>}
            </dl>
            <div className={styles.dialogActions}>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => choose(ritual.id)}>
                Chọn nghi thức này
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => ref.current?.close()}>
                Quay lại khám phá
              </button>
            </div>
            <p className={styles.disclaimer}>Thông tin chỉ mang tính giới thiệu, không thay thế tư vấn sức khoẻ hoặc chuyên môn.</p>
          </div>
        </div>
      )}
    </dialog>
  );
}
