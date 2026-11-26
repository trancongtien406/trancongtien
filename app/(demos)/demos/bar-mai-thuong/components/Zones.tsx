"use client";

import { useState } from "react";
import s from "../brand.module.css";
import { IMGS, type Img } from "../data/images";
import { Photo } from "./Photo";

const ZONES: { id: string; name: string; lead: string; text: string; img: Img }[] = [
  { id: "san-thuong", name: "Sân thượng mở", lead: "40 chỗ · ngoài trời", text: "Gió đêm, bầu trời Đà Nẵng và thành phố lên đèn bên dưới. Hợp nhóm nhỏ, buổi tối trời đẹp. Khi trời mưa, khu này đóng và khách được chuyển vào Hiên kính.", img: IMGS.rooftop },
  { id: "hien-kinh", name: "Hiên kính", lead: "24 chỗ · có mái", text: "Kính chắn gió, ánh đèn ấm, vẫn thấy toàn cảnh. Hợp cuộc trò chuyện dài và những hôm gió lớn.", img: IMGS.lounge },
  { id: "quay-bar", name: "Quầy bar", lead: "8 ghế · 1 đến 3 người", text: "Ngồi sát bartender, xem từng ly được pha và hỏi vị thoải mái. Nhận đặt tối đa 3 người, ghế còn lại ưu tiên khách đến sớm.", img: IMGS.counter },
  { id: "goc-neon", name: "Góc neon", lead: "18 chỗ · 4 đến 8 người", text: "Sofa dưới bảng đèn hồng và cyan, hợp nhóm bạn, sinh nhật nhỏ. Có thể ghép hai bàn cho nhóm đến 12 người.", img: IMGS.neon },
];

export function Zones() {
  const [i, setI] = useState(0);
  return (
    <section className={s.zones} id="khong-gian" aria-label="Không gian rooftop">
      <div className={s.wrap}>
        <header className={s.secHead}>
          <p className={s.kicker}>Không gian &amp; sức chứa</p>
          <h2 className={s.h2} data-tm="lit">Bốn khu ngồi trên tầng thượng, tổng khoảng 90 chỗ</h2>
        </header>
        <div className={s.zoneGrid}>
          <ul className={s.zoneList}>
            {ZONES.map((z, k) => (
              <li key={z.id} className={s.zoneItem} data-active={k === i || undefined}>
                <button type="button" className={s.zoneBtn} aria-pressed={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)} onFocus={() => setI(k)}>
                  <span className={s.zoneNo}>0{k + 1}</span>
                  <span className={s.zoneName}>{z.name}</span>
                  <span className={s.zoneLead}>{z.lead}</span>
                </button>
                <div className={s.zoneBody}>
                  <p>{z.text}</p>
                  <div className={s.zoneMobImg}><Photo img={z.img} sizes="92vw" className={s.cover} /></div>
                </div>
              </li>
            ))}
          </ul>
          <div className={s.zoneStage} aria-hidden="true">
            {ZONES.map((z, k) => (
              <div key={z.id} className={s.zoneShot} data-on={k === i || undefined}>
                <Photo img={z.img} sizes="(max-width: 900px) 0px, 46vw" className={s.cover} />
              </div>
            ))}
            <span className={s.stageTube} />
          </div>
        </div>
      </div>
    </section>
  );
}
