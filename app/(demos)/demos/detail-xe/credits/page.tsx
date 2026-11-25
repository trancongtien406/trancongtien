import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import credits from "@/public/images/demos/detail-xe/credits.json";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Ảnh và ghi công · Gương Phẩm",
  description: "Nguồn, tác giả và giấy phép của ảnh stock và font trên trang Gương Phẩm.",
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <div className={s.brand}>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerRow}`}>
          <a className={s.logoLink} href="/demos/detail-xe" aria-label="Về trang Gương Phẩm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/demos/detail-xe/identity/logo-reversed.svg" alt="Gương Phẩm" width={296} height={47} />
          </a>
          <a className={`${s.btn} ${s.btnSm}`} href="/demos/detail-xe">← Về trang chính</a>
        </div>
      </header>
      <main className={`${s.wrap} ${s.creditsPage}`} id="main">
        <span className={s.kicker}>Ghi công</span>
        <h1 className={s.h2}>Ảnh và ghi công</h1>
        <p className={s.lead}>{credits.images.length} ảnh stock chụp thật từ Pexels (giấy phép Pexels, dùng thương mại), không ảnh AI. Ảnh được cắt khung, giảm bão hoà màu và chỉnh tông lạnh; logo và chữ nhỏ trên xe đã được làm mờ. Ảnh chỉ mang tính giới thiệu phong cách, không đại diện cho một cơ sở hay chiếc xe cụ thể. Lớp bụi bẩn trong phần quy trình là đồ hoạ vẽ bằng CSS phủ lên ảnh xe sạch, không phải ảnh xe bẩn thật.</p>
        <ul className={s.creditGrid}>
          {credits.images.map((c) => (
            <li key={c.file} className={s.creditCard}>
              <div className={s.thumb}><Image src={`/images/demos/detail-xe/${c.file}-600.webp`} alt={c.alt} fill sizes="(max-width: 640px) 90vw, 300px" style={{ objectFit: "cover" }} /></div>
              <dl>
                <dt>Tên ảnh</dt><dd>{c.title}</dd>
                <dt>Tác giả</dt><dd>{c.author}</dd>
                <dt>Giấy phép</dt><dd>{c.license}</dd>
                <dt>Nguồn</dt><dd><a href={c.sourceUrl} rel="noopener noreferrer">{c.sourceUrl}</a></dd>
                <dt>Ngày kiểm</dt><dd>{c.retrievedAt}</dd>
                <dt>Vị trí dùng</dt><dd>{c.usage}</dd>
                <dt>Chỉnh sửa</dt><dd>{c.edits}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <h2 className={s.h3} style={{ marginTop: 56 }}>Font</h2>
        <ul style={{ marginTop: 12 }}>
          {credits.fonts.map((f) => <li key={f.name} style={{ padding: "10px 0", borderBottom: "1px solid var(--dx-line)" }}><b>{f.name}</b> · {f.author} · {f.license} · <a href={f.source} rel="noopener noreferrer" style={{ color: "var(--dx-chrome)" }}>{f.source}</a></li>)}
        </ul>
        <p className={s.lead} style={{ marginTop: 40, fontSize: 15 }}>Thương hiệu, nội dung và hình ảnh trên trang này do {siteConfig.fullName} thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới.</p>
      </main>
    </div>
  );
}
