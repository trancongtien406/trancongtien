"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../brand.module.css";
import { addToCart, fmt } from "./Nav";
const B = "/images/demos/giay-thanh-lich/";

const PRODUCTS = [
  { id: "coat", c: "Áo khoác", n: "Áo khoác dạ dáng dài", p: 2390000, img: "tile-coat.webp", d: "Dạ len pha, lót lụa, hai hàng cúc." },
  { id: "blazer", c: "Áo khoác", n: "Blazer be cắt ngắn", p: 1290000, img: "tile-blazer.webp", d: "Phom vai gọn, hợp quần ống suông." },
  { id: "knit", c: "Áo khoác", n: "Áo len mềm cổ cao", p: 490000, img: "tile-knit.webp", d: "Len merino mịn, giữ ấm không ngứa." },
  { id: "bag", c: "Phụ kiện", n: "Túi da quai xách", p: 1690000, img: "tile-bag.webp", d: "Da bò thuộc thảo mộc, khoá đồng." },
  { id: "sandal", c: "Giày", n: "Sandal quai mảnh gót nhọn", p: 1290000, img: "card-sandal.webp", d: "Gót 8 cm, đế lót êm." },
  { id: "heel", c: "Giày", n: "Cao gót mũi nhọn da lì", p: 1590000, img: "card-heel.webp", d: "Màu nude hợp mọi sắc da." },
  { id: "boot", c: "Giày", n: "Bốt cổ ngắn da mềm", p: 1890000, img: "card-boot.webp", d: "Khoá kéo bên hông, gót vuông 6 cm." },
  { id: "flat", c: "Giày", n: "Búp bê mũi tròn êm chân", p: 890000, img: "card-flat.webp", d: "Đi cả ngày không đau gót." },
];

const CRAFT = [
  { n: "01", t: "Chọn da", d: "Mỗi tấm da được xem bằng tay dưới ánh sáng ban ngày, loại bỏ vết sẹo và vân thô." },
  { n: "02", t: "Đo và cắt phom", d: "Phom chân dựa trên 1.200 số đo của phụ nữ Việt, cân bằng gót và mũi giày." },
  { n: "03", t: "May tay", d: "Đường chỉ kép may tay ở mũi và quai, bền hơn dán keo công nghiệp." },
  { n: "04", t: "Hoàn thiện", d: "Đánh bóng, kiểm tra độ nảy của gót và thử đi 30 phút trước khi đóng hộp." },
];

const STATS = [["12", "năm làm giày"], ["48.000", "đôi đã trao tay"], ["4,8", "điểm đánh giá trung bình"], ["7", "ngày đổi size miễn phí"]];

const LOOKS = [
  { img: "stairs.webp", t: "Dạo phố cuối tuần", d: "Áo thun đen, chân váy kem, cao gót nude." },
  { img: "tank.webp", t: "Cà phê sáng", d: "Áo ba lỗ be, quần short da, sandal quai mảnh." },
  { img: "showcase.webp", t: "Tủ đồ thanh lịch", d: "Ba tông be, nâu, kem: mặc lẫn với nhau đều hợp." },
];

const STORES = [
  { c: "TP. Hồ Chí Minh", a: "28 Đồng Khởi, Quận 1", h: "09:00 đến 21:30 mỗi ngày", t: "028 7300 1111", n: "Cửa hiệu chính, có phòng thử giày và dịch vụ chỉnh gót." },
  { c: "Hà Nội", a: "15 Tràng Tiền, Hoàn Kiếm", h: "09:30 đến 21:00 mỗi ngày", t: "024 7300 2222", n: "Cửa hiệu thứ hai, có quầy trà và ghế nghỉ." },
  { c: "Đà Nẵng", a: "72 Bạch Đằng, Hải Châu", h: "09:00 đến 21:00 mỗi ngày", t: "0236 7300 333", n: "Cửa hiệu nhỏ ven sông, nhận giày đặt theo số đo." },
];

const REVIEWS = [
  { q: "Đôi cao gót đi cả ngày hội nghị mà chân vẫn dễ chịu. Lần đầu tôi mua giày không cần dán miếng lót.", n: "Ngọc Anh", r: "Giám đốc truyền thông" },
  { q: "Áo khoác dạ lên dáng đẹp và nhẹ hơn tôi tưởng. Nhân viên chỉnh tay áo ngay tại cửa hiệu.", n: "Thu Trang", r: "Kiến trúc sư" },
  { q: "Đổi size rất nhanh, không bị hỏi han gì. Tôi mua thêm cho mẹ một đôi búp bê.", n: "Minh Châu", r: "Biên tập viên" },
];

