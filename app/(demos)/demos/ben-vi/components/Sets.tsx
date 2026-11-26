"use client";

import { TiltCard } from "@/features/showroom/effects";
import s from "../brand.module.css";
import { SETS } from "../data/restaurant";

export function Sets() {
  return (
    <section id="set-tiec" className={`${s.section} ${s.setsSec} ${s.noPrint}`} aria-labelledby="sets-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Set theo số người</span>
          <h2 id="sets-h" className={`${s.display} ${s.h2}`}>Đi bao nhiêu người, <span className={s.italic}>gọi bấy nhiêu món</span></h2>
          <p className={s.lead}>Bốn set gợi ý để chốt nhanh. Món trong set có thể đổi theo mùa hải sản; giá là giá tham khảo, thay đổi theo ngày, chưa gồm thuế và phí phục vụ.</p>
        </div>
        <ul className={s.setGrid}>
          {SETS.map((st) => (
            <li key={st.id}>
              <TiltCard className={s.setCard} max={7} glareColor="rgba(226,186,121,0.22)" scale={1.015}>
                <p className={s.setTag}>{st.tag}</p>
                <h3>{st.name}</h3>
                <p className={s.setPrice}>{st.price}</p>
                <ul className={s.setItems}>{st.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
