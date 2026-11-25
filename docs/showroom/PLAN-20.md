# PLAN-20 — 20 landing page mới (đợt 2), mỗi trang một thế giới riêng

Quy tắc chung: `AGENT-RULES.md` (đặc biệt mục 11: không chữ "Demo"/"minh hoạ", trang như thật nhưng không bịa hồ sơ). Hiệu ứng: dùng `features/showroom/effects/**` (thư viện hành vi do agent nghiên cứu dựng) + `research/threads-effect-sites.md`. Khác biệt đợt 1: tránh nền kem/trắng sáng (đã có 5 trang) — đợt 2 ưu tiên màu đậm, bão hoà, tối, pastel rõ chủ đề. Mỗi trang: 4–6 hiệu ứng KHÁC các trang khác (không trang nào dùng đủ cùng bộ), hero riêng, logo riêng, cặp font riêng (kiểm glyph Việt, không trùng 10 trang cũ và nhau càng nhiều càng tốt).

Danh sách (slug · ngành · nhận diện · bảng màu gốc · hiệu ứng ký hiệu · công cụ tương tác)

| # | slug | Ngành | Phong cách | Màu gốc | Hiệu ứng ký hiệu (gợi ý) | Công cụ |
|---|---|---|---|---|---|---|
| 11 | bar-mai-thuong | Rooftop bar & cocktail | Neon đêm, retro-futuristic | đen xanh #07080f + hồng neon + cyan | neon nhấp nháy, cursor spotlight, marquee tốc độ, grain | Cocktail Matcher (vị/độ mạnh) + đặt bàn tóm tắt |
| 12 | tiem-banh | Tiệm bánh ngọt | Pastel kẹo, sticker, đồ chơi | hồng đào + mint + nâu socola | confetti/sprinkles, tilt thẻ, ảnh dán xoay, hover wobble nhẹ | Cake Builder (vị/size/lời chúc) |
| 13 | tra-thi | Nhà trà | Mực nho, tối giản thiền | xám than + xanh lá trà #5b7f4b | ink-reveal clip, scroll-scrub text, svg path draw | Tea Pairing (tâm trạng → trà) |
| 14 | glamping-nui | Glamping/camping | Rừng đêm, lửa trại | xanh rừng #0f2a1d + cam lửa | pinned horizontal scroll, parallax layers, particles tàn lửa | Trip Planner (số đêm/lều/hoạt động) |
| 15 | lan-bien | Lặn biển & thể thao nước | Dưới nước, gradient sâu | navy→teal + san hô | water-ripple distort ảnh, bong bóng, sticky chapters | Dive Level Finder |
| 16 | phuot-xe | Thuê xe phượt | Đường đua, tốc độ | vàng #ffd400 + đen + trắng | velocity marquee, speed lines, odometer counter, magnetic | Chọn xe + tính giá thuê |
| 17 | hoa-tuoi | Tiệm hoa | Botanical đậm, tạp chí hoa | xanh lá đậm + đỏ cam + hồng sen | mask cánh hoa, draggable gallery, blob morph | Bouquet Builder |
| 18 | sat-gym | CrossFit/Gym | Brutalist bê tông | xám bê tông + xanh axit #c6ff00 | outline text khổng lồ, stacking cards, counter reps, shake nhẹ | Workout Plan Picker + lịch lớp |
| 19 | pet-vui | Pet spa & grooming | Vui nhộn màu cơ bản | vàng + xanh dương + đỏ + trắng | cursor chân thú, sticker kéo thả, bounce có kiểm soát | Chọn gói chăm sóc + tính giá |
| 20 | da-xanh | Skincare studio | Glassmorphism dịu | lilac→xanh nước + trắng sương | blur-fade, spotlight, gradient chuyển động, depth parallax | Skin Routine Builder (không chẩn đoán) |
| 21 | nail-pop | Nail studio | Pop art màu gắt | hồng nóng + vàng chanh + xanh cobalt | color-flood hover, swatch picker đổi màu SVG tay, slot text | Nail Design Builder |
| 22 | ngoai-ngu-sao | Trung tâm ngoại ngữ | Giáo dục vui, kinetic type | xanh dương #1d4ed8 + vàng + hồng | kinetic typography đổi ngôn ngữ, flip cards, scrub | Level Test Mini + lịch lớp |
| 23 | cowork-grid | Coworking | Kỹ thuật/lưới, mono | đen + trắng + cam #ff5a1f | grid reveal, text scramble, live seat map | Seat & Plan Picker |
| 24 | detail-xe | Car detailing | Carbon & chrome | đen carbon + bạc + đỏ | shine sweep, light streak, scroll-scrub | Package Builder theo dòng xe |
| 25 | phong-thu | Recording studio | Âm thanh, tím đậm | tím #1a0b2e + cam + trắng | waveform canvas, equalizer, text scramble | Session Estimator |
| 26 | gom-lo | Xưởng gốm | Thủ công đất | terracotta #b4532a + nâu + kem đậm | draggable gallery, image distort hover, grain | Workshop Booking Preview |
| 27 | kim-hoan | Trang sức vàng | Luxury đen vàng | đen #0a0a0a + vàng #c9a227 | cursor glare, shimmer text, parallax product reveal | Ring/Pendant Configurator |
| 28 | ruou-vang | Wine bar | Đỏ rượu, ánh nến | burgundy #4a0e1a + vàng đồng | curtain reveal, SVG pour line, dark spotlight | Pairing Finder |
| 29 | luot-song | Trường lướt sóng | Retro 70s, sóng | teal + cam + vàng sa mạc | wave SVG animation, marquee, rotating sticker | Lesson Planner |
| 30 | can-ho-ven-bien | Chủ đầu tư căn hộ | Kiến trúc cao cấp, navy-đồng | navy #0c1f3a + đồng #b87333 | sticky chapters, parallax tòa nhà, floor-plan interactive | Floor Plan Explorer + dự toán |

Tên thương hiệu cụ thể: do agent từng trang đề xuất cùng ChatGPT (3 phương án, chọn 1, tra sơ bộ trùng tên). Slug ở bảng là cố định (routes). Kiểm khác biệt: chạy `tests/showroom/differentiation.mjs` cho cả 30 trang; yêu cầu mới cho đợt 2: palette distance ≥ 0.18 với MỌI trang (kể cả 10 trang cũ).

Lịch chạy: 4 đợt × 5 agent (không quá 5 agent song song vì máy tải nặng và tab trình duyệt giới hạn): #11–15, #16–20, #21–25, #26–30. Mỗi đợt xong → chạy gate + tự chạy lại e2e.
