"use client";

import { useState } from "react";
import { COATS, WEIGHTS, buildPlan, fmtTime, fmtVnd, type CoatId, type GoalId, type Species } from "../data/care";
import s from "../brand.module.css";

const r10k = (n: number) => Math.round(n / 10000) * 10000;
const COLS: { id: GoalId; label: string }[] = [
  { id: "bath", label: "Tắm thơm" },
  { id: "trim", label: "Tắm và tỉa gọn" },
  { id: "spa", label: "Spa" },
];

/** Bảng giá theo loài, cân nặng và độ dài lông. Số đổi bằng "lật số" (CSS) mỗi khi đổi lựa chọn. */
export function PriceBoard() {
  const [sp, setSp] = useState<Species>("dog");
  const [coat, setCoat] = useState<CoatId>("short");
  const c = COATS.find((x) => x.id === coat)!;
  return (
    <section id="bang-gia" className={s.price} aria-labelledby="price-h">
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <p className={s.chipInk}>Bảng giá tham khảo</p>
          <h2 id="price-h" className={`${s.display} ${s.h2}`}>Giá theo loài, cân nặng và độ dài lông</h2>
          <p className={s.lead}>Chọn loài và độ dài lông của bé, bảng bên dưới đổi giá và thời gian ngay. Giá chính xác được báo sau khi tiệm xem lông của bé.</p>
        </header>
        <div className={s.priceCtl}>
          <div role="radiogroup" aria-label="Loài" className={s.chipRow}>
            {(["dog", "cat"] as Species[]).map((x) => (
              <label key={x} className={s.opt}>
                <input type="radio" name="pv-pb-sp" checked={sp === x} onChange={() => setSp(x)} />
                <span className={s.optBody}>{x === "dog" ? "Chó" : "Mèo"}</span>
              </label>
            ))}
          </div>
          <div role="radiogroup" aria-label="Độ dài lông" className={s.chipRow}>
            {COATS.map((x) => (
              <label key={x.id} className={s.opt}>
                <input type="radio" name="pv-pb-coat" checked={coat === x.id} onChange={() => setCoat(x.id)} />
                <span className={s.optBody}>{x.label}<small>{x.hint}</small></span>
              </label>
            ))}
          </div>
        </div>
        <div className={s.tableWrap}>
          <table className={s.priceTable}>
            <caption className={s.srOnly}>Bảng giá tham khảo cho {sp === "dog" ? "chó" : "mèo"}, {c.label.toLowerCase()}</caption>
            <thead>
              <tr>
                <th scope="col">Cân nặng</th>
                {COLS.map((x) => <th scope="col" key={x.id}>{x.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {WEIGHTS[sp].map((w) => (
                <tr key={w.id}>
                  <th scope="row">{w.label}</th>
                  {COLS.map((x) => {
                    const price = r10k(w[x.id] * c.mult);
                    const plan = buildPlan({ species: sp, weight: w.id, coat, goal: x.id, conds: [], skin: false });
                    return (
                      <td key={x.id}>
                        <span key={`${sp}-${coat}-${price}`} className={s.flip}><b>{fmtVnd(price)}</b></span>
                        <small>{plan ? `khoảng ${fmtTime(plan.totalMins)}` : ""}</small>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.priceNote}>Giá đã gồm chải sơ, sấy khô, cắt móng và lau tai ngoài. Lông {c.label.toLowerCase()} tính hệ số ×{c.mult.toString().replace(".", ",")} so với lông ngắn. Phụ phí xem bên dưới.</p>
      </div>
    </section>
  );
}
