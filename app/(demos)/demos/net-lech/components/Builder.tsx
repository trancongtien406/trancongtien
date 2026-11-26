"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../brand.module.css";
import {
  INITIAL_BUILDER, LENGTHS, SERVICES, STORAGE_KEY, STYLISTS, buildRequestText, formatDuration, minutesOf, parseBuilder, priceOf, quote, vnd,
  type BuilderState, type HairLength, type ServiceId, type StylistId,
} from "../data/builder";
import { LOOKS } from "../data/lookbook";

const PERIODS = ["Chưa xác định", "Sáng", "Chiều", "Tối"];

export function Builder({ consultHref }: { consultHref: string }) {
  const [st, setSt] = useState<BuilderState>(INITIAL_BUILDER);
  const [ready, setReady] = useState(false);
  const [pvOpen, setPvOpen] = useState(false);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState(PERIODS[0]);
  const [today, setToday] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [copiedRaw, setCopiedRaw] = useState<{ key: string; status: "ok" | "fail" } | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  // hydrate (client only) + ngày hôm nay theo giờ máy
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? parseBuilder(JSON.parse(raw)) : null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate từ localStorage chỉ có thể chạy ở client sau mount
      if (parsed) setSt(parsed);
    } catch { /* localStorage bị chặn hoặc JSON lỗi: dùng mặc định */ }
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, state: st })); } catch { /* bỏ qua */ }
  }, [st, ready]);

  // sự kiện từ Lookbook / Dịch vụ / Stylist
  useEffect(() => {
    const addSvc = (ids: string[]) => setSt((c) => ({ ...c, selected: Array.from(new Set([...c.selected, ...(ids.filter((i) => SERVICES.some((s) => s.id === i)) as ServiceId[])])) }));
    const onAdd = (e: Event) => { const d = (e as CustomEvent<{ id: string }>).detail; if (d?.id) addSvc([d.id]); };
    const onSty = (e: Event) => { const d = (e as CustomEvent<{ id: string }>).detail; if (d && STYLISTS.some((s) => s.id === d.id)) setSt((c) => ({ ...c, stylist: d.id as StylistId })); };
    const onInsp = (e: Event) => {
      const d = (e as CustomEvent<{ lookId: string; services: string[] }>).detail;
      if (!d) return;
      addSvc(d.services ?? []);
      setSt((c) => ({ ...c, inspiration: LOOKS.some((l) => l.id === d.lookId) ? d.lookId : c.inspiration }));
    };
    window.addEventListener("nl:add", onAdd); window.addEventListener("nl:stylist", onSty); window.addEventListener("nl:inspire", onInsp);
    return () => { window.removeEventListener("nl:add", onAdd); window.removeEventListener("nl:stylist", onSty); window.removeEventListener("nl:inspire", onInsp); };
  }, []);

  const q = useMemo(() => quote(st), [st]);
  const look = LOOKS.find((l) => l.id === st.inspiration) ?? null;
  const canPreview = q.lines.length > 0 && !q.conflict;
  const toggle = (id: ServiceId) => setSt((c) => ({ ...c, selected: c.selected.includes(id) ? c.selected.filter((x) => x !== id) : [...c.selected, id] }));
  const reset = () => { setSt(INITIAL_BUILDER); try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* bỏ qua */ } };

  // dialog
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (pvOpen && !d.open) { d.showModal(); document.documentElement.style.overflow = "hidden"; }
    if (!pvOpen && d.open) d.close();
  }, [pvOpen]);
  const closePv = () => { setPvOpen(false); document.documentElement.style.overflow = ""; setTimeout(() => openBtn.current?.focus(), 0); };
  const openPv = () => { if (!canPreview) return; setDateErr(""); setCopiedRaw(null); setPvOpen(true); };

  const text = buildRequestText(st, q, look ? `${look.id} ${look.name}` : null, date, period);
  // kết quả sao chép chỉ hợp lệ với đúng nội dung đã sao chép: đổi lựa chọn thì bản cũ mất hiệu lực
  const copied = copiedRaw && copiedRaw.key === text ? copiedRaw.status : "";
  const copy = async () => {
    if (date && today && date < today) { setDateErr("Ngày mong muốn không được ở quá khứ."); return; }
    setDateErr("");
    try { await navigator.clipboard.writeText(text); setCopiedRaw({ key: text, status: "ok" }); } catch { setCopiedRaw({ key: text, status: "fail" }); }
  };

  return (
    <div className={styles.bld} data-nl="builder">
      <div className={styles.bldCol}>
        <fieldset className={styles.step} data-nl="step">
          <legend><em>01</em> Chọn dịch vụ</legend>
          {SERVICES.map((s) => {
            const line = q.lines.find((l) => l.id === s.id);
            return (
              <label key={s.id} className={styles.opt}>
                <input type="checkbox" checked={st.selected.includes(s.id)} onChange={() => toggle(s.id)} data-svc={s.id} />
                <span className={styles.optBox}>
                  <span className={styles.optMark} aria-hidden="true" />
                  <span><span className={styles.optTitle}>{s.name}</span><span className={styles.optSub}>{s.tag} · khoảng {minutesOf(s, st.length)}&nbsp;phút</span></span>
                  <span className={styles.optPrice}>{vnd(line ? line.price : priceOf(s, st.length, st.stylist))}</span>
                </span>
              </label>
            );
          })}
        </fieldset>
        <fieldset className={styles.step} data-nl="step">
          <legend><em>02</em> Độ dài tóc</legend>
          <div className={styles.seg}>
            {LENGTHS.map((l) => (
              <label key={l.id} className={styles.opt}>
                <input type="radio" name="nl-length" checked={st.length === l.id} onChange={() => setSt((c) => ({ ...c, length: l.id as HairLength }))} />
                <span className={styles.optBox}><span className={styles.optTitle}>{l.label}</span><span className={styles.optSub}>{l.hint}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={styles.step} data-nl="step">
          <legend><em>03</em> Stylist</legend>
          <div className={styles.stGrid}>
            {STYLISTS.map((s) => (
              <label key={s.id} className={styles.opt}>
                <input type="radio" name="nl-stylist" checked={st.stylist === s.id} onChange={() => setSt((c) => ({ ...c, stylist: s.id }))} />
                <span className={styles.optBox} style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}>
                  <span><span className={styles.optTitle}>{s.alias} · {s.level}</span><span className={styles.optSub}>{s.role}</span></span>
                  <span className={styles.optPrice}>{s.multiplier === 1 ? "Giá gốc" : `+${Math.round((s.multiplier - 1) * 100)}%`}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className={styles.sumPanel} aria-labelledby="nl-sum-h" data-nl="summary">
        <p className={styles.eyebrow}>Your look / tóm tắt</p>
        <h3 id="nl-sum-h" className={styles.h3}>Diện mạo của bạn</h3>
        {look && (
          <p className={styles.inspir}><span>Cảm hứng: {look.id} {look.name}</span>
            <button type="button" className={styles.linkBtn} onClick={() => setSt((c) => ({ ...c, inspiration: null }))}>Bỏ</button></p>
        )}
        <div aria-live="polite">
          {q.lines.length === 0 ? (
            <p className={styles.sumEmpty} data-nl="sum-empty">Chưa chọn dịch vụ nào. Hãy chọn ít nhất một dịch vụ ở bên trái để xem giá tham khảo và thời gian.</p>
          ) : (
            <ul className={styles.sumLines}>
              {q.lines.map((l) => (<li key={l.id}><span>{l.name}</span><span>{vnd(l.price)}</span></li>))}
            </ul>
          )}
        </div>
        <dl className={styles.sumMeta}>
          <div><dt>Độ dài tóc</dt><dd>{LENGTHS.find((l) => l.id === st.length)?.label}</dd></div>
          <div><dt>Stylist</dt><dd>{STYLISTS.find((s) => s.id === st.stylist)?.alias}</dd></div>
          <div><dt>Thời gian dự kiến</dt><dd data-nl="sum-time">{formatDuration(q.minutes)}</dd></div>
        </dl>
        <div>
          <p className={styles.totalLbl}>Tổng giá tham khảo</p>
          <p className={styles.total} data-nl="sum-total" aria-live="polite">{vnd(q.total)}</p>
        </div>
        {q.conflict && <p className={styles.warn} role="alert" data-nl="sum-warn">Uốn, duỗi và nhuộm hoặc tẩy trong cùng một buổi phụ thuộc tình trạng tóc, nên bản tóm tắt chưa thể tạo khi chọn các dịch vụ này cùng nhau. Giá tham khảo vẫn được tính. Hãy bỏ bớt một dịch vụ để tiếp tục.</p>}
        <div className={styles.sumBtns}>
          <button ref={openBtn} type="button" className={`${styles.btn} ${styles.btnLime}`} onClick={openPv} disabled={!canPreview} data-nl="open-preview">Tóm tắt lịch hẹn</button>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={reset}>Đặt lại lựa chọn</button>
        </div>
        <p className={styles.note}>Giá tham khảo, chi phí cuối cùng được xác nhận khi tư vấn. Công cụ này chỉ tạo bản tóm tắt ngay trên trình duyệt: không kiểm tra lịch trống, không thu thập thông tin liên hệ và không thanh toán.</p>
      </aside>

      <dialog ref={dlg} className={`${styles.dlg} ${styles.dlgNarrow}`} aria-labelledby="nl-pv-title"
        onClose={() => { if (pvOpen) closePv(); }} onCancel={(e) => { e.preventDefault(); closePv(); }}
        onClick={(e) => { if (e.target === dlg.current) closePv(); }}>
        <div className={styles.dlgBar}>
          <span className={styles.eyebrow}>Tóm tắt lịch hẹn · chưa xác nhận</span>
          <button type="button" className={styles.dlgClose} onClick={closePv}>Đóng</button>
        </div>
        <div className={styles.dlgBody}>
          <h3 id="nl-pv-title" className={styles.h2} style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>Bản xem trước lịch hẹn</h3>
          <div className={styles.pvRows} data-nl="pv-rows">
            {look && <div className={styles.pvRow}><span>Kiểu cảm hứng</span><b>{look.id} {look.name}</b></div>}
            {q.lines.map((l) => <div key={l.id} className={styles.pvRow}><span>{l.name}</span><b>{vnd(l.price)}</b></div>)}
            <div className={styles.pvRow}><span>Độ dài tóc</span><b>{LENGTHS.find((l) => l.id === st.length)?.label}</b></div>
            <div className={styles.pvRow}><span>Stylist</span><b>{STYLISTS.find((s) => s.id === st.stylist)?.alias}</b></div>
            <div className={styles.pvRow}><span>Thời gian</span><b>{formatDuration(q.minutes)}</b></div>
            <div className={styles.pvRow}><span>Tổng tham khảo</span><b data-nl="pv-total">{vnd(q.total)}</b></div>
          </div>
          <div className={styles.field}>
            <label htmlFor="nl-date">Ngày mong muốn (tuỳ chọn)</label>
            <input id="nl-date" type="date" min={today || undefined} value={date} onChange={(e) => { setDate(e.target.value); setDateErr(""); setCopiedRaw(null); }} aria-invalid={dateErr ? true : undefined} aria-describedby={dateErr ? "nl-date-err" : "nl-date-help"} />
            {dateErr && <p id="nl-date-err" className={styles.fieldErr}>{dateErr}</p>}
          </div>
          <div className={styles.field}>
            <label htmlFor="nl-period">Buổi mong muốn</label>
            <select id="nl-period" value={period} onChange={(e) => { setPeriod(e.target.value); setCopiedRaw(null); }}>
              {PERIODS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <p id="nl-date-help" className={styles.note}>Ngày và buổi chỉ là mong muốn của bạn để đưa vào bản tóm tắt. Lịch cụ thể sẽ được xác nhận khi tư vấn.</p>
          <button type="button" className={styles.btn} onClick={copy} data-nl="copy">Sao chép tóm tắt</button>
          <div aria-live="polite">
            {copied === "ok" && <p className={styles.okMsg} data-nl="copy-ok">Đã sao chép bản tóm tắt. Chưa có thông tin nào được gửi đi.</p>}
            {copied === "fail" && (
              <div className={styles.field} data-nl="copy-fail">
                <label htmlFor="nl-copy-text">Không sao chép tự động được. Hãy chọn và sao chép thủ công:</label>
                <textarea id="nl-copy-text" className={styles.copyBox} readOnly value={text} onFocus={(e) => e.currentTarget.select()} />
              </div>
            )}
          </div>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={closePv}>Quay lại chỉnh sửa</button>
          <a className={styles.textLink} href={consultHref} data-nl="pv-consult">Gửi yêu cầu tư vấn ↗</a>
        </div>
      </dialog>
    </div>
  );
}