const TIERS = [
  { n: "Thành viên Kem", p: "Miễn phí", f: ["Ưu đãi sinh nhật 10%", "Báo trước bộ sưu tập mới", "Đổi size trong 7 ngày"] },
  { n: "Thành viên Be", p: "490.000₫ / năm", f: ["Giảm 8% mọi đơn", "Chỉnh gót và vệ sinh giày miễn phí", "Giao hàng nhanh miễn phí", "Mời xem trước bộ sưu tập"], hot: true },
  { n: "Thành viên Nâu", p: "1.290.000₫ / năm", f: ["Giảm 15% mọi đơn", "Một đôi giày đặt theo số đo mỗi năm", "Stylist riêng qua video", "Ưu tiên đổi trả 30 ngày"] },
];

const FAQ = [
  { q: "Làm sao chọn đúng size giày?", a: "Đo chân vào buổi chiều khi chân hơi nở nhất, đặt gót sát tường và đo đến ngón dài nhất. Đối chiếu với bảng size trong trang sản phẩm; nếu giữa hai size, hãy chọn size lớn hơn và dùng miếng lót gót." },
  { q: "Chính sách đổi trả thế nào?", a: "Đổi size miễn phí trong 7 ngày kể từ khi nhận hàng, giày chưa mang ra đường và còn đủ hộp. Đổi sang mẫu khác cùng giá được áp dụng tương tự." },
  { q: "Giày có bảo hành không?", a: "Có. Chúng tôi bảo hành đường chỉ và đế trong 12 tháng. Với thành viên Be và Nâu, dịch vụ chỉnh gót, thay đế mỏng được miễn phí." },
  { q: "Có giao hàng toàn quốc không?", a: "Có. Nội thành TP. Hồ Chí Minh và Hà Nội giao trong 24 giờ, các tỉnh khác từ 2 đến 4 ngày. Đơn từ 1.500.000₫ được miễn phí vận chuyển." },
  { q: "Tôi có thể đặt giày theo số đo không?", a: "Có, tại cửa hiệu Đà Nẵng và TP. Hồ Chí Minh. Thợ sẽ đo hai chân, tư vấn dáng gót và hẹn bạn thử phom sau khoảng ba tuần." },
  { q: "Bảo quản áo khoác dạ như thế nào?", a: "Treo bằng móc vai rộng, tránh phơi nắng trực tiếp và giặt khô tối đa hai lần mỗi mùa. Dùng bàn chải lông mềm để làm sạch bụi hằng tuần." },
];

const SIZES = ["35", "36", "37", "38", "39", "40"];

