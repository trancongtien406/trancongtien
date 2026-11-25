import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/net-lech/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Nét Lệch",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Nét Lệch.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={styles.brand}>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerRow}`} style={{ gridTemplateColumns: "1fr auto" }}>
          <a className={styles.logoLink} href="/demos/net-lech" aria-label="Về trang Nét Lệch">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/net-lech/identity/logo-reversed.svg" alt="Nét Lệch" width={150} height={44} />
          </a>
          <a className={`${styles.btn} ${styles.btnLime}`} href="/demos/net-lech">← Về trang chính</a>
        </div>
      </header>
      <main className={`${styles.wrap} ${styles.creditsPage}`} id="main">
        <p className={styles.eyebrow}>Về trang này</p>
        <h1 className={styles.h2}>Credits ảnh</h1>
        <p className={styles.lead} style={{ marginTop: 16 }}>{credits.images.length} ảnh stock chụp thật từ Pexels (Pexels License, dùng thương mại), không có ảnh AI. Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới, không phải hình ảnh của nhân viên hay khách hàng nào.</p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.creditThumb}><Image src={`/images/demos/net-lech/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
        <ul className={styles.fontList}>
          {credits.fonts.map((f) => <li key={f.name}><b>{f.name}</b> · {f.usage} · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={styles.note} style={{ marginTop: 40 }}>Website do {siteConfig.fullName} thiết kế.</p>
      </main>
    </div>
  );
}
