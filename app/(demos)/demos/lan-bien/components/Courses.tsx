"use client";

import { useEffect, useRef, useState } from "react";
import { SplitWords } from "@/features/showroom/effects";
import { buildConsultHref } from "@/features/showroom/consultation";
import { COURSES } from "../data/content";
import { Photo } from "./Photo";
import { WaterImage } from "./WaterImage";
import styles from "../brand.module.css";

/**
 * Danh sách khoá học: chọn một hàng thì khung bên phải đổi, ảnh gợn sóng một nhịp (sự kiện "lb:ripple").
 * Mobile: hàng mở ra ngay bên dưới (kiểu accordion, luôn một hàng mở).
 * Công cụ Dive Level Finder gọi `lb:course` để chọn sẵn khoá được gợi ý.
 */
export function Courses() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLUListElement>(null);
  const href = buildConsultHref("lan-bien");

  const pick = (i: number) => {
    setActive((prev) => {
      if (prev !== i) {
        requestAnimationFrame(() => {
          root.current?.querySelector<HTMLElement>(`[data-course-panel="${i}"] [data-water]`)?.dispatchEvent(new CustomEvent("lb:ripple"));
        });
      }
      return i;
    });
  };

  useEffect(() => {
    const h = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const i = COURSES.findIndex((c) => c.id === id);
      if (i >= 0) pick(i);
    };
    window.addEventListener("lb:course", h);
    return () => window.removeEventListener("lb:course", h);
  }, []);

  return (
    <section id="khoa-hoc" className={styles.courses} aria-labelledby="courses-title">
      <div className={styles.wrap}>
        <header className={styles.secHead} data-lb="reveal">
          <p className={styles.kicker}>Khoá học tại Tầng Xanh</p>
          <h2 id="courses-title" className={styles.h2}><SplitWords as="span">Năm chương trình, từ snorkeling đến Advanced.</SplitWords></h2>
          <p className={styles.lede}>Chọn một khoá để xem thời lượng, giá tham khảo và điều kiện tham gia. Lịch khai giảng nằm ở mục Lịch và giá; chỗ được xác nhận khi bạn đặt.</p>
        </header>
        <ul ref={root} className={styles.courseList}>
          {COURSES.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.id} className={styles.courseItem} data-active={on ? "1" : "0"} style={{ ["--r" as string]: i + 1 }}>
                <button
                  type="button" className={styles.courseRow} aria-expanded={on} aria-controls={`course-${c.id}`}
                  onClick={() => pick(i)} onMouseEnter={() => { if (window.matchMedia("(hover:hover) and (min-width:1000px)").matches) pick(i); }}
                  data-cursor="Chọn"
                >
                  <span className={styles.courseN}>{c.n}</span>
                  <span className={styles.courseName}>
                    <b>{c.name}</b>
                    <small>{c.short}</small>
                  </span>
                  <span className={styles.courseTag}>{c.tag}</span>
                  <span className={styles.courseArrow} aria-hidden="true" />
                </button>
                <div id={`course-${c.id}`} className={styles.coursePanel} data-course-panel={i} role="region" aria-label={c.name} aria-hidden={on ? undefined : true}>
                  <WaterImage className={styles.courseMedia} hover={8} scrollPeak={10} fx="water-course">
                    <Photo file={c.img} alt={c.alt} sizes="(max-width: 1000px) 92vw, 44vw" pos={c.pos} w={1200} />
                  </WaterImage>
                  <div className={styles.courseBody}>
                    <p className={styles.courseTagM}>{c.tag}</p>
                    <h3>{c.name}</h3>
                    <p>{c.summary}</p>
                    <dl className={styles.courseFacts}>{c.facts.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}</dl>
                    <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
                    <p className={styles.courseNote}>{c.note}</p>
                    <a className={`${styles.btn} ${styles.btnCoral}`} href={href} tabIndex={on ? 0 : -1}>{c.cta}</a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className={styles.fine}>Open Water và Advanced là tên gọi cấp độ phổ biến trong đào tạo lặn. Nội dung cụ thể phụ thuộc chương trình đào tạo và đánh giá của huấn luyện viên. Giá là giá tham khảo.</p>
      </div>
    </section>
  );
}
