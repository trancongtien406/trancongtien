import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/can-ho-ven-bien/credits.json";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Vọng Triều",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font dùng trên trang Vọng Triều.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <main className={`${s.wrap} ${s.creditsPage}`} id="main">
      <a href="/demos/can-ho-ven-bien" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>← Về trang chính</a>
      <p className={s.sheet} style={{ marginTop: 40 }}><span>Ghi công</span></p>
      <h1 className={s.h2}>Ảnh &amp; ghi công</h1>
      <p className={s.lede}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), không có ảnh tạo bằng AI. Ảnh chỉ nhằm giới thiệu phong cách, không đại diện cho một dự án cụ thể.</p>
      <ul className={s.creditGrid}>
        {credits.images.map((c) => (
          <li key={c.file} className={s.creditCard}>
            <div className={s.thumb}><Image src={`/images/demos/can-ho-ven-bien/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
      <h2 className={s.h2} style={{ marginTop: 56 }}>Font</h2>
      <ul className={s.creditFonts}>
        {credits.fonts.map((f) => (
          <li key={f.name}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>
        ))}
      </ul>
      <p className={s.lede} style={{ marginTop: 44, fontSize: 15 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
    </main>
  );
}
