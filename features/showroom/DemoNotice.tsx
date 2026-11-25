"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { buildConsultHref } from "./consultation";
import { DEMOS } from "./registry";
import styles from "./DemoNotice.module.css";

/** Thanh nổi của chủ site: nói rõ đây là website do Trần Công Tiến thiết kế + đường về form tư vấn thật. */
export function DemoNotice() {
  const pathname = usePathname() || "";
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  // Sau vài giây thu gọn thành nút nhỏ để không che đáy trang của landing.
  useEffect(() => {
    const t = window.setTimeout(() => setCompact(true), 6000);
    return () => window.clearTimeout(t);
  }, []);
  const demo = DEMOS.find((d) => pathname.startsWith(`/demos/${d.slug}`));
  if (hidden) return null;
  return (
    <div className={styles.bar} role="region" aria-label="Thông tin thiết kế website">
      <div className={`${styles.pill} ${compact ? styles.compact : ""}`}>
        <span className={styles.txt}>
          <b>Thiết kế bởi Trần Công Tiến</b>
          <span className={styles.long}> · website thương hiệu sáng tác</span>
        </span>
        <a className={styles.cta} href={buildConsultHref(demo?.slug ?? "")}>
          Muốn website như thế này?
        </a>
        <button type="button" className={styles.close} onClick={() => setHidden(true)} aria-label="Ẩn thanh thông tin">
          Ẩn
        </button>
      </div>
    </div>
  );
}
