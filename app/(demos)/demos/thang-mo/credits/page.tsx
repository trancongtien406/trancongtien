import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/thang-mo/credits.json";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh & ghi công · Tháng Mơ",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Tháng Mơ.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={styles.brand}>
      <header className={styles.creditHeader}>
        <div className={styles.wrap}>
          <a href="/demos/thang-mo" aria-label="Về trang Tháng Mơ" style={{ lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/thang-mo/identity/logo-horizontal.svg" alt="Tháng Mơ" width={170} height={58} />
          </a>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="/demos/thang-mo">← Về trang chính</a>
        </div>
      </header>
      <main className={`${styles.wrap} ${styles.creditsPage}`} id="main">
        <p className={styles.eyebrow}>Tháng Mơ · Ảnh &amp; font</p>
        <h1 className={styles.h2}>Ảnh &amp; ghi công</h1>
        <p className={styles.body}><b>Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</b> Toàn bộ {credits.images.length} ảnh là ảnh stock chụp thật từ Pexels (Pexels License, cho dùng thương mại, không bắt buộc ghi công; chúng tôi vẫn ghi công). Không có ảnh AI. Ảnh chỉ để gợi phong cách chụp.</p>
        <ul className={styles.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={styles.creditCard}>
              <div className={styles.creditThumb}><Image src={`/images/demos/thang-mo/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 700px) 90vw, 360px" style={{ objectFit: "cover" }} /></div>
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
        <p className={styles.small} style={{ marginTop: 8 }}>Body dùng Josefin Sans thay cho Jost của bản đặc tả, vì Jost không có glyph tiếng Việt (thiếu ơ, ư và chữ có dấu chồng).</p>
        <ul className={styles.fontList}>
          {credits.fonts.map((f) => <li key={f.name}><b>{f.name}</b> · {f.usage} · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={styles.helper} style={{ marginTop: 40 }}>Website do {siteConfig.fullName} thiết kế.</p>
      </main>
    </div>
  );
}
