"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { MOODS, PACKAGES, vnd, type PackageId, type PaletteId, type StyleId } from "../data/content";
import { DEFAULT_STATE, getMood, getPkg, paletteColors, readStored, summaryLines, summaryText, withStyle, writeStored, type MoodState } from "../lib/moodboard";
import { Photo } from "./Photo";

export function Moodboard({ consultHref }: { consultHref: string }) {
  const [st, setSt] = useState<MoodState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const [dlg, setDlg] = useState(false);
  const [copy, setCopy] = useState<"" | "ok" | "fail">("");
  const rootRef = useRef<HTMLElement>(null);
  const dlgRef = useRef<HTMLDivElement>(null);
  const trig = useRef<HTMLElement | null>(null);

  useEffect(() => { setSt(readStored()); setReady(true); }, []);
  useEffect(() => { if (ready) writeStored(st); }, [st, ready]);

  const scrollHere = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onStyle = (e: Event) => { const s = (e as CustomEvent).detail?.style as StyleId; if (MOODS.some((m) => m.id === s)) { setSt((p) => withStyle(p, s)); scrollHere(); } };
    const onPkg = (e: Event) => { const id = (e as CustomEvent).detail?.id as PackageId; if (PACKAGES.some((p) => p.id === id)) { setSt((p) => ({ ...p, packageId: id })); scrollHere(); } };
    window.addEventListener("tm:style", onStyle); window.addEventListener("tm:package", onPkg);
    return () => { window.removeEventListener("tm:style", onStyle); window.removeEventListener("tm:package", onPkg); };
  }, [scrollHere]);

  const mood = getMood(st.styleId);
  const pkg = getPkg(st.packageId);
  const colors = paletteColors(mood, st.paletteId);
  const loc = mood.locations.find((l) => l.id === st.locationId);

  const openDlg = (e: React.MouseEvent<HTMLElement>) => { trig.current = e.currentTarget; setCopy(""); setDlg(true); };
  const closeDlg = useCallback(() => { setDlg(false); const t = trig.current; requestAnimationFrame(() => t?.focus()); }, []);
  useEffect(() => {
    if (!dlg) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    dlgRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [dlg]);

  const onDlgKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); closeDlg(); return; }
    if (e.key === "Tab" && dlgRef.current) {
      const f = Array.from(dlgRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], textarea"));
      const a = document.activeElement;
      if (e.shiftKey && (a === f[0] || a === dlgRef.current)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && a === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };
  const doCopy = async () => {
    try { await navigator.clipboard.writeText(summaryText(st)); setCopy("ok"); } catch { setCopy("fail"); }
  };

  return (
    <section className={styles.mood} id="moodboard" ref={rootRef} aria-labelledby="tm-mood-h" data-tm-mood>
      <div className={styles.wrap}>
        <header className={styles.sectionHead}>
          <p className={styles.eyebrow}>06 / Bản phác thảo của hai bạn</p>
          <h2 id="tm-mood-h" className={styles.h2}>Ngày cưới trong hình dung của hai bạn.</h2>
          <p className={styles.body}>Chọn những sắc thái mình yêu thích. Từ phong cách, bảng màu đến bối cảnh và gói chụp, từng lựa chọn ghép thành một bản moodboard nhỏ. Mọi thứ chỉ chạy trên trình duyệt của bạn.</p>
        </header>
        <div className={styles.moodGrid}>
          <form className={styles.moodForm} onSubmit={(e) => e.preventDefault()}>
            <fieldset className={styles.fs}>
              <legend>1. Phong cách của hai bạn</legend>
              <div className={styles.opts}>
                {MOODS.map((m) => (
                  <label key={m.id} className={styles.opt}><input type="radio" name="tm-style" value={m.id} checked={st.styleId === m.id} onChange={() => setSt((p) => withStyle(p, m.id))} /><span>{m.name}</span></label>
                ))}
              </div>
            </fieldset>
            <fieldset className={styles.fs}>
              <legend>2. Bảng màu</legend>
              <div className={styles.opts}>
                {([["signature", "Nguyên bản"], ["soft", "Dịu nhẹ"]] as [PaletteId, string][]).map(([id, name]) => (
                  <label key={id} className={`${styles.opt} ${styles.optPal}`}>
                    <input type="radio" name="tm-palette" value={id} checked={st.paletteId === id} onChange={() => setSt((p) => ({ ...p, paletteId: id }))} />
                    <span><span className={styles.miniSw} aria-hidden="true">{paletteColors(mood, id).map((c) => <i key={c} style={{ background: c }} />)}</span>{name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={styles.fs}>
              <legend>3. Bối cảnh mong muốn</legend>
              <div className={styles.opts}>
                {mood.locations.map((l) => (
                  <label key={l.id} className={styles.opt}><input type="radio" name="tm-loc" value={l.id} checked={st.locationId === l.id} onChange={() => setSt((p) => ({ ...p, locationId: l.id }))} /><span>{l.label}</span></label>
                ))}
                <label className={styles.opt}><input type="radio" name="tm-loc" value="none" checked={st.locationId === null} onChange={() => setSt((p) => ({ ...p, locationId: null }))} /><span>Chưa quyết định</span></label>
              </div>
            </fieldset>
            <fieldset className={styles.fs}>
              <legend>4. Gói chụp tham khảo (giá tham khảo)</legend>
              <div className={`${styles.opts} ${styles.optsCol}`}>
                {PACKAGES.map((p) => (
                  <label key={p.id} className={`${styles.opt} ${styles.optPkg}`}><input type="radio" name="tm-pkg" value={p.id} checked={st.packageId === p.id} onChange={() => setSt((s) => ({ ...s, packageId: p.id }))} /><span><b>{p.name}</b><em>{vnd(p.price)}</em></span></label>
                ))}
              </div>
            </fieldset>
            <div className={styles.moodActions}>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={openDlg} data-tm="preview-open">Xem tóm tắt bản phác thảo</button>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={() => setSt({ ...DEFAULT_STATE })} data-tm="reset">Đặt lại lựa chọn</button>
            </div>
            {!loc && <p className={styles.helper} role="status">Hai bạn có thể quyết định bối cảnh sau.</p>}
          </form>

          <div className={styles.board} data-tm="board" data-style={st.styleId}>
            <p className={styles.boardTop}>Tháng Mơ / Your wedding board</p>
            <div className={styles.boardCollage}>
              <div className={styles.boardPics}>
              <figure className={`${styles.print} ${styles.bMain}`} key={`m-${mood.id}`}>
                <div className={styles.frame} style={{ aspectRatio: "4 / 3" }}><Photo id={mood.main} sizes="(max-width: 900px) 90vw, 480px" /></div>
              </figure>
              <figure className={`${styles.print} ${styles.bDetail}`} key={`d-${mood.id}`}>
                <div className={styles.frame} style={{ aspectRatio: "1 / 1" }}><Photo id={mood.detail} sizes="(max-width: 900px) 40vw, 200px" size={600} /></div>
              </figure>
              </div>
              <ul className={styles.swatches} aria-label="Bảng màu đã chọn">
                {colors.map((c, i) => (
                  <li key={c + i}><span className={styles.sw} style={{ background: c }} aria-hidden="true" /><span className={styles.swName}>{st.paletteId === "soft" ? ["Màu nền", "Giấy", "Màu nhấn", "Mực nâu"][i] : mood.colorNames[i]}</span><span className={styles.swHex}>{c}</span></li>
                ))}
              </ul>
              <p className={`${styles.slip}`}>{loc ? loc.note : "Bối cảnh: chưa quyết định."}</p>
            </div>
            <h3 className={styles.boardTitle} data-tm="board-title">{mood.title}</h3>
            <p className={styles.small}>{mood.description}</p>
            <div className={styles.boardSum} data-tm="board-sum">
              <p className={styles.sumLine} data-tm="sum-pkg">{pkg.name} · {pkg.hours} · {pkg.photos} ảnh</p>
              <p className={styles.codeLine}>Tổng giá gói tham khảo</p>
              <p className={styles.price} data-tm="sum-price" aria-live="polite">{vnd(pkg.price)}</p>
              <p className={styles.helper}>Ảnh tham khảo stock. {pkg.album}. Chưa bao gồm các chi phí ngoài gói.</p>
            </div>
          </div>
        </div>
      </div>

      {dlg && (
        <div className={styles.modalWrap} onMouseDown={(e) => { if (e.target === e.currentTarget) closeDlg(); }}>
          <div ref={dlgRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="tm-prev-h" tabIndex={-1} onKeyDown={onDlgKey} data-tm="preview-dialog">
            <p className={styles.boardTop}>Tháng Mơ / Tóm tắt bản phác thảo</p>
            <h3 id="tm-prev-h" className={styles.h3}>Bản phác thảo của hai bạn</h3>
            <dl className={styles.sumList}>
              {summaryLines(st).map((l) => <div key={l.label}><dt>{l.label}</dt><dd>{l.value}</dd></div>)}
            </dl>
            <ul className={`${styles.swatches} ${styles.swatchesRow}`} aria-label="Bảng màu">
              {colors.map((c, i) => <li key={c + i}><span className={styles.sw} style={{ background: c }} aria-hidden="true" /><span className={styles.swHex}>{c}</span></li>)}
            </ul>
            <p className={styles.honest}>Đây là bản tóm tắt tạo ngay trên trình duyệt, không phải báo giá hay đặt lịch. Công cụ không thu họ tên, số điện thoại hay email và không gửi gì đi.</p>
            <p className={styles.copyStatus} role="status" aria-live="polite">{copy === "ok" ? "Đã sao chép bản phác thảo." : copy === "fail" ? "Chưa thể sao chép. Hai bạn có thể chọn và sao chép nội dung bên dưới." : ""}</p>
            {copy === "fail" && <textarea className={styles.copyArea} readOnly value={summaryText(st)} rows={8} aria-label="Nội dung bản phác thảo" onFocus={(e) => e.currentTarget.select()} />}
            <div className={styles.modalActions}>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={doCopy}>Sao chép bản phác thảo</button>
              <a className={`${styles.btn} ${styles.btnGhost}`} href={consultHref} data-tm-consult>Trao đổi về buổi chụp</a>
              <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={closeDlg}>Chỉnh sửa lựa chọn</button>
              <button type="button" className={styles.textLink} onClick={closeDlg}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
