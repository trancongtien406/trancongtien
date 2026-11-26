"use client";

import { useEffect, useState } from "react";
import { HOURS } from "../data/content";
import styles from "../brand.module.css";

/** Bảng giờ mở cửa: dòng "hôm nay" (giờ Đà Nẵng) được tô sáng bằng vệt kính trượt. SSR chưa tô. */
export function HoursToday() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => {
    const wd = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Ho_Chi_Minh", weekday: "short" }).format(new Date());
    // HOURS bắt đầu từ Thứ Hai
    setToday(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(wd));
  }, []);
  return (
    <table className={styles.hoursTable} data-fx="HoursToday">
      <caption className={styles.srOnly}>Giờ mở cửa trong tuần</caption>
      <tbody>
        {HOURS.map((h, i) => (
          <tr key={h.d} data-today={today === i ? "1" : "0"} data-closed={h.t === "Nghỉ" ? "1" : "0"}>
            <th scope="row">{h.d}{today === i ? <em>Hôm nay</em> : null}</th>
            <td>{h.t}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
