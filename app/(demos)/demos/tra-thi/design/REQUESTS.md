# Yêu cầu sửa file chung

1. `features/showroom/registry.ts`: thêm dòng để `buildConsultHref("tra-thi")` sinh đủ `industry`, `solution`, `utm_*` (nếu thiếu, nút cuối chỉ dẫn tới `/lien-he`):
   `{ id: "LP-13", slug: "tra-thi", brand: "Tịch Trà", industry: "Nhà trà", solutionSlug: "fnb", tagline: "Nhà trà", batch: 3, look: "Mực nho thiền: nền than ấm, loang mực, xanh lá trà, một điểm đỏ son" }`
   (khớp `app/(demos)/demos/tra-thi/meta.ts`).
