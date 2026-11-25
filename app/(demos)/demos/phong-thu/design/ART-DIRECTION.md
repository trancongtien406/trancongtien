# ART-DIRECTION — Tần Số Studio
Ý tưởng: cả trang là một bàn mixer + timeline DAW. Mỗi section có thẻ "CH 0X" kiểu nhãn kênh; con trỏ/cuộn điều khiển sóng, playhead, đĩa than.

Section (desktop / mobile)
1. Hero: 2 cột (chữ lớn Archivo rộng 3 dòng, "tần số" cam / ảnh micro khung dọc mở vòng tròn, quét dòng scanline, 2 VU L/R). Dưới: dải sóng canvas toàn bề ngang (thước tick, playhead cam chạy 17s/vòng), thanh transport (timecode, equalizer 32 cột, ghi chú nghe thử). Mobile: ảnh ngang đầu, chữ, nút, sóng rút còn 170px.
2. Band cam: dải VelocityMarquee tên dịch vụ + thông số, tăng tốc theo cuộn, có nút Dừng.
3. Kênh thu (#dich-vu): bàn mixer 5 hàng ngang: tên kênh (TextScramble) + mô tả + chip, clip sóng canvas, nút M/S, fader kéo được (dB), VU, giá tham khảo. Mobile: mỗi kênh xếp dọc.
4. Quy trình (#quy-trinh): timeline 5 làn, 5 clip bậc thang, playhead trắng quét theo cuộn, clip/bước sáng khi playhead đi qua; mobile: danh sách dọc với đường dọc cam fill theo cuộn.
5. Phòng thu (#phong-thu): ảnh phòng điều khiển parallax + chuỗi tín hiệu 5 bước (đường sóng SVG vẽ ra) + gallery kéo ngang 4 phòng.
6. Master: đĩa than SVG quay theo cuộn (540 độ qua khung), cần gạt nghiêng; đoạn chữ ScrollScrub sáng dần; 4 hệ nghe kiểm tra.
7. Bảng giá: bảng theo giờ (có engineer / tự thu); mobile: thẻ xếp dọc.
8. Estimator (#uoc-tinh): bảng INPUT (loại, 3 fader + nút ±, switch engineer) và OUTPUT (khoảng giá NumberTicker, giờ nên dự trù, VU "độ chật", checklist, nút gửi yêu cầu qua buildConsultHref, sao chép tóm tắt).
9. FAQ details; Liên hệ ảnh micro + EQ phản chiếu; footer.

Hiệu ứng (≥6; thư viện + riêng)
- Thư viện: TextScramble (nhãn CH, tên kênh), SplitWords (mọi tiêu đề), ClipReveal (hero circle, ảnh inset/circle), VelocityMarquee, MagneticButton (CTA), CursorSpotlight (bàn mixer), ScrollScrubText (Master), ParallaxLayer (phòng điều khiển), SVGPathDraw (chuỗi tín hiệu), DraggableGallery, NumberTicker (giá), GrainOverlay, CustomCursor.
- Riêng: HeroWave (waveform canvas theo con trỏ + cuộn + phổ thật khi nghe thử), EqBars, Vu, ClipWave, Fader (Pointer Events + bàn phím), Timeline playhead (--p từ cuộn), Vinyl quay theo cuộn, timecode header theo cuộn, đường ray tiến độ, nghe thử WebAudio (nhạc tổng hợp, gain 0.09, tự dừng 40s, AudioContext chỉ tạo sau cú bấm).
- Hero choreography: header trượt xuống, nhãn giải mã, 3 dòng chữ tách từ, ảnh mở vòng tròn (1.3s), chữ phụ/nút/transport lên lần lượt, sóng mở từ giữa ra (1.5s). Cuộn sớm thì tua nhanh.
- Reduced-motion: không GSAP, sóng/EQ/VU vẽ một khung tĩnh, timeline sáng đủ, marquee tĩnh, vinyl đứng, nút Nghe thử vẫn dùng khi bấm.
