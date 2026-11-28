"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "../brand.module.css";
import { type BagItem, addToBag, vnd } from "./bag";

/** Header: logo chữ giãn, Cửa hàng, Giỏ (đếm). Đổi màu chữ theo nền section bên dưới. */
export function Header() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const c = (e: Event) => setCount((e as CustomEvent<number>).detail);
    window.addEventListener("gs:count", c);
    let raf = 0;
    const check = () => {
      raf = 0;
      const deep = document.querySelector<HTMLElement>("[data-deep]");
      if (deep && parseFloat(getComputedStyle(deep).opacity) > 0.45) { setDark(true); return; }
      const el = document.elementFromPoint(window.innerWidth * 0.5, 22) as HTMLElement | null;
      const tone = el?.closest<HTMLElement>("[data-tone]")?.dataset.tone;
      setDark(tone === "dark");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => { window.removeEventListener("gs:count", c); window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <header className={s.header} data-dark={dark}>
      <a className={s.mark} href="#top">GIỌT SƯƠNG</a>
      <nav aria-label="Chính" className={s.nav}>
        <a className={s.navHide} href="#thanh-phan">Thành phần</a>
        <a className={s.navHide} href="#cach-dung">Cách dùng</a>
        <a className={s.navHide} href="#cau-chuyen">Câu chuyện</a>
        <a className={s.navHide} href="#hoi-dap">Hỏi đáp</a>
        <a href="#mua">Cửa hàng</a>
        <button type="button" className={s.navBag} onClick={() => window.dispatchEvent(new Event("gs:openbag"))}>Giỏ <i>{count}</i></button>
      </nav>
    </header>
  );
}

export function AddButton({ item, className, children }: { item: BagItem; className?: string; children?: ReactNode }) {
  return <button type="button" className={className} onClick={() => addToBag(item)}>{children ?? <>Thêm vào giỏ <b>{vnd(item.price)}</b></>}</button>;
}

/** Bộ lọc bộ sưu tập + thêm vào giỏ. */
const PRODUCTS: { id: string; cat: string; name: string; note: string; price: number; tone: string }[] = [
  { id: "serum-30", cat: "duong-am", name: "Serum Hyaluronic 30 ml", note: "2% hyaluronic acid, không hương liệu", price: 590000, tone: "teal" },
  { id: "kem-may", cat: "duong-am", name: "Kem dưỡng Mây", note: "Khoá ẩm cả đêm, kết cấu gel-kem mỏng", price: 520000, tone: "blush" },
  { id: "sua-rua-mat", cat: "lam-sach", name: "Sữa rửa mặt Sương Sớm", note: "Tạo bọt mịn, pH 5.5, không làm khô da", price: 290000, tone: "aqua" },
  { id: "toner", cat: "lam-sach", name: "Nước cân bằng Mặt Hồ", note: "Cấp nước tức thì sau bước làm sạch", price: 340000, tone: "aqua" },
  { id: "chong-nang", cat: "bao-ve", name: "Kem chống nắng Trong Veo", note: "SPF 50+, không để lại vệt trắng", price: 380000, tone: "blush" },
  { id: "mat-na", cat: "bao-ve", name: "Mặt nạ ngủ Nửa Đêm", note: "Phục hồi da sau một ngày dài, dùng 2 lần mỗi tuần", price: 450000, tone: "teal" },
];
const TABS = [["tat-ca", "Tất cả"], ["lam-sach", "Làm sạch"], ["duong-am", "Dưỡng ẩm"], ["bao-ve", "Bảo vệ"]] as const;

