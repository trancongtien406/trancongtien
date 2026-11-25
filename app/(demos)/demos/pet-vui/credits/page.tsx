import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/pet-vui/credits.json";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Bông Xù",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Bông Xù.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={s.brand}>
      <header style={{ padding: "16px 0" }}>
        <div className={s.wrap} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <a className={s.logoLink} href="/demos/pet-vui" aria-label="Về trang Bông Xù">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/pet-vui/identity/logo-horizontal.svg" alt="Bông Xù" width={160} height={48} />
          </a>
          <a className={`${s.btn} ${s.btn_white}`} href="/demos/pet-vui">← Về trang chính</a>
        </div>
      </header>
      <main className={`${s.wrap} ${s.creditsPage}`} id="main">
        <span className={s.chipInk}>Ghi công</span>
        <h1 className={`${s.display} ${s.h2}`} style={{ marginTop: 16 }}>Ảnh và ghi công</h1>
        <p className={s.lead} style={{ marginTop: 16 }}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), không ảnh AI. Các nhãn dán, logo và hình trang trí nhỏ trên trang là hình vẽ bằng SVG, không phải ảnh chụp.</p>
        <ul className={s.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={s.creditCard}>
              <div className={s.thumb}><Image src={`/images/demos/pet-vui/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
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
        <h2 className={s.display} style={{ fontSize: "2.2rem", marginTop: 56 }}>Font</h2>
        <ul style={{ marginTop: 12 }}>
          {credits.fonts.map((f) => <li key={f.name} style={{ padding: "10px 0", borderBottom: "2px solid #14121a" }}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>)}
        </ul>
        <p className={s.lead} style={{ marginTop: 40, fontSize: 15 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </div>
  );
}
