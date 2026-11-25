# Đặc tả từ ChatGPT (rút gọn phần dùng được), Tháng Mơ LP-09

Nguồn: một đoạn chat riêng (tab riêng, đã đóng) với prompt mẫu `CHATGPT-SPEC-PROMPT.md`. Không gửi thông tin cá nhân. ChatGPT trả đủ 8 mục trong một lượt (~49k ký tự), đã đọc hết.

## Dùng nguyên hoặc gần nguyên
- Brand: Tháng Mơ Wedding Studio, slogan "Giữ lại một ngày, nhớ cả một đời.", giọng dịu, xưng "hai bạn", không dùng "số 1/đẹp nhất/hàng nghìn cặp đôi".
- Palette: Paper Ivory #F5F0E8, Linen #E8DED1, Cocoa #4E302A, Dusty Rose #A47B67 (trang trí), Olive #78806E, Ink #302B27, Muted #6F6258 (đã làm đậm thành #675A50 để đạt AA trên Linen), Photo White #FFFDF8, line #CFC3B5.
- Logo: viewBox 64 (khung ảnh hở góc trên phải, hai vòng tròn r=12 tại (25,32)/(38,32), sao 4 cánh ở (56,7), stroke 1.5); wordmark "tháng mơ" Playfair 500 tracking -0.04em; descriptor WEDDING PHOTOGRAPHY tracking 0.4em; 5 biến thể + favicon stroke 2.5.
- Cấu trúc 10 section S00–S10 (header, cover hero, đề tựa, 4 album cảm hứng bất đối xứng, photo essay, 3 gói dạng bảng in, moodboard, quy trình 4 bước, FAQ 8 câu, trang cuối, footer).
- Dữ liệu: 3 gói 5.900.000 / 9.900.000 / 15.900.000 (giả định), 4 phong cách với palette và 2 bối cảnh, palette "soft" = [màu0, giấy, màu1, mực nâu]; luật: đổi style reset location, CTA gói giữ style+palette, localStorage `portfolio:thang-mo:moodboard:v1` chỉ lưu ID + version, dữ liệu hỏng thì reset; preview có Sao chép / Chỉnh sửa / Đóng, không thu dữ liệu cá nhân, không báo "đã gửi".
- Album: 4 album x 4 trang logic; desktop >=1024x600 là bìa → spread (P2,P3) → bìa cuối, mobile từng trang; Next/Prev/Home/End/Escape/vuốt (>=50px và ngang gấp 1.5 lần dọc), chặn lệnh trong animation, không loop, khoá cuộn nền, trả focus; trang cuối có "Dùng phong cách này".
- Motion: hero ~1.8s, scroll moment 1 (ảnh album đặt xuống, xoay nhẹ, stagger), moment 2 (ba ảnh essay trôi dọc khác tốc độ, chỉ desktop), hover chỉ trên thiết bị hover, reduced-motion hiện đủ.
- SEO: noindex, JSON-LD chỉ WebPage, không Review/Offer/LocalBusiness.

## Bỏ hoặc sửa (đối chiếu với repo và luật)
- Font Jost: KHÔNG có subset tiếng Việt (chỉ latin, latin-ext, cyrillic; thiếu ơ, ư và chữ có dấu chồng). Đã đo bằng unicode-range của @fontsource-variable/jost. Thay bằng Josefin Sans (OFL, có vietnamese, cùng họ hình học kiểu Futura, chưa demo nào dùng).
- Đường dẫn `/demos/thang-mo/brand/...`, `public/demos/...`, `.thangMoRoot`, `--font-tm-jost`: sai với repo (ảnh phải ở `public/images/demos/<slug>/`, CSS Modules). Dùng cấu trúc của repo.
- "Khu vực minh hoạ Đà Nẵng và miền Trung": bỏ, không gắn địa danh thật cho studio minh hoạ.
- Shot list 12 ảnh gồm "nắm tay" và "voan trong gió": stock không có ảnh phù hợp không lộ mặt. Thay bằng chi tiết lưng váy; thiếu ảnh giày (đã loại vì chữ in trên lót giày) nên còn 11 ảnh.
- Parallax: giữ cho ảnh (không cho chữ) và chỉ desktop.
- Lighthouse/axe mục tiêu: không đo được trong môi trường này (xem QA.md).
