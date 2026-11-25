# Yêu cầu file chung (cho điều phối viên)
1. Chạy `scripts/showroom-registry-sync.mjs` để thêm `ruou-vang` (LP-28) vào `features/showroom/registry.ts`. Hiện `buildConsultHref("ruou-vang")` chỉ trả `/lien-he` (không có industry/solution/utm) vì slug chưa có trong registry; e2e in WARN, sẽ tự kiểm đủ tham số khi đã đồng bộ.
2. Không có yêu cầu sửa file chung khác.