export function Extra() {
  const root = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState("Tất cả");
  const [store, setStore] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const list = PRODUCTS.filter((p) => cat === "Tất cả" || p.c === cat);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-rv]").forEach((n) => gsap.fromTo(n, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: n, start: "top 88%", once: true } }));
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        const raw = n.dataset.count || "";
        const target = parseFloat(raw.replace(".", "").replace(",", "."));
        const dec = raw.includes(",");
        const o = { v: 0 };
        ScrollTrigger.create({ trigger: n, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: target, duration: 1.4, ease: "power2.out", onUpdate: () => { n.textContent = dec ? o.v.toFixed(1).replace(".", ",") : Math.round(o.v).toLocaleString("vi-VN"); }, onComplete: () => { n.textContent = raw; } }) });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      {/* BỘ SƯU TẬP */}
      <section className={styles.xs} id="bo-suu-tap">
        <div className={styles.xw}>
          <p className={styles.xk} data-rv>BỘ SƯU TẬP THU ĐÔNG</p>
          <h2 className={styles.xh} data-rv>Chọn một món, <em>hợp cả tủ đồ</em></h2>
          <div className={styles.chips} role="group" aria-label="Lọc sản phẩm">
            {["Tất cả", "Áo khoác", "Giày", "Phụ kiện"].map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <ul className={styles.prods}>
            {list.map((p) => (
              <li key={p.id} className={styles.prod}>
                <div className={styles.prodImg}><img src={B + p.img} alt={p.n} width={420} height={300} loading="lazy" /></div>
                <p className={styles.prodC}>{p.c}</p>
                <h3>{p.n}</h3>
                <p className={styles.prodD}>{p.d}</p>
                <div className={styles.cBuy}><b>{fmt(p.p)}</b><button type="button" onClick={() => addToCart(p.id, p.n, p.p)} aria-label={`Thêm ${p.n} vào giỏ`}>Thêm vào giỏ</button></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className={`${styles.xs} ${styles.xTan}`} id="lookbook">
        <div className={styles.xw}>
          <p className={styles.xk} data-rv>LOOKBOOK</p>
          <h2 className={styles.xh} data-rv>Ba cách mặc, <em>một dáng đi</em></h2>
          <ul className={styles.looks}>
            {LOOKS.map((l) => (
              <li key={l.t}><div className={styles.lookImg}><img src={B + l.img} alt={l.t + " (ảnh minh hoạ)"} width={800} height={800} loading="lazy" /></div><h3>{l.t}</h3><p>{l.d}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* THỦ CÔNG */}
      <section className={styles.xs} id="thu-cong">
        <div className={styles.xw}>
          <p className={styles.xk} data-rv>CHẤT LƯỢNG TỪNG CHI TIẾT</p>
          <h2 className={styles.xh} data-rv>Một đôi giày đi qua <em>bốn đôi tay</em></h2>
          <ol className={styles.craft}>
            {CRAFT.map((c) => <li key={c.n}><b>{c.n}</b><h3>{c.t}</h3><p>{c.d}</p></li>)}
          </ol>
          <ul className={styles.stats}>
            {STATS.map(([n, l]) => <li key={l}><b data-count={n}>{n}</b><span>{l}</span></li>)}
          </ul>
        </div>
      </section>

      {/* CỬA HIỆU */}
      <section className={`${styles.xs} ${styles.xTan}`} id="cua-hieu">
        <div className={styles.xw}>
          <p className={styles.xk} data-rv>CỬA HIỆU</p>
          <h2 className={styles.xh} data-rv>Ghé thử giày, <em>uống một tách trà</em></h2>
          <div className={styles.storeBox}>
            <div className={styles.storeTabs} role="tablist" aria-label="Chọn cửa hiệu">
              {STORES.map((s, i) => <button key={s.c} role="tab" type="button" aria-selected={store === i} onClick={() => setStore(i)}>{s.c}</button>)}
            </div>
            <div className={styles.storePanel} role="tabpanel">
              <h3>{STORES[store].c}</h3>
              <p>{STORES[store].n}</p>
              <dl>
                <div><dt>Địa chỉ</dt><dd>{STORES[store].a}</dd></div>
                <div><dt>Giờ mở cửa</dt><dd>{STORES[store].h}</dd></div>
                <div><dt>Điện thoại</dt><dd>{STORES[store].t}</dd></div>
              </dl>
              <a className={styles.btnDark} href="#lien-he">Đặt lịch thử giày</a>
            </div>
          </div>
        </div>
      </section>

      {/* ĐÁNH GIÁ */}
      <section className={styles.xs} id="danh-gia">
        <div className={styles.xw}>
          <p className={styles.xk} data-rv>KHÁCH HÀNG NÓI GÌ</p>
          <h2 className={styles.xh} data-rv>Lời của những người <em>đã mang giày</em></h2>
          <ul className={styles.revs}>
            {REVIEWS.map((r) => (
              <li key={r.n}><blockquote>&ldquo;{r.q}&rdquo;</blockquote><p><b>{r.n}</b><span>{r.r}</span></p></li>
            ))}
          </ul>
          <p className={styles.fine}>Lời đánh giá minh hoạ, không phải khách hàng thật.</p>
        </div>
      </section>

      {/* THÀNH VIÊN */}
      <section className={`${styles.xs} ${styles.xTan}`} id="thanh-vien">
        <div className={styles.xw}>
          <p className={styles.xk} data-rv>THẺ THÀNH VIÊN</p>
          <h2 className={styles.xh} data-rv>Càng đồng hành, <em>càng nhiều đặc quyền</em></h2>
          <div className={styles.tiers}>
            {TIERS.map((t) => (
              <article key={t.n} className={`${styles.tier} ${t.hot ? styles.tierHot : ""}`}>
                <h3>{t.n}</h3><p className={styles.tierP}>{t.p}</p>
                <ul>{t.f.map((f) => <li key={f}>{f}</li>)}</ul>
                <a className={t.hot ? styles.btnLight : styles.btnDark} href="#lien-he">Đăng ký</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HỎI ĐÁP */}
      <section className={styles.xs} id="hoi-dap">
        <div className={`${styles.xw} ${styles.faqW}`}>
          <div>
            <p className={styles.xk}>HỎI ĐÁP</p>
            <h2 className={styles.xh}>Điều bạn <em>thường hỏi</em></h2>
          </div>
          <div>
            {FAQ.map((f, i) => (
              <div key={f.q} className={styles.faqI}>
                <h3><button type="button" id={`gf-b-${i}`} aria-expanded={faq === i} aria-controls={`gf-p-${i}`} onClick={() => setFaq(faq === i ? null : i)}><span>{f.q}</span><i aria-hidden="true">{faq === i ? "−" : "+"}</i></button></h3>
                <div id={`gf-p-${i}`} role="region" aria-labelledby={`gf-b-${i}`} hidden={faq !== i}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}

function Contact() {
  const [v, setV] = useState({ name: "", phone: "", kind: "Đặt lịch thử giày", size: "", note: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((o) => ({ ...o, [k]: e.target.value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (v.name.trim().length < 2) x.name = "Vui lòng nhập họ tên.";
    if (!/^(0|\+84)\d{8,10}$/.test(v.phone.replace(/[\s.-]/g, ""))) x.phone = "Số điện thoại chưa hợp lệ.";
    if (!v.size) x.size = "Hãy chọn size giày.";
    setErr(x);
    if (!Object.keys(x).length) setDone(true);
  };
  return (
    <section className={styles.contact} id="lien-he">
      <div className={`${styles.xw} ${styles.contactG}`}>
        <div>
          <p className={styles.xk}>LIÊN HỆ</p>
          <h2 className={styles.xh}>Hẹn một buổi <em>thử giày</em></h2>
          <p className={styles.cP}>Để lại thông tin, cửa hiệu sẽ gọi xác nhận lịch trong ngày. Bạn cũng có thể đặt các món đã thêm vào giỏ qua biểu mẫu này.</p>
        </div>
        {done ? (
          <div className={styles.thanks} role="status">
            <h3>Cảm ơn {v.name.split(" ").slice(-1)[0]}!</h3>
            <p>Chúng tôi đã nhận yêu cầu &ldquo;{v.kind.toLowerCase()}&rdquo; (size {v.size}) và sẽ gọi số {v.phone} để xác nhận. (Biểu mẫu minh hoạ, không gửi dữ liệu đi đâu.)</p>
            <button type="button" className={styles.btnDark} onClick={() => { setDone(false); setV({ name: "", phone: "", kind: "Đặt lịch thử giày", size: "", note: "" }); }}>Gửi yêu cầu khác</button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <label>Họ và tên<input value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name} />{err.name && <em role="alert">{err.name}</em>}</label>
            <label>Số điện thoại<input value={v.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <em role="alert">{err.phone}</em>}</label>
            <label>Bạn cần gì?<select value={v.kind} onChange={set("kind")}><option>Đặt lịch thử giày</option><option>Đặt hàng từ giỏ</option><option>Đặt giày theo số đo</option><option>Tư vấn phối đồ</option></select></label>
            <label>Size giày<select value={v.size} onChange={set("size")} aria-invalid={!!err.size}><option value="">Chọn size</option>{SIZES.map((s) => <option key={s}>{s}</option>)}</select>{err.size && <em role="alert">{err.size}</em>}</label>
            <label className={styles.wide}>Ghi chú<textarea rows={3} value={v.note} onChange={set("note")} /></label>
            <button type="submit" className={`${styles.btnLight} ${styles.wide}`}>Gửi yêu cầu</button>
          </form>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  const [mail, setMail] = useState("");
  const [st, setSt] = useState<"idle" | "bad" | "ok">("idle");
  const sub = (e: FormEvent) => { e.preventDefault(); setSt(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) ? "ok" : "bad"); };
  return (
    <footer className={styles.foot}>
      <form className={styles.news} onSubmit={sub} noValidate>
        <label htmlFor="gt-mail">Nhận thư báo bộ sưu tập mới và ưu đãi</label>
        <div><input id="gt-mail" type="email" placeholder="email của bạn" value={mail} onChange={(e) => { setMail(e.target.value); setSt("idle"); }} aria-invalid={st === "bad"} /><button type="submit">Đăng ký</button></div>
        <p role="status">{st === "ok" ? "Đã đăng ký, cảm ơn bạn. (Minh hoạ)" : st === "bad" ? "Email chưa hợp lệ." : "Mỗi tháng một thư, không làm phiền."}</p>
      </form>
      <p className={styles.fBig} aria-hidden="true">THANH</p>
      <div className={styles.fCols}>
        <p>Giày Thanh Lịch<br />28 Đồng Khởi, Quận 1, TP. Hồ Chí Minh<br />Mở cửa 09:00 đến 21:30 mỗi ngày</p>
        <ul>
          <li><a href="#giay">Giày</a></li><li><a href="#bo-suu-tap">Bộ sưu tập</a></li><li><a href="#lookbook">Lookbook</a></li><li><a href="#cua-hieu">Cửa hiệu</a></li><li><a href="#thanh-vien">Thẻ thành viên</a></li><li><a href="#hoi-dap">Hỏi đáp</a></li>
        </ul>
        <ul>
          <li><a href="#lien-he">Liên hệ</a></li><li>Instagram</li><li>Facebook</li><li>TikTok</li><li>Chính sách đổi trả</li>
        </ul>
        <p className={styles.fNote}>© 2026 Giày Thanh Lịch. Trang minh hoạ: tên thương hiệu, giá, địa chỉ, số điện thoại và lời đánh giá là giả định; ảnh từ Pexels.</p>
      </div>
    </footer>
  );
}
