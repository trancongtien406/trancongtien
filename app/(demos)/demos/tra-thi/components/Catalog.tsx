"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import s from "../brand.module.css";
import { TEAS, vnd, fmtSec, type Tea } from "../data/tea";
import { InkReveal, InkTitle } from "./Ink";

const GROUPS = [
  { id: "all", label: "Tất cả", test: () => true },
  { id: "xanh", label: "Xanh & trắng", test: (t: Tea) => /xanh|trắng|Bột/i.test(t.kind) && !/ướp/i.test(t.kind) },
  { id: "olong", label: "Ô long", test: (t: Tea) => /Ô long/.test(t.kind) },
  { id: "dam", label: "Hồng & lên men", test: (t: Tea) => /Hồng|Hậu/.test(t.kind) },
  { id: "huong", label: "Ướp hương", test: (t: Tea) => /ướp/i.test(t.kind) },
];


function Detail({ tea, onBrew }: { tea: Tea; onBrew: (t: Tea) => void }) {
  return (
    <>
      <p className={s.teaKind}><i className={s.swatch} style={{ background: tea.swatch }} />{tea.kind} · {tea.origin}</p>
      <h3 className={s.h3}>{tea.name}</h3>
      <p>{tea.flavor}.</p>
      <dl className={s.specs}>
        <div><dt>Nhiệt độ</dt><dd>{tea.tempC}&nbsp;°C</dd></div>
        <div><dt>Lượng trà</dt><dd>{tea.grams}&nbsp;g / {tea.ml}&nbsp;ml</dd></div>
        <div><dt>Nước đầu</dt><dd>{fmtSec(tea.steeps[0])}</dd></div>
        <div><dt>Giá tham khảo</dt><dd>{vnd(tea.price)}</dd></div>
      </dl>
      <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={() => onBrew(tea)}>Xem cách pha và bấm giờ</button>
    </>
  );
}

export function Catalog() {
  const [group, setGroup] = useState("all");
  const [active, setActive] = useState<string>(TEAS[0].id);
  const list = useMemo(() => TEAS.filter(GROUPS.find((g) => g.id === group)!.test), [group]);
  const cur = TEAS.find((t) => t.id === active) ?? TEAS[0];
  const inList = list.some((t) => t.id === cur.id);
  const shown = inList ? cur : list[0] ?? cur;

  const brew = (t: Tea) => {
    window.dispatchEvent(new CustomEvent("tt:brew", { detail: t.id }));
    document.getElementById("ghep-tra")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className={`${s.wrap} ${s.catalog}`}>
      <div className={s.catalogHead}>
        <p className={s.kicker}>Danh mục trà</p>
        <InkTitle as="h2" className={s.h2}>Những sắc vị trong một chiếc chén.</InkTitle>
        <p className={s.lead}>Giá là giá tham khảo cho một ấm thưởng trà tại bàn, có thể thay đổi theo mùa vụ và nguồn cung.</p>
        <div className={s.chips} role="group" aria-label="Lọc theo nhóm trà">
          {GROUPS.map((g) => (
            <button key={g.id} type="button" className={s.chip} aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>{g.label}</button>
          ))}
        </div>
      </div>

      <ul className={s.teaList}>
        {list.map((t, i) => (
          <li key={t.id}>
            <button
              type="button" className={s.teaRow} aria-pressed={shown.id === t.id} data-cursor="Xem"
              onClick={() => setActive(t.id)} onMouseEnter={() => setActive(t.id)} onFocus={() => setActive(t.id)}
            >
              <span className={s.teaNo}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.teaName}><i className={s.swatch} style={{ background: t.swatch }} />{t.name}</span>
              <span className={s.teaFlavor}>{t.kind} · {t.origin}</span>
              <span className={s.teaPrice}>{vnd(t.price)}</span>
            </button>
            {shown.id === t.id && <div className={s.rowDetail}><Detail tea={t} onBrew={brew} /></div>}
          </li>
        ))}
        {list.length === 0 && <li className={s.empty}>Chưa có trà trong nhóm này.</li>}
      </ul>

      <aside className={s.teaPanel} aria-live="polite" aria-label="Chi tiết loại trà đang chọn">
        <InkReveal className={s.teaPanelImg}>
          <Image src="/images/demos/tra-thi/la-tra-kho-1200.webp" alt="Cận cảnh lá trà khô sẫm màu" width={2000} height={3000} sizes="(max-width: 900px) 92vw, 30vw" className={s.cover} loading="lazy" />
        </InkReveal>
        <div className={s.teaDetail} key={shown.id}><Detail tea={shown} onBrew={brew} /></div>
      </aside>
    </div>
  );
}
