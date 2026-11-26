# BRAND · Nét Lệch — Hair Studio (LP-10)

Trạng thái: NEEDS_OWNER_REVIEW. Trang noindex; không có thông tin liên hệ, địa chỉ, số liệu hay lời chứng thực nào được nêu. Trang credits ghi rõ do Trần Công Tiến thiết kế.

## Tên và slogan
- Nét Lệch: "nét" là đường nét, hình dáng, kỹ thuật tạo kiểu; "lệch" là sự khác biệt có chủ đích. Hair Studio là phần mô tả ngành trong logo; trên trang gọi là salon tóc nam nữ ở Quận Hải Châu, Đà Nẵng.
- Slogan: "Vẻ đẹp của sự khác biệt." Slogan phụ: Không cần giống ai. / Mỗi mái tóc, một tuyên ngôn. / Khác biệt không cần giải thích. / CUT. COLOR. CHARACTER. (tiếng Anh chỉ làm đồ hoạ phụ).
- Giọng: câu ngắn, trực diện, không cam kết kết quả. Không dùng: "Phục hồi 100%", "Salon số 1", "Cam kết không hư tổn".

## Logo (identity/, SVG tự vẽ, không script, không href ngoài, chữ đã chuyển thành path)
- symbol.svg / favicon.svg (viewBox 100×100): ô đen #151515, chữ N giấy #F5F3EE nghiêng 14° (skewX(-14) quanh tâm) + một nét chéo lime #D1FA39 rộng 11, cao 92, như đường cắt tóc. Không dùng kéo, lược, mặt người.
- logo-horizontal.svg (340×100), logo-primary.svg (200×200, dọc), logo-mono.svg (mực đen, nền trong), logo-reversed.svg (chữ giấy + lime, cho nền đen, dùng ở header/footer), logo-on-lime.svg (đen trên nền lime), favicon-32.png, apple-touch-icon.png (180), og-image.webp (1200×630, dựng lại 2026-11-25: "Salon tóc Đà Nẵng", dịch vụ, Hải Châu, cắt từ 150.000 đ; không chữ demo/minh hoạ; tests/showroom/net-lech/og.mjs).
- Wordmark: Oswald 700, tracking -0.02em, descriptor "HAIR STUDIO" Archivo 600 tracking 0.28em; dựng từ glyph thật bằng fontTools (kiểm Ệ, É có dấu đủ).
- Đã kiểm ảnh chụp symbol ở 16/32/64/200px, bản mono, bản đảo màu (đọc rõ ở 16px: N và vạch lime còn phân biệt).

## Palette
| Token | Hex | Vai trò |
|---|---|---|
| --nl-ink | #151515 | Nền tối, chữ chính |
| --nl-paper | #F5F3EE | Nền sáng, chữ trên nền tối |
| --nl-concrete | #E8E5DC | Nền phụ (Builder, FAQ) |
| --nl-lime | #D1FA39 | Điểm nhấn gắt: dải cắt chéo, nút, trạng thái chọn. Luôn chữ đen trên lime; không dùng lime làm chữ trên nền sáng |
| --nl-mute / -inv | #595954 / #B8B8B0 | Chữ phụ trên nền sáng / tối |
Tương phản chính: ink/paper 16.5:1, ink/lime 15.2:1, mute/paper 6.4:1, mute-inv/ink 9.2:1. Bo góc 0, không shadow trang trí, không gradient.
Khác Rót Nhiệt (đỏ/đen poster): Nét Lệch dùng giấy ngà + lime acid, bố cục tạp chí chữ condensed + đường chéo 14°, không viền dày kiểu poster.

## Font
Oswald (heading, wght 200–700) + Archivo (body, wght 100–900), OFL, woff2 từ @fontsource-variable (subset vietnamese + latin + latin-ext, vietnamese xếp TRƯỚC, adjustFontFallback:false). Không trùng font demo khác. Đã đo glyph ă â ê ô ơ ư đ + Ắ…Ự và dấu chồng trong e2e.

## Tra cứu tên (sơ bộ, KHÔNG xác nhận được)
- Tìm web "Nét Lệch" hair salon tiệm tóc (2026-11-25): không thấy tiệm cùng tên; kết quả chỉ là danh sách salon chung. Công cụ không truy cập được Google Maps, Facebook, Zalo, WIPO, Cục SHTT.
- Chưa kiểm: Maps, Facebook/Instagram, Zalo, tra cứu nhãn hiệu Cục SHTT (nhóm 44 dịch vụ làm đẹp, 35), WIPO Global Brand Database, tên miền. Chủ cần tự tra trước khi dùng công khai.


## Rework 2026-11-25
Đề tài chuyển từ "hair studio tạp chí" sang website salon tóc thật (xem design/REWORK.md): bảng giá theo độ dài, giờ mở cửa 09:00–20:00, cọc 100.000 đ cho dịch vụ hoá chất, sản phẩm mô tả chung không tên hãng, stylist theo vai trò. SĐT 0236 000 0000 và lichhen@netlech.example là nội dung do tác giả viết. Slogan "Vẻ đẹp của sự khác biệt" không còn ở hero, giữ ở tên/ý nghĩa thương hiệu.
