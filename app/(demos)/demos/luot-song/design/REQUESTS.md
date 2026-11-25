# Yêu cầu sửa file chung
- `features/showroom/registry.ts` (tự sinh): cần chạy `scripts/showroom-registry-sync.mjs` để thêm `luot-song` từ `meta.ts`. Cho tới lúc đó `buildConsultHref("luot-song")` chỉ trả `/lien-he` (thiếu industry/solution/utm_campaign) và nút "Trao đổi lịch" ở planner + "Hẹn buổi học đầu tiên" ở CTA cuối chưa có tham số.
- (nhỏ) Thư viện effects: `ParallaxLayer` luôn gọi `markReady(el,"static")` sau khi `mm.add` nên `data-fx-ready` đọc ra "static" dù hiệu ứng đã chạy.
