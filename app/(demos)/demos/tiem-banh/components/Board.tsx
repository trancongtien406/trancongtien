"use client";

import Image from "next/image";
import s from "../brand.module.css";
import { DragSticker } from "./DragSticker";
import { Treat } from "./Treat";

const POLAROIDS = [
  { file: "bot-mi-bay", cap: "Nhào bột lúc sáng sớm", alt: "Bàn tay nhào bột, bột mịn bay trong ánh sáng", left: 20, top: 30, rot: -6 },
  { file: "lo-nuong", cap: "Ra lò", alt: "Những ổ bánh chín vàng trong lò nướng", left: 55, top: 26, rot: 5 },
  { file: "tay-nhao-bot", cap: "Tay làm, không máy ép", alt: "Bàn tay nhào khối bột trong tô sứ", left: 36, top: 70, rot: 3 },
  { file: "ca-phe-hoa", cap: "Bánh ngọt và ly cà phê", alt: "Ly cà phê cạnh bình hoa cẩm tú cầu hồng", left: 80, top: 66, rot: -4 },
];

export function Board() {
  return (
    <div className={s.board} role="group" aria-label="Bảng nhãn dán: kéo ảnh và nhãn dán để sắp xếp tuỳ ý">
      <p className={s.boardHint}>Kéo để dời · kéo chấm tròn để xoay · phím mũi tên và R khi đang chọn</p>
      {POLAROIDS.map((p) => (
        <DragSticker key={p.file} label={`Ảnh ${p.cap}`} left={p.left} top={p.top} rot={p.rot} rotatable width="clamp(150px,19vw,250px)" className={s.polaroidDrag}>
          <figure className={s.polaroidIn}>
            <div className={s.polaroidImg}>
              <Image src={`/images/demos/tiem-banh/${p.file}-600.webp`} alt={p.alt} fill sizes="250px" draggable={false} style={{ objectFit: "cover" }} />
            </div>
            <figcaption>{p.cap}</figcaption>
          </figure>
        </DragSticker>
      ))}
      <DragSticker label="Nhãn dán croissant" left={8} top={14} rot={-14} rotatable width="clamp(78px,10vw,124px)" className={s.sticker}>
        <Treat kind="croissant" colors={["#E7A04C", "#F6C97F", "#FFB9A8"]} />
      </DragSticker>
      <DragSticker label="Nhãn dán macaron" left={92} top={12} rot={12} rotatable width="clamp(78px,10vw,124px)" className={s.sticker}>
        <Treat kind="macaron" colors={["#FF8FAE", "#8FE0BE", "#FFE27D"]} />
      </DragSticker>
      <DragSticker label="Nhãn dán donut" left={10} top={84} rot={10} rotatable width="clamp(78px,10vw,124px)" className={s.sticker}>
        <Treat kind="donut" colors={["#E7A04C", "#FF8FAE", "#FFE27D"]} />
      </DragSticker>
      <DragSticker label="Nhãn dán tem làm tay" left={62} top={90} rot={-8} rotatable width="clamp(110px,14vw,170px)" className={s.sticker}>
        <svg viewBox="0 0 160 72" aria-hidden="true"><rect x="4" y="4" width="152" height="64" rx="32" fill="#FF8FAE" stroke="#46251A" strokeWidth="4" /><text x="80" y="31" textAnchor="middle" fontSize="19" fontWeight="800" fill="#46251A" style={{ fontFamily: "var(--mk-display)" }}>LÀM TAY</text><text x="80" y="53" textAnchor="middle" fontSize="15" fontWeight="800" fill="#FFF3EC" style={{ fontFamily: "var(--mk-display)" }}>mỗi sáng</text></svg>
      </DragSticker>
      <DragSticker label="Nhãn dán trái tim" left={90} top={44} rot={8} rotatable width="clamp(60px,7vw,90px)" className={s.sticker}>
        <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 88C20 66 8 48 8 32 8 18 19 10 31 10c9 0 15 5 19 12 4-7 10-12 19-12 12 0 23 8 23 22 0 16-12 34-42 56z" fill="#FF6F98" stroke="#46251A" strokeWidth="5" strokeLinejoin="round" /></svg>
      </DragSticker>
    </div>
  );
}
