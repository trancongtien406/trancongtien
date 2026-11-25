"use client";

import { useId, useMemo, useRef, useState } from "react";
import { NumberTicker } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { DEFAULT_CONFIG, FACINGS, FURNISH, ROOM_INFO, TIERS, UNITS, area, planOf, quote, slotsOf, type Config, type SlotId } from "../data/plans";
import { SLUG } from "../data/content";
import { SCHEDULES, annuity, balanceCurve, billions, compact, money, num, splitStages } from "../lib/finance";
import { FloorPlan } from "./FloorPlan";
import { ViewPanel } from "./View";
import styles from "../brand.module.css";

/** Nhóm chọn một (radio) có phím mũi tên. */
function Segmented<T extends string>({ label, value, options, onChange, className }: { label: string; value: T; options: { id: T; label: string; sub?: string }[]; onChange: (v: T) => void; className?: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const move = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % options.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + options.length) % options.length;
    else return;
    e.preventDefault();
    onChange(options[n].id);
    refs.current[n]?.focus();
  };
  return (
    <div className={`${styles.seg} ${className ?? ""}`}>
      <span className={styles.segLabel} id={`${id}-l`}>{label}</span>
      <div role="radiogroup" aria-labelledby={`${id}-l`} className={styles.segRow}>
        {options.map((o, i) => (
          <button
            key={o.id} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={value === o.id}
            tabIndex={value === o.id ? 0 : -1} className={styles.segBtn} onClick={() => onChange(o.id)} onKeyDown={(e) => move(e, i)}
          >
            <b>{o.label}</b>{o.sub ? <small>{o.sub}</small> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

const parse = (s: string) => { const t = s.trim().replace(",", "."); return t === "" ? NaN : Number(t); };

export function Planner() {
  const [cfg, setCfg] = useState<Config>(DEFAULT_CONFIG);
  const [slot, setSlot] = useState<SlotId>("living");
  const [copied, setCopied] = useState("");
  const set = (p: Partial<Config>) => setCfg((c) => ({ ...c, ...p }));
  const q = useMemo(() => quote(cfg), [cfg]);
  const present = slotsOf(cfg.unit);
  const active: SlotId = present.includes(slot) ? slot : "living";
  const info = ROOM_INFO[active](cfg.unit);
  const rect = planOf(cfg.unit)[active]!;
  const unitMeta = UNITS.find((u) => u.id === cfg.unit)!;
  const summary = `Căn ${unitMeta.label}, ${q.tier.label.toLowerCase()} (${q.tier.floors.toLowerCase()}), hướng ${q.facing.label}, nội thất ${q.furnish.label.toLowerCase()}. Diện tích sử dụng khoảng ${num.format(q.area)} m², ban công ${num.format(q.balcony)} m². Giá tham khảo khoảng ${billions(q.total)}.`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied("Đã sao chép tóm tắt."); }
    catch { setCopied("Trình duyệt không cho sao chép. Bạn có thể chọn và chép đoạn tóm tắt bên dưới."); }
    window.setTimeout(() => setCopied(""), 4000);
  };

  return (
    <>
      <section className={styles.plan} id="mat-bang" aria-labelledby="cv-plan-h" data-cv="plan">
        <div className={styles.wrap}>
          <header className={styles.secHead} data-cv="reveal">
            <p className={styles.sheet}><span>06</span><i aria-hidden="true" />Bản vẽ A-06 · Mặt bằng căn hộ</p>
            <h2 id="cv-plan-h" className={styles.h2}>Chạm vào từng phòng để đọc mặt bằng.</h2>
            <p className={styles.lede}>Chọn loại căn, tầng, hướng và mức nội thất. Mặt bằng tự vẽ lại, diện tích và giá tham khảo cập nhật ngay. Dùng chuột, chạm hoặc phím mũi tên để đi qua từng phòng.</p>
          </header>

          <div className={styles.planGrid}>
            <div className={styles.planMain} data-cv="reveal">
              <Segmented
                className={styles.segUnit} label="Loại căn" value={cfg.unit} onChange={(v) => set({ unit: v })}
                options={UNITS.map((u) => ({ id: u.id, label: u.label, sub: u.name.replace("Căn ", "") }))}
              />
              <div className={styles.planFrame}>
                <FloorPlan unit={cfg.unit} furnish={cfg.furnish} active={active} onActive={setSlot} />
              </div>
              <div className={styles.roomInfo} aria-live="polite" data-cv-room={active}>
                <p className={styles.roomName}>{info.name}</p>
                <p className={styles.roomArea}>{num.format(area(rect))}&nbsp;m²</p>
                <p className={styles.roomUse}>{info.use}</p>
              </div>
            </div>

            <aside className={styles.planSide} aria-label="Cấu hình và kết quả" data-cv="reveal">
              <Segmented label="Tầng" value={cfg.tier} onChange={(v) => set({ tier: v })} options={TIERS.map((t) => ({ id: t.id, label: t.label, sub: t.floors }))} />
              <Segmented label="Hướng căn" value={cfg.facing} onChange={(v) => set({ facing: v })} options={FACINGS.map((f) => ({ id: f.id, label: f.label, sub: f.sub }))} />
              <Segmented label="Nội thất" value={cfg.furnish} onChange={(v) => set({ furnish: v })} options={FURNISH.map((f) => ({ id: f.id, label: f.label, sub: f.sub }))} />

              <ViewPanel center={q.center} width={q.width} city={q.tier.city} sea={q.sea} label={`${q.tier.label}, hướng ${q.facing.label}`} />
              <p className={styles.viewNote}>{q.tier.note}</p>

              <dl className={styles.quote}>
                <div><dt>Diện tích sử dụng</dt><dd>{num.format(q.area)}&nbsp;m² <small>+ ban công {num.format(q.balcony)}&nbsp;m²</small></dd></div>
                <div><dt>Đơn giá tham khảo</dt><dd>{num.format(q.perM2)}&nbsp;triệu/m²</dd></div>
                <div className={styles.quoteTotal}><dt>Giá tham khảo</dt><dd><NumberTicker value={q.total / 1e9} decimals={2} suffix=" tỷ đồng" duration={0.9} /></dd></div>
              </dl>
              <p className={styles.fine}>Giá chỉ để tham khảo khi hình dung mức đầu tư, chưa gồm chính sách và chi phí khác. Bảng giá chính thức do đội tư vấn gửi trực tiếp.</p>
              <div className={styles.sideCta}>
                <a className={`${styles.btn} ${styles.btnCopper}`} href="#du-toan">Tính khoản thanh toán</a>
                <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={copy}>Sao chép tóm tắt</button>
              </div>
              <p className={styles.summary}>{summary}</p>
              <p className={styles.copied} role="status">{copied}</p>
            </aside>
          </div>
        </div>
      </section>

      <Payment price={q.total} summary={summary} />
    </>
  );
}

function Payment({ price, summary }: { price: number; summary: string }) {
  const [sched, setSched] = useState("5");
  const [loanS, setLoanS] = useState("40");
  const [rateS, setRateS] = useState("9.5");
  const [yearsS, setYearsS] = useState("20");
  const lid = useId(), rid = useId(), yid = useId();

  const loanPct = parse(loanS), rate = parse(rateS), years = parse(yearsS);
  const eLoan = Number.isNaN(loanPct) ? "Nhập tỉ lệ vay từ 0 đến 70." : loanPct < 0 || loanPct > 70 ? "Tỉ lệ vay cần nằm trong khoảng 0 đến 70%." : "";
  const eRate = Number.isNaN(rate) ? "Nhập lãi suất để tính khoản trả hàng tháng." : rate < 0 || rate > 30 ? "Lãi suất cần nằm trong khoảng 0 đến 30%/năm." : "";
  const eYears = Number.isNaN(years) ? "Nhập thời hạn vay từ 1 đến 30 năm." : years < 1 || years > 30 ? "Thời hạn vay cần nằm trong khoảng 1 đến 30 năm." : "";
  const loanOk = !eLoan, rateOk = !eRate, yearsOk = !eYears;

  const stages = SCHEDULES.find((s) => s.id === sched)!.stages;
  const loan = loanOk ? (price * loanPct) / 100 : 0;
  const rows = splitStages(stages, price, loan);
  const own = price - loan;
  const calc = rateOk && yearsOk && loan > 0 ? annuity(loan, rate, years) : null;
  const curve = calc ? balanceCurve(loan, rate, years, 40) : null;
  const path = curve ? curve.map((v, i) => `${i === 0 ? "M" : "L"}${(8 + (i / 40) * 304).toFixed(1)} ${(8 + (1 - v / loan) * 98).toFixed(1)}`).join("") : "";

  return (
    <section className={styles.pay} id="du-toan" aria-labelledby="cv-pay-h" data-cv="pay">
      <div className={styles.wrap}>
        <header className={styles.secHead} data-cv="reveal">
          <p className={styles.sheet}><span>07</span><i aria-hidden="true" />Bản vẽ A-07 · Dự toán thanh toán</p>
          <h2 id="cv-pay-h" className={styles.h2}>Chia nhỏ khoản thanh toán thành từng đợt dễ nhìn.</h2>
          <p className={styles.lede}>Giá lấy từ cấu hình căn hộ bạn vừa chọn. Nhập tỉ lệ vay, lãi suất và thời hạn để xem số tiền mỗi đợt và khoản trả hàng tháng. Mọi con số tính ngay trong trình duyệt của bạn.</p>
        </header>

        <div className={styles.payGrid} data-cv="reveal">
          <form className={styles.payForm} onSubmit={(e) => e.preventDefault()} noValidate aria-label="Thông số thanh toán">
            <p className={styles.payPrice}><span>Giá tham khảo của căn đã chọn</span><b>{billions(price)}</b><a href="#mat-bang">Đổi cấu hình</a></p>
            <Segmented label="Tiến độ đóng tiền" value={sched} onChange={setSched} options={SCHEDULES.map((s) => ({ id: s.id, label: s.label }))} />
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor={lid}>Tỉ lệ vay (% giá trị căn)</label>
                <input id={lid} inputMode="decimal" autoComplete="off" value={loanS} onChange={(e) => setLoanS(e.target.value)} aria-invalid={!loanOk} aria-describedby={`${lid}-e`} />
                <p id={`${lid}-e`} className={styles.err} role={eLoan ? "alert" : undefined}>{eLoan}</p>
              </div>
              <div className={styles.field}>
                <label htmlFor={rid}>Lãi suất vay (%/năm)</label>
                <input id={rid} inputMode="decimal" autoComplete="off" value={rateS} onChange={(e) => setRateS(e.target.value)} aria-invalid={!rateOk} aria-describedby={`${rid}-e`} />
                <p id={`${rid}-e`} className={styles.err} role={eRate ? "alert" : undefined}>{eRate}</p>
              </div>
              <div className={styles.field}>
                <label htmlFor={yid}>Thời hạn vay (năm)</label>
                <input id={yid} inputMode="numeric" autoComplete="off" value={yearsS} onChange={(e) => setYearsS(e.target.value)} aria-invalid={!yearsOk} aria-describedby={`${yid}-e`} />
                <p id={`${yid}-e`} className={styles.err} role={eYears ? "alert" : undefined}>{eYears}</p>
              </div>
            </div>
            <p className={styles.fine}>Lãi suất do bạn nhập và giữ cố định suốt thời hạn để tính tham khảo. Lãi suất và điều kiện thực tế do ngân hàng quyết định.</p>
          </form>

          <div className={styles.payOut} aria-live="polite">
            <dl className={styles.figs}>
              <div><dt>Vốn tự có</dt><dd title={money(own)}>{compact(own)}</dd></div>
              <div><dt>Số tiền vay</dt><dd title={money(loan)}>{loan > 0 ? compact(loan) : "Không vay"}</dd></div>
              <div className={styles.figMain}><dt>Trả hàng tháng</dt><dd title={calc ? money(calc.pmt) : undefined}>{calc ? compact(calc.pmt) : "Chưa có"}</dd></div>
              <div><dt>Tổng lãi tham khảo</dt><dd title={calc ? money(calc.interest) : undefined}>{calc ? compact(calc.interest) : "Chưa có"}</dd></div>
            </dl>
            {loan > 0 && !calc && <p className={styles.empty}>Nhập lãi suất và thời hạn hợp lệ để xem khoản trả hàng tháng.</p>}
            {loan === 0 && loanOk && <p className={styles.empty}>Tỉ lệ vay bằng 0: toàn bộ giá trị căn được thanh toán theo các đợt bên dưới.</p>}

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <caption>Các đợt thanh toán và phần vay được xếp từ đợt cuối</caption>
                <thead><tr><th scope="col">Đợt</th><th scope="col" className={styles.r}>Tỉ lệ</th><th scope="col" className={styles.r}>Số tiền</th><th scope="col" className={styles.r}>Vốn tự có</th><th scope="col" className={styles.r}>Vay</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}><th scope="row">{r.label}</th><td className={styles.r}>{r.pct}%</td><td className={styles.r}>{money(r.amount)}</td><td className={styles.r}>{money(r.own)}</td><td className={styles.r}>{r.loan > 0 ? money(r.loan) : "·"}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {curve && calc && (
              <figure className={styles.curve}>
                <svg viewBox="0 0 320 120" role="img" aria-label={`Dư nợ giảm dần từ ${money(loan)} về 0 sau ${calc.n} tháng`}>
                  <path d="M8 106H312M8 8V106" className={styles.curveAxis} />
                  <path key={`${loan}-${rate}-${years}`} d={path} pathLength={1} className={styles.curveLine} />
                </svg>
                <figcaption>Dư nợ theo thời gian: {calc.n} tháng, trả đều mỗi tháng.</figcaption>
              </figure>
            )}

            <div className={styles.formula}>
              <p><b>Công thức trả đều (annuity)</b></p>
              <p className={styles.formulaLine}>Trả hàng tháng = P × r ÷ (1 − (1 + r)<sup>−n</sup>)</p>
              <p>P là số tiền vay{loan > 0 ? ` (${money(loan)})` : ""}, r là lãi suất tháng = lãi năm ÷ 12{rateOk ? ` (${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 3 }).format(rate / 12)}%)` : ""}, n là số tháng{yearsOk ? ` (${Math.round(years * 12)})` : ""}. Lãi suất 0% thì chia đều gốc theo số tháng.</p>
            </div>
          </div>
        </div>

        <div className={styles.payCta} data-cv="reveal">
          <p className={styles.fineStrong}>Chỉ để tham khảo, không phải tư vấn tài chính. Con số chưa gồm phí, thuế và chính sách tại thời điểm giao dịch.</p>
          <p className={styles.summary}>{summary}</p>
          <a className={`${styles.btn} ${styles.btnCopper}`} href={buildConsultHref(SLUG)} data-cursor="Đi tới">Nhận bảng giá chính thức và tư vấn</a>
        </div>
      </div>
    </section>
  );
}
