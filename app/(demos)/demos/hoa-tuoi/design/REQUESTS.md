# REQUESTS — đề xuất sửa file chung (không tự sửa)
1. `features/showroom/registry.ts`: chạy `node scripts/showroom-registry-sync.mjs` để thêm LP-17 `hoa-tuoi` (từ `meta.ts`). Khi chưa có, `buildConsultHref("hoa-tuoi")` chỉ trả `/lien-he` không kèm `industry/solution/utm_*`.
2. `features/showroom/effects/media.tsx` (DraggableGallery): khi quán tính đang chạy (gsap.ticker, tới ~1.6s sau khi thả), phím Home/End hoặc nút Trước/Sau dùng `scrollTo/scrollBy smooth` bị ticker ghi đè (scrollLeft bị kéo lại). Nên dừng ticker khi nhận phím hoặc click nút.
3. `solutionSlug`: chọn `ecommerce` (tiệm bán hoa). Nếu chủ muốn gộp vào nhóm khác, sửa `meta.ts`.
