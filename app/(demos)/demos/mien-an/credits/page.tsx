import type { Metadata } from "next";
import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/lib/site";
import styles from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh & ghi công — Miên An Wellness",
  description: "Nguồn, tác giả và giấy phép của toàn bộ ảnh stock và font dùng trên trang Miên An Wellness.",
  robots: { index: false, follow: true },
};

type Credit = {
  file: string; title: string; author: string; authorUrl: string; license: string; licenseUrl: string; sourceUrl: string;
  retrievedAt: string; alt: string; usage: string; type: string; width: number; height: number;
};

async function load(): Promise<Credit[]> {
  const raw = await readFile(path.join(process.cwd(), "public/images/demos/mien-an/credits.json"), "utf8");
  return (JSON.parse(raw) as { images: Credit[] }).images;
}

export default async function CreditsPage() {
  const images = await load();
  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerIn}`} style={{ display: "flex" }}>
          <a href="/demos/mien-an" className={styles.logoLink} aria-label="Miên An Wellness — về trang chủ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/mien-an/identity/logo-horizontal.svg" alt="" width={320} height={100} />
          </a>
          <a href="/demos/mien-an" className={styles.link}>← Về trang chủ</a>
        </div>
      </header>
      <main id="main" className={styles.container}>
        <div className={styles.credHead}>
          <p className={styles.eyebrow}>Ảnh &amp; ghi công</p>
          <h1 className={styles.h2}>Nguồn ảnh &amp; font.</h1>
          <p className={styles.lead}>
            Toàn bộ {images.length} ảnh là ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại được). Không có ảnh AI. Ảnh đã được cắt, giảm bão hoà nhẹ và nén webp.
          </p>
        </div>
        <ul className={styles.credGrid}>
          {images.map((c) => (
            <li key={c.file} className={styles.credCard}>
              <div className={styles.th}>
                <Image src={`/images/demos/mien-an/${c.file}-600.webp`} alt={c.alt} fill sizes="(min-width: 1100px) 360px, (min-width: 720px) 45vw, 92vw" />
              </div>
              <dl>
                <div><dt>Tên ảnh</dt><dd>{c.title}</dd></div>
                <div><dt>Tác giả</dt><dd><a href={c.authorUrl} rel="noopener noreferrer">{c.author}</a></dd></div>
                <div><dt>Nguồn</dt><dd><a href={c.sourceUrl} rel="noopener noreferrer">Trang ảnh gốc</a></dd></div>
                <div><dt>Giấy phép</dt><dd><a href={c.licenseUrl} rel="noopener noreferrer">Pexels License</a></dd></div>
                <div><dt>Dùng tại</dt><dd>{c.usage}</dd></div>
                <div><dt>Ngày lấy</dt><dd>{c.retrievedAt}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
        <h2 className={`${styles.h3} ${styles.credH3}`}>Font</h2>
        <div className={styles.credScroll}>
          <table className={styles.credTable}>
            <thead>
              <tr><th scope="col">Font</th><th scope="col">Vai trò</th><th scope="col">Giấy phép</th><th scope="col">Nguồn</th></tr>
            </thead>
            <tbody>
              <tr><td>Cormorant Garamond 400/500, italic</td><td>Tiêu đề</td><td>SIL OFL 1.1</td><td>Fontsource (@fontsource/cormorant-garamond), tự host</td></tr>
              <tr><td>Be Vietnam Pro 400/500/600</td><td>Nội dung</td><td>SIL OFL 1.1</td><td>Fontsource (@fontsource/be-vietnam-pro), tự host</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.disclaimer} style={{ paddingBottom: 64 }}>
          Logo và biểu tượng Miên An do {siteConfig.fullName} tự vẽ (SVG). Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.
        </p>
      </main>
    </>
  );
}
