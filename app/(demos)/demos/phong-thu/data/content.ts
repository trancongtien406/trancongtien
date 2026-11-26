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
  {
    kind: "beat", ch: "CH 06", name: "Sản xuất beat", tag: "Beat", seed: 17.4,
    desc: "Producer của phòng dựng beat theo bài tham chiếu và giọng của bạn: nhịp, bass, hợp âm, giai điệu. Làm để thu hát tại phòng hoặc làm nhạc nền cho video.",
    inc: ["Producer cùng làm", "Dựng theo bài tham chiếu", "Giao file beat và stem"],
  },
] as const;

export const STAGES = [
  { n: "01", name: "Trao đổi và chuẩn bị", short: "Trao đổi", from: 0, to: 0.17, lane: 0, text: "Bạn kể ý tưởng, gửi bài tham chiếu. Phòng chốt số track, nhạc cụ, giờ thu, nhận cọc và gửi checklist chuẩn bị. Thường mất 1 đến 2 ngày." },
  { n: "02", name: "Thu âm", short: "Thu âm", from: 0.17, to: 0.46, lane: 1, text: "Kiểm âm, chọn micro, cân tai nghe rồi thu. Mỗi take được đánh dấu để dễ chọn về sau." },
  { n: "03", name: "Biên tập", short: "Biên tập", from: 0.46, to: 0.6, lane: 2, text: "Chọn take, cắt hơi thở và tiếng nhiễu, dựng bè, căn nhịp. Có thể nghe lại cùng bạn ngay trong phòng điều khiển." },
  { n: "04", name: "Mix", short: "Mix", from: 0.6, to: 0.82, lane: 3, text: "Cân bằng âm lượng, tần số, không gian và hiệu ứng cho từng track. Gửi bản nghe thử, bạn góp ý tối đa hai vòng. Thường 3 đến 5 ngày làm việc cho một bài." },
  { n: "05", name: "Master", short: "Master", from: 0.82, to: 1, lane: 4, text: "Hoàn thiện độ lớn và màu âm tổng, kiểm tra trên nhiều hệ nghe, xuất file theo nền tảng bạn cần và giao qua liên kết tải." },
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
  note: k.id === "beat" ? "Producer cùng làm, tính theo giờ làm việc" : k.id === "band" ? "Gồm setup micro và kiểm âm cho cả nhóm" : k.id === "mix" ? "Tính theo giờ làm việc của engineer" : k.id === "podcast" ? "Mỗi người một track riêng" : k.id === "voice" ? "Cắt và làm sạch cơ bản kèm theo" : "Chọn take và dựng bè kèm theo",
}));

export const AREA = "Quận Hải Châu, Đà Nẵng";

export const FACTS = [
  { k: "Giá từ", v: "220.000 ₫", s: "mỗi giờ thu giọng tự vận hành; có engineer từ 350.000 ₫" },
  { k: "Giờ làm", v: "09:00–22:00", s: "hằng ngày, nhận lịch đến trước 20:00" },
  { k: "File giao", v: "WAV 24-bit", s: "kèm MP3 nghe thử; mix có 2 vòng chỉnh sửa" },
] as const;

export const GEAR = [
  { k: "MIC", name: "Micro", items: ["Micro condenser màng lớn cho giọng", "Micro dynamic cho trống, ampli, giọng rap và podcast", "Micro nhỏ cho đàn acoustic và cymbal"] },
  { k: "I/O", name: "Tiền khuếch đại và chuyển đổi", items: ["Preamp sạch nhiều kênh", "Bộ chuyển đổi số 16 kênh vào", "Thu 24-bit, 44.1 hoặc 48 kHz"] },
  { k: "MON", name: "Kiểm âm", items: ["Một cặp loa kiểm âm trong phòng điều khiển", "Loa nhỏ để nghe thử như điện thoại", "Tai nghe kín cho người thu, tối đa 4 bộ"] },
  { k: "INS", name: "Nhạc cụ có sẵn", items: ["Bộ trống acoustic", "Ampli guitar và ampli bass", "Keyboard điện 88 phím"] },
  { k: "ROOM", name: "Phòng và âm học", items: ["Buồng thu giọng cách âm riêng", "Phòng live cho cả nhóm, xử lý tiêu âm và khuếch tán", "Phòng điều khiển nhìn thông sang hai phòng"] },
  { k: "DAW", name: "Máy trạm", items: ["Hai máy trạm thu và mix", "Plugin xử lý giọng, mix, master", "Sao lưu file mỗi buổi thu"] },
] as const;

export const PACKAGES = [
  { name: "Single hoàn chỉnh", price: 1850000, for: "Một bài hát một giọng", inc: ["4 giờ thu giọng có engineer", "Chọn take, dựng bè, tuning nhẹ", "Mix và master một bài, 2 vòng chỉnh sửa", "Giao WAV và MP3"] },
  { name: "Band một bài", price: 3300000, for: "Ban nhạc 3 đến 5 người", inc: ["4 giờ thu band có engineer", "Setup micro và kiểm âm", "Mix 3 giờ và master một bài", "Giao WAV, MP3 và stem"] },
  { name: "Podcast 4 tập", price: 2900000, for: "Một show, mỗi tập khoảng 2 giờ thu", inc: ["4 buổi thu, mỗi buổi 2 giờ", "Mỗi người một track riêng", "Dựng và làm sạch tiếng, thêm nhạc hiệu", "Giao WAV và MP3 từng tập"] },
  { name: "Voice-over quảng cáo", price: 850000, for: "Đoạn đọc ngắn cho video", inc: ["2 giờ thu có engineer", "Tối đa 3 đoạn đọc, mỗi đoạn đến 60 giây", "Cắt, làm sạch, cân mức", "Giao file từng đoạn"] },
] as const;

