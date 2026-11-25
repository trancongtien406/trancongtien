# Đặc tả rút gọn từ ChatGPT (tab riêng, chat "Đặc tả website Khối Nếp")

Đã nhận ~65.000 ký tự đặc tả (2 lượt). Phần đã dùng và phần đã bỏ/đổi:

## Dùng nguyên
- Thương hiệu: KHỐI NẾP, slogan "Không gian có nếp sống.", câu chuyện 120 chữ (data/content.ts `STORY`), 5 câu giọng văn (dùng làm định hướng copy).
- Palette: Paper #EDEAE2, Studio White #FAF9F6, Graphite Ink #262824, Muted Olive #52574D, Terracotta #A65338, Drawing Line #A39F94, Soft Stone #D8D3C8. Góc vuông 0px, đường kẻ 1px, không shadow thẻ.
- Cấu trúc 11 section: Header, Cover hero, Manifesto, Selected Spaces (lưới bất đối xứng 1–7/9–12/1–4/6–12), Services (bảng, không pricing card), Budget Estimator, Material Library (6 mẫu), Material Board Builder, Process (4 cột, số + đường kẻ, không icon), FAQ (8 câu, mở một câu mỗi lần), Closing (nền Ink), Footer.
- Budget Estimator: hệ số 1 / 1,1 / 1,25 / 1,15; đơn giá hoàn thiện 2 / 3,5 / 5,5 triệu/m²; phí thiết kế 250.000 đ/m²; khoảng −10% / +20% làm tròn ra ngoài theo triệu; diện tích 20–1000, tối đa 1 số thập phân; key `portfolio:lp08:budget:v1`. 6 test case của ChatGPT được đưa vào e2e (162–216, 270–360, 371–495, 1,29–1,73 tỷ, 18–24).
- Material Board: 6 vật liệu W01/W02/S01/S02/F01/F02, 3 preset (Nếp ấm / Tĩnh trầm / Mộc xanh), tối đa 20 board, tên 1–60, ghi chú ≤300, autosave nháp 500ms, xuất PNG 1600×1200 bằng Canvas với toạ độ trong spec, xuất TXT UTF-8.
- Motion concept "Architectural Unfold": đường kẻ kéo ra, ảnh lắng (scale 1.045→1), masthead hiện lần lượt.

## Đổi / bỏ (quyết định của agent)
- Logo: spec đưa SVG path K riêng (không đọc được trong bản chép); tự vẽ K bằng khối (thân đứng + hai nhánh chéo + trục đứng phải + ô đất nung), wordmark chuyển path từ IBM Plex Sans 600.
- Tracking wordmark −0,045em làm chữ có dấu dính; dùng −0,02em.
- Clip-path reveal ảnh -> thay bằng lớp che scaleY (AGENT-RULES: chỉ animate transform/opacity).
- Header "Quay lại portfolio" trỏ `/solutions` (route thật của site chính đã kiểm).
- Ảnh vật liệu: không có ảnh óc chó/olive riêng; dùng cùng ảnh gỗ/vải nhân (multiply) màu tint. Ghi rõ trong ASSETS.md.
- Hero tăng thêm CTA chính → `buildConsultHref('khoi-nep')` theo yêu cầu điều phối viên (spec gốc không có form).
- Giá/dữ liệu đều "giả định"; ChatGPT cũng nhắc không khẳng định là giá thị trường.
