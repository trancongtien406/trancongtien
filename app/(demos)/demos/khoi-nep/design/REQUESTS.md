# REQUESTS — Khối Nếp

1. next.config.ts: thêm allowedDevOrigins: ["127.0.0.1"] (Next 16 dev chặn tài nguyên dev từ origin 127.0.0.1 khi server nghe localhost → trang mở bằng http://127.0.0.1:3100 KHÔNG hydrate, mọi tương tác client chết; mở bằng http://localhost:3100 thì hydrate bình thường). Không phải lỗi của demo; e2e Khối Nếp chạy với BASE=http://localhost:3100.
