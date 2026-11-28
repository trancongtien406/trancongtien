"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { Glitch } from "./Glitch";
import { ITEMS, MenuBoard, vnd } from "./MenuBoard";

export function OrderApp() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const dec = (id: string) =>
    setCart((c) => {
      const n = { ...c };
      if ((n[id] ?? 0) <= 1) delete n[id];
      else n[id] -= 1;
      return n;
    });
  const lines = ITEMS.filter((i) => cart[i.id]);
  const total = lines.reduce((s, i) => s + i.price * cart[i.id], 0);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/\s/g, "");
    const addr = String(f.get("addr") ?? "").trim();
    const er: Record<string, string> = {};
    if (name.length < 2) er.name = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
    if (!/^(0|\+84)\d{9}$/.test(phone)) er.phone = "Số điện thoại chưa đúng (ví dụ 0901234567).";
    if (String(f.get("mode")) === "giao" && addr.length < 6) er.addr = "Vui lòng nhập địa chỉ giao hàng.";
    if (!lines.length) er.cart = "Đơn hàng đang trống, hãy thêm ít nhất một món ở bảng giá phía trên.";
    setErrs(er);
    if (Object.keys(er).length) return;
    setDone(`Cảm ơn ${name}! Đơn ${lines.reduce((s, i) => s + cart[i.id], 0)} món, ${vnd(total)}, đã được ghi nhận. Cửa hàng sẽ gọi xác nhận qua ${phone} (trang minh hoạ, không có đơn thật).`);
    setCart({});
    e.currentTarget.reset();
  }

  return (
    <>
      <MenuBoard cart={cart} onAdd={add} />
      <section id="dat-hang" className={styles.order} aria-labelledby="order-h">
        <div className={styles.orderGrid}>
          <div>
            <span className={styles.kicker}>Đặt hàng</span>
            <Glitch as="h2" text="RA SÂN, NHẬN BÁNH." className={styles.sectionH} />
            <p id="order-h" className={styles.lead}>Điền thông tin, chúng tôi gọi xác nhận trong vài phút.</p>
            <div className={styles.cartBox} aria-live="polite">
              <b>Đơn của bạn</b>
              {lines.length === 0 ? (
                <p>Chưa có món nào.</p>
              ) : (
                <ul>
                  {lines.map((i) => (
                    <li key={i.id}>
                      <span>{i.name}</span>
                      <span className={styles.qty}>
                        <button type="button" onClick={() => dec(i.id)} aria-label={`Bớt ${i.name}`}>−</button>
                        {cart[i.id]}
                        <button type="button" onClick={() => add(i.id)} aria-label={`Thêm ${i.name}`}>+</button>
                      </span>
                      <span>{vnd(i.price * cart[i.id])}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className={styles.cartTotal}>Tạm tính <b>{vnd(total)}</b></p>
              {errs.cart && <p className={styles.err} role="alert">{errs.cart}</p>}
            </div>
          </div>
          <form className={styles.form} onSubmit={submit} noValidate>
            <label>Họ và tên<input name="name" autoComplete="name" aria-invalid={!!errs.name} />{errs.name && <small role="alert">{errs.name}</small>}</label>
            <label>Số điện thoại<input name="phone" inputMode="tel" autoComplete="tel" aria-invalid={!!errs.phone} />{errs.phone && <small role="alert">{errs.phone}</small>}</label>
            <fieldset>
              <legend>Hình thức nhận</legend>
              <label className={styles.radio}><input type="radio" name="mode" value="giao" defaultChecked /> Giao tận nơi</label>
              <label className={styles.radio}><input type="radio" name="mode" value="quay" /> Nhận tại quầy</label>
            </fieldset>
            <label>Địa chỉ giao hàng<input name="addr" autoComplete="street-address" aria-invalid={!!errs.addr} />{errs.addr && <small role="alert">{errs.addr}</small>}</label>
            <label>Ghi chú<textarea name="note" rows={3} placeholder="Bỏ hành, thêm sốt, đặt trước một giờ..." /></label>
            <button type="submit" className={styles.btnOr}>Chốt đơn {total ? `· ${vnd(total)}` : ""}</button>
            {done && <p className={styles.ok} role="status">{done}</p>}
          </form>
        </div>
      </section>
      <section className={styles.news} aria-label="Bản tin">
        <NewsForm />
      </section>
    </>
  );
}

function NewsForm() {
  const [msg, setMsg] = useState("");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const v = String(new FormData(e.currentTarget).get("email") ?? "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setMsg("Email chưa hợp lệ.");
        setMsg("Đã đăng ký! Mã giảm 15.000đ sẽ gửi tới hộp thư của bạn (minh hoạ).");
        e.currentTarget.reset();
      }}
    >
      <h2>Nhận mã giảm 15.000đ cho đơn đầu tiên</h2>
      <div>
        <label className={styles.srOnly} htmlFor="bt-news">Email</label>
        <input id="bt-news" name="email" type="email" placeholder="email@cua-ban.vn" />
        <button type="submit" className={styles.btnOr}>Đăng ký</button>
      </div>
      <p role="status">{msg}</p>
    </form>
  );
}
