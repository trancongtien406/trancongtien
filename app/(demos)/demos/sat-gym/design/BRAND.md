# BRAND — SẬT Gym (LP-18, /demos/sat-gym)

Trạng thái: **NEEDS_OWNER_REVIEW**

## Tên
- Tên chính: **SẬT**. Tên đầy đủ: **SẬT Gym**. Descriptor: Strength & Conditioning Club. Slogan: **Rèn thân. Lì tâm.**
- Ba phương án do ChatGPT đề xuất: SẬT (SẬT Gym), THÉP (Thép Club), LÌ (Lì Movement). Chọn SẬT: một âm tiết, đọc dấu được, gợi tiếng tạ chạm sàn; hình chữ Ậ có dấu mũ và dấu nặng nên hợp chữ khổng lồ rỗng viền.
- Ghi chú ngữ nghĩa: slug là `sat-gym` (gần với "sắt" = iron). "Sật" bản thân là âm tượng thanh, không phải từ thông dụng. Chủ nên cân nhắc có đổi thành "SẮT" hay không (dễ nhớ hơn, nhưng cũng dễ trùng hơn).

## Tra cứu trùng tên (sơ bộ, 2026-11-25)
- WebSearch "SẬT Gym Đà Nẵng phòng tập" và "Sật gym CrossFit strength club Việt Nam": **không thấy** thương hiệu trùng tên. Kết quả gần nhất về âm/nghĩa: "SWAT Gym & Fitness" (có giải strength, Hyrox). Danh sách gym Đà Nẵng trong kết quả: California Fitness & Yoga, HD Fitness, Elite Fitness, No Limits, Alpha Fitness, Fit24.
- **Chưa tra được** (máy không truy cập/xác nhận được): Google Maps, Facebook, Zalo, Instagram, WIPO, Cục Sở hữu trí tuệ, tên miền. Chủ cần tự tra trước khi dùng cho cơ sở thật.

## Logo (SVG tự vẽ, wordmark chuyển thành path từ Big Shoulders Display 900)
- Biểu tượng: khung vuông dày + chữ S gấp khúc kiểu thép uốn + thanh ngang (thanh đòn) xuyên qua; nền acid #c6ff00, nét #2b2d2f.
- Tệp trong `public/images/demos/sat-gym/identity/`: `symbol.svg`, `logo-horizontal.svg` (nền sáng), `logo-reversed.svg` (nền tối, dùng ở header), `logo-primary.svg`, `logo-primary-reversed.svg` (dùng ở footer), `logo-mono.svg` (một màu), `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.webp` (1200x630).
- Đã kiểm bằng ảnh chụp: symbol 16/32/200px, bản mono, bản đảo màu. Không có gradient, bóng đổ. Dấu nặng của Ậ nằm dưới baseline nên descriptor được hạ xuống tránh va.

## Palette (CSS variables `--sg-*` trong `brand.module.css`)
| Token | Hex | Vai trò |
|---|---|---|
| ink | #151617 | Viền dày, chữ trên nền sáng, nền khối tăng tải |
| c950 | #2b2d2f | Nền chính (xám than) |
| c800 | #414447 | Thẻ, nền phụ, lịch lớp |
| c500 | #8a8d8f | Viền phụ, thẻ xám, chữ lớn/trang trí (không dùng cho chữ nhỏ) |
| c300 | #b9bcbd | Chữ phụ trên nền tối (AA) |
| c100 | #e5e6e3 | Nền sáng (bộ chọn bài tập, hỏi đáp) |
| chalk | #f5f5f0 | Chữ trên nền tối, thẻ sáng |
| acid | #c6ff00 | CTA, điểm nhấn, tô chữ rỗng |
Tương phản đã tính: acid/c950 ≈ 11:1, chalk/c950 ≈ 12:1, ink/acid ≈ 15:1, c300/c950 ≈ 7:1, c300/c800 ≈ 5:1 (đều ≥ AA cho chữ nhỏ). c500 chỉ dùng làm màu nền/viền/chữ cực lớn.

## Font (OFL, self-host, subset vietnamese + latin + latin-ext)
- **Big Shoulders Display** 800/900: heading, số, chữ khổng lồ.
- **Chivo** 400/700: nội dung.
- **JetBrains Mono** 500/700: nhãn stencil, số liệu.
- Không trùng 10 trang cũ (Cormorant, Lora, Bricolage, Anybody, Fraunces, Plus Jakarta, Lexend, IBM Plex, Playfair, Oswald). ChatGPT gợi ý Oswald/Be Vietnam Pro/Black Ops One nhưng bị loại vì trùng/ bị tránh theo quy tắc; Big Shoulders Display condensed còn đậm và hẹp hơn cho chữ rỗng viền.
- Đã kiểm glyph Ậ Ế Ể Ệ Ợ Ử Ữ Ầ Ắ Ằ đậm cỡ lớn bằng ảnh `tests/showroom/sat-gym/screenshots/glyph-bsd.png`.

## Giọng văn
Câu ngắn, động từ mạnh, ít tính từ, không áp lực ngoại hình, không hứa kết quả. Ví dụ: "Tạ xuống sàn. Bắt đầu từ đây." / "Chọn mức phù hợp, học kỹ thuật, rồi làm từng rep cho tử tế." / "Mỗi người một mức. Không so với người đứng cạnh."

## Những gì cố ý KHÔNG có (không bịa hồ sơ)
Không đánh giá/lời chứng thực, không số hội viên/số năm/giải thưởng/chứng chỉ HLV, không tên người thật (HLV là nhân vật vector gọi theo biệt danh dụng cụ), không SĐT/email/địa chỉ/giờ mở cửa thật (liên hệ `.example`, `0236 000 0000`, chỉ ghi Đà Nẵng), không JSON-LD, không cam kết giảm cân hay kết quả sức khoẻ.
