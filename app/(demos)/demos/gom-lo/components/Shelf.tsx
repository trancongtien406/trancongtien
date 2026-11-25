import Image from "next/image";
import { DraggableGallery, ImageHoverDistort } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { PRODUCTS, vnd } from "../data/data";
import { GLAZES } from "../lib/pot";
import { Engrave } from "./Engrave";
import { Pot } from "./Pot";

export function Shelf() {
  return (
    <section id="ke-gom" className={s.shelf} aria-labelledby="shelf-title">
      <div className={s.zigClay} aria-hidden="true" />
      <div className={s.wrap}>
        <div className={s.shelfHead}>
          <div>
            <p className={`${s.hand} ${s.handDark}`}>Kệ gốm</p>
            <Engrave as="h2" id="shelf-title" className={`${s.h2} ${s.h2Dark}`}>Mười món, mỗi món một dấu tay.</Engrave>
          </div>
          <p className={s.shelfNote}>Kéo ngang để xem hết kệ. Giá tham khảo; vì làm tay nên mỗi món lệch nhau một chút, và đó là chủ ý.</p>
        </div>
      </div>
      <DraggableGallery className={s.shelfGal} trackClassName={s.shelfTrack} gap="clamp(14px, 2vw, 28px)" friction={0.94} buttonClassName={s.galBtn} prevLabel="Xem món trước" nextLabel="Xem món sau" label="Kệ gốm, kéo ngang hoặc dùng phím mũi tên để xem các món" >
        {PRODUCTS.map((p) => (
          <article key={p.id} className={s.card}>
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
