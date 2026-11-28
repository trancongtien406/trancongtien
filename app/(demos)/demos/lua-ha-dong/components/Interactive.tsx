"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../brand.module.css";
import { Fabric, type PALETTES } from "./Art";

type V = keyof typeof PALETTES | "aodai";
interface Item { id: string; name: string; cat: string; price: number; v: V; note: string; pos?: string }

const ITEMS: Item[] = [
  { id: "a1", name: "Bộ áo dài lụa in số", cat: "Áo dài", price: 1250000, v: "aodai", note: "Lụa tơ pha cotton, in số 1200 dpi" },
  { id: "a2", name: "Áo dài lụa hoa cúc vàng", cat: "Áo dài", price: 1680000, v: "cuc", note: "Cổ cao, nút khâu tay" },
  { id: "k1", name: "Khăn choàng lụa hoa sen", cat: "Khăn", price: 690000, v: "mai", note: "Khổ 90×180 cm, viền cuốn tay" },
  { id: "k2", name: "Khăn vuông lụa trúc mai", cat: "Khăn", price: 420000, v: "truc", note: "Khổ 70×70 cm, in hai mặt" },
  { id: "k3", name: "Khăn quàng lụa nhuộm lam", cat: "Khăn", price: 560000, v: "lam", note: "Nhuộm chàm tự nhiên, mỗi mẻ một sắc" },
  { id: "d1", name: "Đầm lụa hoa cúc vàng", cat: "Đầm", price: 1480000, v: "cuc", note: "Dáng suông, lót cotton" },
  { id: "d2", name: "Đầm lụa sen hồng", cat: "Đầm", price: 1390000, v: "sen", note: "Cổ đức, tay lỡ", pos: "30% 40%" },
  { id: "v1", name: "Lụa in hoa sen, mét", cat: "Vải mét", price: 320000, v: "sen", note: "Khổ 1,4 m, bán từ 1 mét" },
  { id: "v2", name: "Lụa xước trúc mai, mét", cat: "Vải mét", price: 290000, v: "truc", note: "Khổ 1,4 m, vân chéo" },
  { id: "v3", name: "Lụa nhuộm lam, mét", cat: "Vải mét", price: 340000, v: "lam", note: "Khổ 1,2 m, chàm tự nhiên" },
];
const CATS = ["Tất cả", "Áo dài", "Khăn", "Đầm", "Vải mét"];
const vnd = (n: number) => `${new Intl.NumberFormat("vi-VN").format(n)}đ`;

