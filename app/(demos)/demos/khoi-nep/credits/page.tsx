import type { Metadata } from "next";
import credits from "../../../../../public/images/demos/khoi-nep/credits.json";
import { src } from "../data/images";
import s from "../brand.module.css";

export const metadata: Metadata = {
  title: "Credits ảnh & font — Khối Nếp",
  description: "Nguồn, tác giả và giấy phép của toàn bộ ảnh stock và font dùng trên trang Khối Nếp.",
};

export default function CreditsPage() {
  return (
    <main id="main" className={`${s.section} ${s.credits}`}>
      <div className={s.wrap}>
        <p className={s.label}>Khối Nếp · Credits</p>
        <h1 className={s.h1Dark}>Credits ảnh &amp; font</h1>
        <p className={s.secLead}>
          Thương hiệu, nội dung và hình ảnh trên trang này do Trần Công Tiến thiết kế để giới thiệu phong cách thiết kế website; ảnh là ảnh stock có ghi công bên dưới. Toàn bộ ảnh là ảnh stock chụp thật từ Pexels (giấy phép Pexels, miễn phí cho
          mục đích thương mại), không phải công trình do Khối Nếp thực hiện. Không dùng ảnh tạo bằng AI.
        </p>
        <a className={s.textLink} href="/demos/khoi-nep">
          ← Về trang chính
        </a>
        <h2 className={s.h3}>Ảnh ({credits.images.length})</h2>
        <ul className={s.creditList}>
          {credits.images.map((im) => (
            <li key={im.file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src(im.file, 600)} alt={im.alt} width={240} height={160} loading="lazy" />
              <div>
                <p className={s.h3}>{im.title}</p>
                <p>
                  Tác giả: <strong>{im.author}</strong> · {im.license}
                </p>
                <p>
                  Nguồn:{" "}
                  <a href={im.sourceUrl} rel="noopener noreferrer" target="_blank">
                    {im.sourceUrl}
                  </a>
                </p>
                <p className={s.hint}>
                  Dùng tại: {im.usage} · Lấy ngày {im.retrievedAt} · {im.file}-*.webp
                </p>
              </div>
            </li>
          ))}
        </ul>
        <h2 className={s.h3}>Font</h2>
        <ul className={s.creditFonts}>
          {credits.fonts.map((f) => (
            <li key={f.name}>
              <strong>{f.name}</strong> — {f.license} — {f.source}
            </li>
          ))}
        </ul>
        <p className={s.hint}>Logo, favicon và og-image do Trần Công Tiến thiết kế cho trang này, tên thương hiệu đang ở trạng thái NEEDS_OWNER_REVIEW.</p>
      </div>
    </main>
  );
}
