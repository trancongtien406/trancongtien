# REQUESTS (đề xuất sửa file chung)

- `features/showroom/registry.ts`: cần dòng cho `sat-gym` (id LP-18) lấy từ `meta.ts` bằng `scripts/showroom-registry-sync.mjs`. (Khi chạy e2e lần cuối, `buildConsultHref("sat-gym")` đã trả `industry=Phòng tập&solution=fitness&utm_campaign=sat-gym`, tức điều phối viên đã đồng bộ.)
- Thanh nổi dùng chung (DemoNotice) chồng lên đáy màn hình mobile; trong trang đã chừa khoảng đệm cuối footer, nhưng thanh vẫn che nút/giá khi vừa cuộn tới. Không cần sửa gấp.
- Không cần sửa `features/showroom/effects/*` (không có chỉnh sửa nào được yêu cầu).
