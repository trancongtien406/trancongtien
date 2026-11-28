"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { COLS, FAQ, NAV, PLANS, SEED_CARDS, TEAMS } from "./data";

/** Hiện dần các khối khi cuộn tới. Trạng thái ẩn chỉ đặt trong effect nên không-JS vẫn thấy đủ nội dung. */
export function RevealInit() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.rv = "1"; io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { if (el.getBoundingClientRect().top > window.innerHeight) { el.dataset.rv = "0"; io.observe(el); } });
    return () => io.disconnect();
  }, []);
  return null;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const t = document.querySelector(href);
    if (!t) return;
    e.preventDefault(); setOpen(false);
    t.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  return (
    <header className={styles.top} data-solid={solid ? "1" : "0"}>
      <a className={styles.logoBox} href="#gioi-thieu" onClick={(e) => go(e, "#gioi-thieu")} aria-label="Gọn Việc, về đầu trang">
        <span className={styles.logo}>GỌN VIỆC</span>
        <span className={styles.logoSub}>CÁCH HIỆN ĐẠI ĐỂ QUẢN LÝ<br />CÔNG VIỆC &amp; DỰ ÁN CỦA NHÓM</span>
      </a>
      <nav className={styles.nav} aria-label="Chính" data-open={open ? "1" : "0"} id="gv-nav">
        {NAV.map((n) => (<a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>{n.label} <i aria-hidden="true">⌄</i></a>))}
        <a href="#bang-gia" onClick={(e) => go(e, "#bang-gia")} className={styles.navExtra}>Bảng giá</a>
        <a href="#lien-he" onClick={(e) => go(e, "#lien-he")} className={styles.navExtra}>Đăng nhập</a>
      </nav>
      <div className={styles.topR}>
        <a href="#lien-he" onClick={(e) => go(e, "#lien-he")} className={styles.signin}>ĐĂNG NHẬP</a>
        <a href="#lien-he" onClick={(e) => go(e, "#lien-he")} className={styles.touch}>[ LIÊN HỆ ]</a>
        <button type="button" className={styles.burger} aria-expanded={open} aria-controls="gv-nav" onClick={() => setOpen((v) => !v)}><span className={styles.srOnly}>Mở menu</span><i /><i /></button>
      </div>
    </header>
  );
}

