# REQUESTS — đề xuất sửa file chung (không tự sửa)

1. `next.config.ts` — thêm `allowedDevOrigins: ["127.0.0.1"]` (Next 16 dev). Khi mở dev server qua `http://127.0.0.1:3100` thì trang SSR đúng nhưng KHÔNG hydrate (không client JS: tương tác, GSAP, dialog đều không chạy; websocket HMR báo ERR_INVALID_HTTP_RESPONSE). Mở qua `http://localhost:3100` thì hydrate bình thường. Test e2e của Miên An dùng localhost (BASE có thể đổi bằng biến môi trường).
2. Dev server dùng chung từng trả 500 tạm thời vì file đang viết dở của demo khác (rot-nhiet/fonts.ts "Unexpected spread"): lỗi một demo làm 500 route demo khác; chỉ cần lưu ý khi chạy test.