export const DELIVERY = {
  formats: [
    { id: "wav", name: "WAV 24-bit", note: "File thu gốc và bản master chất lượng cao, dùng để lưu trữ hoặc gửi nền tảng nhạc số.", kbps: 2304 },
    { id: "wav16", name: "WAV 16-bit", note: "Bản chuẩn đĩa CD, nhẹ hơn, dùng để gửi duyệt hoặc đăng video.", kbps: 1411 },
    { id: "mp3", name: "MP3 320 kbps", note: "Bản nghe thử và chia sẻ nhanh qua điện thoại.", kbps: 320 },
  ],
  revisions: [
    { k: "Mix", v: "2 vòng chỉnh sửa", s: "Vòng thêm tính 150.000 ₫" },
    { k: "Master", v: "1 vòng chỉnh sửa", s: "Vòng thêm tính 100.000 ₫" },
    { k: "Giao file", v: "Liên kết tải 14 ngày", s: "Sao lưu tại phòng 30 ngày" },
  ],
} as const;

export const BOOKING = {
  hours: [
    { d: "Thứ Hai đến Chủ Nhật", t: "09:00 đến 22:00" },
    { d: "Buổi thu cuối ngày", t: "Nhận lịch đến 20:00" },
    { d: "Ngày lễ", t: "Báo trước 3 ngày để xếp lịch" },
  ],
  policy: [
    { k: "Đặt cọc", v: "30%", s: "giá trị buổi thu, trừ vào hoá đơn cuối. Chuyển khoản để giữ lịch." },
    { k: "Dời lịch", v: "Trước 24 giờ", s: "được dời một lần miễn phí; lần sau tính 20% cọc." },
    { k: "Huỷ lịch", v: "Trước 48 giờ", s: "hoàn cọc sau khi trừ phí chuyển khoản; huỷ muộn hơn không hoàn cọc." },
    { k: "Đến trễ", v: "Quá 20 phút", s: "thời gian trễ tính vào giờ thu, buổi vẫn kết thúc đúng giờ đã đặt." },
  ],
} as const;

export const FAQ = [
  { q: "Tôi chưa từng vào phòng thu, cần chuẩn bị gì?", a: "Chỉ cần bài hát (hoặc kịch bản) và một bài tham chiếu bạn thích. Dùng công cụ Ước tính buổi thu bên dưới để nhận checklist theo đúng loại buổi thu của bạn." },
  { q: "Tự thu nghĩa là gì?", a: "Phòng chuẩn bị sẵn chuỗi tín hiệu, hướng dẫn bạn khoảng 15 phút đầu rồi bạn tự vận hành. Giá theo giờ thấp hơn so với có engineer. Thu band, sản xuất beat và mix & master luôn có engineer hoặc producer." },
  { q: "Tôi nhận file ở định dạng nào và khi nào?", a: "File thu gốc WAV 24-bit và bản nghe thử MP3 320 kbps. Bản mix nghe thử thường sau 3 đến 5 ngày làm việc, master sau 1 đến 2 ngày kể từ khi bạn chốt mix. Thời gian có thể dài hơn vào mùa cao điểm." },
  { q: "Tôi được chỉnh sửa mấy lần?", a: "Mix có 2 vòng chỉnh sửa theo góp ý, master có 1 vòng. Vòng thêm tính phí theo bảng ở mục Giao file." },
  { q: "Một buổi thu nên đặt bao nhiêu giờ?", a: "Một bài hát một giọng thường cần vài giờ cả chuẩn bị. Công cụ ước tính cho bạn số giờ nên dự trù theo số track và số người. Buổi tối thiểu 2 giờ; từ 6 giờ liên tục được giảm 10%." },
  { q: "Đặt cọc và dời lịch thế nào?", a: "Cọc 30% giá trị buổi thu để giữ lịch. Bạn được dời một lần miễn phí nếu báo trước 24 giờ; huỷ trước 48 giờ được hoàn cọc, huỷ muộn hơn thì không hoàn." },
  { q: "Tôi có thể mang theo nhạc cụ và thiết bị của mình không?", a: "Có. Hãy ghi rõ nhạc cụ và thiết bị khi trao đổi để bố trí micro, line và chỗ đặt phù hợp. Phòng cũng có sẵn trống, ampli guitar, ampli bass và keyboard." },
  { q: "Có thể dẫn theo người đi cùng không?", a: "Có, phòng điều khiển ngồi thoải mái khoảng 4 người. Hãy báo trước số người để phòng chuẩn bị tai nghe và chỗ ngồi." },
  { q: "Giá trên trang đã gồm thuế chưa?", a: "Giá là giá tham khảo theo giờ, chưa gồm thuế. Báo giá cuối được xác nhận trước khi bạn đặt cọc." },
] as const;
