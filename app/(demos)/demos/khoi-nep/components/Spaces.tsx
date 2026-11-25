"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "./Photo";
import { EV, emit, scrollToId } from "./events";
import { CONCEPTS, type Concept } from "../data/content";
import type { ImageName } from "../data/images";
import s from "../brand.module.css";

export function Spaces() {
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<Concept | null>(null);

  useEffect(() => {
    if (active && dlg.current && !dlg.current.open) dlg.current.showModal();
  }, [active]);

  const close = () => dlg.current?.close();
  const onClose = () => {
    setActive(null);
    opener.current?.focus();
  };

  return (
    <section id="spaces" className={`${s.section} ${s.spaces}`} aria-labelledby="spaces-title">
      <div className={s.wrap}>
        <i className={s.rule} data-rule />
        <div className={s.secHead}>
          <p className={s.label}>02 / Bộ sưu tập không gian</p>
          <h2 id="spaces-title" className={s.h2}>
            Những không gian được hình dung.
          </h2>
          <p className={s.secLead}>
            Bốn hướng tiếp cận dành cho những nhu cầu sống khác nhau. Mỗi concept là một hướng nghiên cứu về tỷ lệ,
            công năng và vật liệu.
          </p>
        </div>
        <ul className={s.conceptGrid}>
          {CONCEPTS.map((c, i) => (
            <li key={c.id} className={s[`concept${i + 1}` as "concept1"]}>
              <figure className={s.conceptFig} style={{ aspectRatio: c.ratio }} data-veil>
                <Photo
                  name={c.photo as ImageName}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  alt={c.alt}
                />
                <span className={s.chip}>Concept</span>
              </figure>
              <div className={s.conceptMeta}>
                <span className={s.idx}>{c.id}</span>
                <h3 className={s.h3}>{c.name}</h3>
                <p className={s.metaLine}>
                  {c.type} · {c.area} · {c.style}
                </p>
                <button
                  type="button"
                  className={s.textBtn}
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setActive(c);
                  }}
                >
                  Xem ý tưởng <span aria-hidden="true">↗</span>
                  <span className={s.srOnly}> — {c.name}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dlg}
        className={s.dialog}
        aria-labelledby="dlg-title"
        onClose={onClose}
        onClick={(e) => {
          if (e.target === dlg.current) close();
        }}
      >
        {active && (
          <div className={s.dlgBody}>
            <figure className={s.dlgFig}>
              <Photo name={active.photo as ImageName} sizes="(min-width: 800px) 420px, 90vw" alt={active.alt} />
            </figure>
            <div className={s.dlgText}>
              <p className={s.label}>
                {active.id} · Concept
              </p>
              <h3 id="dlg-title" className={s.dlgTitle}>
                {active.name}
              </h3>
              <dl className={s.dl}>
                <div>
                  <dt>Loại</dt>
                  <dd>{active.type}</dd>
                </div>
                <div>
                  <dt>Diện tích</dt>
                  <dd>{active.area}</dd>
                </div>
                <div>
                  <dt>Phong cách</dt>
                  <dd>{active.style}</dd>
                </div>
              </dl>
              <p>{active.desc}</p>
              <p className={s.label}>Vật liệu đề xuất</p>
              <ul className={s.tagList}>
                {active.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <div className={s.dlgActions}>
                <button
                  type="button"
                  className={s.btnDark}
                  onClick={() => {
                    const preset = active.preset;
                    close();
                    emit(EV.preset, { presetId: preset });
                    scrollToId("board");
                  }}
                >
                  Áp dụng bảng vật liệu
                </button>
                <button type="button" className={s.btnLine} onClick={close}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
