"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { FAQ, fmt } from "../data";
import { useBuild } from "../Store";

const APR = 0.079;

export function Own() {
  const { total } = useBuild();
  const [dep, setDep] = useState(20);
  const [term, setTerm] = useState(48);
  const loan = total * (1 - dep / 100);
  const r = APR / 12;
  const monthly = loan * r / (1 - Math.pow(1 + r, -term));
  return (
    <section id="so-huu" className={`${s.sec} ${s.own}`} aria-labelledby="own-h">
      <div className={s.ownGrid}>
        <div>
          <p className={s.kick}><b>09</b><i />Sở hữu</p>
          <h2 id="own-h" className={s.h2s}>Theo dõi. Giao tận cửa. <span style={{ color: "var(--vt-gold)" }}>Bảo hành 4 năm.</span></h2>
          <p className={s.lead}>Từ lúc đặt chỗ tới lúc nhận xe, mọi bước đều rõ ràng. Bạn biết xe đang ở đâu, bao giờ tới và chi phí mỗi tháng là bao nhiêu.</p>
        </div>
        <div style={{ display: "grid", gap: 14 }}>
          <div className={s.calc} data-rv>
            <h3>Máy tính trả góp</h3>
            <div><p className={s.k}><span>Giá bản dựng</span></p><output>{fmt(total)}</output></div>
            <div><label className={s.k} htmlFor="dep"><span>Trả trước</span><b>{dep}%</b></label><input id="dep" type="range" min={10} max={50} step={5} value={dep} onChange={(e) => setDep(+e.target.value)} /></div>
            <div><label className={s.k} htmlFor="term"><span>Kỳ hạn</span><b>{term} tháng</b></label><input id="term" type="range" min={12} max={84} step={12} value={term} onChange={(e) => setTerm(+e.target.value)} /></div>
            <div className={s.est}><p className={s.k}><span>Ước tính mỗi tháng</span></p><b>{Math.round(monthly).toLocaleString("vi-VN")} triệu</b><small>Lãi suất 7,9%/năm, chỉ để minh hoạ</small></div>
          </div>
          <ol className={s.steps}>
            <li data-rv><b>01</b>Giữ một suất bằng khoản cọc hoàn lại 50 triệu đồng.</li>
            <li data-rv><b>02</b>Theo dõi xe từ nhà máy tới cửa nhà bạn, trực tiếp trên bản đồ.</li>
            <li data-rv><b>03</b>Giao bằng xe kín, kèm bốn năm bảo dưỡng và một buổi chạy thử trên đường ướt.</li>
          </ol>
        </div>
      </div>
      <div className={s.faqW}>
        <p className={s.cfgCap}>Trước khi giữ chỗ</p>
        {FAQ.map((f, i) => (
          <details key={f.q} open={i === 0}><summary>{f.q}<i aria-hidden="true">+</i></summary><p>{f.a}</p></details>
        ))}
      </div>
    </section>
  );
}
