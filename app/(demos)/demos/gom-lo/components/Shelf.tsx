"use client";

import { useState } from "react";
import Image from "next/image";
import { DraggableGallery, ImageHoverDistort } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { CATS, PRODUCTS, vnd, type CatId } from "../data/data";
import { GLAZES } from "../lib/pot";
import { Engrave } from "./Engrave";
import { Pot } from "./Pot";

export function Shelf() {
  const [cat, setCat] = useState<CatId | "all">("all");
  const from = (id: CatId) => Math.min(...PRODUCTS.filter((p) => p.cat === id).map((p) => p.price));
  return (
    <section id="ke-gom" className={s.shelf} aria-labelledby="shelf-title">
      <div className={s.zigClay} aria-hidden="true" />
      <div className={s.wrap}>
        <div className={s.shelfHead}>
          <div>
            <p className={`${s.hand} ${s.handDark}`}>Gốm bán tại xưởng</p>
            <Engrave as="h2" id="shelf-title" className={`${s.h2} ${s.h2Dark}`}>Cốc, bát, bình và bộ quà làm tay.</Engrave>
          </div>
          <p className={s.shelfNote}>Chọn theo nhóm hoặc kéo ngang để xem hết kệ. Giá tham khảo; vì làm tay nên mỗi món lệch nhau một chút, và đó là chủ ý. Xem tận tay tại xưởng trong giờ mở cửa.</p>
        </div>
        <div className={s.catRow} role="group" aria-label="Lọc theo nhóm sản phẩm">
          <button type="button" className={`${s.catBtn} ${cat === "all" ? s.catOn : ""}`} aria-pressed={cat === "all"} onClick={() => setCat("all")}>Tất cả <small>{PRODUCTS.length} món</small></button>
          {CATS.map((c) => (
            <button key={c.id} type="button" className={`${s.catBtn} ${cat === c.id ? s.catOn : ""}`} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name} <small>từ {vnd(from(c.id))}</small>
            </button>
          ))}
        </div>
      </div>
      <DraggableGallery className={s.shelfGal} trackClassName={s.shelfTrack} gap="clamp(14px, 2vw, 28px)" friction={0.94} buttonClassName={s.galBtn} prevLabel="Xem món trước" nextLabel="Xem món sau" label="Kệ gốm, kéo ngang hoặc dùng phím mũi tên để xem các món" >
        {PRODUCTS.map((p) => (
          <article key={p.id} className={s.card} hidden={cat !== "all" && p.cat !== cat}>
            <div className={s.cardMedia} data-cursor="Kéo">
              {p.img ? (
                <ImageHoverDistort className={s.distort} strength={34} frequency={0.014}>
                  <Image src={`/images/demos/gom-lo/${p.img.file}-1200.webp`} alt={p.img.alt} fill sizes="(max-width: 640px) 78vw, 320px" draggable={false} style={{ objectFit: "cover" }} />
                </ImageHoverDistort>
              ) : p.pot ? (
                <div className={s.potCard}>
                  <Pot className={s.potSvg} shape={p.pot.shape} bulge={p.pot.bulge} neck={p.pot.neck} glaze={GLAZES.find((g) => g.id === p.pot!.glaze)} pattern={p.pot.pattern} dip={p.pot.dip} wheel={false} label={`${p.name}, bình xoay tròn`} />
                </div>
              ) : null}
              <span className={s.cardCode}>{p.code}</span>
            </div>
            <div className={s.cardBody}>
              <h3>{p.name}</h3>
              <p>{p.note}</p>
              <p className={s.price}><span>Giá tham khảo</span> <b>{vnd(p.price)}</b></p>
            </div>
          </article>
        ))}
      </DraggableGallery>
    </section>
  );
}
