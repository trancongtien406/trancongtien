"use client";

import { useEffect, useRef, useState } from "react";
import s from "../brand.module.css";
import { Photo } from "./Photo";
import { vnd } from "../data/menu";

const ITEMS = [
  { file: "tom-bat-go", alt: "Tôm nướng bơ tỏi trong chén gốm đen đặt trên đế gỗ", name: "Tôm sú nướng muối ớt", note: "Tôm sú còn nhảy, nướng trên than hồng, rắc muối ớt xanh. Ăn nóng, bóc vỏ bằng tay cho đã.", tags: ["Nướng than", "Cay vừa"], price: 480000 },
  { file: "muc-nuong-than", alt: "Mực nướng trên bếp than, được gắp bằng kẹp", name: "Mực nướng sa tế", note: "Mực ống nướng cháy cạnh, phết sa tế tỏi ớt. Lát mực giòn ngọt, thơm khói than.", tags: ["Nướng than", "Cay nồng"], price: 360000 },
  { file: "hau-dia-toi", alt: "Ba con hàu bày trên đĩa trắng, mặt bàn tối", name: "Hàu nướng mỡ hành", note: "Hàu to thịt, nướng cho mỡ hành sôi nhẹ, đậu phộng giã bên trên. Một đĩa khai vị cho cả bàn.", tags: ["Béo, đậm đà", "Khai vị"], price: 180000 },
  { file: "tom-sot", alt: "Tôm sốt cam trên đĩa gốm đen, đũa đang gắp một con tôm", name: "Tôm rang me", note: "Sốt me chua ngọt sánh lại, bám đều từng con tôm. Món hợp chan cơm nóng.", tags: ["Béo, đậm đà", "Chua ngọt"], price: 420000 },
];

export function Signature() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    if (!mq.matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="mon-noi-bat" className={`${s.section} ${s.sig} ${s.noPrint}`} aria-labelledby="sig-h">
      <div className={s.wrap}>
        <div className={s.secHead} data-bv="reveal">
          <span className={s.eyebrow}>Món nổi bật</span>
          <h2 id="sig-h" className={`${s.display} ${s.h2}`}>Bốn đĩa bếp <span className={s.italic}>nướng và rang</span></h2>
          <p className={s.lead}>Bốn món nướng, rang quen thuộc của bếp. Cuộn để xem từng đĩa; giá tham khảo cho một phần 2 đến 3 người, thay đổi theo ngày.</p>
        </div>
        <div className={s.sigGrid}>
          <ol className={s.sigList}>
            {ITEMS.map((it, i) => (
              <li key={it.file} ref={(el) => { refs.current[i] = el; }} data-i={i} data-active={active === i} className={s.sigItem}>
                <div className={s.sigMobilePlate}><Photo file={it.file} alt={it.alt} sizes="78vw" /></div>
                <span className="num" style={{ fontFamily: "var(--bv-display)", fontStyle: "italic", color: "var(--bv-gold)", fontSize: "1.3rem" }}>0{i + 1}</span>
                <h3>{it.name}</h3>
                <p>{it.note}</p>
                <div className={s.sigMeta}>{it.tags.map((t) => <span key={t} className={s.tag}>{t}</span>)}</div>
                <p className={s.sigPrice}>{vnd(it.price)}<small>giá tham khảo</small></p>
              </li>
            ))}
          </ol>
          <div className={s.sigSticky} aria-hidden="true">
            <div className={s.sigPlates} data-bv="sigstack">
              {ITEMS.map((it, i) => (
                <div key={it.file} className={s.sigPlate} data-active={active === i}>
                  <Photo file={it.file} alt="" sizes="600px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
