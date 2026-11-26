"use client";

import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { MagneticButton, Odometer, TiltCard, gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import s from "../brand.module.css";
import { ACCESSORIES, BIKES, CLASS_LABEL, DELIVERIES, INSURANCES, MAX_DAYS, type BikeClass } from "../data/fleet";
import { RENT_CHECKLIST } from "../data/content";
import { buildQuote, isValidDays, quoteSummary, vnd } from "../lib/pricing";
import { BikeArt, type BikeKind } from "./BikeArt";

const FILTERS: { id: "all" | BikeClass; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "so", label: CLASS_LABEL.so },
  { id: "ga", label: CLASS_LABEL.ga },
  { id: "con", label: CLASS_LABEL.con },
];
const kindOf = (id: string, cls: BikeClass): BikeKind => (id === "adv-250" ? "adv" : cls);
const QUICK_DAYS = [1, 3, 7, 10, 14];

/** Hai section dùng chung một trạng thái: Đội xe (chọn xe) và Tính giá (phiếu giá + điều kiện thuê). */
export function RentalDesk({ divider }: { divider: ReactNode }) {
  const uid = useId();
  const [filter, setFilter] = useState<"all" | BikeClass>("all");
  const [bikeId, setBikeId] = useState<string | null>(null);
  const [daysText, setDaysText] = useState("3");
  const [deliveryId, setDeliveryId] = useState(DELIVERIES[0].id);
  const [acc, setAcc] = useState<string[]>([]);
  const [insuranceId, setInsuranceId] = useState(INSURANCES[0].id);
  const [checked, setChecked] = useState<string[]>([]);
  const [copied, setCopied] = useState<"" | "ok" | "fail">("");
  const calcRef = useRef<HTMLElement>(null);

  const days = daysText.trim() === "" ? Number.NaN : Number(daysText);
  const quote = useMemo(() => buildQuote({ bikeId, days, deliveryId, accessoryIds: acc, insuranceId }), [bikeId, days, deliveryId, acc, insuranceId]);
  const bike = BIKES.find((b) => b.id === bikeId) ?? null;
  const list = filter === "all" ? BIKES : BIKES.filter((b) => b.cls === filter);
  const consult = buildConsultHref("phuot-xe");
  const checklist = RENT_CHECKLIST(bike ? vnd(bike.deposit) : "theo mẫu xe (hiện trên phiếu giá)");
  const daysInvalid = !isValidDays(days);

  const setDays = (n: number) => setDaysText(String(Math.min(MAX_DAYS, Math.max(1, n))));
  const toggle = (arr: string[], id: string) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  const copy = async () => {
    if (!quote.ok) return;
    try {
      await navigator.clipboard.writeText(quoteSummary(quote));
      setCopied("ok");
    } catch { setCopied("fail"); }
    window.setTimeout(() => setCopied(""), 3200);
  };

  const pick = (id: string) => {
    setBikeId(id);
    const el = calcRef.current?.querySelector<HTMLElement>("[data-pick-flash]");
    if (el && !prefersReducedMotion()) gsap.fromTo(el, { scale: 1.04 }, { scale: 1, duration: 0.5, ease: "power3.out" });
  };

  return (
    <>
      <section id="doi-xe" className={s.fleet} aria-labelledby={`${uid}-fleet`}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <p className={s.kicker}>01 · Đội xe</p>
            <h2 id={`${uid}-fleet`} className={s.h2} data-vx="slash">Tám mẫu xe, giá ngày và giá tuần.</h2>
            <p className={s.lead}>Thông số, giá ngày và giá tuần nằm ngay trên thẻ. Giá tham khảo, đã gồm mũ bảo hiểm cho người lái. Bấm &quot;Chọn xe này&quot; để chuyển sang phiếu giá bên dưới.</p>
          </div>

          <div className={s.chips} role="group" aria-label="Lọc theo loại xe">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" className={s.chip} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}<span aria-hidden="true">{f.id === "all" ? BIKES.length : BIKES.filter((b) => b.cls === f.id).length}</span>
              </button>
            ))}
          </div>

          <ul className={s.fleetGrid}>
            {list.map((b) => {
              const on = b.id === bikeId;
              return (
                <TiltCard as="li" key={b.id} max={7} glare glareColor="rgba(255,212,0,.22)" scale={1.015} className={s.cardWrap}>
                  <article className={`${s.card} ${on ? s.cardOn : ""}`} data-cls={b.cls}>
                    <div className={s.cardArt}>
                      <BikeArt kind={kindOf(b.id, b.cls)} className={s.cardBike} />
                      <span className={s.cardClass}>{b.classLabel}</span>
                      <span className={s.cardCc}><b>{b.cc}</b> cc</span>
                    </div>
                    <div className={s.cardBody}>
                      <h3 className={s.h3}>{b.name}</h3>
                      <p className={s.cardNote}>{b.note}</p>
                      <dl className={s.specs}>
                        <div><dt>Hộp số</dt><dd>{b.gearbox}</dd></div>
                        <div><dt>Yên cao</dt><dd>{b.seatMm}&nbsp;mm</dd></div>
                        <div><dt>Bình xăng</dt><dd>{String(b.tankL).replace(".", ",")}&nbsp;L</dd></div>
                        <div><dt>Hợp với</dt><dd>{b.fit}</dd></div>
                      </dl>
                      <div className={s.prices}>
                        <p><span>Giá ngày</span><b>{vnd(b.perDay)}</b></p>
                        <p><span>Giá tuần</span><b>{vnd(b.perWeek)}</b><small>≈&nbsp;{vnd(Math.round(b.perWeek / 7))}&nbsp;/ ngày</small></p>
                      </div>
                      <button type="button" className={`${s.btn} ${on ? s.btnYellow : s.btnLine} ${s.btnFull}`} aria-pressed={on} onClick={() => pick(b.id)} data-cursor="Chọn">
                        {on ? "Đã chọn" : "Chọn xe này"}
                      </button>
                    </div>
                  </article>
                </TiltCard>
              );
            })}
          </ul>
          <p className={s.fine} role="status" aria-live="polite">
            {bike ? <>Đã chọn <b>{bike.name}</b>. <a href="#tinh-gia">Tính giá cho xe này →</a></> : "Giá tham khảo, có thể thay đổi theo mùa và được xác nhận khi tư vấn."}
          </p>
        </div>
      </section>

      {divider}

      <section id="tinh-gia" ref={calcRef} className={s.calc} aria-labelledby={`${uid}-calc`}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <p className={s.kicker}>02 · Ước tính giá</p>
            <h2 id={`${uid}-calc`} className={s.h2} data-vx="slash">Phiếu giá, từng dòng một.</h2>
            <p className={s.lead}>Chọn số ngày, cách nhận xe, phụ kiện và bảo hiểm. Công cụ chỉ tính trên trình duyệt của bạn; chưa có xe nào được giữ cho đến khi bạn gửi tư vấn.</p>
          </div>

          <div className={s.calcGrid}>
            <div className={s.calcForm}>
              <div className={s.pickBar} data-pick-flash="">
                <span className={s.pickLabel}>Xe đang chọn</span>
                {bike ? (
                  <>
                    <b>{bike.name}</b><span>{bike.classLabel} {bike.cc}&nbsp;cc</span>
                    <a href="#doi-xe">Đổi xe</a>
                  </>
                ) : (
                  <>
                    <b>Chưa chọn xe</b>
                    <a href="#doi-xe">Chọn xe ở bước 1 →</a>
                  </>
                )}
              </div>

              <fieldset className={s.field}>
                <legend>Số ngày thuê</legend>
                <div className={s.stepper}>
                  <button type="button" className={s.stepBtn} aria-label="Giảm một ngày" onClick={() => setDays((Number.isFinite(days) ? days : 1) - 1)} disabled={Number.isFinite(days) && days <= 1}>−</button>
                  <input
                    id={`${uid}-days`} className={s.daysInput} inputMode="numeric" autoComplete="off" value={daysText}
                    aria-label="Số ngày thuê" aria-invalid={daysInvalid} aria-describedby={`${uid}-days-msg`}
                    onChange={(e) => setDaysText(e.target.value.replace(/[^\d.,-]/g, "").slice(0, 4))}
                  />
                  <button type="button" className={s.stepBtn} aria-label="Tăng một ngày" onClick={() => setDays((Number.isFinite(days) ? days : 0) + 1)} disabled={Number.isFinite(days) && days >= MAX_DAYS}>+</button>
                  <div className={s.quick} role="group" aria-label="Chọn nhanh số ngày">
                    {QUICK_DAYS.map((d) => (
                      <button key={d} type="button" className={s.quickBtn} aria-pressed={days === d} onClick={() => setDays(d)}>{d}</button>
                    ))}
                  </div>
                </div>
                <p id={`${uid}-days-msg`} className={daysInvalid ? s.err : s.hint} role={daysInvalid ? "alert" : undefined}>
                  {daysInvalid ? `Nhập số nguyên từ 1 đến ${MAX_DAYS}.` : "Mỗi 7 ngày tính giá tuần; ngày lẻ không bao giờ đắt hơn một tuần."}
                </p>
              </fieldset>

              <fieldset className={s.field}>
                <legend>Nhận và trả xe</legend>
                <div className={s.opts}>
                  {DELIVERIES.map((d) => (
                    <label key={d.id} className={s.opt}>
                      <input type="radio" name={`${uid}-del`} checked={deliveryId === d.id} onChange={() => setDeliveryId(d.id)} />
                      <span className={s.optBox}><b>{d.name}</b><small>{d.desc}</small><em>{d.price === 0 ? "Miễn phí" : vnd(d.price)}</em></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={s.field}>
                <legend>Phụ kiện</legend>
                <div className={s.opts}>
                  {ACCESSORIES.map((a) => (
                    <label key={a.id} className={s.opt}>
                      <input type="checkbox" checked={acc.includes(a.id)} onChange={() => setAcc((x) => toggle(x, a.id))} />
                      <span className={s.optBox}><b>{a.name}</b><small>{a.desc}</small><em>{vnd(a.price)}{a.unit === "day" ? " / ngày" : " / lần thuê"}</em></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={s.field}>
                <legend>Bảo hiểm</legend>
                <div className={s.opts}>
                  {INSURANCES.map((i) => (
                    <label key={i.id} className={s.opt}>
                      <input type="radio" name={`${uid}-ins`} checked={insuranceId === i.id} onChange={() => setInsuranceId(i.id)} />
                      <span className={s.optBox}><b>{i.name}</b><small>{i.desc}</small><em>{i.perDay === 0 ? "Đi kèm xe" : `${vnd(i.perDay)} / ngày`}</em></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className={`${s.field} ${s.checkField}`}>
                <legend>Điều kiện thuê xe</legend>
                <p className={s.hint}>Tích những mục bạn đã chuẩn bị. Đây chỉ là danh sách nhắc việc, không gửi đi đâu.</p>
                <div className={s.progress} aria-hidden="true"><i style={{ transform: `scaleX(${checked.length / checklist.length})` }} /></div>
                <p className={s.progressText} role="status" aria-live="polite">{checked.length}/{checklist.length} mục đã sẵn sàng</p>
                <ul className={s.checkList}>
                  {checklist.map((c) => (
                    <li key={c.id}>
                      <label className={s.check}>
                        <input type="checkbox" checked={checked.includes(c.id)} onChange={() => setChecked((x) => toggle(x, c.id))} />
                        <span className={s.checkBox} aria-hidden="true" />
                        <span><b>{c.t}</b><small>{c.d}</small></span>
                      </label>
                    </li>
                  ))}
                </ul>
              </fieldset>
            </div>

            <aside id="phieu-gia" className={s.receipt} aria-label="Phiếu giá thuê xe">
              <div className={s.rcHead}><span>PHIẾU GIÁ</span><span>Giá tham khảo</span></div>
              {quote.ok ? (
                <>
                  <h3 className={s.rcBike}>{quote.bike.name}</h3>
                  <p className={s.rcMeta}>{quote.bike.classLabel} {quote.bike.cc}&nbsp;cc · {quote.days} ngày{quote.weeks > 0 ? ` (${quote.weeks} tuần${quote.extraDays ? ` + ${quote.extraDays} ngày` : ""})` : ""}</p>
                  <table className={s.rcTable}>
                    <caption className={s.srOnly}>Các khoản trong phiếu giá</caption>
                    <thead className={s.srOnly}><tr><th scope="col">Khoản</th><th scope="col">Thành tiền</th></tr></thead>
                    <tbody>
                      {quote.lines.map((l) => (
                        <tr key={l.key}>
                          <th scope="row"><span>{l.label}</span><small>{l.detail}</small></th>
                          <td>{l.amount === 0 ? "0 ₫" : vnd(l.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className={s.rcTotal}>
                    <span>Tổng tiền thuê</span>
                    <p className={s.rcSum} aria-live="polite"><Odometer value={quote.total} trigger="view" duration={0.9} className={s.rcOdo} /><small>&nbsp;₫</small></p>
                  </div>
                  <ul className={s.rcNotes}>
                    <li><span>Tiền cọc, hoàn khi trả xe nguyên trạng</span><b>{vnd(quote.deposit)}</b></li>
                    <li><span>Trung bình mỗi ngày</span><b>{vnd(quote.perDayAverage)}</b></li>
                    {quote.saving > 0 && <li className={s.save}><span>Tiết kiệm so với thuê lẻ theo ngày</span><b>{vnd(quote.saving)}</b></li>}
                  </ul>
                  {quote.capped && <p className={s.rcHint}>Ngày lẻ đã giới hạn bằng giá một tuần: thuê tròn 7 ngày vẫn cùng giá.</p>}
                  <div className={s.rcActions}>
                    <MagneticButton strength={0.28} max={10} className={s.full}>
                      <a className={`${s.btn} ${s.btnYellow} ${s.btnFull}`} href={consult}>Đặt xe với phiếu giá này</a>
                    </MagneticButton>
                    <button type="button" className={`${s.btn} ${s.btnLine} ${s.btnFull}`} onClick={copy}>Sao chép bản tóm tắt</button>
                    <p className={s.rcCopy} role="status" aria-live="polite">{copied === "ok" ? "Đã sao chép. Dán vào ô ghi chú ở form tư vấn." : copied === "fail" ? "Chưa sao chép được, hãy chọn và sao chép bản tóm tắt bên dưới." : ""}</p>
                  </div>
                  <details className={s.rcSummary}>
                    <summary>Xem bản tóm tắt</summary>
                    <pre>{quoteSummary(quote)}</pre>
                  </details>
                  <p className={s.rcFoot}>Nút trên mở form tư vấn của website; bạn gửi thông tin ở đó. Giá là tham khảo, cửa hàng xác nhận lại khi tư vấn.</p>
                </>
              ) : (
                <div className={s.rcEmpty}>
                  <BikeArt kind="con" className={s.rcEmptyArt} />
                  <p className={quote.error === "bad-days" ? s.err : ""} role={quote.error === "bad-days" ? "alert" : undefined}>{quote.message}</p>
                  {quote.error === "no-bike" && <a className={`${s.btn} ${s.btnYellow}`} href="#doi-xe">Chọn xe</a>}
                </div>
              )}
            </aside>
          </div>
        </div>
        <div className={s.stickyBar}>
          <span>{quote.ok ? <>Tổng <b>{vnd(quote.total)}</b></> : "Chưa có phiếu giá"}</span>
          <a className={`${s.btn} ${s.btnYellow} ${s.btnSm}`} href="#phieu-gia">Xem phiếu giá</a>
        </div>
      </section>
    </>
  );
}
