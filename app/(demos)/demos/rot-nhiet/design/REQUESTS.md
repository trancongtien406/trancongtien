# REQUESTS (file chung cần điều phối viên/chủ xử lý)

1. **next.config.ts - `allowedDevOrigins`**: dev server `http://127.0.0.1:3100` KHÔNG hydrate (HMR websocket bị Next 16 chặn, mọi nút trên mọi trang, kể cả /lien-he, không phản hồi), còn `http://localhost:3100` thì chạy. Đề xuất thêm `allowedDevOrigins: ["127.0.0.1"]` (chỉ ảnh hưởng dev) hoặc dùng `localhost` khi kiểm thử. Test của Rót Nhiệt dùng `localhost:3100`.
2. Không có yêu cầu nào khác; `consultation.ts`, registry, layout chung được dùng nguyên trạng.
