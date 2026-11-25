# QA (thật)
Lệnh: `BASE=http://localhost:3100 node tests/showroom/can-ho-ven-bien/e2e.mjs` (Playwright + Chrome headless). Kết quả lần chạy cuối: 53 pass, 0 fail.
Gồm: 0 lỗi console, 0 request ngoài origin, không tràn ngang 320/390/768/1024/1440; font Spectral/Geologica đã tải + đo glyph Việt + ảnh glyph; hiệu ứng khởi chạy; sticky chapters đổi 0-1-2-3; cảnh nắng đổi màu theo giờ + phím; morph 1PN/2PN/3PN, hover/focus/mũi tên phòng, la bàn đổi theo tầng; annuity khớp công thức độc lập (sai số <0,1%), lãi 0%, rỗng/lỗi; link tư vấn có industry/solution/utm_campaign; menu mobile + Escape; reduced-motion; quét chữ cấm; credits 12 ảnh. Long task >200ms khi cuộn: 0 (1440) và 0 (390).
Chưa kiểm: Safari/Firefox, thiết bị thật, đọc bằng screen reader, Lighthouse, so sánh differentiation.mjs, trạng thái với `?ref=` chỉ kiểm link (cookie do proxy).
Ảnh chụp: tests/showroom/can-ho-ven-bien/screenshots.
