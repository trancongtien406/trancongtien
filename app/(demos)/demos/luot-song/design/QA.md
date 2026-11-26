# QA — Ráng Sóng Surf Club

Lệnh: `BASE=http://localhost:3100 node tests/showroom/luot-song/e2e.mjs` (Playwright + Chrome headless, dev server chung). Kết quả lần chạy cuối (sau đợt chỉnh nội dung + hiệu ứng 2026-11-25): 101 pass, 0 fail.

## Đã kiểm (tự động)
- Tải trang 1440: 0 lỗi console, 0 request ra ngoài origin, title/robots/lang, 1 h1.
- Font Việt: 8 face tải thật; so mực canvas 26 ký tự (ă â ê ô ơ ư đ Ắ…Ự) với font dự phòng cho display + body: 0 lỗi; ảnh `screenshots/glyphs.png`, `font-h1.png` tự xem (dấu Ế Ệ Ổ Ử Ữ không chồng/cắt).
- Chữ cấm mục 11 (demo, minh hoạ, giả định, mô phỏng, dữ liệu mẫu) trên văn bản hiển thị, alt, aria, title, meta, details: 0, ở các trạng thái mặc định, planner có kết quả, mùa sóng.
- Hiệu ứng: SplitWords, VelocityMarquee (chạy, dừng/chạy lại bằng nút), ScrollScrubText, ClipReveal x8, DraggableGallery (nút Khoá sau cuộn thật), SVGPathDraw, GrainOverlay, MagneticButton, ShineSweep, ScrollProgress; tuỳ chỉnh: sóng chạy ngang, biên độ sóng tăng khi cuộn nhanh (1.01 -> ~2.4), mặt trời/tem/ván lướt đổi transform theo cuộn, textPath startOffset chạy theo cuộn.
- Planner: bỏ trống -> 4 lỗi + aria-invalid; kết quả đúng cho 5 tổ hợp (Đứng Vững 1.650.000; Tiến Bậc Sóng 3.300.000 + ghi chú 40+; Sóng Nhí 750.000 + phụ huynh; Điều Ván + xác nhận phụ huynh); thứ tự bài học an toàn < chèo < pop-up < đọc sóng; checklist 7 mục + tiến độ 2/7; chép tóm tắt; Chọn lại; mũi tên đổi radio. Link thoát `/lien-he?industry=...&solution=education&utm_source=showroom&utm_campaign=luot-song`.
- Mùa sóng: đổi tháng đổi nội dung; có lưu ý "tham khảo, không phải dự báo, HLV quyết định mỗi buổi"; không có câu khẳng định an toàn.
- FAQ mở; Tab tới CTA hero; Escape đóng menu mobile và trả focus; touch target >=44px (mobile); không tràn ngang 320/390/768/1024/1440; reduced-motion (không khối ẩn, sóng/tia nắng đứng yên, biên độ không đổi); no-JS (nội dung có trong HTML); long task >200ms khi cuộn toàn trang: 0 ở 1440 và 390 (đo bằng PerformanceObserver, Chrome headless).
- Ảnh chụp `screenshots/`: `d-hero`, `d-full` (1440), `m-hero`, `m-full` (390), `glyphs`, `font-h1`; đã tự xem và sửa: h1 xuống dòng 3, tia mặt trời đen (thiếu biến màu), chip tháng tràn ngang, lưới chọn "số buổi" xuống dòng xấu ở mobile, ruy băng chồng chữ, bố cục planner (form + kết quả tách hàng).

## Chưa kiểm / yếu
- Chỉ Chrome headless; chưa Safari/Firefox, trình đọc màn hình, thiết bị thật, Lighthouse/axe, `next build` production, đo bundle.
- Tương phản tính tay (chữ nâu/vàng ~8:1, nâu/cam ~4.9:1, kem/teal đậm ~7:1); chữ kem trên teal #0f8b8d KHÔNG dùng cho chữ nhỏ.
- Dải ruy băng có nút Dừng nằm đè lên chữ ở mép phải (44px bắt buộc).
- Ván lướt chạy theo đường chấm nét riêng, không bám sóng đang chuyển động.
- Mô tả mùa sóng theo tháng là mô tả chung do agent viết, chưa đối chiếu số liệu sóng thật; cần người am hiểu lướt sóng Đà Nẵng duyệt.
- Giá khoá cho "biết đứng/đã lướt" là giá tham khảo do agent tự đặt.

## Đợt chỉnh 2026-11-25 (đề tài + hiệu ứng)
- e2e cập nhật: hero nêu loại hình/khu vực/CTA/3 sự thật; 6 thẻ khoá; bảng giá + thuê + bao gồm + đồ mang; 4 vai trò; chính sách dời lịch; đồng hồ buổi học chạy theo cuộn (phút tăng, đúng một bước nổi); cung nắng (mặt trời trượt, thẻ 15:30, mũi tên); ba cờ (cờ đỏ, ghi quy ước nội bộ, cờ phấp phới); planner bậc 1/3/5/10 (đủ 10 buổi); xác nhận đã bỏ SplitReveal, ScrollScrubText, ClipReveal, SVGPathDraw, MagneticButton, ScrollProgress (0 gốc).
- Ma trận hiệu ứng trước/sau: đại trà 8 (vượt) -> 2/2; chữ ký thư viện 3 (ShineSweep, DraggableGallery, GrainOverlay) + 8 chữ ký riêng (REWORK.md).
- Long task >200ms khi cuộn: 0 ở 1440; ở 390 lần cuối có 1 (281ms, Chrome headless, máy tải do dev server chung), lần trước 0.
- Chụp lại 1440/390 và tự xem: sửa thẻ trời tràn ngang ở 320/390, bảng giá tràn ở 320, bố cục lưới giá.
- og-image vẽ lại, không chứa chữ demo/minh hoạ (tự xem).
- Yếu: giá, giờ học, chính sách là nội dung do agent đặt cho trang, cần chủ trường duyệt; mô tả mùa sóng chưa đối chiếu số liệu thật.
