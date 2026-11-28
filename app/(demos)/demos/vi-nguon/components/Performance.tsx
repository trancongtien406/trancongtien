"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { PERF } from "../data";

type Tab = keyof typeof PERF;
const TABS: { k: Tab; l: string }[] = [{ k: "analytics", l: "Phân tích" }, { k: "cashflow", l: "Dòng tiền" }, { k: "success", l: "Tỉ lệ thành công" }];

export function Performance() {
  const [tab, setTab] = useState<Tab>("analytics");
  const [per, setPer] = useState<"month" | "quarter">("month");
  const [ring, setRing] = useState<number>(PERF.analytics.ring[0]);
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const d = PERF[tab];
  const factor = per === "month" ? 1 : 1.6;

  useEffect(() => {
    const el = box.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [a, b] = d.ring; const t0 = performance.now(); let raf = 0;
    const f = (t: number) => { const p = Math.min(1, (t - t0) / (reduce ? 1 : 1800)); setRing(a + (b - a) * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, [seen, tab, d]);

  const max = 20;
  const prog = Math.min(1, Math.max(0.12, (ring - d.ring[0]) / (d.ring[1] - d.ring[0] || 1)) * 0.5 + 0.28);
  const R = 82; const C = 2 * Math.PI * R;
  const sel = 3;
  return (
    <section id="hieu-suat" className={s.perf} aria-labelledby="pf-h">
      <div className={s.center}>
        <h2 id="pf-h" className={`${s.h2c} ${s.white}`}>Thu hẹp khoảng cách hiệu suất <em>trong khoản đầu tư của bạn</em></h2>
        <p className={`${s.lead} ${s.whiteSoft}`}>Phần lớn nhà đầu tư để tiền “nằm im” vì thông tin chậm, theo dõi kém hoặc công cụ lỗi thời.</p>
      </div>
      <div ref={box} data-dash className={`${s.dash} ${seen ? s.dashOn : ""}`}>
        <div className={s.dashTop}>
          <div role="tablist" aria-label="Loại báo cáo">
            {TABS.map((t) => (<button key={t.k} role="tab" type="button" aria-selected={tab === t.k} className={tab === t.k ? s.tabOn : ""} onClick={() => setTab(t.k)}>{t.l}</button>))}
          </div>
          <label className={s.sel}><span className={s.srOnly}>Chu kỳ</span><select value={per} onChange={(e) => setPer(e.target.value as "month" | "quarter")}><option value="month">Hằng tháng</option><option value="quarter">Hằng quý</option></select></label>
        </div>
        <div className={s.dashBody}>
          <div className={s.ringCard}>
            <div className={s.ringWrap}>
              <svg viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="vn-rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3b1fd6" /><stop offset="1" stopColor="#4aa8ff" /></linearGradient></defs>
                <circle cx="100" cy="100" r={R} fill="none" stroke="#dfe7f7" strokeWidth="5" />
                <circle cx="100" cy="100" r={R} fill="none" stroke="url(#vn-rg)" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${C * prog} ${C}`} transform="rotate(-100 100 100)" /></svg>
              <p><small>{tab === "success" ? "Tỉ lệ thành công" : "Tài sản ròng chính"}</small><b>{tab === "success" ? `${ring.toFixed(1).replace(".", ",")}%` : `₫${ring.toFixed(1).replace(".", ",")} tỷ`}</b></p>
            </div>
            <dl><div><dt>30 ngày qua</dt><dd>{d.a}</dd></div><div><dt>So với 30 ngày trước</dt><dd>{d.b}</dd></div></dl>
          </div>
          <div className={s.bars} role="img" aria-label={`Biểu đồ cột ${TABS.find((t) => t.k === tab)?.l}`}>
            {d.months.map(([m, v], i) => {
              const val = Math.min(19.5, v * factor);
              return (<div key={m} className={i === sel ? s.barSel : ""}><span className={s.barTip}>{val.toFixed(1).replace(".", ",")}%</span><i style={{ height: seen ? `${(val / max) * 100}%` : "0%", transitionDelay: `${i * 90}ms` }} /><em>{m}</em></div>);
            })}
          </div>
        </div>
        <p className={s.dashFoot}><span>Nguồn dữ liệu: Ví Nguồn minh hoạ</span><span>Cập nhật: 17 phút trước</span></p>
      </div>
    </section>
  );
}
