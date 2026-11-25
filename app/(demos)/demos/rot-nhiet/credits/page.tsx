import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/rot-nhiet/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Rót Nhiệt Coffee",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Rót Nhiệt Coffee.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={styles.brand}>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerRow}`} style={{ gridTemplateColumns: "1fr auto" }}>
          <a className={styles.logoLink} href="/demos/rot-nhiet" aria-label="Về trang Rót Nhiệt Coffee">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/rot-nhiet/identity/logo-horizontal.svg" alt="Rót Nhiệt Coffee Roasters" width={462} height={104} />
          </a>
          <a className={`${styles.btn} ${styles.btnSecondary}`} href="/demos/rot-nhiet">← Về trang chính</a>
        </div>
      </header>
      <main className={`${styles.wrap} ${styles.creditsPage}`} id="main">
        <span className={`${styles.label} ${styles.eyebrow}`}>Ghi công</span>
        <h1 className={`${styles.display} ${styles.h2}`}>Credits ảnh</h1>
        <p className={styles.lead}>{credits.images.length} ảnh stock chụp thật từ Unsplash (giấy phép Unsplash, dùng thương mại không cần xin phép), không ảnh AI. Ảnh chỉ mang tính giới thiệu phong cách, không đại diện cho một cơ sở cụ thể.</p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.thumb}><Image src={`/images/demos/rot-nhiet/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
        <h2 className={`${styles.display}`} style={{ fontSize: "2.4rem", marginTop: 56 }}>Font</h2>
        <ul style={{ marginTop: 12 }}>
          {credits.fonts.map((f) => <li key={f.name} style={{ padding: "8px 0", borderBottom: "2px solid #1d1d1b" }}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={styles.helper} style={{ marginTop: 40 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </div>
  );
}
