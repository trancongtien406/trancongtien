# REQUESTS (file chung cần điều phối viên sửa)

1. `features/showroom/registry.ts` chưa có `gom-lo`, nên `buildConsultHref("gom-lo")` chỉ trả `/lien-he` trần (không có industry/solution/utm_campaign). Thêm dòng (khớp `meta.ts`):
   `{ id: "LP-26", slug: "gom-lo", brand: "Đất Mơ", industry: "Xưởng gốm", solutionSlug: "fnb", tagline: "Xưởng gốm & workshop", look: "Thủ công đất: nền terracotta và nâu đất có vân đất sét, men xanh ngọc điểm nhấn, bàn xoay SVG nặn bình" }`
   e2e đang in WARN cho mục này; sau khi thêm, nhánh kiểm `solution=fnb` + `utm_campaign=gom-lo` sẽ chạy.
