# REQUESTS (file chung cần điều phối viên sửa)
1. `features/showroom/registry.ts`: thêm `{ id: "LP-12", slug: "tiem-banh", brand: "Mây Kẹo", industry: "Tiệm bánh", solutionSlug: "fnb", tagline: "Tiệm bánh ngọt làm tay", batch: 2, look: "Pastel kẹo, nhãn dán, bo tròn lớn, confetti và kem chảy" }` (hoặc theo `meta.ts`). Hiện chưa có, nên `buildConsultHref("tiem-banh")` trả `/lien-he` thiếu industry/solution/utm.
2. `app/layout.tsx` đặt `id="top"` trên `<body>`: demo đã tránh trùng bằng id `dau-trang`.
