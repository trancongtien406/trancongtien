"use client";

import { useState } from "react";
import styles from "../brand.module.css";
import { addToCart, useCart } from "./cart";
import { PRODUCTS, REGION_LABEL, fmtVnd, type Region } from "./data";

const TABS: ("all" | Region)[] = ["all", "bac", "trung", "nam"];

export function Catalog() {
  const [tab, setTab] = useState<"all" | Region>("all");
  const cart = useCart();
  const qty = (id: number) => cart.lines.find((l) => l.id === id)?.qty ?? 0;
  const list = PRODUCTS.filter((p) => tab === "all" || p.region === tab);
  return (
    <section id="dac-san" className={styles.sec} aria-labelledby="h-ds">
      <p className={styles.eyebrow}>Quầy đặc sản</p>
      <h2 id="h-ds" className={styles.h2}>Mười hai món được hỏi mua nhiều nhất</h2>
      <div className={styles.filters} role="group" aria-label="Lọc theo miền">
        {TABS.map((t) => (
          <button key={t} type="button" aria-pressed={tab === t} className={tab === t ? styles.filterOn : styles.filter} onClick={() => setTab(t)}>
            {t === "all" ? "Tất cả" : REGION_LABEL[t]}
          </button>
        ))}
      </div>
      <ul className={styles.catGrid}>
        {list.map((p) => (
          <li key={p.id} className={styles.catCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/demos/cho-ba-mien/sp-${p.id}.webp`} alt="" width={160} height={200} loading="lazy" decoding="async" />
            <small>{REGION_LABEL[p.region]}</small>
            <h3>{p.name}</h3>
            <p>{p.note}</p>
            <div className={styles.catFoot}>
              <b>{fmtVnd(p.price)}</b>
              <button type="button" className={styles.addBtn} onClick={() => addToCart(p.id)}>
                {qty(p.id) ? `Đã có ${qty(p.id)}, thêm` : "Thêm vào giỏ"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
