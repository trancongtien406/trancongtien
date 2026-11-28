"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../brand.module.css";
import { Garment, PRODUCTS, fmtVnd, type Product } from "./Garments";

const CATS = ["Tất cả", "Áo thun", "Áo khoác", "Sơ mi", "Áo đấu"] as const;
const SIZES = ["S", "M", "L", "XL"] as const;

interface Line { key: string; p: Product; ci: number; size: string; qty: number }

export function Shop() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Tất cả");
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const drawer = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);

  const cards = useMemo(
    () => PRODUCTS.filter((p) => cat === "Tất cả" || p.cat === cat).flatMap((p) => p.colors.map((_, ci) => ({ p, ci }))),
    [cat],
  );
  const total = cart.reduce((s, l) => s + l.p.price * l.qty, 0);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  useEffect(() => {
    if (!open) return;
    drawer.current?.querySelector<HTMLElement>("button, input")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); opener.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const add = (p: Product, ci: number) => {
    const size = sizes[`${p.id}-${ci}`] ?? "M";
    const key = `${p.id}-${ci}-${size}`;
    setCart((c) => {
      const f = c.find((l) => l.key === key);
      return f ? c.map((l) => (l === f ? { ...l, qty: l.qty + 1 } : l)) : [...c, { key, p, ci, size, qty: 1 }];
    });
    setToast(`Đã thêm ${p.name} (${p.colors[ci].name.toLowerCase()}, ${size}) vào giỏ`);
  };

  const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ne: Record<string, string> = {};
    const name = String(f.get("ten") ?? "").trim();
    const phone = String(f.get("sdt") ?? "").replace(/\s/g, "");
    const addr = String(f.get("dc") ?? "").trim();
    if (name.length < 2) ne.ten = "Nhập họ tên (ít nhất 2 ký tự).";
    if (!/^(0|\+84)\d{9}$/.test(phone)) ne.sdt = "Số điện thoại Việt Nam gồm 10 số, bắt đầu bằng 0.";
    if (addr.length < 8) ne.dc = "Nhập địa chỉ nhận hàng đầy đủ hơn.";
    setErr(ne);
    if (Object.keys(ne).length) return;
    setDone(`AM-${String(Date.now()).slice(-6)}`);
    setCart([]);
  };

  return (
    <section id="cua-hang" className={styles.shop} aria-labelledby="shop-h">
      <div className={styles.secHead}>
        <div>
          <p className={styles.eyebrow}>Cửa hàng · Hè Phố 25</p>
          <h2 id="shop-h" className={styles.h2}>Còn hàng, lấy liền.</h2>
        </div>
        <button ref={opener} type="button" className={styles.cartBtn} onClick={() => { setDone(null); setOpen(true); }} aria-haspopup="dialog">
          Giỏ hàng <b>{count}</b>
        </button>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Lọc theo loại áo">
        {CATS.map((c) => (
          <button key={c} role="tab" type="button" aria-selected={cat === c} className={cat === c ? styles.tabOn : ""} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <ul className={styles.pgrid}>
        {cards.map(({ p, ci }) => {
          const c = p.colors[ci];
          const id = `${p.id}-${ci}`;
          const sz = sizes[id] ?? "M";
          return (
            <li key={id} className={styles.pcard}>
              <div className={styles.part} style={{ background: `radial-gradient(circle at 50% 22%,#fff8,${c.wall})` }}>
                <div className={styles.pgar}><Garment kind={p.kind} pal={c.pal} backText={p.backText} title={`${p.name}, màu ${c.name.toLowerCase()}`} /></div>
                <span className={styles.pdot} style={{ background: c.swatch }} aria-hidden="true" />
              </div>
              <h3>{p.name}</h3>
              <p className={styles.pnote}>{p.note}</p>
              <div className={styles.pmeta}><b>{fmtVnd(p.price)}</b><span>Màu {c.name.toLowerCase()}</span></div>
              <div className={styles.sizes} role="group" aria-label={`Chọn size ${p.name}`}>
                {SIZES.map((s) => (
                  <button key={s} type="button" aria-pressed={sz === s} onClick={() => setSizes((m) => ({ ...m, [id]: s }))}>{s}</button>
                ))}
              </div>
              <button type="button" className={styles.add} onClick={() => add(p, ci)}>Thêm vào giỏ</button>
            </li>
          );
        })}
      </ul>

      <p className={styles.toast} role="status" aria-live="polite">{toast}</p>

      {open && (
        <div className={styles.scrim} onClick={() => setOpen(false)}>
          <div ref={drawer} className={styles.drawer} role="dialog" aria-modal="true" aria-label="Giỏ hàng" onClick={(e) => e.stopPropagation()}>
            <div className={styles.dHead}>
              <h3>Giỏ hàng ({count})</h3>
              <button type="button" onClick={() => { setOpen(false); opener.current?.focus(); }} aria-label="Đóng giỏ hàng">×</button>
            </div>
            {done ? (
              <div className={styles.okBox}>
                <b>Đặt hàng thành công</b>
                <p>Mã đơn <strong>{done}</strong>. Studio sẽ gọi xác nhận trong 30 phút (giờ mở cửa). Đây là trang minh hoạ nên không có đơn thật nào được tạo.</p>
                <button type="button" className={styles.add} onClick={() => setOpen(false)}>Tiếp tục xem áo</button>
              </div>
            ) : cart.length === 0 ? (
              <p className={styles.empty}>Giỏ đang trống. Chọn size rồi bấm “Thêm vào giỏ”.</p>
            ) : (
              <>
                <ul className={styles.lines}>
                  {cart.map((l) => (
                    <li key={l.key}>
                      <div className={styles.lthumb}><Garment kind={l.p.kind} pal={l.p.colors[l.ci].pal} backText={l.p.backText} /></div>
                      <div>
                        <b>{l.p.name}</b>
                        <span>{l.p.colors[l.ci].name.toLowerCase()} · size {l.size}</span>
                        <div className={styles.qty}>
                          <button type="button" aria-label="Giảm số lượng" onClick={() => setCart((c) => c.flatMap((x) => (x === l ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x])))}>−</button>
                          <output>{l.qty}</output>
                          <button type="button" aria-label="Tăng số lượng" onClick={() => setCart((c) => c.map((x) => (x === l ? { ...x, qty: x.qty + 1 } : x)))}>+</button>
                        </div>
                      </div>
                      <em>{fmtVnd(l.p.price * l.qty)}</em>
                    </li>
                  ))}
                </ul>
                <form className={styles.co} onSubmit={submit} noValidate>
                  <label>Họ tên<input name="ten" autoComplete="name" aria-invalid={!!err.ten} aria-describedby="e-ten" /><small id="e-ten" role="alert">{err.ten}</small></label>
                  <label>Số điện thoại<input name="sdt" inputMode="tel" autoComplete="tel" aria-invalid={!!err.sdt} aria-describedby="e-sdt" /><small id="e-sdt" role="alert">{err.sdt}</small></label>
                  <label>Địa chỉ nhận hàng<input name="dc" autoComplete="street-address" aria-invalid={!!err.dc} aria-describedby="e-dc" /><small id="e-dc" role="alert">{err.dc}</small></label>
                  <div className={styles.sum}><span>Tạm tính (freeship từ 599.000đ)</span><b>{fmtVnd(total)}</b></div>
                  <button type="submit" className={styles.add}>Đặt hàng, thanh toán khi nhận</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
