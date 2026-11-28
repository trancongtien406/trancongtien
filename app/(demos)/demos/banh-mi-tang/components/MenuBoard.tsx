"use client";

import { useMemo, useState } from "react";
import styles from "../brand.module.css";
import { Glitch } from "./Glitch";

export type Item = { id: string; cat: string; name: string; desc: string; price: number; img: string };

export const ITEMS: Item[] = [
  { id: "td", cat: "Bánh mì", name: "Tầng Đơn", desc: "Một lớp thịt ép nóng, phô mai, dưa leo muối.", price: 52000, img: "mon-tang-don.webp" },
  { id: "tdo", cat: "Bánh mì", name: "Tầng Đôi", desc: "Hai lớp thịt, ba chỉ nướng, phô mai kép.", price: 79000, img: "burger.webp" },
  { id: "gg", cat: "Bánh mì", name: "Gà Giòn Sốt Ớt", desc: "Đùi gà tẩm bột, sốt ớt chua ngọt.", price: 58000, img: "mon-ga-gion.webp" },
  { id: "tc", cat: "Bánh mì", name: "Tầng Chay", desc: "Chả nấm, phô mai, rau củ nướng, sốt bơ tỏi.", price: 54000, img: "mon-tang-don.webp" },
  { id: "kg", cat: "Khoai", name: "Khoai Giờ Nghỉ", desc: "Khoai que chiên hai lần, muối ớt.", price: 29000, img: "khoai-gio-nghi.webp" },
  { id: "ks", cat: "Khoai", name: "Khoai Sốt Trứng Muối", desc: "Phủ sốt trứng muối, hành phi.", price: 45000, img: "khoai-sot.webp" },
  { id: "kc", cat: "Khoai", name: "Khoai Phô Mai Tan", desc: "Khoai lớn, sốt phô mai nóng, ba chỉ vụn.", price: 49000, img: "khoai-sot.webp" },
  { id: "so", cat: "Trà sữa", name: "Trà Sữa Kem Oreo", desc: "Xay dày, kem tươi, vụn Oreo, caramel.", price: 49000, img: "tra-sua-oreo.webp" },
  { id: "sd", cat: "Trà sữa", name: "Trà Sữa Kem Dâu", desc: "Sốt dâu rừng, kem tươi, hạt chia.", price: 49000, img: "tra-sua-oreo.webp" },
  { id: "sm", cat: "Trà sữa", name: "Trà Sữa Socola Đặc", desc: "Socola đen 70%, kem muối biển.", price: 55000, img: "tra-sua-oreo.webp" },
  { id: "c2", cat: "Combo", name: "Combo Đội Nhỏ", desc: "2 Tầng Đôi, khoai lớn, 2 trà sữa, 2 sốt.", price: 129000, img: "combo-ca-nha.webp" },
  { id: "c4", cat: "Combo", name: "Combo Cả Hiệp", desc: "4 ổ, 2 khoai khay chia, 4 trà sữa.", price: 239000, img: "combo-ca-nha.webp" },
];

const CATS = ["Tất cả", "Bánh mì", "Khoai", "Trà sữa", "Combo"];
export const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";

export function MenuBoard({ cart, onAdd }: { cart: Record<string, number>; onAdd: (id: string) => void }) {
  const [cat, setCat] = useState("Tất cả");
  const list = useMemo(() => ITEMS.filter((i) => cat === "Tất cả" || i.cat === cat), [cat]);
  return (
    <section id="bang-gia" className={styles.board} aria-labelledby="board-h">
      <div className={styles.secHead}>
        <span className={styles.kicker}>Bảng giá đầy đủ</span>
        <Glitch as="h2" text="CHỌN MÓN, THÊM VÀO ĐƠN." className={styles.sectionH} />
        <p id="board-h" className={styles.lead}>Lọc theo nhóm món, bấm thêm để đưa vào đơn hàng ở phía dưới.</p>
      </div>
      <div className={styles.tabs} role="group" aria-label="Lọc nhóm món">
        {CATS.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} className={cat === c ? styles.tabOn : styles.tab} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <ul className={styles.boardGrid}>
        {list.map((i) => (
          <li key={i.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/demos/banh-mi-tang/${i.img}`} alt="" width={800} height={680} loading="lazy" decoding="async" />
            <div>
              <h3>{i.name}</h3>
              <p>{i.desc}</p>
              <div className={styles.boardFoot}>
                <b>{vnd(i.price)}</b>
                <button type="button" className={styles.btnLine} onClick={() => onAdd(i.id)}>
                  Thêm{cart[i.id] ? ` (${cart[i.id]})` : ""}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
