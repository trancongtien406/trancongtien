import { KINDS } from "../lib/estimator";

export const vnd = (n: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

export const TRACKS = [
  {
    kind: "vocal", ch: "CH 01", name: "Thu giọng", tag: "Vocal", seed: 2.1,
    desc: "Buồng thu cách âm riêng, micro condenser và chuỗi tín hiệu sạch. Bạn hát, engineer lo bắt tín hiệu, chọn take và dựng bè.",
    inc: ["Buồng thu riêng", "Chọn take và dựng bè", "Tuning nhẹ khi cần"],
  },
  {
    kind: "band", ch: "CH 02", name: "Thu band", tag: "Band", seed: 5.3,
    desc: "Thu cả nhóm cùng lúc hoặc từng nhạc cụ. Trống, bass, guitar, keyboard đều có vị trí micro và line riêng để mix gọn về sau.",
    inc: ["Phòng live và phòng điều khiển", "Click track nếu cần", "Thu từng nhạc cụ hoặc cả nhóm"],
  },
  {
    kind: "podcast", ch: "CH 03", name: "Podcast", tag: "Podcast", seed: 8.7,
    desc: "Nhiều micro, mỗi người một track riêng để dễ dựng. Có thể thu từ xa kèm khách mời hoặc ngồi cùng bàn trong phòng.",
    inc: ["Mỗi người một track", "Dựng và làm sạch tiếng", "Nhạc hiệu, intro, outro"],
  },
  {
    kind: "voice", ch: "CH 04", name: "Voice-over", tag: "Voice", seed: 11.2,
    desc: "Đọc quảng cáo, thuyết minh, audiobook, video giới thiệu. Đọc theo kịch bản, theo hình hoặc theo thời lượng đã chốt.",
    inc: ["Đọc theo hình", "Cắt, làm sạch, cân mức", "Giao file theo từng đoạn"],
  },
  {
    kind: "mix", ch: "CH 05", name: "Mix & Master", tag: "Mix", seed: 14.6,
    desc: "Bạn đã có track thu sẵn? Gửi lại để cân bằng, xử lý và master cho nghe đúng trên loa, tai nghe và điện thoại.",
    inc: ["Một vòng chỉnh sửa theo góp ý", "Master cho nhiều nền tảng", "Giao WAV và MP3"],
  },
] as const;

export const STAGES = [
  { n: "01", name: "Trao đổi và chuẩn bị", short: "Trao đổi", from: 0, to: 0.17, lane: 0, text: "Bạn kể ý tưởng và nghe bài tham chiếu. Chúng tôi chốt số track, nhạc cụ, giờ thu và gửi checklist chuẩn bị." },
  { n: "02", name: "Thu âm", short: "Thu âm", from: 0.17, to: 0.46, lane: 1, text: "Kiểm âm, chọn micro, cân tai nghe rồi thu. Mỗi take được đánh dấu để dễ chọn về sau." },
  { n: "03", name: "Biên tập", short: "Biên tập", from: 0.46, to: 0.6, lane: 2, text: "Chọn take, cắt hơi thở và tiếng nhiễu, dựng bè, căn nhịp. Nghe lại cùng bạn khi cần." },
  { n: "04", name: "Mix", short: "Mix", from: 0.6, to: 0.82, lane: 3, text: "Cân bằng âm lượng, tần số, không gian và hiệu ứng cho từng track. Gửi bản nghe thử để bạn góp ý." },
  { n: "05", name: "Master", short: "Master", from: 0.82, to: 1, lane: 4, text: "Hoàn thiện độ lớn và màu âm tổng, kiểm tra trên nhiều hệ nghe, xuất file theo nền tảng bạn cần." },
] as const;

export const CHAIN = [
  { k: "MIC", name: "Micro", text: "Micro condenser cho giọng, micro dynamic cho trống và ampli." },
  { k: "PRE", name: "Preamp", text: "Tiền khuếch đại sạch, giữ chi tiết mà không làm bẹt tiếng." },
  { k: "ADC", name: "Chuyển đổi tín hiệu", text: "Bộ chuyển đổi số nhiều kênh, thu 24-bit để còn dư địa mix." },
  { k: "DAW", name: "Phần mềm thu", text: "Dựng, chọn take và mix trên máy trạm riêng cho studio." },
  { k: "MON", name: "Loa và tai nghe kiểm âm", text: "Loa kiểm âm trong phòng đã xử lý âm học, thêm tai nghe cho người thu." },
] as const;

export const ROOMS = [
  { img: "booth", name: "Buồng thu giọng", text: "Cách âm riêng, màng lọc và micro condenser." },
  { img: "drums", name: "Phòng live", text: "Đủ chỗ cho trống, ampli và cả nhóm chơi cùng lúc." },
  { img: "guitar", name: "Góc nhạc cụ", text: "Thu guitar, bass, keyboard bằng micro hoặc cắm trực tiếp." },
  { img: "mixer", name: "Bàn mixer", text: "Điều khiển nhiều kênh khi nghe lại và cân mix." },
] as const;

export const RATES = KINDS.map((k) => ({
  id: k.id, name: k.label, eng: k.rateEng, self: k.rateSelf,
  note: k.id === "band" ? "Gồm setup micro và kiểm âm cho cả nhóm" : k.id === "mix" ? "Tính theo giờ làm việc của engineer" : k.id === "podcast" ? "Mỗi người một track riêng" : k.id === "voice" ? "Cắt và làm sạch cơ bản kèm theo" : "Chọn take và dựng bè kèm theo",
}));

export const FAQ = [
  { q: "Tôi chưa từng vào phòng thu, cần chuẩn bị gì?", a: "Chỉ cần bài hát (hoặc kịch bản) và một bài tham chiếu bạn thích. Dùng công cụ Ước tính buổi thu bên dưới để nhận checklist theo đúng loại buổi thu của bạn." },
  { q: "Tự thu nghĩa là gì?", a: "Phòng chuẩn bị sẵn chuỗi tín hiệu, hướng dẫn bạn khoảng 15 phút đầu rồi bạn tự vận hành. Giá theo giờ thấp hơn so với có engineer. Thu band và mix & master luôn có engineer." },
  { q: "Tôi nhận file ở định dạng nào?", a: "File thu gốc WAV 24-bit và bản nghe thử MP3. Master có thể xuất theo yêu cầu nền tảng như nhạc số, video hoặc podcast." },
  { q: "Một buổi thu nên đặt bao nhiêu giờ?", a: "Một bài hát một giọng thường cần vài giờ cả chuẩn bị. Công cụ ước tính cho bạn số giờ nên dự trù theo số track và số người. Buổi dài từ 6 giờ được giảm giá." },
  { q: "Bảng giá trên trang là giá chính thức?", a: "Đây là giá tham khảo theo giờ, chưa gồm thuế. Báo giá chính thức phụ thuộc yêu cầu thực tế và được xác nhận trước khi chốt lịch." },
  { q: "Tôi có thể mang theo nhạc cụ và thiết bị của mình không?", a: "Có. Hãy ghi rõ nhạc cụ và thiết bị khi trao đổi để chúng tôi bố trí micro, line và chỗ đặt phù hợp." },
] as const;
