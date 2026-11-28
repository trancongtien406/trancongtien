"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { type BagItem, vnd } from "./bag";

const SIZES = [
  { id: "30", label: "30 ml", price: 590000 },
  { id: "50", label: "50 ml", price: 850000 },
] as const;
type Line = BagItem & { qty: number };

export function Shop() {
  const [size, setSize] = useState<(typeof SIZES)[number]>(SIZES[0]);
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.price, 0);

  useEffect(() => { window.dispatchEvent(new CustomEvent<number>("gs:count", { detail: count })); }, [count]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  useEffect(() => {
    const add = (e: Event) => {
      const it = (e as CustomEvent<BagItem>).detail;
      openerRef.current = document.activeElement as HTMLElement;
      setLines((ls) => (ls.some((l) => l.id === it.id) ? ls.map((l) => (l.id === it.id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { ...it, qty: 1 }]));
      setOpen(true);
    };
    const op = () => { openerRef.current = document.activeElement as HTMLElement; setOpen(true); };
    window.addEventListener("gs:add", add);
    window.addEventListener("gs:openbag", op);
    return () => { window.removeEventListener("gs:add", add); window.removeEventListener("gs:openbag", op); };
  }, []);

  const addSerum = () => window.dispatchEvent(new CustomEvent<BagItem>("gs:add", { detail: { id: `serum-${size.id}`, name: `Serum Hyaluronic, ${size.label}`, price: size.price } }));
  const close = () => { setOpen(false); setNote(false); openerRef.current?.focus?.(); };
  const setQty = (id: string, d: number) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0));

  return (
    <section className={s.shop} id="mua" aria-labelledby="gs-shop">
      <div className={s.card}>
        <div className={s.cardImg} aria-hidden="true">
          <span className={s.cardGlow} />
          <img className={s.cardBottleSvg} src="/images/demos/giot-suong/chai-than.webp" alt="" width={441} height={1154} decoding="async" />
          <span className={s.cardWave} />
        </div>
        <div className={s.cardBody}>
          <h2 id="gs-shop" className={s.cardTitle}>Serum Hyaluronic</h2>
          <p className={s.cardSub}>Da mềm, dịu ngay từ tuần đầu.</p>
          <div className={s.priceRow}>
            <strong className={s.price}>{vnd(size.price)}</strong>
            <div className={s.sizes} role="radiogroup" aria-label="Dung tích">
              {SIZES.map((z) => (
                <button key={z.id} type="button" role="radio" aria-checked={size.id === z.id} className={s.size} data-on={size.id === z.id} onClick={() => setSize(z)}>{z.label}</button>
              ))}
            </div>
          </div>
          <button type="button" className={s.addBtn} onClick={addSerum}><span>Thêm vào giỏ</span><b>{vnd(size.price)}</b></button>
          <p className={s.fine}>Miễn phí giao hàng, nhận sau 2 ngày.<br />30 ngày để gửi lại nếu chưa hợp.</p>
          <details className={s.ing}>
            <summary>Đủ 11 thành phần</summary>
            <p>Nước tinh khiết, hyaluronic acid 2%, glycerin, panthenol, allantoin, chiết xuất rau má, betaine, natri PCA, chiết xuất lô hội, chất ổn định dịu nhẹ, chất bảo quản an toàn. Nội dung minh hoạ cho trang thiết kế, không phải sản phẩm thật.</p>
          </details>
        </div>
      </div>

      <button type="button" className={s.bagFab} onClick={() => { openerRef.current = document.activeElement as HTMLElement; setOpen(true); }}>Giỏ <i>{count}</i></button>

      <div className={s.scrim} data-open={open} onClick={close} aria-hidden="true" />
      <aside className={s.drawer} data-open={open} role="dialog" aria-modal="true" aria-label="Giỏ hàng" aria-hidden={!open} {...(!open ? { inert: true } : {})}>
        <header className={s.drawerHead}>
          <h3>Giỏ hàng</h3>
          <button type="button" ref={closeRef} onClick={close}>Đóng</button>
        </header>
        {lines.length === 0 ? (
          <p className={s.empty}>Giỏ hàng đang trống.</p>
        ) : (
          lines.map((l) => (
            <div className={s.line} key={l.id}>
              <div className={s.lineImg} aria-hidden="true"><img className={s.lineBottle} src="/images/demos/giot-suong/chai-than.webp" alt="" width={441} height={1154} decoding="async" /></div>
              <div>
                <p className={s.lineName}>{l.name}</p>
                <div className={s.qty}>
                  <button type="button" aria-label="Giảm số lượng" onClick={() => setQty(l.id, -1)}>−</button>
                  <span aria-live="polite">{l.qty}</span>
                  <button type="button" aria-label="Tăng số lượng" onClick={() => setQty(l.id, 1)}>+</button>
                </div>
              </div>
              <p className={s.linePrice}>{vnd(l.price * l.qty)}</p>
            </div>
          ))
        )}
        <footer className={s.drawerFoot}>
          <p className={s.sub}><span>Tạm tính</span><b>{vnd(total)}</b></p>
          <p className={s.fine}>{note ? "Giọt Sương là thương hiệu minh hoạ nên thanh toán đã được tắt." : "Giọt Sương là thương hiệu minh hoạ, nên thanh toán đã tắt. Giao hàng miễn phí, dùng thử 30 ngày."}</p>
          <button type="button" className={s.addBtn} disabled={lines.length === 0} onClick={() => setNote(true)}><span>Thanh toán</span><b>{vnd(total)}</b></button>
        </footer>
      </aside>
    </section>
  );
}
