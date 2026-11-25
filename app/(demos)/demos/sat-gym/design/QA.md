# QA — SẬT Gym (kết quả thật, 2026-11-25)

## Lệnh và kết quả
- `BASE=http://localhost:3100 node tests/showroom/sat-gym/e2e.mjs` (Chrome headless qua Playwright, server dev dùng chung): **RESULT pass=151 fail=0**, lần chạy cuối, không có dòng RETRY. Chạy sau mọi chỉnh sửa cuối (hero copy fade, thanh thông số, dedupe ảnh, chống Timer crash).
- `npx tsc --noEmit -p . | grep sat-gym`: không lỗi. `npx eslint "app/(demos)/demos/sat-gym"`: 0 lỗi, 1 cảnh báo (`aria-invalid` trên radio, cùng cách làm với các landing khác).
- Server dev: `/demos/sat-gym`, `/demos/sat-gym/credits`, `/demos/lan-bien` đều 200 sau chỉnh sửa cuối.

## Những gì e2e kiểm (số trong ngoặc là số kiểm tra gần đúng)
- 320/390/768/1024/1440: không tràn ngang (kể cả sau khi cuộn hết trang), 0 lỗi console, 0 request ra ngoài origin (20).
- Hiệu ứng khởi chạy: OutlineText, StackingCards, Counter, VelocityMarquee, ScrollScrubText, ClipReveal, ParallaxLayer, GrainOverlay, CustomCursor, ScrollProgress, BarbellLift (data-fx), hero choreography xong, thanh thông số nằm trong viewport 1440x900.
- Chữ SẬT: tô theo vị trí chuột (--sg-hover 75%), trả về 0 khi rời, tô theo cuộn (--sg-scroll ~80%), cuộn đi và quay lại thì nội dung hero hiện lại đủ; tiêu đề rỗng viền tô theo cuộn; số thẻ tô khi rê; 4 thẻ sticky và thẻ đầu thu nhỏ khi bị phủ (scale 0.895).
- Thanh tạ: kg 20 đến 110 tăng đơn điệu theo cuộn, 6 đĩa trượt vào, thanh nâng lên (y 634 đến 505), đúng 1 bước active; marquee chạy và nút Dừng làm đứng.
- Rung CTA: có rung khi nhấn, biên độ ≤ 4px (đo 0.96px), về đúng vị trí nghỉ; reduced-motion không rung.
- Chữ cấm (`demo`, `minh hoạ`, `giả định`, `mô phỏng`, `dữ liệu mẫu`) không có trong văn bản hiển thị, alt, aria, title, meta description/OG.
- Glyph tiếng Việt: 11 file font đã tải, đo độ rộng khác sans-serif cho display và body; ảnh `screenshots/glyph-bsd.png` cho thấy Ố Ế Ể Ệ Ợ Ử Ữ Ầ Ắ Ằ Ậ đậm cỡ lớn không bị cắt dấu hay tách rời.
- Workout Picker: trạng thái rỗng, 4 lỗi khi chưa chọn (aria-invalid + aria-describedby, focus vào ô lỗi đầu tiên), 15 phút ra 5 động tác và 30 phút ra 6, Thể lực/Tổng hợp-15 mặc định Tabata, Sức mạnh/Tổng hợp-30 mặc định EMOM, người mới không nhận bài thanh tạ cấp 2-3, chỉ dùng dụng cụ đã chọn, Đổi bài khác cho bài khác, chuyển Tabata/EMOM (aria-pressed), cảnh báo khởi động + dừng tập + hỏi bác sĩ, không có chữ về giảm cân/đốt mỡ/calo/cam kết, nút CTA ra `/lien-he?industry=Phòng tập&solution=fitness&utm_source=showroom&utm_campaign=sat-gym`.
- Đồng hồ (đồng hồ giả lập của Playwright, đã `pauseAt` để không trôi): không chạy khi chưa tích xác nhận khởi động (hiện lỗi + focus vào checkbox), 00:10 chuẩn bị đếm đúng, chuyển CHUẨN BỊ > LÀM (10s) > NGHỈ (20s) > LÀM (10s) và đổi động tác, tạm dừng giữ nguyên thời gian, tiếp tục, Space/R trên vùng đồng hồ, âm báo mặc định tắt và bật được, chạy hết kế hoạch ra trạng thái Xong, EMOM đổi động tác mỗi phút (00:58 sau 12s), Bỏ qua nhảy sang đoạn kế (01:00).
- Lịch lớp: 24 lớp, 7 cột ngày, 4 nhân vật SVG, không có `<img>`, lọc loại/khung giờ/HLV đúng, trạng thái rỗng và Xoá bộ lọc, chọn lớp (aria-pressed), tóm tắt 2 lớp có ngày và giờ, link `/lien-he`.
- Reduced motion: h1, hero copy, nút, nhãn stencil hiện đủ; hero không chạy choreography; thanh tạ không ghim, hiện 110 kg và đủ đĩa; outline tĩnh; không rung; picker và đồng hồ vẫn hoạt động (đồng hồ đếm).
- Mobile 390 (cảm ứng): không có con trỏ tuỳ chỉnh, menu mở/Escape/trả focus, link menu đi tới #chon-bai và đóng menu, 0 mục tương tác nhỏ hơn 40px ở cả hai chiều.
- Bàn phím: Tab đầu tiên là link "Bỏ qua", tới nút CTA hero, có viền focus; FAQ mở được; 4 gói tập hiển thị "Giá tham khảo" và định dạng vi-VN (1.900.000).
- Không có ô nhập chữ/email/điện thoại (không thu thập thông tin cá nhân); mọi link tư vấn (>= 6) là `/lien-he` cùng origin; trang không ghi cookie `tct_ref`; mở với `?ref=TESTREF` vẫn render; `/lien-he` nhận href + ref.
- Ảnh: mọi `<img>` có alt, không lặp ảnh trong trang (>= 10 ảnh, đều khác nhau). Trang credits: 200, liệt kê 13 ảnh + 3 font + lời công khai Trần Công Tiến, noindex.

