"use client";

import { useEffect, useState } from "react";
import { Mark } from "./Logo";
import styles from "../brand.module.css";

/**
 * Mở nắp hộp trang sức, tổng 1,15 giây, chạy hoàn toàn bằng CSS (nên no-JS cũng tự mở và tự gỡ).
 * JS chỉ thêm: bấm hoặc nhấn phím bất kỳ để bỏ qua, và gỡ khỏi DOM khi xong. Reduced-motion: không hiện (CSS).
 */
export function Intro() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const done = () => setGone(true);
    const t = window.setTimeout(done, 1300);
    window.addEventListener("pointerdown", done, { once: true });
    window.addEventListener("keydown", done, { once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("pointerdown", done);
      window.removeEventListener("keydown", done);
    };
  }, []);
  if (gone) return null;
  return (
    <div className={styles.intro} aria-hidden="true" data-kn="intro">
      <div className={styles.introTop} />
      <div className={styles.introBot} />
      <div className={styles.introSeam} />
      <div className={styles.introGlow} />
      <div className={styles.introMark}><Mark uid="intro" /></div>
      <div className={styles.box}>
        <div className={styles.boxBase} />
        <div className={styles.boxLid} />
      </div>
    </div>
  );
}