export function Collection() {
  const [tab, setTab] = useState<string>("tat-ca");
  const list = PRODUCTS.filter((p) => tab === "tat-ca" || p.cat === tab);
  return (
    <>
      <div className={s.tabs} role="tablist" aria-label="Lọc sản phẩm">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={s.tab} data-on={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>
      <ul className={s.prodGrid}>
        {list.map((p) => (
          <li key={p.id} className={s.prod}>
            <div className={s.prodArt} data-tone-art={p.tone} aria-hidden="true"><span className={s.prodBlob} /><span className={s.prodJar} /></div>
            <h3>{p.name}</h3>
            <p>{p.note}</p>
            <div className={s.prodRow}><strong>{vnd(p.price)}</strong><AddButton item={{ id: p.id, name: p.name, price: p.price }} className={s.mini}>Thêm</AddButton></div>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Số đếm khi vào khung nhìn. SSR hiện số cuối. */
export function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(decimals).replace(".", ",") + suffix;
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, suffix, decimals]);
  return <span ref={ref}>{to.toFixed(decimals).replace(".", ",")}{suffix}</span>;
}

/** Hiện dần khi cuộn tới: trạng thái ẩn chỉ đặt trong effect. */
export function RevealAll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-gsrv]")].filter((e) => e.getBoundingClientRect().top > window.innerHeight * 0.9);
    els.forEach((e) => { e.style.opacity = "0"; e.style.transform = "translateY(26px)"; e.style.transition = "opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1)"; });
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { const t = x.target as HTMLElement; t.style.opacity = "1"; t.style.transform = "none"; io.unobserve(t); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

type Errors = Partial<Record<"name" | "email" | "msg", string>>;
export function ContactForm() {
  const [err, setErr] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim(), msg = String(f.get("msg") || "").trim();
    const er: Errors = {};
    if (name.length < 2) er.name = "Vui lòng nhập tên của bạn.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) er.email = "Email chưa đúng định dạng.";
    if (msg.length < 10) er.msg = "Hãy mô tả vấn đề của da trong ít nhất 10 ký tự.";
    setErr(er);
    if (Object.keys(er).length === 0) { setDone(name); e.currentTarget.reset(); }
  };
  if (done) return <div className={s.formOk} role="status"><h3>Cảm ơn {done}, chúng tôi đã nhận được.</h3><p>Chuyên viên da liễu của Giọt Sương sẽ trả lời qua email trong vòng 24 giờ. (Biểu mẫu minh hoạ, chưa gửi dữ liệu đi đâu.)</p><button type="button" className={s.mini} onClick={() => setDone(null)}>Gửi câu hỏi khác</button></div>;
  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <label>Họ và tên<input name="name" autoComplete="name" aria-invalid={!!err.name} aria-describedby={err.name ? "gs-e1" : undefined} />{err.name && <em id="gs-e1" role="alert">{err.name}</em>}</label>
      <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "gs-e2" : undefined} />{err.email && <em id="gs-e2" role="alert">{err.email}</em>}</label>
      <label>Loại da<select name="skin" defaultValue="hon-hop"><option value="kho">Da khô</option><option value="hon-hop">Da hỗn hợp</option><option value="dau">Da dầu</option><option value="nhay-cam">Da nhạy cảm</option></select></label>
      <label className={s.wide}>Bạn muốn hỏi điều gì?<textarea name="msg" rows={4} aria-invalid={!!err.msg} aria-describedby={err.msg ? "gs-e3" : undefined} />{err.msg && <em id="gs-e3" role="alert">{err.msg}</em>}</label>
      <button type="submit" className={s.addBtn}><span>Gửi câu hỏi</span><b>→</b></button>
    </form>
  );
}

export function Newsletter() {
  const [state, setState] = useState<"idle" | "bad" | "ok">("idle");
  return (
    <form className={s.news} noValidate onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("email") || ""); const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); setState(ok ? "ok" : "bad"); if (ok) e.currentTarget.reset(); }}>
      <label htmlFor="gs-news">Nhận mẹo chăm da mỗi tuần</label>
      <div><input id="gs-news" name="email" type="email" placeholder="email@cua-ban.vn" autoComplete="email" aria-invalid={state === "bad"} /><button type="submit" className={s.mini}>Đăng ký</button></div>
      <p role="status">{state === "ok" ? "Đã đăng ký. Hẹn gặp bạn trong hộp thư (minh hoạ)." : state === "bad" ? "Email chưa hợp lệ, bạn kiểm tra lại nhé." : "Mỗi tuần một email ngắn, huỷ bất cứ lúc nào."}</p>
    </form>
  );
}
