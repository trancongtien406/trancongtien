import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/kim-hoan/credits.json";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Kim Nguyệt",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font dùng trên trang Kim Nguyệt.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <main className={`${s.wrap} ${s.creditsPage}`} id="main">
      <a href="/demos/kim-hoan" className={s.btnLine}>← Về trang chính</a>
      <p className={s.label} style={{ marginTop: 40 }}>Ghi công</p>
      <h1 className={s.h2}>Ảnh &amp; ghi công</h1>
      <p className={s.body}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), không có ảnh tạo bằng AI.</p>
      <ul className={s.creditGrid}>
        {credits.images.map((c) => (
          <li key={c.file} className={s.creditCard}>
            <div className={s.creditThumb}>
              <Image src={`/images/demos/kim-hoan/${c.file.replace("{600,1200,2000}", "600")}`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} />
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
      <h2 className={s.h3}>Font</h2>
      <ul className={s.creditFonts}>
        {credits.fonts.map((f) => (
          <li key={f.name}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer">{f.source}</a></li>
        ))}
      </ul>
      <p className={s.note} style={{ marginTop: 44 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
    </main>
  );
}
