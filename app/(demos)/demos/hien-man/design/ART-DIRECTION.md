# ART-DIRECTION — Hiên Mặn Villa

Hướng: **Immersive architecture**. Ảnh toàn màn hình là bố cục chính; chữ ít, nằm trên "tấm" (plate) đặt lệch như bảng thuyết minh bản vẽ. Không card bo tròn, ảnh bo 0, nút bo 2px, input bo 4px.
Điểm nhận diện không đổi được sang ngành khác: (1) thanh đặt phòng nổi đè mép dưới hero, (2) ba cảnh sticky xếp chồng theo giờ trong ngày (05:50 / 14:30 / 18:10) với số giờ khổng lồ bằng Lora, (3) "sân khấu chọn phòng" 100svh: ảnh phòng đổi bằng crossfade, danh sách phòng là tablist dọc đè ảnh, (4) đường sóng của logo vẽ dần ở hai chỗ.
Khác các demo trước: không vòm organic kem (Miên An), không poster viền đậm (Rót Nhiệt), không lưới tạp chí (Khối Nếp).

## Desktop 1440
1. **Hero** 100svh: ảnh hero full-bleed, H1 Lora ~118px 2 dòng (mặt nạ trượt lên), lead, link cuộn. Thanh đặt phòng (sand, 1120px) nằm cách đáy hero 92px: Nhận phòng, Trả phòng, Số khách, Tạm tính, nút. Dùng chung state với lịch.
2. **Về Hiên**: ảnh toàn cảnh 86svh; tấm ivory 640px đè lệch trái, nhô xuống dưới ảnh ~144px; câu chuyện 120 chữ, trích dẫn, 3 con số mô tả không gian. Đường chân trời tự vẽ ở đáy ảnh.
3. **Một ngày ở Hiên**: 3 `article` sticky 100svh, mỗi cảnh phủ cảnh trước (không scroll-jacking). Số giờ cỡ 14vw, tiêu đề italic, một câu.
4. **Phòng nghỉ**: stage 100svh; plate deep trái-dưới (tên, số đo, 3 điểm, giá "từ", nút); tablist dọc phải-dưới; tiêu đề "Những khoảng riêng." trái-trên. 4 loại: Hiên Biển, Hiên Bình Minh, Suite Hồ Bơi, Bao trọn villa.
5. **Không gian & tiện nghi** (sand): ảnh dọc sticky cột trái (5/12), danh sách 6 mục có đường kẻ mảnh và số italic cột phải; dòng "Trong mỗi phòng".
6. **Quanh Hiên** (deep): tiêu đề + timeline 5 mốc giờ bên trái; hai ảnh chồng lệch (dọc 3:4 + ngang 3:2) sticky bên phải.
7. **Lịch & giá** (mist): lịch 2 tháng (7/12) + công cụ tính sticky (5/12); dưới là bảng giá theo mùa và danh sách dịp lễ.
8. **Chính sách & hỏi đáp**: trái sticky (tiêu đề + 6 chính sách), phải 6 câu hỏi `details`.
9. **Kết** (deep): "Ở lại cùng *nhịp biển.*" cỡ ~138px, hai nút, symbol line-art khổng lồ vẽ dần. Footer 3 cột.

## Mobile 390 (thiết kế riêng)
Header 72px + menu toàn màn (Lora 28px). Hero: ảnh crop riêng, chữ trái ở ~55%, thanh đặt phòng thành khối sand sát đáy hero (2 ô ngày + khách + nút). Về Hiên: ảnh 62svh, tấm đè -56px. Ba cảnh vẫn sticky. Phòng: ảnh 62svh, plate đè -64px, tablist 2×2 bên dưới. Lịch 1 tháng, ngày cao 46px, ẩn giá trên ô; công cụ tính xếp dưới lịch.

## Motion (GSAP, chỉ transform/opacity/stroke)
- Hero (0–2.4s): ảnh scale 1.14→1 (power2.out 2.4s); hai dòng H1 trượt 112%→0 khỏi mặt nạ (1.1s, stagger .14, bắt đầu .35s); eyebrow/lead/link fade+y14 (bắt đầu .9s); thanh đặt phòng bay lên (1.5s).
- Cuộn 1: ảnh mỗi cảnh scale 1.12→1 (scrub) và khối chữ fade+y40 khi cảnh vào khung.
- Cuộn 2: tấm Về Hiên trượt lên 80px; đường sóng (chân trời, logo ở phần kết) vẽ bằng stroke-dashoffset.
- Reveal các dòng danh sách (batch, stagger .08), ảnh dọc/ngoài có parallax ±4% (ảnh, không phải chữ).
- Hover (chỉ `(hover:hover) and (pointer:fine)`): nút nâng 2px, gạch chân link nav kéo từ trái.
- `prefers-reduced-motion`: Motion không chạy, mọi thứ hiện đủ, crossfade phòng và animation plate tắt.

## Tương tác
- **Availability Calendar**: 2 tháng (desktop) / 1 tháng (mobile), từ 11/2026 đến 11/2027, ngày tham chiếu cố định 25/11/2026. Trạng thái: trống / sắp kín / kín / đã qua / ngoài hạn. Chọn bằng 2 lần bấm; ngày kín vẫn hợp lệ làm ngày trả phòng. Bàn phím: mũi tên, Home/End, PageUp/PageDown (Shift = năm), Enter/Space, Esc. Roving tabindex, aria-label từng ô.
- **Stay Calculator**: loại phòng (radio), số phòng, số khách (khách vượt sức chứa báo lỗi, không tự giảm), bảng từng đêm, giảm giá 3/5/7 đêm (5/8/12%), phụ thu khách thêm, dịch vụ 5%, vệ sinh một lần, đêm tối thiểu (T6/T7 = 2, lễ = 3) kèm nút "Kéo dài". CTA → `buildConsultHref('hien-man')`.
- Logic thuần ở `lib/` (`dates`, `rooms`, `availability`, `pricing`, `selection`), có 22 unit test.