export function Shop() {
  const [cat, setCat] = useState("Tất cả");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const list = useMemo(() => ITEMS.filter((i) => cat === "Tất cả" || i.cat === cat), [cat]);
  const lines = ITEMS.filter((i) => cart[i.id]);
  const total = lines.reduce((s, i) => s + i.price * cart[i.id], 0);
  const count = lines.reduce((s, i) => s + cart[i.id], 0);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(""), 2200);
    return () => clearTimeout(t);
  }, [msg]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ne: Record<string, string> = {};
    if (String(f.get("ten") ?? "").trim().length < 2) ne.ten = "Nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(String(f.get("sdt") ?? "").replace(/\s/g, ""))) ne.sdt = "Số điện thoại gồm 10 số, bắt đầu bằng 0.";
    setErr(ne);
    if (Object.keys(ne).length) return;
    setDone(`LHD-${String(Date.now()).slice(-6)}`);
    setCart({});
  };

  return (
    <section id="cua-hang" className={`${styles.mSec} ${styles.shopSec}`} aria-labelledby="sh-h">
      <div className={styles.mWrap}>
        <p className={styles.kicker}>Mua ngay</p>
        <h2 id="sh-h" className={styles.mH}>Lụa có sẵn tại xưởng.</h2>
        <div className={styles.tabsL} role="tablist" aria-label="Lọc theo loại">
          {CATS.map((c) => <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <ul className={styles.shopGrid}>
          {list.map((i) => (
            <li key={i.id}>
              <div className={styles.shopImg}>
                <Fabric variant={i.v} alt={`${i.name}, ảnh minh hoạ`} style={{ objectPosition: i.pos }} />
                <button type="button" className={styles.shopAdd} onClick={() => { setDone(null); setCart((c) => ({ ...c, [i.id]: (c[i.id] ?? 0) + 1 })); setMsg(`Đã thêm “${i.name}” vào giỏ`); }}>Thêm vào giỏ</button>
              </div>
              <h3>{i.name}</h3>
              <p>{i.note}</p>
              <b>{vnd(i.price)}</b>
            </li>
          ))}
        </ul>
        <p className={styles.toastL} role="status" aria-live="polite">{msg}</p>

        <div className={styles.cartBox} aria-live="polite">
          {done ? (
            <div className={styles.okL}><b>Đã gửi yêu cầu đặt hàng</b><p>Mã {done}. Xưởng sẽ gọi xác nhận trong ngày. (Trang minh hoạ, không tạo đơn thật.)</p></div>
          ) : count === 0 ? (
            <p className={styles.cartEmpty}>Giỏ đang trống. Bấm “Thêm vào giỏ” trên sản phẩm bạn thích.</p>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3>Giỏ của bạn ({count})</h3>
              <ul>
                {lines.map((i) => (
                  <li key={i.id}>
                    <span>{i.name}</span>
                    <span className={styles.qL}>
                      <button type="button" aria-label={`Giảm ${i.name}`} onClick={() => setCart((c) => { const n = { ...c, [i.id]: c[i.id] - 1 }; if (n[i.id] <= 0) delete n[i.id]; return n; })}>−</button>
                      <output>{cart[i.id]}</output>
                      <button type="button" aria-label={`Tăng ${i.name}`} onClick={() => setCart((c) => ({ ...c, [i.id]: c[i.id] + 1 }))}>+</button>
                    </span>
                    <b>{vnd(i.price * cart[i.id])}</b>
                  </li>
                ))}
              </ul>
              <div className={styles.cartRow}>
                <label>Họ tên<input name="ten" autoComplete="name" aria-invalid={!!err.ten} /><small role="alert">{err.ten}</small></label>
                <label>Số điện thoại<input name="sdt" inputMode="tel" autoComplete="tel" aria-invalid={!!err.sdt} /><small role="alert">{err.sdt}</small></label>
                <button type="submit" className={styles.planBtn}>Gửi yêu cầu · {vnd(total)}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ["Lụa của xưởng có giặt máy được không?", "Có. Mực phản ứng và mực thăng hoa đều qua thử giặt 50 lần. Bạn nên giặt máy chế độ nhẹ, nước lạnh, đựng trong túi lưới và phơi nơi thoáng, không phơi trực tiếp dưới nắng gắt."],
  ["Đặt in lụa tối thiểu bao nhiêu mét?", "Từ 5 mét cho mỗi họa tiết. Nếu muốn thử trước, xưởng nhận in thử khổ A3 hoặc 1 mét với phí 350.000đ, trừ vào đơn lô sau."],
  ["Mình cần gửi file thiết kế định dạng gì?", "Ưu tiên PDF, AI, PSD hoặc PNG độ phân giải từ 300 dpi. Nếu bạn chỉ có ảnh chụp họa tiết, chị Mai bên thiết kế sẽ số hoá lại miễn phí cho đơn lô."],
  ["Màu in có giống bản thử trên màn hình không?", "Chúng tôi gửi bản thử vật lý và chỉnh màu cùng bạn trước khi chạy lô. Màn hình mỗi người hiển thị khác nhau nên bản thử trên vải mới là chuẩn."],
  ["Thời gian hoàn thành một đơn là bao lâu?", "In thử 3 ngày. In lô dưới 100 mét khoảng 7–10 ngày làm việc. May đo áo dài 12–15 ngày gồm hai buổi đo và thử."],
  ["Xưởng giao hàng toàn quốc không?", "Có, giao qua đơn vị vận chuyển, đóng hộp chống ẩm. Đơn từ 1.500.000đ miễn phí vận chuyển; khách nội thành Hà Nội có thể ghé xưởng nhận."],
  ["Có nhận in lụa cho thương hiệu thời trang nhỏ không?", "Có. Chúng tôi làm việc với nhiều nhà may và thương hiệu nhỏ, giữ công thức màu riêng để mỗi lô ra đúng sắc. Xem gói Đối tác ở bảng giá."],
  ["Lụa nhuộm lam có phai không?", "Chàm tự nhiên có thể ra nhẹ màu ở 2–3 lần giặt đầu; sau đó ổn định. Mỗi mẻ nhuộm hơi khác sắc độ, đó là nét riêng của sản phẩm."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="hoi-dap" className={`${styles.mSec} ${styles.mGreen}`} aria-labelledby="fq-h">
      <div className={`${styles.mWrap} ${styles.faqGrid}`}>
        <div>
          <p className={styles.kicker}>Hỏi đáp</p>
          <h2 id="fq-h" className={styles.mH}>Câu hay được hỏi.</h2>
        </div>
        <ul className={styles.faqL}>
          {FAQ.map(([q, a], i) => (
            <li key={q}>
              <h3>
                <button type="button" id={`fb-${i}`} aria-expanded={open === i} aria-controls={`fp-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{q}</span><i aria-hidden="true">{open === i ? "−" : "+"}</i>
                </button>
              </h3>
              <div id={`fp-${i}`} role="region" aria-labelledby={`fb-${i}`} hidden={open !== i}><p>{a}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact() {
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ne: Record<string, string> = {};
    if (String(f.get("ten") ?? "").trim().length < 2) ne.ten = "Vui lòng nhập tên.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(f.get("email") ?? ""))) ne.email = "Email chưa đúng định dạng.";
    const m = Number(f.get("met"));
    if (f.get("loai") === "lo" && !(m >= 5)) ne.met = "In lô cần tối thiểu 5 mét.";
    if (String(f.get("nd") ?? "").trim().length < 10) ne.nd = "Mô tả ít nhất 10 ký tự.";
    setErr(ne);
    if (!Object.keys(ne).length) { setOk(true); e.currentTarget.reset(); }
  };
  return (
    <section id="lien-he" className={styles.mSec} aria-labelledby="ct-h">
      <div className={`${styles.mWrap} ${styles.ctGrid}`}>
        <div>
          <p className={styles.kicker}>Liên hệ</p>
          <h2 id="ct-h" className={styles.mH}>Kể cho xưởng nghe bạn muốn in gì.</h2>
          <dl className={styles.ctDl}>
            <div><dt>Xưởng</dt><dd>Làng nghề Vạn Phúc, Hà Đông, Hà Nội</dd></div>
            <div><dt>Giờ làm việc</dt><dd>8:00–17:30, thứ Hai đến thứ Bảy</dd></div>
            <div><dt>Điện thoại</dt><dd>0900 000 054</dd></div>
            <div><dt>Email</dt><dd>xin-chao@luahadong.example</dd></div>
          </dl>
        </div>
        {ok ? (
          <div className={styles.okL} role="status"><b>Đã nhận yêu cầu</b><p>Cảm ơn bạn. Xưởng sẽ phản hồi trong một ngày làm việc. (Trang minh hoạ: biểu mẫu không gửi dữ liệu đi đâu.)</p><button type="button" className={styles.planBtn} onClick={() => setOk(false)}>Gửi yêu cầu khác</button></div>
        ) : (
          <form className={styles.ctForm} onSubmit={submit} noValidate>
            <label>Tên của bạn<input name="ten" autoComplete="name" aria-invalid={!!err.ten} /><small role="alert">{err.ten}</small></label>
            <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={!!err.email} /><small role="alert">{err.email}</small></label>
            <label>Loại yêu cầu
              <select name="loai" defaultValue="thu">
                <option value="thu">In thử</option><option value="lo">In lô (từ 5 mét)</option><option value="may">May đo áo dài</option><option value="doitac">Đối tác / thương hiệu</option>
              </select>
            </label>
            <label>Số mét dự kiến<input name="met" inputMode="numeric" placeholder="ví dụ 20" aria-invalid={!!err.met} /><small role="alert">{err.met}</small></label>
            <label>Mô tả<textarea name="nd" rows={4} aria-invalid={!!err.nd} /><small role="alert">{err.nd}</small></label>
            <button type="submit" className={styles.planBtn}>Gửi yêu cầu</button>
          </form>
        )}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [st, setSt] = useState<"idle" | "bad" | "ok">("idle");
  return (
    <form className={styles.newsL} noValidate aria-label="Đăng ký bản tin" onSubmit={(e) => { e.preventDefault(); setSt(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(new FormData(e.currentTarget).get("email") ?? "")) ? "ok" : "bad"); }}>
      <p>Nhận bản tin theo mùa: họa tiết mới, lô lụa vừa ra và lời nhắn từ xưởng.</p>
      <div>
        <label className={styles.srOnly} htmlFor="lh-news">Email</label>
        <input id="lh-news" name="email" type="email" placeholder="email@cua-ban.vn" autoComplete="email" aria-invalid={st === "bad"} />
        <button type="submit">Đăng ký</button>
      </div>
      <span role="status" aria-live="polite">{st === "bad" ? "Email chưa đúng định dạng." : st === "ok" ? "Đã đăng ký (minh hoạ, chưa lưu email)." : ""}</span>
    </form>
  );
}
