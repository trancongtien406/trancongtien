import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/mien-cuoi/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Miền Cười",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Miền Cười.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={styles.brand}>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerRow}`} style={{ gridTemplateColumns: "1fr auto" }}>
          <a className={styles.logoLink} href="/demos/mien-cuoi" aria-label="Về trang Miền Cười">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/mien-cuoi/identity/logo-horizontal.svg" alt="Miền Cười" width={216} height={55} />
          </a>
          <a className={`${styles.btn} ${styles.btnSecondary}`} href="/demos/mien-cuoi">← Về trang chính</a>
        </div>
      </header>
      <main className={`${styles.wrap} ${styles.creditsPage}`} id="main">
        <p className={styles.eyebrow}>Ghi công</p>
        <h1 className={styles.h2}>Credits ảnh</h1>
        <p className={styles.body}>{credits.images.length} ảnh stock chụp thật từ Pexels (Pexels License, dùng thương mại), không ảnh AI. Ảnh chỉ mang tính giới thiệu phong cách, không đại diện cho một cơ sở cụ thể và không phải ảnh kết quả điều trị. Ba nhân vật bác sĩ là hình đồ hoạ vector tự vẽ, không dùng ảnh người thật.</p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.creditThumb}><Image src={`/images/demos/mien-cuoi/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
        <p className={styles.helper} style={{ marginTop: 40 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </div>
  );
}
