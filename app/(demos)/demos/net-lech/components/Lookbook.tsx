"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ImageHoverDistort } from "@/features/showroom/effects";
import styles from "../brand.module.css";
import { EMPTY_FILTERS, LABELS, LOOKS, filterLooks, type LbFilters, type Look } from "../data/lookbook";
import { SERVICES } from "../data/builder";

const BASE = "/images/demos/net-lech";
type Group = keyof LbFilters;
const GROUPS: { key: Group; title: string; options: string[] }[] = [
  { key: "length", title: "Độ dài", options: Object.keys(LABELS.length) },
  { key: "tech", title: "Loại tạo kiểu", options: Object.keys(LABELS.tech) },
  { key: "style", title: "Phong cách", options: Object.keys(LABELS.style) },
  { key: "care", title: "Mức chăm sóc", options: Object.keys(LABELS.care) },
];

function labelOf(g: Group, v: string) {
  return (LABELS[g] as Record<string, string>)[v];
}

export function Lookbook() {
  const [f, setF] = useState<LbFilters>(EMPTY_FILTERS);
  const [open, setOpen] = useState(false); // bộ lọc trên mobile
  const [active, setActive] = useState<Look | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const lastBtn = useRef<HTMLElement | null>(null);

  const shown = useMemo(() => filterLooks(LOOKS, f), [f]);
  const nFilters = f.length.length + f.tech.length + f.style.length + f.care.length;

  const toggle = (g: Group, v: string) =>
    setF((cur) => {
      const arr = cur[g] as string[];
      return { ...cur, [g]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] } as LbFilters;
    });

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (active && !d.open) { d.showModal(); document.documentElement.style.overflow = "hidden"; }
    if (!active && d.open) d.close();
  }, [active]);

  const close = () => {
    setActive(null);
    document.documentElement.style.overflow = "";
    const b = lastBtn.current; if (b) setTimeout(() => b.focus(), 0);
  };

  const inspire = (look: Look) => {
    setActive(null);
    document.documentElement.style.overflow = "";
    window.dispatchEvent(new CustomEvent("nl:inspire", { detail: { lookId: look.id, services: look.services } }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const h = document.getElementById("nl-bld-h");
    h?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setTimeout(() => h?.focus({ preventScroll: true }), reduce ? 0 : 500);
  };

  return (
    <div className={styles.lbLayout} data-nl="lb-layout">
      <aside className={styles.filters} data-open={open ? "1" : "0"} aria-label="Bộ lọc lookbook">
        <button type="button" className={styles.filterToggle} aria-expanded={open} aria-controls="nl-filters" onClick={() => setOpen((v) => !v)}>
          <span>Tìm phong cách{nFilters ? ` (${nFilters})` : ""}</span><span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <div className={styles.filterTitle}>
          <h3 className={styles.eyebrow}>Tìm phong cách</h3>
          <button type="button" className={styles.linkBtn} onClick={() => setF(EMPTY_FILTERS)} disabled={nFilters === 0} style={nFilters === 0 ? { opacity: 0.4, cursor: "default" } : undefined}>Xóa bộ lọc</button>
        </div>
        <div className={styles.filtersBody} id="nl-filters">
          {GROUPS.map((g) => (
            <fieldset key={g.key} className={styles.fGroup}>
              <legend>{g.title}</legend>
              <div className={styles.fOpts}>
                {g.options.map((o) => (
                  <label key={o} className={styles.fOpt}>
                    <input type="checkbox" checked={(f[g.key] as string[]).includes(o)} onChange={() => toggle(g.key, o)} />
                    <span>{labelOf(g.key, o)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button type="button" className={`${styles.linkBtn} ${styles.mobileReset}`} onClick={() => setF(EMPTY_FILTERS)}>Xóa bộ lọc</button>
        </div>
      </aside>

      <div>
        <p className={styles.count} aria-live="polite" role="status" data-nl="lb-count">
          <span>Hiển thị {shown.length}/{LOOKS.length} kiểu tóc</span>
          <span aria-hidden="true">Style index</span>
        </p>
        {shown.length === 0 ? (
          <div className={styles.empty} data-nl="lb-empty">
            <p className={styles.h3}>Chưa có kiểu nào khớp.</p>
            <p className={styles.small}>Thử bỏ bớt một nhóm lọc để thấy nhiều kiểu hơn.</p>
            <button type="button" className={`${styles.btn} ${styles.btnLime}`} onClick={() => setF(EMPTY_FILTERS)}>Xóa bộ lọc</button>
          </div>
        ) : (
          <ul className={styles.lbGrid} data-nl="lb-grid">
            {shown.map((l) => (
              <li key={l.id}>
                <button type="button" className={styles.lbCard} data-nl="lb-card" data-look={l.id}
                  aria-label={`Xem kiểu tóc ${l.name}`}
                  onClick={(e) => { lastBtn.current = e.currentTarget; setActive(l); }}>
                  <div className={styles.lbFig} style={{ aspectRatio: l.image.ratio }}>
                    <span className={styles.lbTag}>{l.id}</span>
                    <ImageHoverDistort className={styles.lbDist} strength={26} frequency={0.014}><Image src={`${BASE}/${l.image.file}-600.webp`} alt={l.image.alt} fill sizes="(max-width: 860px) 46vw, 24vw" loading="lazy" style={{ objectFit: "cover", objectPosition: l.image.pos }} /></ImageHoverDistort>
                  </div>
                  <div className={styles.lbCap}>
                    <span className={styles.lbName}>{l.name}<span className={styles.lbArrow} aria-hidden="true">↗</span></span>
                    <span className={styles.lbMeta}>{LABELS.length[l.length]} · {l.tech.map((t) => LABELS.tech[t]).join(", ")} · {LABELS.style[l.style]}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className={`${styles.note} ${styles.lbNote}`}>Mỗi kiểu là mô tả phong cách để mang đến buổi tư vấn. Kết quả thực tế phụ thuộc chất tóc, nền tóc và kỹ thuật thực hiện.</p>
      </div>

      <dialog ref={dlg} className={styles.dlg} aria-labelledby="nl-dlg-title" onClose={() => { if (active) close(); }} onCancel={(e) => { e.preventDefault(); close(); }}
        onClick={(e) => { if (e.target === dlg.current) close(); }}>
        {active && (
          <>
            <div className={styles.dlgBar}>
              <span className={styles.eyebrow}>{active.id} / Lookbook</span>
              <button type="button" className={styles.dlgClose} onClick={close}>Đóng</button>
            </div>
            <div className={styles.dlgGrid}>
              <div className={styles.dlgImg}>
                <Image src={`${BASE}/${active.image.file}-1200.webp`} alt={active.image.alt} fill sizes="(max-width: 700px) 100vw, 400px" style={{ objectFit: "cover", objectPosition: active.image.pos }} />
              </div>
              <div className={styles.dlgBody}>
                <h3 id="nl-dlg-title" className={styles.h2} style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)" }}>{active.name}</h3>
                <ul className={styles.tags}>
                  <li>{LABELS.length[active.length]}</li>
                  {active.tech.map((t) => <li key={t}>{LABELS.tech[t]}</li>)}
                  <li>{LABELS.style[active.style]}</li>
                  <li>Chăm sóc: {LABELS.care[active.care]}</li>
                </ul>
                <p>{active.desc}</p>
                <dl>
                  <div><dt>Lưu ý chăm sóc</dt><dd>{active.careNote}</dd></div>
                  <div><dt>Dịch vụ gợi ý</dt><dd>{active.services.map((id) => SERVICES.find((s) => s.id === id)?.name).join(", ")}</dd></div>
                </dl>
                <button type="button" className={styles.btn} onClick={() => inspire(active)}>Dùng kiểu này làm cảm hứng</button>
                <p className={styles.note}>Kiểu tham khảo; stylist tư vấn mức phù hợp với tóc của bạn.</p>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
