"use client";

import { useEffect, useState } from "react";
import styles from "../brand.module.css";

export type CartLine = { id: string; name: string; price: number; qty: number };

const LINKS = [
  { t: "TRANG CHỦ", h: "#dau-trang" },
  { t: "CỬA HÀNG", h: "#giay" },
  { t: "BỘ SƯU TẬP", h: "#bo-suu-tap" },
  { t: "CỬA HIỆU", h: "#cua-hieu" },
  { t: "ƯU ĐÃI", h: "#khuyen-mai" },
  { t: "LIÊN HỆ", h: "#lien-he" },
];

export const fmt = (n: number) => n.toLocaleString("vi-VN") + "₫";

/** Thanh điều hướng cố định + giỏ hàng nhỏ. Giỏ lắng nghe sự kiện "gt:add" do các thẻ sản phẩm phát ra. */
export function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onAdd = (e: Event) => {
      const d = (e as CustomEvent<Omit<CartLine, "qty">>).detail;
      setCart((c) => {
        const f = c.find((x) => x.id === d.id);
        return f ? c.map((x) => (x.id === d.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...d, qty: 1 }];
      });
      setCartOpen(true);
    };
    window.addEventListener("gt:add", onAdd);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("gt:add", onAdd); };
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, h: string) => {
    const el = document.querySelector(h);
    setMenu(false);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: reduce ? "auto" : "smooth" });
  };
  const count = cart.reduce((a, b) => a + b.qty, 0);
  const total = cart.reduce((a, b) => a + b.qty * b.price, 0);

  return (
    <header className={`${styles.topNav} ${solid || menu ? styles.topSolid : ""}`}>
      <a className={styles.topLogo} href="#dau-trang" onClick={(e) => go(e, "#dau-trang")}>THANH LỊCH</a>
      <nav aria-label="Chính" className={`${styles.topLinks} ${menu ? styles.topOpen : ""}`}>
        {LINKS.map((l) => <a key={l.h} href={l.h} onClick={(e) => go(e, l.h)}>{l.t}</a>)}
      </nav>
      <button type="button" className={styles.cartBtn} aria-expanded={cartOpen} aria-controls="gt-cart" onClick={() => setCartOpen((v) => !v)}>
        <span aria-hidden="true">GIỎ</span> <b aria-label={`${count} sản phẩm trong giỏ`}>{count}</b>
      </button>
      <button type="button" className={styles.burger} aria-label="Mở menu" aria-expanded={menu} onClick={() => setMenu((v) => !v)}><i /><i /></button>
      {cartOpen && (
        <div id="gt-cart" className={styles.cartPanel} role="dialog" aria-label="Giỏ hàng">
          <p className={styles.cartH}>Giỏ hàng của bạn</p>
          {cart.length === 0 ? <p className={styles.cartE}>Chưa có sản phẩm nào. Chọn một đôi giày để bắt đầu.</p> : (
            <>
              <ul>
                {cart.map((c) => (
                  <li key={c.id}>
                    <span>{c.name}<small>{fmt(c.price)} x {c.qty}</small></span>
                    <button type="button" aria-label={`Xoá ${c.name}`} onClick={() => setCart((x) => x.filter((y) => y.id !== c.id))}>Xoá</button>
                  </li>
                ))}
              </ul>
              <p className={styles.cartT}><span>Tạm tính</span><b>{fmt(total)}</b></p>
              <a className={styles.cartGo} href="#lien-he" onClick={(e) => { setCartOpen(false); go(e, "#lien-he"); }}>Đặt hàng qua biểu mẫu</a>
            </>
          )}
          <button type="button" className={styles.cartX} onClick={() => setCartOpen(false)}>Đóng</button>
        </div>
      )}
    </header>
  );
}

export function addToCart(id: string, name: string, price: number) {
  window.dispatchEvent(new CustomEvent("gt:add", { detail: { id, name, price } }));
}
