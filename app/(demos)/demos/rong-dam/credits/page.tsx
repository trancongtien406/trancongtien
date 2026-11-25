import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/rong-dam/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Rong Dặm",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Rong Dặm.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerRow}`}>
          <a className={styles.logoLink} href="/demos/rong-dam" aria-label="Về trang Rong Dặm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/rong-dam/identity/logo-horizontal.svg" alt="Rong Dặm" width={320} height={90} translate="no" />
          </a>
          <div className={styles.headerTools}>
            <a className={`${styles.btn} ${styles.btnGhost}`} href="/demos/rong-dam">← Về trang chính</a>
          </div>
        </div>
      </header>
      <main id="main" className={`${styles.wrap} ${styles.section}`}>
        <span className={`${styles.label} ${styles.eyebrow}`}>Ảnh &amp; ghi công</span>
        <h1 className={styles.h2}>Ảnh và font</h1>
        <p className={styles.lead} style={{ marginTop: 12 }}>
          {credits.images.length} ảnh stock chụp thật (Unsplash License, Pexels License), không có ảnh AI.
          Ảnh hoi-an-song-den có xô sơn in nhãn được làm mờ; ảnh den-long-hoi-an được cắt bỏ cạnh phải (có đèn pha in logo). Nhãn địa danh của vài ảnh theo mô tả của nguồn.
        </p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.creditThumb}>
                <Image src={`/images/demos/rong-dam/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 700px) 92vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
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
        <h2 className={styles.h3} style={{ marginTop: 48 }}>Font</h2>
        <ul style={{ marginTop: 10 }}>
          {credits.fonts.map((f) => (
            <li key={f.name} style={{ padding: "10px 0", borderBottom: "1.5px dashed var(--rd-line)" }}>
              <b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a>
              <br />
              <span className={styles.small}>{f.use}</span>
            </li>
          ))}
        </ul>
        <p className={styles.small} style={{ marginTop: 36 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </>
  );
}
