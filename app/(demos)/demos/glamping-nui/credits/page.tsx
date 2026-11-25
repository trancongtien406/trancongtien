import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/glamping-nui/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Rừng Thức",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Rừng Thức.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <header className={styles.header} data-solid="true">
        <div className={`${styles.wrap} ${styles.headerRow}`}>
          <a className={styles.logoLink} href="/demos/glamping-nui" aria-label="Về trang Rừng Thức">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/glamping-nui/identity/logo-horizontal.svg" alt="Rừng Thức" width={168} height={60} translate="no" />
          </a>
          <div className={styles.headerTools}>
            <a className={`${styles.btn} ${styles.btnLine} ${styles.btnSm}`} href="/demos/glamping-nui">← Về trang chính</a>
          </div>
        </div>
      </header>
      <main id="main" className={`${styles.wrap} ${styles.section}`} style={{ paddingTop: 140 }}>
        <p className={styles.eyebrow}>Ảnh &amp; ghi công</p>
        <h1 className={styles.h2}>Ảnh và font</h1>
        <p className={styles.lead}>{credits.images.length} ảnh stock chụp thật (Pexels License), không có ảnh tạo bằng AI. Ảnh được cắt khung và nén sang webp.</p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.creditThumb}>
                <Image src={`/images/demos/glamping-nui/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 700px) 92vw, 33vw" style={{ objectFit: "cover" }} />
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
            <li key={f.name} style={{ padding: "10px 0", borderBottom: "1px dashed var(--gl-line)" }}>
              <b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a>
              <br />
              <span className={styles.fine}>{f.use}</span>
            </li>
          ))}
        </ul>
        <p className={styles.fine} style={{ marginTop: 36 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </>
  );
}
