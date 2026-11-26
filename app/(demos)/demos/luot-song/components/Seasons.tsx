"use client";

import { useEffect, useState } from "react";
import { LEVEL_WORD, MONTHS } from "../lib/seasons";
import { Divider, wavePath } from "./Art";
import { Photo } from "./Photo";
import styles from "../brand.module.css";

const RAY_IN = 96;

export function Seasons() {
  const [m, setM] = useState(11);
  useEffect(() => { setM(new Date().getMonth() + 1); }, []);
  const cur = MONTHS[m - 1];
  const water = 76 - (cur.level / 5) * 140 * 0.86;
  return (
    <section id="mua-song" className={styles.seasons} aria-labelledby="ms-title">
      <Divider fill="var(--rs-deep)" className={styles.dividerTop} />
      <div className={styles.wrap}>
        <p className={styles.kickerDark} data-rs="reveal">Mùa sóng</p>
        <h2 id="ms-title" className={styles.h2} data-rs="reveal">Học vào tháng nào, <span className={styles.script}>biển ra sao?</span></h2>
        <p className={styles.lede} data-rs="reveal">Mô tả chung theo tháng để bạn chọn mùa học. Đây không phải dự báo thời tiết hay dự báo sóng của một ngày cụ thể; trường nhìn biển thật mỗi sáng.</p>

        <div className={styles.seasonGrid}>
          <div className={styles.dialWrap}>
            <svg className={styles.dial} viewBox="-230 -230 460 460" role="img" aria-label={`Vòng tia nắng 12 tháng, đang chọn tháng ${m}: ${LEVEL_WORD[cur.level].toLowerCase()}`}>
              <defs>
                <clipPath id="rs-dial-c"><circle r="78" /></clipPath>
              </defs>
              <circle r="222" fill="var(--rs-sun)" opacity="0.55" />
              {MONTHS.map((x) => {
                const a = (x.m - 1) * 30;
                const len = 24 + x.level * 24;
                const on = x.m === m;
                return (
                  <g key={x.m} transform={`rotate(${a})`} className={styles.rayG} onClick={() => setM(x.m)} data-on={on ? "1" : "0"}>
                    <path d={`M-17 -${RAY_IN} L-9 -${RAY_IN + len} Q0 -${RAY_IN + len + 12} 9 -${RAY_IN + len} L17 -${RAY_IN}Z`} fill={on ? "var(--rs-orange)" : x.level >= 4 ? "var(--rs-teal)" : x.level >= 3 ? "var(--rs-deep)" : "var(--rs-brown)"} stroke="var(--rs-brown)" strokeWidth="3" strokeLinejoin="round" />
                    <text y={-(RAY_IN + len + 22)} textAnchor="middle" className={styles.rayNum} transform={`rotate(${-a} 0 ${-(RAY_IN + len + 22)})`}>{x.m}</text>
                  </g>
                );
              })}
              <circle r="86" fill="var(--rs-sand)" stroke="var(--rs-brown)" strokeWidth="6" />
              <g clipPath="url(#rs-dial-c)">
                <g style={{ transform: `translateY(${water}px)`, transition: "transform .8s cubic-bezier(.22,1,.36,1)" }}>
                  <g className={styles.tideRun}>
                    <path d={wavePath(4, 140, 9, 0, 240).replace(/^M0 0/, "M-140 0")} transform="translate(0 0)" fill="var(--rs-teal)" />
                  </g>
                </g>
              </g>
              <circle r="78" fill="none" stroke="var(--rs-brown)" strokeWidth="2" opacity="0.4" />
              <text className={styles.dialMonth} textAnchor="middle" y="-6">Tháng</text>
              <text className={styles.dialNum} textAnchor="middle" y="46">{m}</text>
            </svg>
            <ul className={styles.legend} aria-label="Chú giải vòng tia nắng">
              <li><i style={{ background: "var(--rs-brown)" }} /> Thường ít sóng</li>
              <li><i style={{ background: "var(--rs-deep)" }} /> Sóng vừa, chuyển mùa</li>
              <li><i style={{ background: "var(--rs-teal)" }} /> Nhiều sóng đáng chú ý</li>
            </ul>
          </div>

          <div className={styles.seasonInfo}>
            <div className={styles.monthChips} role="group" aria-label="Chọn tháng">
              {MONTHS.map((x) => (
                <button key={x.m} type="button" className={styles.chipBtn} aria-pressed={x.m === m} onClick={() => setM(x.m)} aria-label={`Tháng ${x.m}`}>{x.m}</button>
              ))}
            </div>
            <div className={styles.monthCard} aria-live="polite">
              <div className={styles.monthPhoto}>
                <div className={styles.monthPhotoFrame}><Photo file="ong-song" alt="Bên trong ống sóng xanh ngọc nhìn ra bãi cát" sizes="(max-width: 900px) 90vw, 36vw" w={1200} pos="50% 50%" /></div>
              </div>
              <p className={styles.monthKicker}>Tháng {m} · {LEVEL_WORD[cur.level]}</p>
              <h3 className={styles.monthTitle}>{cur.title}</h3>
              <p>{cur.text}</p>
              <dl className={styles.monthDl}>
                <div><dt>Người mới</dt><dd>{cur.newbie}</dd></div>
                <div><dt>Người đã lướt</dt><dd>{cur.skilled}</dd></div>
              </dl>
            </div>
            <p className={styles.safetyNote} role="note">
              <b>Lưu ý:</b> đây là mô tả mùa mang tính tham khảo, không phải dự báo và không phải cam kết sẽ tổ chức buổi học. Điều kiện thực tế do huấn luyện viên quyết định mỗi buổi, dựa trên sóng, gió, dòng chảy, thuỷ triều và cảnh báo thời tiết; huấn luyện viên có thể đổi địa điểm, đổi nội dung hoặc hoãn buổi học.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
