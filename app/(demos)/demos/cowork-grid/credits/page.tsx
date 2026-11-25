import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/cowork-grid/credits.json";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Ô Lưới",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Ô Lưới.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={s.brand}>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerRow}`}>
          <a className={s.logoLink} href="/demos/cowork-grid" aria-label="Về trang Ô Lưới">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/cowork-grid/identity/logo-horizontal.svg" alt="Ô Lưới" width={110} height={44} />
          </a>
          <a className={`${s.btn} ${s.btnOrange} ${s.btnSm}`} href="/demos/cowork-grid">← Về trang chính</a>
        </div>
      </header>
      <main className={`${s.wrap} ${s.creditsPage}`} id="main">
        <p className={s.secTag}>[ GHI CÔNG ]</p>
        <h1 className={s.h2}>Ảnh và ghi công</h1>
        <p className={s.secLead}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), không ảnh AI. Phần lớn ảnh đã được chuyển sang đơn sắc để thống nhất tông. Ảnh chỉ mang tính giới thiệu phong cách, không đại diện cho một cơ sở cụ thể.</p>
        <ul className={s.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={s.creditCard}>
              <div className={s.thumb}><Image src={`/images/demos/cowork-grid/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
        <h2 className={s.h3} style={{ marginTop: 56 }}>Font</h2>
        <ul className={s.fontList}>
          {credits.fonts.map((f) => <li key={f.name}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={s.secLead} style={{ marginTop: 40, fontSize: 15 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </div>
  );
}
