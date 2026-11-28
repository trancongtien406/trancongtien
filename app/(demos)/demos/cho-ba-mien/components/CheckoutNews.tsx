"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { clearCart, setQty, useCart } from "./cart";
import { PRODUCTS, fmtVnd } from "./data";

export function Checkout() {
  const cart = useCart();
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState("");
  const ship = cart.total === 0 ? 0 : cart.total >= 300000 ? 0 : 25000;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const addr = String(f.get("addr") ?? "").trim();
    const er: Record<string, string> = {};
    if (name.length < 2) er.name = "Vui lòng nhập họ tên.";
    if (!/^(0|\+84)\d{9}$/.test(phone)) er.phone = "Số điện thoại chưa đúng, ví dụ 0901234567.";
    if (addr.length < 8) er.addr = "Vui lòng nhập địa chỉ đầy đủ (số nhà, đường, quận/huyện).";
    if (!cart.n) er.cart = "Giỏ hàng đang trống. Hãy thêm món ở quầy đặc sản phía trên.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setDone(`Cảm ơn ${name}! Đơn ${cart.n} món, tổng ${fmtVnd(cart.total + ship)}, đã được ghi nhận. Chúng tôi sẽ gọi ${phone} để xác nhận (trang minh hoạ, không có đơn thật).`);
    clearCart();
    form.reset();
  }

  return (
    <section id="dat-hang" className={`${styles.sec} ${styles.secBlue}`} aria-labelledby="h-dh">
      <p className={styles.eyebrow}>Thanh toán</p>
      <h2 id="h-dh" className={styles.h2}>Kiểm giỏ hàng, chốt đơn</h2>
      <div className={styles.checkout}>
        <div className={styles.cartPanel} aria-live="polite">
          <h3>Giỏ hàng của bạn</h3>
          {cart.lines.length === 0 ? (
            <p>Chưa có món nào. Dạo kệ 3D phía trên hoặc chọn ở quầy đặc sản.</p>
          ) : (
            <ul>
              {cart.lines.map((l) => (
                <li key={l.id}>
                  <span>{PRODUCTS[l.id].name}</span>
                  <span className={styles.qty}>
                    <button type="button" aria-label={`Bớt ${PRODUCTS[l.id].name}`} onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                    {l.qty}
                    <button type="button" aria-label={`Thêm ${PRODUCTS[l.id].name}`} onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                  </span>
                  <b>{fmtVnd(PRODUCTS[l.id].price * l.qty)}</b>
                </li>
              ))}
            </ul>
          )}
          <dl className={styles.sum}>
            <div><dt>Tạm tính</dt><dd>{fmtVnd(cart.total)}</dd></div>
            <div><dt>Phí giao (miễn phí từ 300.000đ)</dt><dd>{fmtVnd(ship)}</dd></div>
            <div className={styles.sumTotal}><dt>Tổng</dt><dd>{fmtVnd(cart.total + ship)}</dd></div>
          </dl>
          {errs.cart && <p className={styles.err} role="alert">{errs.cart}</p>}
        </div>
        <form className={styles.form} onSubmit={submit} noValidate>
          <label>Họ và tên<input name="name" autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <small role="alert">{errs.name}</small>}</label>
          <label>Số điện thoại<input name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!errs.phone} />{errs.phone && <small role="alert">{errs.phone}</small>}</label>
          <label>Địa chỉ nhận hàng<input name="addr" autoComplete="street-address" aria-invalid={!!errs.addr} />{errs.addr && <small role="alert">{errs.addr}</small>}</label>
          <label>Ghi chú<textarea name="note" rows={3} placeholder="Gói quà, giao giờ hành chính..." /></label>
          <button type="submit" className={styles.submit}>Đặt hàng · {fmtVnd(cart.total + ship)}</button>
          {done && <p className={styles.ok} role="status">{done}</p>}
        </form>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [msg, setMsg] = useState("");
  return (
    <section className={styles.news} aria-label="Bản tin">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const v = String(new FormData(e.currentTarget).get("email") ?? "").trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setMsg("Email chưa hợp lệ.");
          setMsg("Đã đăng ký! Bản tin đặc sản theo mùa sẽ gửi vào hộp thư của bạn (minh hoạ).");
          e.currentTarget.reset();
        }}
      >
        <div>
          <h2>Bản tin đặc sản theo mùa</h2>
          <p>Mỗi tháng một thư: món vào mùa, mẹo bảo quản và mã giảm cho lần mua sau.</p>
        </div>
        <div className={styles.newsRow}>
          <label className={styles.sr} htmlFor="cb-news">Email</label>
          <input id="cb-news" name="email" type="email" placeholder="email@cua-ban.vn" />
          <button type="submit" className={styles.submit}>Đăng ký</button>
        </div>
        <p role="status" className={styles.newsMsg}>{msg}</p>
      </form>
    </section>
  );
}
