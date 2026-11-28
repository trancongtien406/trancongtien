"use client";

import { useState } from "react";
import styles from "../brand.module.css";

/* ---------- Chọn size ---------- */
const CHART = [
  ["S", "165–170", "52–60", "66", "50", "20"],
  ["M", "170–175", "60–68", "69", "52", "21"],
  ["L", "175–180", "68–76", "72", "55", "22"],
  ["XL", "180–188", "76–88", "75", "58", "23"],
];

function suggest(h: number, w: number) {
  let i = h < 170 ? 0 : h < 175 ? 1 : h < 180 ? 2 : 3;
  const byW = w < 60 ? 0 : w < 68 ? 1 : w < 76 ? 2 : 3;
  i = Math.round((i + byW) / 2 + 0.01);
  return CHART[Math.min(3, i)][0];
}

export function SizeGuide() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [res, setRes] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const hh = Number(h), ww = Number(w);
    if (!(hh >= 140 && hh <= 210) || !(ww >= 35 && ww <= 140)) { setRes(null); setMsg("Nhập chiều cao 140–210 cm và cân nặng 35–140 kg."); return; }
    setMsg(""); setRes(suggest(hh, ww));
  };
  return (
    <section id="size" className={styles.sizeSec} aria-labelledby="size-h">
      <div className={styles.sizeIn}>
        <div>
          <p className={styles.eyebrow}>Chọn size</p>
          <h2 id="size-h" className={styles.h2}>Mặc vừa ngay lần đầu.</h2>
          <p className={styles.lead}>Áo Mộc cắt dáng boxy, rộng nhẹ ở vai. Nhập chiều cao và cân nặng, chúng tôi gợi ý size gần nhất. Nằm giữa hai size thì chọn size nhỏ nếu thích ôm, size lớn nếu thích rộng.</p>
          <form className={styles.sizeForm} onSubmit={go} noValidate>
            <label>Chiều cao (cm)<input value={h} onChange={(e) => setH(e.target.value)} inputMode="numeric" placeholder="172" /></label>
            <label>Cân nặng (kg)<input value={w} onChange={(e) => setW(e.target.value)} inputMode="numeric" placeholder="65" /></label>
            <button type="submit" className={styles.add}>Gợi ý size</button>
          </form>
          <p className={styles.sizeRes} role="status" aria-live="polite">{res ? <>Gợi ý của bạn: <b>size {res}</b>. Đổi size miễn phí trong 7 ngày.</> : msg}</p>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <caption className={styles.srOnly}>Bảng size áo thun</caption>
            <thead><tr><th scope="col">Size</th><th scope="col">Cao (cm)</th><th scope="col">Nặng (kg)</th><th scope="col">Dài áo (cm)</th><th scope="col">Ngang ngực (cm)</th><th scope="col">Dài tay (cm)</th></tr></thead>
            <tbody>{CHART.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const FAQ = [
  ["Áo có co rút sau khi giặt không?", "Cotton của chúng tôi đã được giặt wash và xả co trước khi may, nên co rút dưới 3%. Giặt máy nước lạnh, lộn trái, không sấy nóng để chữ in bền hơn."],
  ["Mình ở tỉnh, bao lâu nhận được hàng?", "Nội thành TP.HCM và Hà Nội 1–2 ngày, các tỉnh khác 2–4 ngày. Đơn từ 599.000đ được miễn phí vận chuyển toàn quốc."],
  ["Đổi size hoặc trả hàng thế nào?", "Đổi size miễn phí trong 7 ngày kể từ lúc nhận, áo còn nguyên tem và chưa giặt. Hoàn tiền nếu lỗi do xưởng, chúng tôi chịu cả hai chiều vận chuyển."],
  ["Màu áo ngoài đời có giống ảnh không?", "Chúng tôi chụp dưới ánh sáng ban ngày, không chỉnh màu quá tay. Mỗi màn hình hiển thị khác nhau chút ít; bạn có thể ghé studio xem vải trực tiếp."],
  ["Có nhận in áo theo đội, nhóm không?", "Có. Từ 20 áo trở lên chúng tôi in và thêu theo thiết kế của bạn, giá bậc thang và có áo mẫu thử trước khi sản xuất đại trà."],
  ["Mua sỉ hoặc ký gửi cho cửa hàng thì sao?", "Điền form liên hệ bên dưới, chọn “Mua sỉ / ký gửi”. Bộ phận đối tác sẽ gửi catalogue và bảng giá trong ngày làm việc kế tiếp."],
  ["Hội viên Phố Quen có những gì?", "Giảm 10% mọi đơn, được mua trước mẫu mới 48 giờ, đổi size không giới hạn trong 14 ngày và quà sinh nhật. Xem chi tiết ở phần Hội viên."],
  ["Thanh toán bằng cách nào?", "Thanh toán khi nhận hàng (COD), chuyển khoản VietQR hoặc ví điện tử. Trang này là bản minh hoạ nên giỏ hàng không thu tiền thật."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="hoi-dap" className={styles.faq} aria-labelledby="faq-h">
      <div className={styles.faqIn}>
        <div>
          <p className={styles.eyebrow}>Hỏi đáp</p>
          <h2 id="faq-h" className={styles.h2}>Hay hỏi, trả lời gọn.</h2>
          <p className={styles.lead}>Không thấy câu bạn cần? Nhắn cho studio, trả lời trong giờ mở cửa.</p>
        </div>
        <ul className={styles.faqList}>
          {FAQ.map(([q, a], i) => (
            <li key={q}>
              <h3>
                <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} id={`faq-b-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{q}</span><i aria-hidden="true">{open === i ? "−" : "+"}</i>
                </button>
              </h3>
              <div id={`faq-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={open !== i}><p>{a}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Liên hệ ---------- */
export function Contact() {
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ne: Record<string, string> = {};
    if (String(f.get("ten") ?? "").trim().length < 2) ne.ten = "Vui lòng nhập tên của bạn.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(f.get("email") ?? ""))) ne.email = "Email chưa đúng định dạng.";
    if (String(f.get("nd") ?? "").trim().length < 10) ne.nd = "Nội dung ít nhất 10 ký tự để chúng tôi hiểu nhu cầu.";
    setErr(ne);
    if (!Object.keys(ne).length) { setOk(true); e.currentTarget.reset(); }
  };
  return (
    <section id="lien-he" className={styles.contact} aria-labelledby="ct-h">
      <div className={styles.ctIn}>
        <div className={styles.ctInfo}>
          <p className={styles.eyebrow}>Liên hệ</p>
          <h2 id="ct-h" className={styles.h2}>Ghé studio, hoặc nhắn một dòng.</h2>
          <dl>
            <div><dt>Studio &amp; kho</dt><dd>45 Lý Tự Trọng, Quận 1, TP. Hồ Chí Minh</dd></div>
            <div><dt>Giờ mở cửa</dt><dd>10:00–21:00 mỗi ngày, kể cả lễ</dd></div>
            <div><dt>Điện thoại</dt><dd>0900 000 053</dd></div>
            <div><dt>Email</dt><dd>xin-chao@aomoc.example</dd></div>
          </dl>
        </div>
        {ok ? (
          <div className={styles.okBox} role="status">
            <b>Đã nhận tin nhắn</b>
            <p>Cảm ơn bạn. Studio sẽ phản hồi qua email trong 1 ngày làm việc. (Trang minh hoạ: biểu mẫu không gửi dữ liệu đi đâu.)</p>
            <button type="button" className={styles.add} onClick={() => setOk(false)}>Gửi tin khác</button>
          </div>
        ) : (
          <form className={styles.ctForm} onSubmit={submit} noValidate>
            <label>Tên của bạn<input name="ten" autoComplete="name" aria-invalid={!!err.ten} aria-describedby="c-ten" /><small id="c-ten" role="alert">{err.ten}</small></label>
            <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={!!err.email} aria-describedby="c-email" /><small id="c-email" role="alert">{err.email}</small></label>
            <label>Bạn cần gì?
              <select name="loai" defaultValue="hoi">
                <option value="hoi">Hỏi về sản phẩm / size</option>
                <option value="doi">Đổi trả</option>
                <option value="si">Mua sỉ / ký gửi</option>
                <option value="in">In áo theo đội nhóm</option>
              </select>
            </label>
            <label>Nội dung<textarea name="nd" rows={5} aria-invalid={!!err.nd} aria-describedby="c-nd" /><small id="c-nd" role="alert">{err.nd}</small></label>
            <button type="submit" className={styles.add}>Gửi tin nhắn</button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- Bản tin ---------- */
export function Newsletter() {
  const [state, setState] = useState<"idle" | "bad" | "ok">("idle");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = String(new FormData(e.currentTarget).get("email") ?? "");
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "ok" : "bad");
  };
  return (
    <form className={styles.news} onSubmit={submit} noValidate aria-label="Đăng ký bản tin">
      <div>
        <h3>Hàng mới về, nhắn trước cho bạn.</h3>
        <p>Mỗi tháng một email, không spam. Rút đăng ký bất kỳ lúc nào.</p>
      </div>
      <div className={styles.newsRow}>
        <label className={styles.srOnly} htmlFor="news-email">Email</label>
        <input id="news-email" name="email" type="email" placeholder="email@cua-ban.vn" autoComplete="email" aria-invalid={state === "bad"} />
        <button type="submit">Đăng ký</button>
      </div>
      <p role="status" aria-live="polite" className={styles.newsMsg}>{state === "bad" ? "Email chưa đúng định dạng." : state === "ok" ? "Đã đăng ký. Hẹn bạn trong hộp thư (minh hoạ, chưa lưu email)." : ""}</p>
    </form>
  );
}
