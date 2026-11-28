"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { EXPENSES, TXS } from "../data";
import { Logo } from "./Logo";

const DIGITS = "7495228".split("");

function Odometer({ on }: { on: boolean }) {
  return (
    <div className={s.odo} aria-label="₫ 7.495.228 triệu">
      <span aria-hidden="true">₫</span>
      {DIGITS.map((d, i) => (
        <b key={i} aria-hidden="true" className={s.odoCell} data-sep={i === 2 || i === 5 ? "1" : undefined}>
          <span style={{ transform: `translateY(${on ? -((Number(d) + 10) * 100) / 30 : 0}%)`, transitionDelay: `${i * 140}ms` }}>
            {Array.from({ length: 30 }, (_, k) => (<i key={k}>{k % 10}</i>))}
          </span>
        </b>
      ))}
    </div>
  );
}

export function Ledger() {
  const [on, setOn] = useState(false);
  const [pct, setPct] = useState(69);
  const [save, setSave] = useState(1);
  const [tx, setTx] = useState<string | null>(null);
  const [gen, setGen] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  useEffect(() => { if (on) { const t = window.setTimeout(() => setPct(70), 900); return () => window.clearTimeout(t); } }, [on]);
  const total = 3470000 + gen * 480000;
  return (
    <section id="doanh-nghiep" className={s.ledger} aria-labelledby="lg-h">
      <h2 id="lg-h" className={s.srOnly}>Quản lý chi tiêu và giao dịch phí thấp</h2>
      <div className={s.lgGrid} ref={ref}>
        <article className={`${s.lc} ${s.expense}`}>
          <h3>Quản lý chi tiêu</h3>
          <div className={s.credit}><span className={s.cLogo}><Logo size={22} light={false} /></span>Tài khoản tín dụng thông minh</div>
          <div className={s.expBox}>
            <div className={s.expTabs}><span>Chi phí</span><span>Đầu tư</span></div>
            <ul>{EXPENSES.map((e) => (<li key={e.t}><span>{e.t}</span><b>{e.v}</b></li>))}{gen > 0 && Array.from({ length: gen }).map((_, i) => (<li key={`g${i}`}><span>Báo cáo tạo mới #{i + 1}</span><b>−₫480.000</b></li>))}</ul>
            <p className={s.tot}><span>Tổng chi phí</span><b>−₫{total.toLocaleString("vi-VN")}</b></p>
            <div className={s.expBtns}><button type="button" className={s.ghostSm} onClick={() => setGen((g) => Math.min(3, g + 1))}>Tạo mới</button><button type="button" className={s.darkSm} onClick={() => window.alert("Đây là trang minh hoạ, không có tệp để tải.")}>Tải xuống</button></div>
          </div>
        </article>
        <article className={`${s.lc} ${s.fees}`}>
          <h3>Giao dịch phí thấp</h3>
          <ul className={s.txs}>
            {TXS.slice(0, 1).map((t) => (<li key={t.n}><img src={`/images/demos/vi-nguon/${t.i}.webp`} width={28} height={28} alt="" loading="lazy" /><span>{t.n}</span><b>{t.v}</b></li>))}
            <li className={s.txNew}><button type="button" onClick={() => setTx(tx ? null : "Đã tạo lệnh chuyển ₫250.000 (minh hoạ)")}>Tạo giao dịch mới <i aria-hidden="true">→</i></button></li>
            {TXS.slice(1, 3).map((t) => (<li key={t.n}><img src={`/images/demos/vi-nguon/${t.i}.webp`} width={28} height={28} alt="" loading="lazy" /><span>{t.n}</span><b>{t.v}</b></li>))}
          </ul>
          <p className={s.txMsg} role="status">{tx}</p>
        </article>
        <article className={`${s.lc} ${s.brandCard}`}>
          <div><p className={s.bcLogo}><Logo size={26} /> Ví Nguồn</p><b className={s.pct}>{pct}%</b><small>Phí tiết kiệm mỗi tháng</small></div>
          <div className={s.bcImg}><img src="/images/demos/vi-nguon/saving.webp" width={900} height={700} alt="Người dùng kiểm tra đồng hồ thông minh, ảnh minh hoạ" loading="lazy" decoding="async" />
            <div role="group" aria-label="Mức tiết kiệm">{["3%", "7%", "10%"].map((p, i) => (<button key={p} type="button" aria-pressed={save === i} className={save === i ? s.pillOn : ""} onClick={() => setSave(i)}>Tiết kiệm {p}</button>))}</div>
          </div>
        </article>
        <article className={`${s.lc} ${s.wide}`}>
          <div><p className={s.tagDark}>Tương lai ngân hàng toàn cầu</p><h3>Công nghệ của chúng tôi xử lý hàng triệu giao dịch mỗi tháng</h3><p>Hơn 78 nghìn tỷ đồng được xử lý an toàn qua nền tảng, vận hành các hệ thống tài chính số đáng tin cậy nhất.</p></div>
          <div className={s.odoCard}><p>Giá trị giao dịch vốn trung bình (triệu)</p><Odometer on={on} /></div>
        </article>
      </div>
    </section>
  );
}
