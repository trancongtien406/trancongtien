# REQUESTS
- `features/showroom/registry.ts`: thêm dòng LP-27 `kim-hoan` bằng `node scripts/showroom-registry-sync.mjs` (đọc meta.ts). Đến khi đó `buildConsultHref("kim-hoan")` chỉ trả `/lien-he` trơn (không có industry/solution/utm); e2e kiểm tham số nên sẽ FAIL cho tới khi registry đồng bộ.
- Không cần sửa thư viện effects.
