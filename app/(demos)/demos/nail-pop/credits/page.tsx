import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/nail-pop/credits.json";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Chấm Chanh",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Chấm Chanh.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={s.brand}>
      <header style={{ padding: "16px 0" }}>
        <div className={s.wrap} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <a className={s.logoLink} href="/demos/nail-pop" aria-label="Về trang Chấm Chanh">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/nail-pop/identity/logo-horizontal.svg" alt="Chấm Chanh" width={172} height={30} />
          </a>
          <a className={`${s.btn} ${s.btnLine}`} href="/demos/nail-pop">← Về trang chính</a>
        </div>
      </header>
      <main className={`${s.wrap} ${s.creditsPage}`} id="main">
        <p className={s.kicker}>Ghi công</p>
        <h1 className={s.h2}>Ảnh và ghi công</h1>
        <p className={s.lead}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), không ảnh AI. Logo, hình bàn tay và các hình trang trí là hình vẽ bằng SVG.</p>
        <ul className={s.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={s.creditCard}>
              <div className={s.thumb}><Image src={`/images/demos/nail-pop/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
        <h2 className={s.h3} style={{ marginTop: 48 }}>Font</h2>
        <ul style={{ marginTop: 12 }}>
          {credits.fonts.map((f) => <li key={f.name} className={s.fontRow}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={s.fine} style={{ marginTop: 40 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </div>
  );
}
