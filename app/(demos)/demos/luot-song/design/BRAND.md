# BRAND — Ráng Sóng Surf Club (`/demos/luot-song`, LP-29)

Trạng thái: `NEEDS_OWNER_REVIEW`.

## Tên
- Chọn: **Ráng Sóng Surf Club** ("ráng" = ánh ráng chiều; "sóng" = ngành). Slogan: *Chạm sóng, bắt nắng.* Chữ ký chân trang: "Made with salt, sun & soul".
- ChatGPT (chế độ khách) đề xuất 3 tên: Ráng Sóng (chọn), Sóng Mơ, Bờ Rì Rào. Lý do chọn: có chất Việt, dễ đọc dấu, dễ làm logo/tem.
- Tra sơ bộ: WebSearch `"Ráng Sóng" surf Đà Nẵng` không thấy kết quả trùng tên (chỉ ra các trường lướt sóng khác ở Đà Nẵng như Go Surfing Da Nang, Surf Shack Da Nang, Danang Pansurf). CHƯA tra được: Google Maps, Facebook, Zalo, WIPO, Cục Sở hữu trí tuệ, tên miền. Máy không xác nhận được tên có thể đăng ký nhãn hiệu.

## Logo (tự vẽ, SVG, chữ đã chuyển thành path từ Paytone One)
`public/images/demos/luot-song/identity/`: `logo-primary.svg`, `logo-horizontal.svg`, `logo-horizontal-reversed.svg`, `logo-reversed.svg`, `logo-mono.svg`, `symbol.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.webp` (1200x630).
Symbol 200x200: tròn nền vàng sa mạc, viền nâu 8; mặt trời cam r40 tại (100,86); ba dải sóng teal / teal đậm / nâu cắt bởi clip tròn r91. Bản mono dùng mask cắt dải sóng; bản đảo màu nền nâu.

## Palette
| Vai trò | Hex | Dùng |
|---|---|---|
| Vàng sa mạc | #f3b562 | nền hero, khoá học, mùa sóng (nền phẳng) |
| Teal | #0f8b8d | dải sóng, vòng cung, nút |
| Teal đậm | #0a5559 | nền tuyên ngôn, planner, chữ nhấn trên vàng (tương phản ~5:1) |
| Cam cháy | #f26b21 | nền quy trình, mặt trời, nút (chữ nâu trên cam ~4.9:1) |
| Nâu đậm | #3a1f12 | chữ chính, nền header/FAQ, viền (tương phản trên vàng ~8:1) |
| Vàng nhạt | #ffdf9b / #ffd27d | thẻ kết quả, tia nắng (chỉ làm thẻ/chi tiết, không làm nền trang) |
| Kem chữ | #ffe9c2 | chữ trên nền tối |
Nền trang luôn là màu phẳng ấm (vàng sa mạc, teal đậm, cam, nâu), không kem/trắng.

## Font (OFL, woff2 trong `fonts/`, subset vietnamese + latin + latin-ext)
Paytone One (heading, 400), Pacifico (chữ nhấn viết tay, 400), Readex Pro (body, biến thiên 160-700). Không trùng font các trang khác. Kiểm glyph Ă Â Ê Ô Ơ Ư Đ và Ắ…Ự bằng ảnh chụp + so mực canvas trong e2e.