## Hiệu năng thô
- Số long task > 200ms: 0 ở 1440 (cuộn toàn trang), 0 ở 390 (cuộn toàn trang). Máy đang tải nặng nhiều agent cùng chạy.

## Ảnh chụp (đã tự xem)
`tests/showroom/sat-gym/screenshots/`: hero-1440, hero-390, full-1440, full-390 (ảnh full-page có hiện tượng sticky lặp, chỉ dùng xem nhịp trang), glyph-bsd, picker-390, schedule-390, barbell-390, credits-1280. Đã sửa sau khi xem: chữ SẬT đè nhãn, thanh thông số tràn khỏi màn đầu, ảnh có chữ hãng "ROGUE" (cắt), ảnh lặp hero/gallery, nội dung hero kẹt mờ sau khi cuộn đi quay lại, thẻ lớp mobile quá dài.

## Lỗi thật bắt được nhờ kiểm thử và đã sửa
- Đổi bài (hoặc chuyển Tabata/EMOM) khi đồng hồ đã chạy xong làm `Timer` đọc `segs[idx]` ngoài mảng và sập trang: đã gắn `key` theo bài và chặn chỉ số.
- Nội dung hero không hiện lại sau khi cuộn đi và quay lại (hai tween cùng điều khiển opacity): chuyển tween cuộn sang khối bao.

## Chưa kiểm / hạn chế
- Chỉ Chrome headless. Chưa Safari/Firefox (`@property` và `background-clip:text` kèm `-webkit-text-stroke` cần xem trên Safari), chưa thiết bị thật, trình đọc màn hình, Lighthouse/axe, `next build` production, đo bundle.
- Âm báo (WebAudio) và wake lock chỉ kiểm nút bật/tắt, chưa nghe thật. `beforeunload` khi đang tập chưa kiểm bằng trình duyệt.
- e2e chạy trên server dev dùng chung nên Fast Refresh từ agent khác từng làm một vài lần chạy thử chập chờn; bộ e2e có cơ chế chạy lại khối và in dòng RETRY (lần cuối không có).
- Tương phản tính tay (bảng trong BRAND.md), chưa chạy công cụ đo tự động.
- Lịch lớp, giá, tên HLV nhân vật là nội dung do thiết kế viết, không phải dữ liệu thật của cơ sở nào.
