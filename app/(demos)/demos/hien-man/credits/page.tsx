import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/hien-man/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Hiên Mặn Villa",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Hiên Mặn Villa.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <header className={styles.credHead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/demos/hien-man/identity/logo-horizontal-reversed.svg" alt="Hiên Mặn Villa" width={360} height={96} />
        <a className="back" href="/demos/hien-man" style={{ color: "inherit" }}>← Về trang chính</a>
      </header>
      <main id="main" className={styles.credMain}>
        <p className={styles.eyebrow}>Ảnh &amp; ghi công</p>
        <h1 className={styles.h2}>Ảnh &amp; ghi công</h1>
        <p className={styles.lead}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại được), không ảnh AI.</p>
        <ul className={styles.credGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.credCard}>
              <div className={styles.credThumb}>
                <Image src={`/images/demos/hien-man/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 320px" style={{ objectFit: "cover" }} />
              </div>
              <dl>
                <dt>Mô tả</dt><dd>{c.alt}</dd>
                <dt>Tác giả</dt><dd>{c.author}</dd>
                <dt>Giấy phép</dt><dd>{c.license}</dd>
                <dt>Nguồn</dt><dd><a href={c.sourceUrl} rel="noopener noreferrer">{c.sourceUrl}</a></dd>
                <dt>Ngày kiểm</dt><dd>{c.retrievedAt}</dd>
                <dt>Vị trí dùng</dt><dd>{c.usage}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <h2 className={styles.h3} style={{ marginTop: 64 }}>Font</h2>
        <ul style={{ marginTop: 12 }}>
          {credits.fonts.map((f) => (
            <li key={f.name} style={{ padding: "12px 0", borderBottom: "1px solid var(--hm-hair)" }}>
              <b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 40, fontSize: "0.86rem", color: "var(--hm-t2)" }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </>
  );
}
