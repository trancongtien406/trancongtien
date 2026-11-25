"use client";

import { useEffect, useMemo, useState } from "react";
import { NumberTicker, ShineSweep } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { NEEDS, PAINTS, VEHICLES, buildPackage, formatHours, formatVnd, summaryText, type NeedId, type PaintId, type VehicleId } from "../data/builder";

const KEY = "dx-builder-v1";

/**
 * Chọn gói theo dòng xe: dòng xe + tình trạng sơn + nhu cầu -> gói gợi ý, các bước, thời gian và giá tham khảo.
 * Chỉ tạo bản tóm tắt phía trình duyệt, không gửi dữ liệu. Hành động cuối dẫn tới form tư vấn của website.
 */
export function Builder({ consultHref }: { consultHref: string }) {
  const [vehicle, setVehicle] = useState<VehicleId>("sedan");
  const [paint, setPaint] = useState<PaintId>("tot");
  const [needs, setNeeds] = useState<NeedId[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const o = JSON.parse(raw) as { v?: VehicleId; p?: PaintId; n?: NeedId[] };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (o.v && VEHICLES.some((x) => x.id === o.v)) setVehicle(o.v);
        if (o.p && PAINTS.some((x) => x.id === o.p)) setPaint(o.p);
        if (Array.isArray(o.n)) setNeeds(o.n.filter((n) => NEEDS.some((x) => x.id === n)));
      }
    } catch { /* trình duyệt riêng tư */ }
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail as NeedId;
      if (NEEDS.some((n) => n.id === id)) setNeeds([id]);
    };
    window.addEventListener("dx-pick", onPick);
    return () => window.removeEventListener("dx-pick", onPick);
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ v: vehicle, p: paint, n: needs })); } catch { /* bỏ qua */ }
  }, [vehicle, paint, needs]);

  const res = useMemo(() => buildPackage(vehicle, paint, needs), [vehicle, paint, needs]);
  const toggle = (id: NeedId) => { setMsg(""); setNeeds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])); };

  const copy = async () => {
    const text = summaryText(vehicle, paint, needs);
    try {
      await navigator.clipboard.writeText(text);
      setMsg("Đã sao chép bản tóm tắt vào bộ nhớ tạm.");
    } catch {
      setMsg("Trình duyệt không cho sao chép tự động. Hãy chọn và sao chép nội dung bên dưới.");
    }
  };

  return (
    <div className={s.bld}>
      <div className={s.bldForm}>
        <fieldset className={s.fs}>
          <legend>1 · Dòng xe</legend>
          <div className={s.opts}>
            {VEHICLES.map((v) => (
              <label key={v.id} className={s.opt}>
                <input type="radio" name="dx-vehicle" value={v.id} checked={vehicle === v.id} onChange={() => setVehicle(v.id)} />
                <span className={s.optBody}><b>{v.label}</b><small>{v.hint}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.fs}>
          <legend>2 · Tình trạng sơn</legend>
          <div className={s.opts}>
            {PAINTS.map((p) => (
              <label key={p.id} className={s.opt}>
                <input type="radio" name="dx-paint" value={p.id} checked={paint === p.id} onChange={() => setPaint(p.id)} />
                <span className={s.optBody}><b>{p.label}</b><small>{p.hint}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={s.fs}>
          <legend>3 · Nhu cầu (chọn một hoặc nhiều)</legend>
          <div className={s.opts}>
            {NEEDS.map((n) => (
              <label key={n.id} className={s.opt}>
                <input type="checkbox" name="dx-need" value={n.id} checked={needs.includes(n.id)} onChange={() => toggle(n.id)} />
                <span className={s.optBody}><b>{n.label}</b><small>{n.hint}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={s.bldSticky}>
        <section className={s.result} aria-live="polite" aria-label="Gói gợi ý">
          {res.kind === "empty" ? (
            <div className={s.empty}>
              <b>Chưa có hạng mục nào</b>
              Chọn ít nhất một nhu cầu ở cột bên để xem gói gợi ý, các bước thi công, thời gian và giá tham khảo.
            </div>
          ) : (
            <>
              <p className={s.kicker}>Gói gợi ý</p>
              <h3 className={s.resName}>{res.name}</h3>
              <p className={s.resSum}>{res.summary}</p>
              <dl className={s.resKpis}>
                <div><dt>Giờ làm</dt><dd><NumberTicker value={res.hours} decimals={1} /><small>&nbsp;giờ</small></dd></div>
                <div><dt>Số bước</dt><dd><NumberTicker value={res.steps} /></dd></div>
              </dl>
              <p className={s.resSum} style={{ marginTop: 8 }}>Ước tính: {formatHours(res.hours)}.</p>
              <p className={s.resPrice}>
                <small>Giá tham khảo</small>
                <b>{formatVnd(res.priceFrom)}</b>
                <span className={s.resSum}> đến {formatVnd(res.priceTo)}</span>
              </p>
              <ul className={s.lines}>
                {res.lines.map((l) => (
                  <li key={l.id} className={s.line}>
                    <h4>{l.label}</h4>
                    <span>{l.price === 0 ? "Gồm sẵn" : formatVnd(l.price)}</span>
                    <p>{l.detail}</p>
                    <em>{l.steps} bước · {String(l.hours).replace(".", ",")} giờ{l.note ? ` · ${l.note}` : ""}</em>
                  </li>
                ))}
              </ul>
              <ul className={s.notes}>{res.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              <div className={s.resBtns}>
                <ShineSweep trigger="loop" every={5.5} color="rgba(255,255,255,0.7)" className={s.shineBtn}>
                  <a className={`${s.btn} ${s.btnSolid}`} href={consultHref}>Đặt lịch kiểm tra xe</a>
                </ShineSweep>
                <button type="button" className={s.btn} onClick={copy}>Sao chép tóm tắt</button>
              </div>
              <p className={s.status} role="status">{msg}</p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
