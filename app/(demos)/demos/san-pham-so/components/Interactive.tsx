"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../brand.module.css";
import { CREATIVE, FAQ, FIN_TABS, MATCHES, MOSAIC, NAV, WORK_TYPES } from "./data";

const B = "/images/demos/san-pham-so/";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Hiện dần khối khi cuộn tới; trạng thái ẩn chỉ đặt trong effect để không-JS vẫn thấy đủ nội dung. */
export function RevealInit() {
  useEffect(() => {
    if (reduced()) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-rv]"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.rv = "1"; io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { if (el.getBoundingClientRect().top > window.innerHeight * 0.95) { el.dataset.rv = "0"; io.observe(el); } });
    /* Đèn gradient hero trôi nhẹ theo cuộn */
    const glow = document.querySelector<HTMLElement>("[data-glow]");
    const on = () => { if (glow) glow.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * 0.22}px, 0)`; };
    window.addEventListener("scroll", on, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", on); };
  }, []);
  return null;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const t = document.querySelector(href); if (!t) return;
    e.preventDefault(); setOpen(false);
    t.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  };
  return (
    <header className={styles.nav} data-solid={solid ? "1" : "0"} data-open={open ? "1" : "0"}>
      <a href="#dau-trang" className={styles.logo} onClick={(e) => go(e, "#dau-trang")} aria-label="Tiến Hoá Studio, về đầu trang">
        <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true"><circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M8 18l4-8 3 5 2-3 3 6z" fill="#e8553a" /></svg>
        <span>TIẾN HOÁ</span>
      </a>
      <nav aria-label="Chính" id="sp-nav" className={styles.navLinks}>
        {NAV.map((n) => (<a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>{n.label}</a>))}
        <a href="#lien-he" className={styles.navCtaM} onClick={(e) => go(e, "#lien-he")}>Bắt đầu dự án ↗</a>
      </nav>
      <a href="#lien-he" className={styles.navCta} onClick={(e) => go(e, "#lien-he")}>Bắt đầu dự án <span aria-hidden="true">↗</span></a>
      <button type="button" className={styles.burger} aria-expanded={open} aria-controls="sp-nav" onClick={() => setOpen((v) => !v)}><span className={styles.srOnly}>Mở menu</span><i /><i /></button>
    </header>
  );
}

/** Khối mosaic nhỏ ở hero: các ô ảnh dự án xoay vòng. */
export function Mosaic() {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const id = window.setInterval(() => setK((v) => (v + 1) % MOSAIC.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  const at = (i: number) => MOSAIC[(k + i) % MOSAIC.length];
  return (
    <div className={styles.mosaic} aria-hidden="true">
      <span className={styles.m1} style={{ backgroundImage: `url(${B}${at(0)}.webp)` }} />
      <span className={styles.m2} style={{ backgroundImage: `url(${B}${at(1)}.webp)` }} />
      <span className={styles.m3} style={{ backgroundImage: `url(${B}${at(2)}.webp)` }} />
      <span className={styles.m4} style={{ backgroundImage: `url(${B}${at(3)}.webp)` }} />
      <span className={styles.m5} style={{ backgroundImage: `url(${B}${at(4)}.webp)` }} />
    </div>
  );
}

export function FinTabs() {
  const [i, setI] = useState(0);
  const t = FIN_TABS[i];
  return (
    <div>
      <div role="tablist" aria-label="Nhóm sản phẩm" className={styles.finTabs}>
        {FIN_TABS.map((x, k) => (
          <button key={x.id} role="tab" type="button" id={`ft-${x.id}`} aria-selected={k === i} aria-controls={`fp-${x.id}`} tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            onKeyDown={(e) => { if (e.key === "ArrowRight") setI((i + 1) % FIN_TABS.length); if (e.key === "ArrowLeft") setI((i + FIN_TABS.length - 1) % FIN_TABS.length); }}>{x.tab}</button>
        ))}
      </div>
      <div role="tabpanel" id={`fp-${t.id}`} aria-labelledby={`ft-${t.id}`} className={styles.finPanel} key={t.id}>
        <h3>{t.h}</h3>
        <ul className={styles.finCards}>
          {t.cards.map((c) => (
            <li key={c.t} data-k={c.k}>
              {c.k === "light" && <span className={styles.finVal}><b>{c.v}</b><small>Hạn mức của bạn đã sẵn sàng</small></span>}
              {c.k === "flow" && <svg viewBox="0 0 160 90" aria-hidden="true"><path d="M10 15h40v30h50v30h40" fill="none" stroke="#b9a8f0" strokeWidth="1.5" /><circle cx="50" cy="45" r="6" fill="#5b2cc4" /><circle cx="100" cy="75" r="6" fill="#5b2cc4" /><rect x="120" y="58" width="30" height="20" rx="4" fill="#fff" stroke="#b9a8f0" /></svg>}
              <h4>{c.t}</h4><p>{c.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MatchDemo() {
  const [i, setI] = useState(0);
  const [matched, setMatched] = useState(false);
  const [sent, setSent] = useState(false);
  const m = MATCHES[i % MATCHES.length];
  const next = () => { setMatched(false); setSent(false); setI((v) => v + 1); };
  return (
    <div className={styles.matchWrap}>
      {!matched ? (
        <article className={styles.profile} aria-label={`Hồ sơ ${m.name}`} key={i}>
          <div className={styles.profPh} style={{ backgroundImage: `url(${B}${m.img}.webp)` }} role="img" aria-label={`Ảnh minh hoạ ${m.name}`} />
          <h3>{m.name} <i aria-hidden="true">✓</i></h3>
          <p>{m.role} · {m.co}</p>
          <ul>{m.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className={styles.profBtns}>
            <button type="button" onClick={next} aria-label="Bỏ qua hồ sơ này">✕</button>
            <button type="button" onClick={next} aria-label="Xem hồ sơ khác">↻</button>
            <button type="button" data-k="p" onClick={() => setMatched(true)} aria-label="Quan tâm">♥</button>
            <button type="button" data-k="r" onClick={() => setMatched(true)} aria-label="Rất quan tâm">♥</button>
          </div>
        </article>
      ) : (
        <article className={styles.itsMatch} role="status">
          <h3>Ghép đôi thành công!</h3>
          <p>Chúc mừng, bạn và {m.name} đã quan tâm nhau.</p>
          <div className={styles.matchPair}><span style={{ backgroundImage: `url(${B}${m.img}.webp)` }} /><span className={styles.matchLogo} aria-hidden="true">Rừng<br />Thông</span></div>
          <button type="button" className={styles.matchSend} onClick={() => setSent(true)}>{sent ? "Đã gửi lời chào (demo)" : "Gửi tin nhắn"}</button>
          <button type="button" className={styles.matchLater} onClick={next}>Để sau</button>
        </article>
      )}
    </div>
  );
}

export function ProductRow() {
  const ref = useRef<HTMLUListElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const step = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.6, behavior: reduced() ? "auto" : "smooth" });
  return (
    <div>
      <ul className={styles.pcards} ref={ref} onScroll={(e) => { const t = e.currentTarget; setAtEnd(t.scrollLeft + t.clientWidth >= t.scrollWidth - 4); }} tabIndex={0} aria-label="Các nhóm thiết kế sản phẩm, cuộn ngang">
        <li data-k="dark"><span className={styles.pPh} style={{ backgroundImage: `url(${B}app.webp)` }} /><em>Như bạn đã thấy trước đây</em></li>
        <li data-k="teal"><span className={styles.pPh}><span className={styles.uiField}>Ô nhập</span><span className={styles.uiField} data-f="1">Đang nhập|</span><span className={styles.uiField} data-f="2">Thông báo lỗi</span><span className={styles.uiBtn}>Nút bấm</span><span className={styles.uiBtn}>Nút bấm</span></span><em>Hệ thống thiết kế</em></li>
        <li data-k="grey"><span className={styles.pPh} style={{ backgroundImage: `url(${B}service-1.webp)` }} /><em>Ứng dụng web</em></li>
        <li data-k="warm"><span className={styles.pPh} style={{ backgroundImage: `url(${B}service-5.webp)` }} /><em>Ứng dụng di động</em></li>
        <li data-k="dark"><span className={styles.pPh} style={{ backgroundImage: `url(${B}service-4.webp)` }} /><em>Bảng điều khiển dữ liệu</em></li>
      </ul>
      <div className={styles.pctl}>
        <button type="button" onClick={() => step(-1)} aria-label="Cuộn về trước">←</button>
        <button type="button" onClick={() => step(1)} aria-label="Cuộn tiếp" disabled={atEnd}>→</button>
      </div>
    </div>
  );
}

export function CreativeList() {
  const [i, setI] = useState(0);
  const cur = CREATIVE[i];
  return (
    <div className={styles.crWrap}>
      <ul className={styles.crList}>
        {CREATIVE.map((c, k) => (
          <li key={c.id} data-open={k === i ? "1" : "0"}>
            <h3><button type="button" aria-expanded={k === i} aria-controls={`cr-${c.id}`} onClick={() => setI(k)} onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setI(k); }}>
              <i aria-hidden="true" data-i={k}>{["◇", "✦", "▭", "◎", "✉"][k]}</i>{c.t}
            </button></h3>
            <div id={`cr-${c.id}`} role="region" hidden={k !== i}><p>{c.d}</p></div>
          </li>
        ))}
      </ul>
      <div className={styles.crRight}>
      <a href="#lien-he" className={styles.pillLight}><span aria-hidden="true">↗</span> Khám phá dịch vụ sáng tạo</a>
      <div className={styles.crImg}>
        {CREATIVE.map((c, k) => (<span key={c.id} role="img" aria-label={`Hình minh hoạ ${c.t}`} data-on={k === i ? "1" : "0"} style={{ backgroundImage: `url(${B}${c.img}.webp)` }} />))}
        <small className={styles.crCap}>{cur.t}</small>
      </div>
      </div>
    </div>
  );
}

export function Count({ v, s, dec = 0 }: { v: number; s: string; dec?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(v);
  useEffect(() => {
    const el = ref.current; if (!el || reduced()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setN(0);
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1400); setN(v * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [v]);
  return <b ref={ref}>{n.toFixed(dec).replace(".", ",")}{s}</b>;
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
  const [v, setV] = useState({ name: "", email: "", co: "", ind: "", msg: "" });
  const [types, setTypes] = useState<string[]>([]);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }));
  const tog = (t: string) => setTypes((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.name.trim().length < 2) er.name = "Vui lòng nhập họ tên.";
    if (!emailOk(v.email)) er.email = "Email chưa đúng định dạng.";
    if (types.length === 0) er.types = "Chọn ít nhất một loại công việc.";
    setErrs(er); if (!Object.keys(er).length) setOk(true);
  };
  if (ok) return (
    <div className={styles.formOk} role="status">
      <h3>Cảm ơn {v.name.trim().split(" ").slice(-1)[0]}, chúng tôi đã nhận được.</h3>
      <p>Một bạn bên Tiến Hoá sẽ gửi email tới {v.email} trong 1 ngày làm việc để hẹn buổi gọi 30 phút về {types.join(", ").toLowerCase()}. (Bản demo, dữ liệu chưa được gửi đi đâu.)</p>
      <button type="button" className={styles.pillDark} onClick={() => { setOk(false); setTypes([]); setV({ name: "", email: "", co: "", ind: "", msg: "" }); }}>Gửi liên hệ khác</button>
    </div>
  );
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <label>Họ và tên<input value={v.name} onChange={set("name")} placeholder="Họ và tên đầy đủ" autoComplete="name" aria-invalid={!!errs.name} /><em role="alert">{errs.name}</em></label>
      <label>Email<input type="email" value={v.email} onChange={set("email")} placeholder="Email của bạn" autoComplete="email" aria-invalid={!!errs.email} /><em role="alert">{errs.email}</em></label>
      <label>Tên công ty<input value={v.co} onChange={set("co")} placeholder="Tên công ty" autoComplete="organization" /></label>
      <label>Lĩnh vực<input value={v.ind} onChange={set("ind")} placeholder="Ví dụ: SaaS, giáo dục, bán lẻ" /></label>
      <fieldset>
        <legend>Loại công việc (chọn một hoặc nhiều)</legend>
        <div className={styles.chips}>
          {WORK_TYPES.map((t) => (<button type="button" key={t} aria-pressed={types.includes(t)} onClick={() => tog(t)}>{t}</button>))}
        </div>
        <em role="alert">{errs.types}</em>
      </fieldset>
      <label>Lời nhắn<textarea rows={3} value={v.msg} onChange={set("msg")} placeholder="Viết vài dòng về điều bạn cần" /></label>
      <button type="submit" className={styles.pillDark}><span aria-hidden="true">↗</span> Đặt cuộc gọi</button>
    </form>
  );
}

export function Newsletter() {
  const [e, setE] = useState(""); const [s, setS] = useState<"" | "ok" | "err">("");
  return (
    <form className={styles.news} noValidate onSubmit={(ev) => { ev.preventDefault(); setS(emailOk(e) ? "ok" : "err"); }}>
      <label htmlFor="sp-nl" className={styles.srOnly}>Email nhận bản tin</label>
      <input id="sp-nl" value={e} onChange={(x) => setE(x.target.value)} placeholder="Email nhận bản tin tháng" />
      <button type="submit">Đăng ký</button>
      <p role="status">{s === "ok" ? "Đã đăng ký (demo). Hẹn gặp bạn đầu tháng sau." : s === "err" ? "Email chưa đúng định dạng." : ""}</p>
    </form>
  );
}
