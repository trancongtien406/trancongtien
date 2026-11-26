"use client";

import { useEffect, useId, useMemo, useState } from "react";
import s from "../brand.module.css";
import { COURSE_LABEL, DISHES, TASTE_LABEL, dishById, vnd, type Course, type Dish, type Taste } from "../data/menu";
import { compose } from "../lib/compose";

const STORE = "bv-saved-menu-v1";
const TASTES = Object.keys(TASTE_LABEL) as Taste[];
const ORDER: Course[] = ["khai-vi", "chinh", "rau", "no"];

type Saved = { guests: number; budget: number; tastes: Taste[]; noShellfish: boolean; ids: string[]; at: string };

export function Composer() {
  const uid = useId();
  const [guests, setGuests] = useState(4);
  const [budget, setBudget] = useState(2000000);
  const [tastes, setTastes] = useState<Taste[]>(["nuong"]);
  const [noShellfish, setNoShellfish] = useState(false);
  const [edited, setEdited] = useState<string[] | null>(null);
  const [addId, setAddId] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [hasSaved, setHasSaved] = useState(false);

  const auto = useMemo(() => compose({ guests, budget, tastes, noShellfish }), [guests, budget, tastes, noShellfish]);
  const picks: Dish[] = edited ? edited.map((id) => dishById(id)).filter((d): d is Dish => !!d) : auto.picks;
  const total = picks.reduce((a, d) => a + d.price, 0);
  const over = total > budget;

  useEffect(() => {
    try { setHasSaved(!!localStorage.getItem(STORE)); } catch { /* bỏ qua */ }
  }, []);

  const change = <T,>(set: (v: T) => void) => (v: T) => { set(v); setEdited(null); setSavedMsg(""); };
  const toggleTaste = (t: Taste) => change(setTastes)(tastes.includes(t) ? tastes.filter((x) => x !== t) : [...tastes, t]);

  const grouped = ORDER.map((c) => ({ c, items: picks.filter((d) => d.course === c) })).filter((g) => g.items.length);
  const addable = DISHES.filter((d) => !picks.some((p) => p.id === d.id) && !(noShellfish && d.shellfish));

  const save = () => {
    try {
      const data: Saved = { guests, budget, tastes, noShellfish, ids: picks.map((d) => d.id), at: new Date().toLocaleString("vi-VN") };
      localStorage.setItem(STORE, JSON.stringify(data));
      setHasSaved(true);
      setSavedMsg(`Đã lưu trên trình duyệt này lúc ${data.at}.`);
    } catch {
      setSavedMsg("Trình duyệt đang chặn lưu trữ, nên chưa lưu được. Bạn vẫn có thể in thực đơn.");
    }
  };
  const load = () => {
    try {
      const raw = localStorage.getItem(STORE);
      if (!raw) { setSavedMsg("Chưa có thực đơn nào được lưu."); return; }
      const d = JSON.parse(raw) as Saved;
      setGuests(d.guests); setBudget(d.budget); setTastes(d.tastes); setNoShellfish(d.noShellfish);
      setEdited(d.ids.filter((id) => dishById(id)));
      setSavedMsg(`Đã mở thực đơn lưu lúc ${d.at}.`);
    } catch { setSavedMsg("Không đọc được thực đơn đã lưu."); }
  };

  return (
    <section id="ghep-thuc-don" className={`${s.section} ${s.composer}`} aria-labelledby="cmp-h">
      <div className={s.wrap}>
        <div className={`${s.secHead} ${s.noPrint}`} data-bv="reveal">
          <span className={s.eyebrow}>Gợi ý theo ngân sách</span>
          <h2 id="cmp-h" className={`${s.display} ${s.h2}`}>Ngân sách bao nhiêu, <span className={s.italic}>bếp gợi ý bữa ăn</span></h2>
          <p className={s.lead}>Chọn số khách, ngân sách và khẩu vị, bếp gợi ý một bữa cân đối món chính, rau, khai vị. Bạn có thể bớt hoặc thêm món, rồi in hoặc lưu lại để mang theo khi đến nhà hàng.</p>
        </div>
        <div className={s.cmpGrid}>
          <div className={`${s.panel} ${s.noPrint}`} data-bv="reveal">
            <div className={s.fld}>
              <span className="lab" id={`${uid}-g`} style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bv-gold)", marginBottom: 12 }}>Số khách</span>
              <div className={s.stepper} role="group" aria-labelledby={`${uid}-g`}>
                <button type="button" aria-label="Giảm một khách" disabled={guests <= 1} onClick={() => change(setGuests)(Math.max(1, guests - 1))}>−</button>
                <output aria-live="polite" data-testid="guests">{guests} khách</output>
                <button type="button" aria-label="Tăng một khách" disabled={guests >= 12} onClick={() => change(setGuests)(Math.min(12, guests + 1))}>+</button>
              </div>
              <p className={s.hint}>Gợi ý khoảng {auto.mainsWanted} món chính cho {guests} khách. Tối đa 12 khách; nhóm lớn hơn xin liên hệ trước.</p>
            </div>
            <div className={s.fld}>
              <label className="lab" htmlFor={`${uid}-b`} style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--bv-gold)", marginBottom: 12 }}>Ngân sách cho cả bàn</label>
              <input id={`${uid}-b`} className={s.range} type="range" min={400000} max={6000000} step={100000} value={budget} onChange={(e) => change(setBudget)(Number(e.target.value))} aria-valuetext={vnd(budget)} data-testid="budget" />
              <div className={s.rangeOut}><span>Khoảng {vnd(Math.round(budget / guests / 1000) * 1000)} mỗi người</span><b>{vnd(budget)}</b></div>
            </div>
            <fieldset className={s.fld}>
              <legend>Khẩu vị (chọn nhiều)</legend>
              <div className={s.chips}>
                {TASTES.map((t) => (
                  <button key={t} type="button" className={s.chipBtn} aria-pressed={tastes.includes(t)} onClick={() => toggleTaste(t)}>{TASTE_LABEL[t]}</button>
                ))}
              </div>
            </fieldset>
            <div className={s.fld} style={{ marginBottom: 0 }}>
              <label className={s.check}>
                <input type="checkbox" checked={noShellfish} onChange={(e) => change(setNoShellfish)(e.target.checked)} />
                <span>Tránh tôm cua ghẹ, nghêu sò ốc (dị ứng vỏ cứng)</span>
              </label>
            </div>
          </div>

          <div className={`${s.paperZone}`} data-bv="reveal">
            <article className={s.sheet} aria-labelledby={`${uid}-t`} data-testid="sheet">
              <header className={s.sheetHead}>
                <h3 id={`${uid}-t`}>Thực đơn gợi ý cho {guests} khách</h3>
                <p translate="no">Bến Vị · Thực đơn gợi ý</p>
              </header>

              {auto.empty ? (
                <div className={s.empty} role="status" data-testid="empty"><b>Không còn món phù hợp</b>Bộ lọc hiện tại loại hết các món. Hãy bỏ bớt điều kiện.</div>
              ) : picks.length === 0 ? (
                <div className={s.empty} role="status" data-testid="empty"><b>Thực đơn đang trống</b>Bạn đã bớt hết món. Hãy thêm món từ danh sách bên dưới hoặc chỉnh lại số khách.</div>
              ) : (
                grouped.map((g) => (
                  <div key={g.c}>
                    <p className={s.courseTitle}>{COURSE_LABEL[g.c]}</p>
                    <ul>
                      {g.items.map((d) => (
                        <li key={d.id} className={s.row} data-testid="dish">
                          <div><h4>{d.name}</h4><small>{d.note}</small></div>
                          <span className={s.pr}>{vnd(d.price)}</span>
                          <button type="button" className={s.rmv} aria-label={`Bớt món ${d.name}`} onClick={() => { setEdited(picks.filter((x) => x.id !== d.id).map((x) => x.id)); setSavedMsg(""); }}>×</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}

              {auto.short && !edited && (
                <p className={s.alert} role="alert">Ngân sách chưa đủ cho {auto.mainsWanted} món chính. Bếp chỉ gợi ý được {picks.filter((d) => d.course === "chinh").length} món chính trong {vnd(budget)}. Hãy tăng ngân sách hoặc giảm số khách.</p>
              )}
              {over && edited && (
                <p className={s.alert} role="alert">Thực đơn đã chỉnh vượt ngân sách {vnd(total - budget)}.</p>
              )}

              <div className={s.totals} aria-live="polite">
                <div className={`${s.totalLine} ${s.small}`}><span>{picks.length} món</span><span>Mỗi người khoảng {vnd(Math.round(total / guests / 1000) * 1000)}</span></div>
                <div className={s.totalLine}><span>Tổng tạm tính</span><b data-testid="total">{vnd(total)}</b></div>
              </div>
              <p className={s.fine}>Giá tham khảo, thay đổi theo ngày, chưa gồm thuế và phí phục vụ. Đây là gợi ý, không phải đơn gọi món.</p>

              <div className={s.addRow}>
                <label className={s.srOnly} htmlFor={`${uid}-add`}>Thêm món vào thực đơn</label>
                <select id={`${uid}-add`} className={s.sel} value={addId} onChange={(e) => setAddId(e.target.value)}>
                  <option value="">Thêm một món…</option>
                  {addable.map((d) => <option key={d.id} value={d.id}>{d.name} · {vnd(d.price)}</option>)}
                </select>
                <button type="button" className={`${s.btn} ${s.btnInkLine}`} disabled={!addId} onClick={() => { setEdited([...picks.map((x) => x.id), addId]); setAddId(""); setSavedMsg(""); }}>Thêm món</button>
              </div>
              <div className={s.sheetActions}>
                <button type="button" className={`${s.btn} ${s.btnInk}`} onClick={() => window.print()} disabled={picks.length === 0}>In thực đơn</button>
                <button type="button" className={`${s.btn} ${s.btnInkLine}`} onClick={save} disabled={picks.length === 0}>Lưu thực đơn</button>
                {hasSaved && <button type="button" className={`${s.btn} ${s.btnInkLine}`} onClick={load}>Mở bản đã lưu</button>}
                {edited && <button type="button" className={`${s.btn} ${s.btnInkLine}`} onClick={() => setEdited(null)}>Gợi ý lại</button>}
              </div>
              <p className={s.saved} role="status" data-testid="saved">{savedMsg}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
