"use client";

import { useMemo, useState } from "react";
import styles from "../brand.module.css";
import {
  CATEGORY_LABEL, DEFAULT_FILTERS, MENU_CROP, INTENSITY_LABEL, MENU, MENU_IMAGES, MILK_LABEL, TEMP_LABEL,
  filterMenu, formatVnd, type MenuCategory, type MenuFilters, type MenuItem, type Temperature,
} from "../data/menu";
import { Photo } from "./Photo";
import { useTray } from "./TrayProvider";

type Opt<T> = { value: T | "all"; label: string };
const CAT: Opt<MenuCategory>[] = [{ value: "all", label: "Tất cả" }, ...(Object.keys(CATEGORY_LABEL) as MenuCategory[]).map((v) => ({ value: v, label: CATEGORY_LABEL[v] }))];
const INT: Opt<1 | 2 | 3>[] = [{ value: "all", label: "Tất cả" }, { value: 1, label: "Nhẹ" }, { value: 2, label: "Vừa" }, { value: 3, label: "Đậm" }];
const TMP: Opt<Temperature>[] = [{ value: "all", label: "Tất cả" }, { value: "hot", label: "Nóng" }, { value: "cold", label: "Lạnh" }];
const MLK: Opt<"with-milk" | "without-milk">[] = [{ value: "all", label: "Tất cả" }, { value: "with-milk", label: "Có sữa" }, { value: "without-milk", label: "Không sữa" }];

function Group<T extends string | number>({ label, opts, value, onPick }: { label: string; opts: Opt<T>[]; value: T | "all"; onPick: (v: T | "all") => void }) {
  return (
    <fieldset className={styles.filterGroup}>
      <legend className={styles.label}>{label}</legend>
      <div className={styles.chips}>
        {opts.map((o) => (
          <button key={String(o.value)} type="button" className={styles.chipBtn} aria-pressed={value === o.value} onClick={() => onPick(o.value)}>{o.label}</button>
        ))}
      </div>
    </fieldset>
  );
}

function Card({ item, filterTemp }: { item: MenuItem; filterTemp: Temperature | "all" }) {
  const { add } = useTray();
  const both = item.temperatures.length > 1;
  const [pick, setPick] = useState<Temperature>("hot");
  const temp: Temperature = !both ? item.temperatures[0] : filterTemp !== "all" ? filterTemp : pick;
  const img = MENU_IMAGES[item.imageId];
  const [added, setAdded] = useState(false);
  return (
    <li className={styles.card}>
      <div className={styles.cardTop}><span className={styles.label}>{item.id}</span><span className={styles.label}>{CATEGORY_LABEL[item.category]}</span></div>
      <div className={styles.cardPhoto}><Photo name={img.src} alt={img.alt} sizes="(max-width: 640px) 36vw, (max-width: 1100px) 50vw, 33vw" position={MENU_CROP[item.id].position} zoom={MENU_CROP[item.id].zoom} size={1200} /></div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{item.name}</h3>
        <p className={styles.cardDesc}>{item.description}</p>
        <div className={styles.tags}>
          {item.intensity ? <span className={`${styles.tag} ${styles.tagInk}`}>{INTENSITY_LABEL[item.intensity]}</span> : <span className={`${styles.tag} ${styles.tagInk}`}>Không cà phê</span>}
          <span className={styles.tag}>{MILK_LABEL[item.milk]}</span>
          {!both && <span className={styles.tag}>{TEMP_LABEL[item.temperatures[0]]}</span>}
        </div>
        <div className={styles.cardFoot}>
          <span className={styles.price}>{formatVnd(item.priceVnd)}</span>
          {both && filterTemp === "all" && (
            <div className={styles.segment} role="group" aria-label={`Nhiệt độ ${item.name}`}>
              {item.temperatures.map((t) => <button key={t} type="button" aria-pressed={temp === t} onClick={() => setPick(t)}>{TEMP_LABEL[t]}</button>)}
            </div>
          )}
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.addBtn}`}
            onClick={() => { if (add(item.id, temp) === "ok") { setAdded(true); setTimeout(() => setAdded(false), 1200); } }}
            aria-label={`Thêm ${item.name} ${TEMP_LABEL[temp].toLowerCase()} vào khay`}
          >
            {added ? "Đã thêm ✓" : "Thêm vào khay"}
          </button>
        </div>
      </div>
    </li>
  );
}

export function InteractiveMenu() {
  const [f, setF] = useState<MenuFilters>(DEFAULT_FILTERS);
  const list = useMemo(() => filterMenu(MENU, f), [f]);
  const active = JSON.stringify(f) !== JSON.stringify(DEFAULT_FILTERS);
  const set = <K extends keyof MenuFilters>(k: K) => (v: MenuFilters[K]) => setF((p) => ({ ...p, [k]: v }));
  return (
    <section id="menu" className={`${styles.section} ${styles.menuSection}`} aria-labelledby="rn-menu-h">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div>
            <span className={`${styles.label} ${styles.eyebrow}`}>01 / THE MENU</span>
            <h2 id="rn-menu-h" className={`${styles.display} ${styles.h2}`}>Uống gì?</h2>
          </div>
          <div>
            <p className={styles.lead}>Mỗi gu một ly. Chọn thứ bạn thích hôm nay: đậm, nhẹ, nóng, lạnh hay một chút sữa.</p>
            <p className={styles.helper}>Giá dưới đây là giá tham khảo.</p>
          </div>
        </div>
        <div className={styles.toolbar} role="group" aria-label="Lọc theo gu của bạn">
          <Group label="Loại" opts={CAT} value={f.category} onPick={set("category")} />
          <Group label="Độ đậm" opts={INT} value={f.intensity} onPick={set("intensity")} />
          <Group label="Nhiệt độ" opts={TMP} value={f.temperature} onPick={set("temperature")} />
          <Group label="Sữa" opts={MLK} value={f.milk} onPick={set("milk")} />
        </div>
        <div className={styles.resultsBar}>
          <p role="status" aria-live="polite"><b>{list.length}</b> / {MENU.length} món phù hợp</p>
          {active && <button type="button" className={styles.linkBtn} onClick={() => setF(DEFAULT_FILTERS)}>Xóa bộ lọc</button>}
        </div>
        {list.length === 0 ? (
          <div className={styles.grid}>
            <div className={styles.empty}>
              <p>Chưa có ly nào hợp bộ lọc này.</p>
              <p style={{ marginBottom: 16 }}>Thử bỏ bớt một lựa chọn nhé.</p>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => setF(DEFAULT_FILTERS)}>Xóa bộ lọc</button>
            </div>
          </div>
        ) : (
          <ul className={styles.grid}>{list.map((i) => <Card key={i.id} item={i} filterTemp={f.temperature} />)}</ul>
        )}
        <div className={styles.menuCta}>
          <a className={`${styles.btn} ${styles.btnSecondary}`} href="#tim-gu">Chưa biết uống gì? Tìm gu trong 3 câu hỏi</a>
          <span className={styles.helper}>Mức độ đậm chỉ mô tả cảm nhận hương vị, không phải lượng caffeine.</span>
        </div>
      </div>
    </section>
  );
}
