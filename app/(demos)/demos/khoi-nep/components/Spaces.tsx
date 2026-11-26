"use client";

import { useEffect, useRef, useState } from "react";
import { PinnedHorizontalScroll } from "@/features/showroom/effects";
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
          <p className={s.label}>03 / Theo loại công trình</p>
          <h2 id="spaces-title" className={s.h2}>
            Bốn loại công trình chúng tôi nhận.
          </h2>
          <p className={s.secLead}>
            Cuộn ngang để xem từng loại: diện tích thường gặp, hạng mục hay làm, thời gian và mức chi phí tham khảo. Đây là hồ sơ theo loại công trình, không phải danh sách khách hàng.
          </p>
        </div>
      </div>
      <PinnedHorizontalScroll className={s.spPin} trackClassName={s.spTrack} minWidth={1000} mobile="scroll" label="Bốn loại công trình, cuộn ngang">
        {CONCEPTS.map((c) => (
          <article key={c.id} className={s.spPanel} data-sp-panel>
            <figure className={s.spFig} data-veil>
              <Photo name={c.photo as ImageName} sizes="(min-width: 1000px) 40vw, 86vw" alt={c.alt} />
              <span className={s.chip}>{c.id}</span>
            </figure>
            <div className={s.spBody}>
              <p className={s.label}>{c.type}</p>
              <h3 className={s.spTitle}>{c.name}</h3>
              <p className={s.metaLine}>{c.area} · {c.style}</p>
              <p className={s.spDesc}>{c.desc}</p>
              <ul className={s.spScope} aria-label="Hạng mục thường làm">
                {c.scope.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <dl className={s.spFacts}>
                <div><dt>Thời gian</dt><dd>{c.time}</dd></div>
                <div><dt>Chi phí</dt><dd>{c.budget}</dd></div>
              </dl>
              <button
                type="button"
                className={s.textBtn}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(c);
                }}
              >
                Xem hồ sơ <span aria-hidden="true">↗</span>
                <span className={s.srOnly}> — {c.name}</span>
              </button>
            </div>
          </article>
        ))}
      </PinnedHorizontalScroll>
      <div className={s.wrap}>
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
                {active.id} · Loại công trình
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
                  <dt>Diện tích thường gặp</dt>
                  <dd>{active.area}</dd>
                </div>
                <div>
                  <dt>Phong cách</dt>
                  <dd>{active.style}</dd>
                </div>
              </dl>
              <p>{active.desc}</p>
              <p className={s.label}>Vật liệu hay dùng</p>
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
