"use client";

import { useRef, useState } from "react";
import styles from "../brand.module.css";
import { Wave } from "./Wave";

const PRODUCTS = [
  { id: "dem", name: "Âm Dạ", kind: "Tai nghe chụp tai", price: 6490000, tag: "Chống ồn chủ động", specs: ["Driver 40 mm", "Pin khoảng 40 giờ", "Bluetooth 5.3"], use: "go" },
  { id: "vi", name: "Vi Âm", kind: "Tai nghe nhét tai", price: 3290000, tag: "Nhỏ gọn, đi lại", specs: ["Driver 11 mm", "Pin 8 giờ + hộp sạc 24 giờ", "Chống nước IPX4"], use: "move" },
  { id: "cong", name: "Cộng Hưởng", kind: "Loa không dây", price: 4890000, tag: "Âm thanh 360°", specs: ["Công suất 40 W", "Pin khoảng 18 giờ", "Ghép đôi stereo"], use: "home" },
] as const;
const fmt = (n: number) => `${n.toLocaleString("vi-VN")} ₫`;

function Art({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 220 160" role="presentation" focusable="false" className={styles.art}>
      <defs><linearGradient id={`taG${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6b9d" /><stop offset="1" stopColor="#7c5cff" /></linearGradient></defs>
      {id === "dem" && (<g fill="none" stroke="#c4b5fd" strokeWidth="6" strokeLinecap="round"><path d="M44 96 V76 a66 66 0 0 1 132 0 V96" /><rect x="30" y="86" width="30" height="50" rx="14" fill={`url(#taG${id})`} stroke="none" /><rect x="160" y="86" width="30" height="50" rx="14" fill={`url(#taG${id})`} stroke="none" /></g>)}
      {id === "vi" && (<g><g transform="translate(60 40)"><ellipse cx="22" cy="26" rx="22" ry="26" fill={`url(#taG${id})`} /><rect x="30" y="40" width="9" height="50" rx="4.5" fill="#c4b5fd" /></g><g transform="translate(118 40) scale(-1 1) translate(-44 0)"><ellipse cx="22" cy="26" rx="22" ry="26" fill={`url(#taG${id})`} /><rect x="30" y="40" width="9" height="50" rx="4.5" fill="#c4b5fd" /></g></g>)}
      {id === "cong" && (<g><rect x="62" y="20" width="96" height="124" rx="40" fill="#241a45" stroke="#c4b5fd" strokeWidth="3" />{Array.from({ length: 30 }).map((_, i) => (<circle key={i} cx={78 + (i % 6) * 13} cy={48 + Math.floor(i / 6) * 17} r="3" fill={i % 7 === 0 ? "#ff6b9d" : "#c4b5fd"} opacity=".8" />))}<circle cx="110" cy="124" r="6" fill={`url(#taG${id})`} /></g>)}
    </svg>
  );
}

function Card({ p, onAdd }: { p: (typeof PRODUCTS)[number]; onAdd: () => void }) {
  const hov = useRef(false);
  return (
    <li className={styles.card} data-rv onPointerEnter={() => (hov.current = true)} onPointerLeave={() => (hov.current = false)} onFocus={() => (hov.current = true)} onBlur={() => (hov.current = false)}>
      <Art id={p.id} />
      <Wave height={80} layers={2} hoverRef={hov} className={styles.mini} />
      <p className={styles.tag}>{p.tag}</p>
      <h3>{p.name}</h3><p className={styles.kind}>{p.kind}</p>
      <ul>{p.specs.map((s) => (<li key={s}>{s}</li>))}</ul>
      <p className={styles.price}>{fmt(p.price)}</p>
      <button type="button" className={styles.btn} onClick={onAdd} aria-label={`Thêm ${p.name} vào giỏ`}>Thêm vào giỏ</button>
    </li>
  );
}

export function Products() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [use, setUse] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const rec = PRODUCTS.find((p) => p.use === use);
  const lines = PRODUCTS.filter((p) => cart[p.id]);
  const total = lines.reduce((a, p) => a + p.price * cart[p.id], 0);
  const count = lines.reduce((a, p) => a + cart[p.id], 0);
  const add = (id: string, d = 1) => setCart((c) => { const v = Math.max(0, (c[id] || 0) + d); const n = { ...c }; if (v) n[id] = v; else delete n[id]; return n; });
  return (
    <>
      <ul className={styles.cards}>{PRODUCTS.map((p) => (<Card key={p.id} p={p} onAdd={() => add(p.id)} />))}</ul>

      <div className={styles.finder} id="chon-thiet-bi">
        <h3>Chọn thiết bị hợp tai</h3>
        <fieldset className={styles.opts}><legend>Bạn nghe ở đâu nhiều nhất?</legend>
          {[["go", "Văn phòng, nơi ồn"], ["move", "Trên đường, tập thể thao"], ["home", "Ở nhà, cùng bạn bè"]].map(([v, l]) => (
            <label key={v} className={use === v ? styles.optOn : ""}><input type="radio" name="use" value={v} checked={use === v} onChange={() => setUse(v)} />{l}</label>
          ))}
        </fieldset>
        <p className={styles.rec} aria-live="polite">{rec ? <>Gợi ý cho bạn: <b>{rec.name}</b> ({rec.kind}). <button type="button" className={styles.link} onClick={() => add(rec.id)}>Thêm vào giỏ</button></> : "Chọn một nhu cầu để nhận gợi ý."}</p>
      </div>

      <div className={styles.cart} aria-live="polite">
        <h3>Giỏ hàng mô phỏng · {count} sản phẩm</h3>
        {lines.length === 0 ? <p className={styles.muteP}>Giỏ đang trống.</p> : (
          <ul>{lines.map((p) => (<li key={p.id}><span>{p.name}</span><span className={styles.qty}><button type="button" aria-label={`Giảm ${p.name}`} onClick={() => add(p.id, -1)}>−</button><output>{cart[p.id]}</output><button type="button" aria-label={`Tăng ${p.name}`} onClick={() => add(p.id, 1)}>+</button></span><b>{fmt(p.price * cart[p.id])}</b></li>))}</ul>
        )}
        <p className={styles.sum}>Tổng cộng <b>{fmt(total)}</b></p>
        <form noValidate className={styles.order} onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget); const name = String(f.get("name") || "").trim(); const mail = String(f.get("mail") || "").trim();
          if (!count) { setErr("Giỏ hàng đang trống."); setMsg(""); return; }
          if (!name || !/^\S+@\S+\.\S+$/.test(mail)) { setErr("Nhập tên và email hợp lệ."); setMsg(""); return; }
          setErr(""); setMsg(`Cảm ơn ${name}. Đơn mô phỏng ${count} sản phẩm, tổng ${fmt(total)}. Không có đơn hàng thật nào được tạo.`);
        }}>
          <label>Họ tên<input name="name" autoComplete="name" /></label>
          <label>Email<input name="mail" type="email" autoComplete="email" /></label>
          <button type="submit" className={styles.btn}>Đặt hàng (mô phỏng)</button>
        </form>
        {err && <p className={styles.err} role="alert">{err}</p>}{msg && <p className={styles.ok}>{msg}</p>}
      </div>
    </>
  );
}