export function Kanban() {
  const [cards, setCards] = useState(SEED_CARDS);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const nextId = useRef(100);
  const move = (id: number, d: number) => setCards((cs) => cs.map((c) => (c.id === id ? { ...c, col: Math.min(3, Math.max(0, c.col + d)) } : c)));
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const v = title.trim();
    if (v.length < 3) { setErr("Tên việc cần ít nhất 3 ký tự."); return; }
    setErr(""); setTitle("");
    setCards((cs) => [{ id: nextId.current++, t: v, who: "BẠN", due: "Hôm nay", tone: nextId.current % 3, col: 0 }, ...cs]);
  };
  const done = cards.filter((c) => c.col === 3).length;
  return (
    <div className={styles.kb}>
      <form className={styles.kbAdd} onSubmit={add} noValidate>
        <label htmlFor="kb-t" className={styles.srOnly}>Tên việc mới</label>
        <input id="kb-t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Thêm việc mới, ví dụ: Gửi báo giá cho khách" aria-describedby="kb-e" />
        <button type="submit" className={styles.cta}>THÊM THẺ</button>
        <p id="kb-e" role="alert" className={styles.err}>{err}</p>
      </form>
      <p className={styles.kbProg} aria-live="polite">Đã xong {done}/{cards.length} việc</p>
      <div className={styles.kbCols}>
        {COLS.map((name, ci) => (
          <section key={name} className={styles.kbCol} aria-label={name}>
            <h3>{name} <span>{cards.filter((c) => c.col === ci).length}</span></h3>
            <ul>
              {cards.filter((c) => c.col === ci).map((c) => (
                <li key={c.id} className={styles.kbCard} data-tone={c.tone}>
                  <strong>{c.t}</strong>
                  <span className={styles.kbMeta}><b>{c.who}</b> Hạn {c.due}</span>
                  <span className={styles.kbBtns}>
                    <button type="button" onClick={() => move(c.id, -1)} disabled={ci === 0} aria-label={`Chuyển “${c.t}” sang cột trước`}>←</button>
                    <button type="button" onClick={() => move(c.id, 1)} disabled={ci === 3} aria-label={`Chuyển “${c.t}” sang cột sau`}>→</button>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function TeamTabs() {
  const [i, setI] = useState(0);
  const t = TEAMS[i];
  return (
    <div className={styles.tabs}>
      <div role="tablist" aria-label="Chọn loại nhóm" className={styles.tabList}>
        {TEAMS.map((x, k) => (
          <button key={x.id} role="tab" type="button" id={`tab-${x.id}`} aria-selected={k === i} aria-controls={`pan-${x.id}`} tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            onKeyDown={(e) => { if (e.key === "ArrowRight") setI((i + 1) % TEAMS.length); if (e.key === "ArrowLeft") setI((i + TEAMS.length - 1) % TEAMS.length); }}>{x.tab}</button>
        ))}
      </div>
      <div role="tabpanel" id={`pan-${t.id}`} aria-labelledby={`tab-${t.id}`} className={styles.tabPan} key={t.id}>
        <div><h3>{t.h}</h3><p>{t.p}</p><ul>{t.pts.map((p) => <li key={p}>{p}</li>)}</ul></div>
        <div className={styles.tabStat}><b>{t.stat}</b><span>{t.sl}</span></div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const fmt = (v: number) => (v === 0 ? "0đ" : v.toLocaleString("vi-VN") + "đ");
  return (
    <div>
      <div className={styles.toggle} role="group" aria-label="Chu kỳ thanh toán">
        <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>THEO THÁNG</button>
        <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>THEO NĂM · −20%</button>
      </div>
      <ul className={styles.plans}>
        {PLANS.map((p) => (
          <li key={p.n} className={styles.plan} data-hot={p.hot ? "1" : "0"}>
            {p.hot && <em>PHỔ BIẾN NHẤT</em>}
            <h3>{p.n}</h3>
            <p className={styles.planD}>{p.d}</p>
            <p className={styles.price}><b>{fmt(yearly ? p.y : p.m)}</b><span>{p.m === 0 ? "luôn miễn phí" : "/ người / tháng"}</span></p>
            <ul>{p.f.map((f) => <li key={f}>{f}</li>)}</ul>
            <a href="#lien-he" className={p.hot ? styles.cta : styles.ghost}>{p.m === 0 ? "BẮT ĐẦU MIỄN PHÍ" : "DÙNG THỬ 14 NGÀY"}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <ul className={styles.faq}>
      {FAQ.map((f, i) => (
        <li key={f.q}>
          <h3><button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}><span>{String(i + 1).padStart(2, "0")}</span>{f.q}<i aria-hidden="true">{open === i ? "−" : "+"}</i></button></h3>
          <div id={`faq-${i}`} role="region" hidden={open !== i}><p>{f.a}</p></div>
        </li>
      ))}
    </ul>
  );
}

export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", size: "", msg: "" });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.name.trim().length < 2) er.name = "Vui lòng nhập họ tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) er.email = "Email chưa đúng định dạng.";
    if (!v.size) er.size = "Chọn quy mô nhóm.";
    setErrs(er);
    if (Object.keys(er).length === 0) setOk(true);
  };
  if (ok) return (
    <div className={styles.okBox} role="status">
      <h3>Cảm ơn {v.name.trim().split(" ").slice(-1)[0]}, chúng tôi đã nhận được.</h3>
      <p>Một bạn bên Gọn Việc sẽ gửi email tới {v.email} trong 1 ngày làm việc để hẹn buổi làm quen 20 phút. (Bản demo, chưa gửi dữ liệu đi đâu.)</p>
      <button type="button" className={styles.ghost} onClick={() => { setOk(false); setV({ name: "", email: "", size: "", msg: "" }); }}>GỬI LIÊN HỆ KHÁC</button>
    </div>
  );
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <label>Họ và tên<input value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errs.name} /><em role="alert">{errs.name}</em></label>
      <label>Email công việc<input type="email" value={v.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errs.email} /><em role="alert">{errs.email}</em></label>
      <label>Quy mô nhóm
        <select value={v.size} onChange={set("size")} aria-invalid={!!errs.size}>
          <option value="">Chọn…</option><option>1 – 5 người</option><option>6 – 20 người</option><option>21 – 100 người</option><option>Trên 100 người</option>
        </select><em role="alert">{errs.size}</em>
      </label>
      <label>Bạn đang gặp khó ở đâu? (không bắt buộc)<textarea rows={4} value={v.msg} onChange={set("msg")} /></label>
      <button type="submit" className={styles.cta}>ĐẶT BUỔI LÀM QUEN</button>
    </form>
  );
}

export function Newsletter() {
  const [e, setE] = useState(""); const [s, setS] = useState<"" | "ok" | "err">("");
  return (
    <form className={styles.news} noValidate onSubmit={(ev) => { ev.preventDefault(); setS(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) ? "ok" : "err"); }}>
      <label htmlFor="nl" className={styles.srOnly}>Email nhận bản tin</label>
      <input id="nl" value={e} onChange={(x) => setE(x.target.value)} placeholder="Email nhận bản tin tháng" />
      <button type="submit">ĐĂNG KÝ</button>
      <p role="status">{s === "ok" ? "Đã đăng ký (demo). Hẹn gặp bạn đầu tháng sau." : s === "err" ? "Email chưa đúng định dạng." : ""}</p>
    </form>
  );
}
