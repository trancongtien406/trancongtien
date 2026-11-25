import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/nep-tho/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Nếp Thở",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Nếp Thở.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={styles.brand}>
      <header className={styles.header}>
        <div className={styles.headerPill}>
          <a className={styles.logoLink} href="/demos/nep-tho" aria-label="Về trang Nếp Thở">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/nep-tho/identity/logo-horizontal.svg" alt="Nếp Thở" width={132} height={40} />
          </a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="/demos/nep-tho">← Về trang chính</a>
        </div>
      </header>
      <main className={`${styles.wrap} ${styles.creditsPage}`} id="main">
        <p className={styles.eyebrow}>Ảnh &amp; ghi công</p>
        <h1 className={styles.h2}>Ảnh &amp; ghi công</h1>
        <p className={styles.body}>Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới. {credits.images.length} ảnh chụp thật từ Pexels (Pexels License, dùng thương mại), không ảnh AI.</p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.creditThumb}><Image src={`/images/demos/nep-tho/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
              <dl>
                <dt>Tên ảnh</dt><dd>{c.title}</dd>
                <dt>Tác giả</dt><dd>{c.author}</dd>
                <dt>Giấy phép</dt><dd>{c.license}</dd>
                <dt>Nguồn</dt><dd><a href={c.sourceUrl} rel="noopener noreferrer">{c.sourceUrl}</a></dd>
                <dt>Ngày kiểm</dt><dd>{c.retrievedAt}</dd>
                <dt>Vị trí dùng</dt><dd>{c.usage}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <h2 className={styles.h3} style={{ marginTop: 56 }}>Font</h2>
        <p className={styles.small} style={{ marginTop: 8 }}>Sora (font dự kiến ban đầu) không có subset tiếng Việt nên được thay bằng Lexend.</p>
        <ul className={styles.fontList}>
          {credits.fonts.map((f) => <li key={f.name}><b>{f.name}</b> · {f.usage} · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={styles.helper} style={{ marginTop: 40 }}>Website do {siteConfig.fullName} thiết kế.</p>
      </main>
    </div>
  );
}
