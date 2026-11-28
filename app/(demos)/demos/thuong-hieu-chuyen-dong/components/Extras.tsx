"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => { const k = Math.min(1, (t - t0) / 1500); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix; if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, suffix]);
  return <span ref={ref}>{to}{suffix}</span>;
}

/** Hiện dần khi cuộn tới (trạng thái ẩn chỉ đặt trong effect). */
export function RevealAll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-rv]")].filter((e) => e.getBoundingClientRect().top > window.innerHeight * 0.92);
    els.forEach((e) => { e.style.opacity = "0"; e.style.transform = "translateY(28px)"; e.style.transition = "opacity .9s ease, transform .9s cubic-bezier(.2,.8,.2,1)"; });
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { const t = x.target as HTMLElement; t.style.opacity = "1"; t.style.transform = "none"; io.unobserve(t); } }), { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

export function Numbers() {
  return (
    <section className={s.band} data-shape="none" data-chap="quy-trinh" aria-labelledby="dh-num">
      <h2 id="dh-num" className={s.h2p} data-rv="">Làm một mình, <em>nhưng làm kỹ.</em></h2>
      <div className={s.numGrid}>
        <div data-rv=""><b><Counter to={120} suffix="+" /></b><p>dự án đã bàn giao (số liệu minh hoạ)</p></div>
        <div data-rv=""><b><Counter to={9} /></b><p>năm làm thương hiệu và sản phẩm số</p></div>
        <div data-rv=""><b><Counter to={24} suffix=" giờ" /></b><p>đến bản chạy thử đầu tiên</p></div>
        <div data-rv=""><b><Counter to={98} suffix="%" /></b><p>khách quay lại với dự án thứ hai</p></div>
      </div>
    </section>
  );
}

const TOOLS = ["Next.js", "React", "Three.js", "WebGL", "GSAP", "Blender", "After Effects", "Figma", "Cinema 4D", "Flutter", "Node.js", "PostgreSQL"];
export function Tools() {
  return (
    <section className={s.band} data-shape="none" data-chap="quy-trinh" aria-labelledby="dh-tools">
      <div className={s.toolsHead} data-rv="">
        <h2 id="dh-tools" className={s.h2p}>Bộ công cụ <em>tôi tin dùng.</em></h2>
        <p>Chọn công cụ theo bài toán, không theo thời thượng. Trang bạn đang xem dùng Next.js, Three.js và GSAP.</p>
      </div>
      <ul className={s.toolList} data-rv="">{TOOLS.map((t) => <li key={t}>{t}</li>)}</ul>
    </section>
  );
}

const PLANS = [
  ["Trang ra mắt", "từ 9 triệu", "Một trang dài, đủ để bán một thứ", ["Thiết kế và dựng trong 24 đến 72 giờ", "Chuẩn di động, tốc độ cao", "Form liên hệ và Zalo", "Hướng dẫn tự sửa chữ"], false],
  ["Website thương hiệu", "từ 28 triệu", "5 đến 8 trang, có hiệu ứng riêng", ["Thiết kế theo bộ nhận diện của bạn", "Hiệu ứng chuyển động và 3D", "SEO nền tảng, đo lường", "Bảo hành 3 tháng"], true],
  ["Phim và 3D", "từ 15 triệu", "Phim 30 đến 60 giây hoặc bộ ảnh render", ["Kịch bản và storyboard", "Dựng hình, âm thanh, phụ đề", "Bản dọc, ngang và vuông", "Tệp gốc bàn giao đầy đủ"], false],
] as const;
export function Pricing() {
  return (
    <section className={s.band} id="bang-gia" data-shape="none" data-chap="quy-trinh" aria-labelledby="dh-price">
      <h2 id="dh-price" className={s.h2p} data-rv="">Giá rõ ràng, <em>không tính theo giờ.</em></h2>
      <ul className={s.priceGrid}>
        {PLANS.map(([n, p, sub, feats, hot]) => (
          <li key={n} className={s.plan} data-hot={hot} data-rv="">
            <h3>{n}</h3><strong>{p}</strong><p className={s.planSub}>{sub}</p>
            <ul>{feats.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className={hot ? s.pill : `${s.pill} ${s.pillGhost}`} href="#bat-dau">Bắt đầu</a>
          </li>
        ))}
      </ul>
      <p className={s.note}>Mức giá là minh hoạ. Báo giá cuối cùng tuỳ phạm vi dự án.</p>
    </section>
  );
}

const QUOTES = [
  ["Bản chạy thử đến sau một ngày mà đã giống hệt thứ chúng tôi tưởng tượng. Chốt luôn.", "Chủ cửa hàng nội thất, Hà Nội"],
  ["Phim quảng cáo 15 giây làm lượt xem tăng gấp ba, và tôi chỉ phải nói chuyện với một người.", "Quản lý thương hiệu mỹ phẩm, TP.HCM"],
  ["Trang web tải nhanh, đẹp và dễ sửa. Đội bán hàng tự cập nhật bảng giá mà không cần gọi lại.", "Giám đốc công ty cơ khí, Đà Nẵng"],
];
export function Quotes() {
  return (
    <section className={s.band} data-shape="none" data-chap="lien-he" aria-labelledby="dh-q">
      <h2 id="dh-q" className={s.h2p} data-rv="">Khách hàng <em>nói gì.</em></h2>
      <ul className={s.quoteGrid}>
        {QUOTES.map(([q, who]) => (<li key={who} data-rv=""><blockquote>“{q}”</blockquote><cite>{who}</cite></li>))}
      </ul>
      <p className={s.note}>Lời nhận xét là nội dung minh hoạ, không phải khách hàng thật.</p>
    </section>
  );
}

const NOTES = [
  ["Vì sao website chậm mất khách", "Ba lỗi phổ biến khiến trang tải quá năm giây và cách sửa trong một buổi chiều.", "6 phút đọc"],
  ["Phim 15 giây: kể gì trong ba giây đầu?", "Cách dựng nhịp để người xem không lướt qua quảng cáo của bạn.", "5 phút đọc"],
  ["3D trên web mà không nặng máy", "Dùng hạt, đổ bóng giả và nén mô hình để trang vẫn mượt trên điện thoại cũ.", "8 phút đọc"],
];
export function Notes() {
  return (
    <section className={s.band} data-shape="none" data-chap="lien-he" aria-labelledby="dh-notes">
      <h2 id="dh-notes" className={s.h2p} data-rv="">Ghi chép <em>nghề.</em></h2>
      <ul className={s.noteGrid}>
        {NOTES.map(([t, d, m], i) => (<li key={t} data-rv=""><span>{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p><small>{m}</small></li>))}
      </ul>
    </section>
  );
}

const FAQ = [
  ["Bao lâu thì tôi nhận được bản đầu tiên?", "Với trang ra mắt, bản chạy thử đến trong vòng 24 giờ sau khi bạn gửi thông tin. Website nhiều trang cần 3 đến 5 ngày cho bản đầu."],
  ["Tôi thật sự chỉ trả tiền khi hài lòng?", "Đúng. Bạn xem bản chạy thử trước. Nếu không ưng, bạn không nợ gì. Điều khoản này áp dụng cho trang ra mắt và website thương hiệu."],
  ["Tôi có tự sửa nội dung được không?", "Có. Tôi giao kèm hướng dẫn ngắn hoặc cài sẵn trang quản trị để bạn tự đổi chữ, ảnh và bảng giá."],
  ["Bạn có làm việc với doanh nghiệp ở tỉnh không?", "Có. Tôi làm việc từ xa với khách trên cả nước, họp qua video và gửi bản chạy thử bằng đường dẫn."],
  ["Hosting và tên miền thì sao?", "Tôi lo giúp: cài đặt, trỏ tên miền, SSL và sao lưu. Bạn đứng tên sở hữu tên miền và mã nguồn."],
  ["Phim motion giao những định dạng nào?", "Bản ngang 16:9, dọc 9:16 và vuông 1:1, kèm phụ đề tiếng Việt và tệp gốc nếu bạn cần."],
  ["Làm gì nếu tôi chưa có logo hay hình ảnh?", "Tôi có thể thiết kế logo gọn và đề xuất nguồn ảnh bản quyền hoặc dựng 3D để thay ảnh chụp."],
  ["Sau bàn giao tôi có được hỗ trợ không?", "Có. Mỗi dự án có thời gian bảo hành sửa lỗi, và bạn có thể thuê gói duy trì hằng tháng nếu cần cập nhật liên tục."],
];
export function Faq() {
  return (
    <section className={s.band} id="hoi-dap" data-shape="none" data-chap="lien-he" aria-labelledby="dh-faq">
      <h2 id="dh-faq" className={s.h2p} data-rv="">Hỏi đáp</h2>
      <div className={s.faqList} data-rv="">{FAQ.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}</div>
    </section>
  );
}

type Err = Partial<Record<"name" | "contact" | "msg", string>>;
export function StartForm() {
  const [err, setErr] = useState<Err>({});
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim(), contact = String(f.get("contact") || "").trim(), msg = String(f.get("msg") || "").trim();
    const er: Err = {};
    if (name.length < 2) er.name = "Cho tôi biết tên của bạn nhé.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact) && !/^(\+?84|0)\d{9}$/.test(contact.replace(/[\s.-]/g, ""))) er.contact = "Nhập email hoặc số điện thoại / Zalo hợp lệ.";
    if (msg.length < 10) er.msg = "Mô tả ngắn dự án của bạn (ít nhất 10 ký tự).";
    setErr(er);
    if (Object.keys(er).length === 0) { setDone(name); e.currentTarget.reset(); }
  };
  return (
    <section className={s.start} id="bat-dau" data-shape="none" data-chap="lien-he" aria-labelledby="dh-start">
      <div data-rv="">
        <h2 id="dh-start" className={s.h2p}>Bắt đầu <em>dự án.</em></h2>
        <p className={s.startP}>Kể cho tôi nghe bạn cần gì, ngân sách khoảng bao nhiêu và khi nào cần xong. Tôi trả lời trong 24 giờ, kèm hướng đi đầu tiên.</p>
      </div>
      {done ? (
        <div className={s.formOk} role="status" data-rv=""><h3>Cảm ơn {done}, tôi đã nhận được.</h3><p>Tôi sẽ trả lời trong vòng 24 giờ. (Biểu mẫu minh hoạ, dữ liệu chưa được gửi đi đâu.)</p><button type="button" className={`${s.pill} ${s.pillGhost}`} onClick={() => setDone(null)}>Gửi tin khác</button></div>
      ) : (
        <form className={s.form} onSubmit={submit} noValidate data-rv="">
          <label>Họ và tên<input name="name" autoComplete="name" aria-invalid={!!err.name} />{err.name && <em role="alert">{err.name}</em>}</label>
          <label>Email hoặc Zalo<input name="contact" autoComplete="email" aria-invalid={!!err.contact} />{err.contact && <em role="alert">{err.contact}</em>}</label>
          <label>Bạn cần gì?<select name="kind" defaultValue="web"><option value="web">Website</option><option value="film">Phim chuyển động</option><option value="app">Ứng dụng</option><option value="soft">Phần mềm</option></select></label>
          <label>Ngân sách<select name="budget" defaultValue="mid"><option value="low">Dưới 10 triệu</option><option value="mid">10 đến 30 triệu</option><option value="high">Trên 30 triệu</option></select></label>
          <label className={s.wide}>Mô tả ngắn<textarea name="msg" rows={4} aria-invalid={!!err.msg} />{err.msg && <em role="alert">{err.msg}</em>}</label>
          <div className={s.wide}><button type="submit" className={s.pill}>Gửi cho Minh</button></div>
        </form>
      )}
    </section>
  );
}
