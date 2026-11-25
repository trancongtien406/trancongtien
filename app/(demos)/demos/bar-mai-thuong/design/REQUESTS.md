# REQUESTS · file dùng chung cần điều phối viên

1. Thêm bản ghi `bar-mai-thuong` vào `features/showroom/registry.ts` (từ `meta.ts`: id LP-11, brand "Tầng Mây", industry "Rooftop bar", solutionSlug "fnb", tagline, look). Khi chưa có, `buildConsultHref("bar-mai-thuong")` chỉ trả `/lien-he` trơn, không có `industry/solution/utm_campaign`.
