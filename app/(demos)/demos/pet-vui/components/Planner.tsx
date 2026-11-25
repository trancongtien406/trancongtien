"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { buildConsultHref } from "@/features/showroom/consultation";
import { BounceWords } from "./BounceWords";
import { WagButton } from "./WagButton";
import { COATS, CONDS, DEFAULT_SELECTION, GOALS, WEIGHTS, buildPlan, fmtTime, fmtVnd, missingFields, summaryText, type CoatId, type CondId, type GoalId, type Selection, type Species } from "../data/care";
import s from "../brand.module.css";

const KEY = "pet-vui:planner:v1";

export function Planner() {
  const [sel, setSel] = useState<Selection>(DEFAULT_SELECTION);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState<"" | "ok" | "err">("");
  const uid = useId();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw) as Selection;
        if (p && (p.species === "dog" || p.species === "cat" || p.species === null)) setSel({ ...DEFAULT_SELECTION, ...p });
      }
    } catch { /* bỏ qua */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(sel)); } catch { /* bỏ qua */ }
  }, [sel, ready]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const plan = useMemo(() => buildPlan(sel), [sel]);
  const missing = missingFields(sel);
  const setSpecies = (sp: Species) => setSel((p) => ({ ...p, species: sp, weight: p.species === sp ? p.weight : null }));
  const toggle = (id: CondId) => setSel((p) => ({ ...p, conds: p.conds.includes(id) ? p.conds.filter((c) => c !== id) : [...p.conds, id] }));
  const reset = () => { setSel(DEFAULT_SELECTION); setCopied(""); };
  const copy = async () => {
    if (!plan) return;
    try { await navigator.clipboard.writeText(summaryText(sel, plan)); setCopied("ok"); } catch { setCopied("err"); }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(""), 2600);
  };
  const weights = sel.species ? WEIGHTS[sel.species] : [];
  const g = (n: string) => `${uid}-${n}`;

  return (
    <section id="chon-goi" className={s.planner} aria-labelledby="planner-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipInk}>Công cụ chọn gói</p>
          <BounceWords as="h2" className={`${s.display} ${s.h2}`} text="Bé nhà bạn hợp *gói nào?*" />
          <p className={s.lead}>Chọn bốn điều về bé, bên phải hiện ngay các bước chăm sóc, thời gian dự kiến và giá tham khảo. Công cụ chỉ lên kế hoạch chăm sóc lông, không chẩn đoán sức khoẻ.</p>
        </header>
        <span id="planner-h" className={s.srOnly}>Chọn gói chăm sóc cho bé</span>
        <div className={s.plannerGrid}>
          <form className={s.plannerForm} onSubmit={(e) => e.preventDefault()} aria-label="Thông tin của bé">
            <fieldset className={s.fs}>
              <legend><b>1</b> Bé là</legend>
              <div className={s.chipRow}>
                {(["dog", "cat"] as Species[]).map((sp) => (
                  <label key={sp} className={s.opt}>
                    <input type="radio" name={g("sp")} checked={sel.species === sp} onChange={() => setSpecies(sp)} />
                    <span className={s.optBody}>{sp === "dog" ? "Chó" : "Mèo"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.fs} disabled={!sel.species} aria-describedby={!sel.species ? g("wh") : undefined}>
              <legend><b>2</b> Cân nặng</legend>
              {!sel.species && <p id={g("wh")} className={s.hint}>Chọn chó hoặc mèo trước để hiện các mức cân nặng.</p>}
              <div className={s.chipRow}>
                {weights.map((w) => (
                  <label key={w.id} className={s.opt}>
                    <input type="radio" name={g("w")} checked={sel.weight === w.id} onChange={() => setSel((p) => ({ ...p, weight: w.id }))} />
                    <span className={s.optBody}>{w.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.fs}>
              <legend><b>3</b> Độ dài lông</legend>
              <div className={s.chipRow}>
                {COATS.map((c) => (
                  <label key={c.id} className={s.opt}>
                    <input type="radio" name={g("c")} checked={sel.coat === c.id} onChange={() => setSel((p) => ({ ...p, coat: c.id as CoatId }))} />
                    <span className={s.optBody}>{c.label}<small>{c.hint}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.fs}>
              <legend><b>4</b> Tình trạng lông <em>(chọn nếu có)</em></legend>
              <div className={s.chipRow}>
                {CONDS.map((c) => (
                  <label key={c.id} className={s.opt}>
                    <input type="checkbox" checked={sel.conds.includes(c.id)} onChange={() => toggle(c.id)} />
                    <span className={s.optBody}>{c.label}<small>{c.hint}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className={s.fs}>
              <legend><b>5</b> Bé muốn</legend>
              <div className={s.chipRow}>
                {GOALS.map((x) => (
                  <label key={x.id} className={s.opt}>
                    <input type="radio" name={g("g")} checked={sel.goal === x.id} onChange={() => setSel((p) => ({ ...p, goal: x.id as GoalId }))} />
                    <span className={s.optBody}>{x.label}<small>{x.hint}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className={`${s.skin} ${sel.skin ? s.skinOn : ""}`}>
              <label className={s.optCheck}>
                <input type="checkbox" checked={sel.skin} onChange={(e) => setSel((p) => ({ ...p, skin: e.target.checked }))} />
                <span>Bé có vết đỏ, ngứa nhiều, rụng từng mảng, vết thương hoặc đang điều trị bệnh</span>
              </label>
            </div>
            <button type="button" className={s.linkBtn} onClick={reset}>Làm lại từ đầu</button>
          </form>

          <aside className={s.plan} aria-label="Kế hoạch chăm sóc" aria-live="polite">
            {!plan ? (
              <div className={s.planEmpty}>
                <div className={s.planEmptyArt} aria-hidden="true">?</div>
                <p className={s.planEmptyT}>Chưa đủ thông tin</p>
                <p>Còn thiếu: <b>{missing.join(", ")}</b>. Chọn xong là các bước chăm sóc hiện ra ở đây.</p>
              </div>
            ) : (
              <>
                <p className={s.planKicker}>Gói gợi ý</p>
                <h3 className={`${s.display} ${s.planName}`}>{plan.pack}</h3>
                <div className={s.planStats}>
                  <div><span>Thời gian dự kiến</span><b>{fmtTime(plan.totalMins)}</b></div>
                  <div><span>Giá tham khảo</span><b>{fmtVnd(plan.low)}<i> đến </i>{fmtVnd(plan.high)}</b></div>
                </div>
                {sel.skin && (
                  <p className={s.warnStrong} role="alert"><b>Hỏi bác sĩ thú y trước.</b> Bé có dấu hiệu về da hoặc sức khoẻ nên cần được bác sĩ thú y xem trước khi tắm hoặc spa. Kế hoạch bên dưới chỉ để tham khảo, áp dụng khi bé đã được đồng ý.</p>
                )}
                <ol className={s.steps}>
                  {plan.steps.map((st, i) => (
                    <li key={i}>
                      <span className={s.stepNum}>{i + 1}</span>
                      <span className={s.stepBody}>{st.name}{st.note && <small>{st.note}</small>}</span>
                      <span className={s.stepMin}>{st.mins}&nbsp;phút</span>
                    </li>
                  ))}
                </ol>
                <p className={s.warn}>Bông Xù chỉ chăm sóc lông và vệ sinh, không chẩn đoán hay điều trị. Nếu bé có bệnh da hoặc vấn đề sức khoẻ, hãy hỏi bác sĩ thú y trước khi đặt lịch. Giá và thời gian là tham khảo, sẽ báo chính xác sau khi xem lông của bé.</p>
                <div className={s.planActions}>
                  <WagButton href={buildConsultHref("pet-vui")} tone="red">Gửi yêu cầu tư vấn</WagButton>
                  <button type="button" className={`${s.btn} ${s.btn_white}`} onClick={copy}>Sao chép tóm tắt</button>
                </div>
                <p className={s.copyMsg} role="status">{copied === "ok" ? "Đã sao chép tóm tắt." : copied === "err" ? "Không sao chép được, bạn hãy bôi đen và sao chép thủ công." : ""}</p>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
