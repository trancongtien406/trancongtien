"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { NumberTicker, gsap, prefersReducedMotion } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { MESSAGES, OCCASIONS, type OccasionId } from "../data/flowers";
import {
  CARE_DAYS, LEADS, PEAK_NOTE, PRODUCTS, RHYTHM_FREQ, RHYTHM_SIZES, SEASONS, SEASON_NOTE, WEEKDAYS, fmt,
  type ProductId, type RhythmFreqId, type RhythmSizeId,
} from "../data/shop";
import c from "./shop.module.css";
import s from "../brand.module.css";

/** Chạy một tween "mọc từ cuống" lên các phần tử con khi dữ liệu đổi (bỏ qua khi reduced-motion). */
function useGrow(deps: unknown[], sel: string, skipFirst = true) {
  const ref = useRef<HTMLElement | null>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; if (skipFirst) return; }
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(sel));
    const tw = gsap.fromTo(els, { clipPath: "inset(100% 0 0 0)", y: 18, opacity: 0.2 }, { clipPath: "inset(-10% -10% -10% -10%)", y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: "power3.out", clearProps: "clipPath,transform,opacity", overwrite: true });
    return () => { tw.kill(); gsap.set(els, { clearProps: "clipPath,transform,opacity" }); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/* ====================================================== BẢNG GIÁ: bó / lẵng / hộp */
export function PriceBoard() {
  const [id, setId] = useState<ProductId>("bo");
  const uid = useId();
  const p = PRODUCTS.find((x) => x.id === id)!;
  const ref = useGrow([id], "[data-tier]");
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : PRODUCTS.length - 1)) % PRODUCTS.length;
    setId(PRODUCTS[n].id);
    document.getElementById(`${uid}-tab-${PRODUCTS[n].id}`)?.focus();
  };
  return (
    <div className={c.board} ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={c.tabs} role="tablist" aria-label="Loại hoa">
        {PRODUCTS.map((x, i) => (
          <button key={x.id} id={`${uid}-tab-${x.id}`} type="button" role="tab" aria-selected={x.id === id} aria-controls={`${uid}-panel`} tabIndex={x.id === id ? 0 : -1} className={c.tab} onClick={() => setId(x.id)} onKeyDown={(e) => onKey(e, i)}>
            {x.name}
          </button>
        ))}
      </div>
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${id}`} className={c.boardPanel}>
        <div className={c.boardIntro}>
          <p className={c.boardBlurb}>{p.blurb}</p>
          <p className={c.boardUse}><b>Hợp với</b> {p.use}</p>
        </div>
        <ul className={c.tiers}>
          {p.tiers.map((t) => (
            <li key={t.size} className={c.tier} data-tier="" data-testid="tier">
              <span className={c.tierSize}>{t.size}</span>
              <span className={c.tierFrom}>từ</span>
              <strong className={c.tierPrice}><NumberTicker value={t.price} suffix="&nbsp;₫" duration={0.6} /></strong>
              <span className={c.tierDetail}>{t.detail}</span>
            </li>
          ))}
        </ul>
        <p className={c.boardNote}>Giá tham khảo theo cỡ, đã gồm hoa, lá phụ và giấy gói (hoặc lẵng, hộp). Loại hoa cụ thể và giá cuối cùng tiệm xác nhận khi bạn nhắn.</p>
      </div>
    </div>
  );
}

/* ====================================================== THƯỚC BÁO TRƯỚC: nụ lớn dần theo số ngày */
const SPAN = 8; // trục 0..8 ngày (7 ngày trở lên nằm ở cuối)
export function LeadRuler() {
  const [id, setId] = useState(LEADS[1].id);
  const uid = useId();
  const lead = LEADS.find((l) => l.id === id)!;
  const bud = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const pct = Math.min(1, lead.days / SPAN) * 100;
  useEffect(() => {
    if (!bud.current || !fill.current) return;
    if (prefersReducedMotion()) { gsap.set(bud.current, { left: `${pct}%` }); gsap.set(fill.current, { width: `${pct}%` }); return; }
    const tl = gsap.timeline();
    tl.to(fill.current, { width: `${pct}%`, duration: 0.8, ease: "power3.inOut" }, 0)
      .to(bud.current, { left: `${pct}%`, duration: 0.8, ease: "power3.inOut" }, 0)
      .fromTo(bud.current.querySelector("svg"), { scale: 0.5, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)" }, 0.55);
    return () => { tl.kill(); };
  }, [pct]);
  return (
    <div className={c.lead}>
      <fieldset className={c.leadList}>
        <legend className={s.srOnly}>Loại đơn hoa</legend>
        {LEADS.map((l) => (
          <label key={l.id} className={c.leadItem}>
            <input type="radio" name={`${uid}-lead`} checked={l.id === id} onChange={() => setId(l.id)} />
            <span><b>{l.label}</b><small>nên báo {l.text}</small></span>
          </label>
        ))}
      </fieldset>
      <div className={c.ruler} aria-live="polite">
        <p className={c.rulerBig} data-testid="lead-text"><small>Nên đặt</small> {lead.text}</p>
        <div className={c.track} aria-hidden="true" data-unit="ngày">
          <div className={c.trackLine}><div ref={fill} className={c.trackFill} /></div>
          {Array.from({ length: SPAN + 1 }, (_, d) => (
            <span key={d} className={c.tick} style={{ left: `${(d / SPAN) * 100}%` }}><i />{d === 0 ? "Nay" : d === SPAN ? "7+" : d}</span>
          ))}
          <div ref={bud} className={c.bud} style={{ left: `${pct}%` }}>
            <svg viewBox="0 0 40 40" width="40" height="40" focusable="false">
              {[0, 72, 144, 216, 288].map((r) => <path key={r} d="M20 19C15 14 16 6 20 1C24 6 25 14 20 19Z" fill="currentColor" transform={`rotate(${r} 20 20)`} />)}
              <circle cx="20" cy="20" r="3.4" fill="#f3eddf" />
            </svg>
          </div>
        </div>
        <p className={c.axis}>Số ngày báo trước (Nay = trong ngày)</p>
        <p className={c.rulerNote}>{lead.note}</p>
        <p className={c.rulerPeak}>{PEAK_NOTE}</p>
      </div>
    </div>
  );
}

/* ====================================================== HOA ĐỊNH KỲ: lịch 4 tuần, nụ nở đúng ngày nhận */
export function RhythmCalendar() {
  const [freq, setFreq] = useState<RhythmFreqId>("tuan");
  const [size, setSize] = useState<RhythmSizeId>("vua");
  const [wd, setWd] = useState(1);
  const uid = useId();
  const f = RHYTHM_FREQ.find((x) => x.id === freq)!;
  const z = RHYTHM_SIZES.find((x) => x.id === size)!;
  const days = useMemo(() => {
    const set = new Set<number>();
    for (let w = 0; w < 4; w++) {
      if (freq === "tuan" || (freq === "hai-tuan" && w % 2 === 0) || (freq === "thang" && w === 0)) set.add(w * 7 + wd);
    }
    return set;
  }, [freq, wd]);
  const total = z.price * f.per4w;
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!grid.current || prefersReducedMotion()) return;
    const on = Array.from(grid.current.querySelectorAll<HTMLElement>("[data-on='1'] svg"));
    const tw = gsap.fromTo(on, { scale: 0, rotate: -60 }, { scale: 1, rotate: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2.2)", overwrite: true });
    return () => { tw.kill(); gsap.set(on, { clearProps: "transform" }); };
  }, [freq, wd, size]);
  return (
    <div className={c.rhythm}>
      <div className={c.rhControls}>
        <fieldset className={c.rhField}>
          <legend>Tần suất</legend>
          <div className={c.chips} role="radiogroup" aria-label="Tần suất nhận hoa">
            {RHYTHM_FREQ.map((x) => (
              <label key={x.id} className={c.chip}><input type="radio" name={`${uid}-f`} checked={freq === x.id} onChange={() => setFreq(x.id)} /><span><b>{x.label}</b><small>{x.text}</small></span></label>
            ))}
          </div>
        </fieldset>
        <fieldset className={c.rhField}>
          <legend>Cỡ bình</legend>
          <div className={c.chips} role="radiogroup" aria-label="Cỡ bình hoa">
            {RHYTHM_SIZES.map((x) => (
              <label key={x.id} className={c.chip}><input type="radio" name={`${uid}-z`} checked={size === x.id} onChange={() => setSize(x.id)} /><span><b>{x.label}</b><small>{x.hint}</small></span></label>
            ))}
          </div>
        </fieldset>
        <fieldset className={c.rhField}>
          <legend>Ngày nhận trong tuần</legend>
          <div className={c.chips} role="radiogroup" aria-label="Ngày nhận hoa trong tuần">
            {WEEKDAYS.map((d, i) => (
              <label key={d} className={`${c.chip} ${c.chipDay}`}><input type="radio" name={`${uid}-d`} checked={wd === i} onChange={() => setWd(i)} /><span><b>{d}</b></span></label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className={c.rhCal}>
        <div className={c.calHead} aria-hidden="true">{WEEKDAYS.map((d) => <span key={d}>{d}</span>)}</div>
        <div ref={grid} className={c.calGrid} role="img" aria-label={`Lịch 4 tuần: ${days.size} lần nhận hoa`}>
          {Array.from({ length: 28 }, (_, i) => {
            const on = days.has(i);
            return (
              <span key={i} className={c.calCell} data-on={on ? "1" : "0"} data-testid={on ? "cal-on" : undefined}>
                <em>{i + 1}</em>
                {on ? <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">{[0, 72, 144, 216, 288].map((r) => <path key={r} d="M20 19C15 14 16 6 20 1C24 6 25 14 20 19Z" fill="currentColor" transform={`rotate(${r} 20 20)`} />)}<circle cx="20" cy="20" r="3.4" fill="#f3eddf" /></svg> : null}
              </span>
            );
          })}
        </div>
        <div className={c.rhSum}>
          <p><span>{f.text}, mỗi lần</span><b>{fmt(z.price)}&nbsp;₫</b></p>
          <p className={c.rhTotal}><span>Giá tham khảo mỗi 4 tuần</span><strong data-testid="rh-total"><NumberTicker value={total} suffix="&nbsp;₫" duration={0.6} /></strong></p>
          <a className={`${s.btn} ${s.btnVerm}`} href={buildConsultHref("hoa-tuoi")}>Hỏi gói hoa định kỳ</a>
          <p className={c.rhFoot}>Tiệm đổi loại hoa theo mùa mỗi lần nhận và giữ tông màu bạn chọn. Tạm ngưng hoặc đổi cỡ bình: báo trước một tuần.</p>
        </div>
      </div>
    </div>
  );
}

/* ====================================================== THIỆP VIẾT TAY: chữ hiện từng từ như mực lan */
export function CardWriter() {
  const [occ, setOcc] = useState<OccasionId>("sinh-nhat");
  const [idx, setIdx] = useState(0);
  const [custom, setCustom] = useState("");
  const uid = useId();
  const list = MESSAGES[occ];
  const text = (custom.trim() || list[idx % list.length]).slice(0, 80);
  const words = text.split(/\s+/);
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ws = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    gsap.set(ws, { clipPath: "inset(0 100% 0 0)", opacity: 0.4 });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(ws, { clipPath: "inset(-10% -4% -20% -4%)", opacity: 1, duration: 0.42, stagger: 0.16, ease: "power1.inOut" });
    return () => { tl.kill(); gsap.set(ws, { clearProps: "clipPath,opacity" }); };
  }, [text]);
  return (
    <div className={c.writer}>
      <div className={c.wCtl}>
        <div className={c.chips} role="radiogroup" aria-label="Dịp của tấm thiệp">
          {OCCASIONS.map((o) => (
            <label key={o.id} className={c.chip}><input type="radio" name={`${uid}-o`} checked={occ === o.id} onChange={() => { setOcc(o.id); setIdx(0); setCustom(""); }} /><span><b>{o.label}</b></span></label>
          ))}
        </div>
        <div className={c.wRow}>
          <button type="button" className={c.wBtn} onClick={() => { setCustom(""); setIdx((i) => i + 1); }} data-testid="writer-next">Viết lời khác ({(idx % list.length) + 1}/{list.length})</button>
        </div>
        <label className={c.wLabel} htmlFor={`${uid}-own`}>Hoặc tự viết câu của bạn (tối đa 80 ký tự)</label>
        <input id={`${uid}-own`} className={c.wInput} type="text" maxLength={80} autoComplete="off" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Ví dụ: Chúc mẹ luôn khoẻ" data-testid="writer-own" />
      </div>
      <div className={c.cardStage}>
        <div className={c.card} data-testid="writer-card">
          <span className={c.cardTag}>Gửi người nhận</span>
          <p ref={ref} className={c.cardText} aria-label={text}>
            {words.map((w, i) => <span key={`${text}-${i}`} data-w="" aria-hidden="true">{w}{i < words.length - 1 ? " " : ""}</span>)}
          </p>
          <span className={c.cardSign}>Nở Rừng viết tay</span>
        </div>
        <p className={c.cardNote}>Thiệp nhỏ viết tay đi kèm bó hoa. Với lẵng và hoa hộp, tiệm có thể in chữ trên dải ruy băng hoặc thiệp lớn hơn, báo giá khi bạn nhắn.</p>
      </div>
    </div>
  );
}

/* ====================================================== HOA THEO MÙA: nụ khép ngoài mùa, nở trong mùa */
function Bud({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={c.budSvg} data-open={open ? "1" : "0"} aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((r) => (
        <g key={r} transform={`rotate(${r} 20 20)`}><path className={c.budPetal} d="M20 19C15 14 16 6 20 1C24 6 25 14 20 19Z" /></g>
      ))}
      <circle cx="20" cy="20" r="3.2" className={c.budCore} />
    </svg>
  );
}

const MONTHS = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
export function SeasonBloom() {
  const [m, setM] = useState(11);
  const uid = useId();
  useEffect(() => { setM(new Date().getMonth() + 1); }, []);
  const inSeason = SEASONS.filter((x) => x.months.includes(m));
  return (
    <div className={c.season}>
      <div className={c.sCtl}>
        <label htmlFor={`${uid}-m`} className={c.sLabel}>Xem hoa theo tháng: <b data-testid="season-month">{MONTHS[m - 1]}</b></label>
        <input id={`${uid}-m`} className={c.sRange} type="range" min={1} max={12} step={1} value={m} onChange={(e) => setM(Number(e.target.value))} aria-valuetext={MONTHS[m - 1]} data-testid="season-range" />
        <div className={c.sTicks} aria-hidden="true">{MONTHS.map((_, i) => <span key={i} data-cur={i + 1 === m ? "1" : "0"}>{i + 1}</span>)}</div>
        <p className={c.sCount} role="status"><b data-testid="season-count">{inSeason.length}</b> trên {SEASONS.length} loại đang vào mùa</p>
      </div>
      <ul className={c.sGrid}>
        {SEASONS.map((x) => {
          const open = x.months.includes(m);
          return (
            <li key={x.id} className={c.sItem} data-open={open ? "1" : "0"} data-testid="season-item">
              <Bud open={open} />
              <span className={c.sName}>{x.name}</span>
              <span className={c.sNote}>{open ? x.note : "Chưa vào mùa, nên chọn loại khác"}</span>
            </li>
          );
        })}
      </ul>
      <p className={c.sFoot}>{SEASON_NOTE}</p>
    </div>
  );
}

/* ====================================================== CHĂM HOA 7 NGÀY: nước trong bình đục dần, thay nước thì trong lại */
export function VaseDays() {
  const [d, setD] = useState(1);
  const cur = CARE_DAYS[d - 1];
  const water = useRef<SVGRectElement>(null);
  const drop = useRef<SVGCircleElement>(null);
  useEffect(() => {
    if (!water.current) return;
    if (prefersReducedMotion()) { water.current.style.opacity = String(0.45 + cur.water); return; }
    const tl = gsap.timeline();
    tl.to(water.current, { opacity: 0.45 + cur.water, duration: 0.8, ease: "power2.out" }, 0);
    if (cur.change && drop.current) tl.fromTo(drop.current, { attr: { cy: 70, r: 3 }, opacity: 1 }, { attr: { cy: 170, r: 6 }, opacity: 0, duration: 1, ease: "power2.in" }, 0.1);
    return () => { tl.kill(); };
  }, [cur]);
  return (
    <div className={c.care}>
      <div className={c.vaseWrap}>
        <svg viewBox="0 0 200 260" className={c.vase} role="img" aria-label={`Bình hoa ngày ${d}: nước ${cur.water > 0.15 ? "đã đục dần" : "còn trong"}`}>
          <g stroke="#52745a" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M100 150 C100 110 70 80 62 46" /><path d="M100 150 C100 100 100 70 100 30" /><path d="M100 150 C102 110 130 84 142 50" />
          </g>
          <circle cx="62" cy="42" r="15" fill="#f3eddf" /><circle cx="100" cy="26" r="17" fill="#e5532d" /><circle cx="142" cy="46" r="14" fill="#f2b8c8" />
          <path d="M62 150 H138 L130 238 Q130 246 122 246 H78 Q70 246 70 238 Z" fill="rgba(243,237,223,0.14)" stroke="#f3eddf" strokeWidth="2.5" />
          <rect ref={water} x="68" y="178" width="64" height="62" rx="6" fill="#9fb98a" style={{ opacity: 0.5 }} />
          <circle ref={drop} cx="100" cy="70" r="3" fill="#cfe6f2" opacity="0" />
        </svg>
      </div>
      <div className={c.careBody}>
        <div className={c.dayBtns} role="group" aria-label="Chọn ngày chăm hoa">
          {CARE_DAYS.map((x) => (
            <button key={x.day} type="button" className={c.dayBtn} aria-pressed={x.day === d} data-change={x.change ? "1" : "0"} onClick={() => setD(x.day)}>
              <small>Ngày</small>{x.day}
            </button>
          ))}
        </div>
        <h3 className={c.careTitle} data-testid="care-title">{cur.title}</h3>
        <p className={c.careText}>{cur.text}</p>
        <p className={c.careTag}>{cur.change ? "Hôm nay nên thay nước" : "Hôm nay chỉ cần xem lại, chưa cần thay nước"}</p>
      </div>
    </div>
  );
}
