import type { Lang } from "./content";

export const CENTER = {
  name: "Mở Lời",
  area: "Quận Hải Châu, Đà Nẵng",
  hours: "Thứ Hai – Thứ Bảy, 8:00 – 20:30",
} as const;

/** 3 sự thật ở hero. */
export const HERO_FACTS = [
  { k: "Sĩ số", v: "Tối đa 12", sub: "học viên mỗi lớp (thiếu nhi tối đa 10)" },
  { k: "Hình thức", v: "Tại trung tâm", sub: "hoặc trực tuyến khi bạn đi công tác" },
  { k: "Học phí", v: "Từ 2.400.000 ₫", sub: "một khoá 24 buổi, gồm giáo trình" },
] as const;

export const HERO_TOPICS = ["Tiếng Anh giao tiếp", "IELTS", "Tiếng Nhật JLPT", "Tiếng Hàn sơ cấp"];

/* ------------------------------------------------------------ Chương trình */
export type Track = "en" | "ielts" | "ja" | "ko";
export type Audience = "kid" | "teen" | "work";
export type Program = {
  id: string;
  track: Track;
  lang: Lang;
  audience: Audience;
  name: string;
  forWho: string;
  summary: string;
  courses: number;
  sessions: number; // buổi mỗi khoá
  minutes: number; // phút mỗi buổi
  perWeek: string;
  size: number;
  material: string;
  price: number; // mỗi khoá
};

export const TRACKS: { id: Track | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "en", label: "Tiếng Anh giao tiếp" },
  { id: "ielts", label: "IELTS" },
  { id: "ja", label: "Tiếng Nhật JLPT" },
  { id: "ko", label: "Tiếng Hàn TOPIK" },
];
export const AUDIENCES: { id: Audience | "all"; label: string; sub: string }[] = [
  { id: "all", label: "Mọi đối tượng", sub: "" },
  { id: "kid", label: "Thiếu nhi", sub: "6 – 11 tuổi" },
  { id: "teen", label: "THCS – THPT", sub: "12 – 17 tuổi" },
  { id: "work", label: "Người đi làm, sinh viên", sub: "từ 18 tuổi" },
];

export const PROGRAMS: Program[] = [
  { id: "en-kids", track: "en", lang: "en", audience: "kid", name: "Tiếng Anh thiếu nhi", forWho: "Bé 6 – 11 tuổi mới làm quen hoặc muốn nói tự nhiên hơn", summary: "Học qua trò chơi, bài hát và hội thoại ngắn theo chủ đề: gia đình, trường lớp, đồ ăn, thú cưng.", courses: 4, sessions: 24, minutes: 60, perWeek: "2 buổi/tuần", size: 10, material: "Giáo trình thiếu nhi theo chủ đề, thẻ từ vựng và sổ bài hát của trung tâm", price: 2400000 },
  { id: "en-teen", track: "en", lang: "en", audience: "teen", name: "Tiếng Anh THCS – THPT", forWho: "Học sinh lớp 6 – 12 cần nền tảng chắc và tự tin phát biểu", summary: "Bám sát từ vựng, ngữ pháp trên lớp và thêm kỹ năng nghe nói, thuyết trình nhóm, viết đoạn ngắn.", courses: 4, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 12, material: "Giáo trình nội bộ theo cấp, bài đọc song ngữ, bộ đề luyện nghe", price: 2900000 },
  { id: "en-work-1", track: "en", lang: "en", audience: "work", name: "Giao tiếp cho người đi làm, Cấp 1–2", forWho: "Người đi làm, sinh viên mất gốc hoặc lâu không dùng tiếng Anh", summary: "Từ chào hỏi, giới thiệu công việc đến gọi món, hỏi đường, viết tin nhắn và email ngắn.", courses: 2, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần, khung tối", size: 12, material: "Giáo trình giao tiếp theo tình huống, tài liệu điện tử, thẻ từ vựng", price: 2400000 },
  { id: "en-work-2", track: "en", lang: "en", audience: "work", name: "Tiếng Anh công sở, Cấp 3–5", forWho: "Người đã giao tiếp được câu đơn, cần họp, thuyết trình, email công việc", summary: "Họp ngắn, trình bày ý kiến, đàm phán cơ bản, viết email; mỗi tuần có một buổi nói theo vai (role-play).", courses: 3, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 12, material: "Giáo trình công sở, tình huống họp và email mẫu, bộ từ vựng theo ngành", price: 2900000 },
  { id: "ielts-f", track: "ielts", lang: "en", audience: "teen", name: "IELTS Foundation", forWho: "Học sinh THPT, sinh viên mới làm quen bài thi, nền tảng tương đương Cấp 3", summary: "Làm quen bốn kỹ năng, cấu trúc bài thi, chiến lược làm bài và từ vựng học thuật cơ bản.", courses: 2, sessions: 36, minutes: 120, perWeek: "3 buổi/tuần", size: 10, material: "Giáo trình IELTS nội bộ, đề luyện từng kỹ năng, bài chấm viết và nói theo tiêu chí công khai", price: 4200000 },
  { id: "ielts-i", track: "ielts", lang: "en", audience: "work", name: "IELTS Intensive", forWho: "Người đã có nền tảng, cần luyện đề và hoàn thiện kỹ năng viết, nói", summary: "Luyện đề theo giờ thi, chữa bài Writing và Speaking cá nhân, theo dõi tiến độ mỗi 6 buổi.", courses: 2, sessions: 36, minutes: 120, perWeek: "3 buổi/tuần", size: 10, material: "Bộ đề luyện, bài mẫu có chú thích, phiếu nhận xét Writing và Speaking", price: 4800000 },
  { id: "ja-n5", track: "ja", lang: "ja", audience: "work", name: "Tiếng Nhật sơ cấp, hướng N5", forWho: "Người mới bắt đầu, người đi làm tại công ty Nhật, sinh viên", summary: "Hiragana, Katakana, mẫu câu cơ bản, hội thoại đời sống; làm quen một số Kanji đầu tiên.", courses: 2, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 12, material: "Giáo trình sơ cấp của trung tâm, thẻ chữ cái, bài nghe ngắn", price: 2800000 },
  { id: "ja-n4", track: "ja", lang: "ja", audience: "work", name: "Tiếng Nhật sơ cấp 2, hướng N4", forWho: "Người đã đọc được Hiragana và dùng được mẫu câu cơ bản", summary: "Thể thông thường, câu điều kiện, nhờ vả, xin phép; luyện nghe đọc theo mẫu đề của trung tâm.", courses: 2, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 12, material: "Giáo trình sơ cấp 2, bảng Kanji N4, bài nghe hội thoại", price: 3200000 },
  { id: "ja-n3", track: "ja", lang: "ja", audience: "work", name: "Tiếng Nhật trung cấp, hướng N3", forWho: "Người đã hoàn thành sơ cấp, cần đọc hiểu và trao đổi công việc", summary: "Kanji và từ vựng mở rộng, đọc hiểu đoạn văn, nghe tốc độ tự nhiên, kính ngữ cơ bản.", courses: 3, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 10, material: "Giáo trình trung cấp, bài đọc có chú giải, bộ đề luyện theo dạng bài", price: 3600000 },
  { id: "ko-1", track: "ko", lang: "ko", audience: "work", name: "Tiếng Hàn sơ cấp 1, hướng TOPIK I", forWho: "Người mới bắt đầu, người hâm mộ văn hoá Hàn, người đi làm", summary: "Hangul trong vài buổi đầu, phát âm, câu chào, giới thiệu, đếm số, mua sắm cơ bản.", courses: 1, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 12, material: "Giáo trình sơ cấp của trung tâm, thẻ Hangul, bài nghe", price: 2700000 },
  { id: "ko-2", track: "ko", lang: "ko", audience: "work", name: "Tiếng Hàn sơ cấp 2, hướng TOPIK I", forWho: "Người đã đọc được Hangul và nói được câu đơn", summary: "Đuôi câu lịch sự, thì quá khứ và tương lai, đời sống hằng ngày; luyện đề nghe đọc dạng cơ bản.", courses: 2, sessions: 24, minutes: 90, perWeek: "2 buổi/tuần", size: 10, material: "Giáo trình sơ cấp 2, bài đọc ngắn, bộ đề luyện cơ bản", price: 3100000 },
];

/* ------------------------------------------------------------ Lộ trình */
export type RoadStep = { code: string; name: string; courses: number; sessions: number; price: number; goal: string; entry: string; exit: string };
export type Road = { id: Track; label: string; lead: string; perWeek: number; steps: RoadStep[] };
export const ROADS: Road[] = [
  {
    id: "en", label: "Giao tiếp tiếng Anh", perWeek: 2, lead: "Năm cấp, mỗi cấp một đến hai khoá 24 buổi. Bạn vào đúng cấp qua bài kiểm tra đầu vào, không cần học lại từ đầu.",
    steps: [
      { code: "Cấp 1", name: "Khởi động", courses: 1, sessions: 24, price: 2400000, goal: "Chào hỏi, giới thiệu bản thân, hỏi và đáp câu rất ngắn", entry: "Mới bắt đầu, chưa cần kiến thức trước", exit: "Bài kiểm tra cuối khoá của trung tâm và buổi nhận xét với giáo viên" },
      { code: "Cấp 2", name: "Quen đường", courses: 1, sessions: 24, price: 2400000, goal: "Kể một ngày của bạn, gọi món, mua sắm, hỏi đường", entry: "Xong Cấp 1 hoặc đạt mức tương đương khi kiểm tra đầu vào", exit: "Bài kiểm tra cuối khoá và một bài nói 2 phút" },
      { code: "Cấp 3", name: "Trò chuyện", courses: 1, sessions: 24, price: 2900000, goal: "Kể trải nghiệm đã qua, nêu ý kiến và lý do, viết email ngắn", entry: "Xong Cấp 2 hoặc kiểm tra đầu vào", exit: "Bài kiểm tra cuối khoá và một bài viết 120 từ" },
      { code: "Cấp 4", name: "Vững vàng", courses: 1, sessions: 24, price: 2900000, goal: "Thảo luận, thuyết trình nhỏ, xử lý tình huống công việc", entry: "Xong Cấp 3 hoặc kiểm tra đầu vào", exit: "Thuyết trình nhóm 5 phút trước lớp" },
      { code: "Cấp 5", name: "Tự tin", courses: 1, sessions: 24, price: 3200000, goal: "Tranh luận, đàm phán cơ bản, nghe video và podcast tự nhiên", entry: "Xong Cấp 4 hoặc kiểm tra đầu vào", exit: "Bài nói cá nhân và nhận xét lộ trình tiếp theo (IELTS hoặc công sở)" },
    ],
  },
  {
    id: "ielts", label: "IELTS", perWeek: 3, lead: "Hai chặng, tập trung vào bốn kỹ năng và luyện đề. Lộ trình cho bạn nền tảng và kỹ thuật làm bài; kết quả thi phụ thuộc vào quá trình học và thực tế của từng người.",
    steps: [
      { code: "Chặng 1", name: "IELTS Foundation", courses: 2, sessions: 72, price: 4200000, goal: "Làm quen bài thi, nền tảng bốn kỹ năng, từ vựng học thuật cơ bản", entry: "Xong Cấp 3 giao tiếp hoặc kiểm tra đầu vào", exit: "Bài thi thử nội bộ và buổi nhận xét kỹ năng yếu" },
      { code: "Chặng 2", name: "IELTS Intensive", courses: 2, sessions: 72, price: 4800000, goal: "Luyện đề theo giờ thi, chữa Writing và Speaking cá nhân", entry: "Xong Foundation hoặc kiểm tra đầu vào", exit: "Hai bài thi thử nội bộ và kế hoạch ôn trước ngày thi của bạn" },
    ],
  },
  {
    id: "ja", label: "Tiếng Nhật JLPT", perWeek: 2, lead: "Ba chặng theo khung N5, N4, N3. Mỗi chặng 2 đến 3 khoá 24 buổi, có bài nghe và đọc bám theo dạng đề.",
    steps: [
      { code: "Sơ cấp 1", name: "Hướng N5", courses: 2, sessions: 48, price: 2800000, goal: "Hiragana, Katakana, mẫu câu cơ bản, hội thoại đời sống", entry: "Mới bắt đầu", exit: "Bài kiểm tra cuối khoá, bộ đề luyện N5 của trung tâm" },
      { code: "Sơ cấp 2", name: "Hướng N4", courses: 2, sessions: 48, price: 3200000, goal: "Thể thông thường, câu điều kiện, xin phép, nhờ vả, Kanji N4", entry: "Xong Sơ cấp 1 hoặc kiểm tra đầu vào", exit: "Bài kiểm tra cuối khoá, bộ đề luyện N4" },
      { code: "Trung cấp", name: "Hướng N3", courses: 3, sessions: 72, price: 3600000, goal: "Kanji mở rộng, đọc hiểu đoạn văn, nghe tốc độ tự nhiên", entry: "Xong Sơ cấp 2 hoặc kiểm tra đầu vào", exit: "Bài kiểm tra cuối khoá, bộ đề luyện N3" },
    ],
  },
  {
    id: "ko", label: "Tiếng Hàn TOPIK", perWeek: 2, lead: "Hai chặng sơ cấp hướng TOPIK I: đọc được Hangul sớm, rồi luyện nghe nói qua hội thoại ngắn.",
    steps: [
      { code: "Sơ cấp 1", name: "Hangul và giao tiếp đầu tiên", courses: 1, sessions: 24, price: 2700000, goal: "Đọc Hangul, phát âm, chào hỏi, giới thiệu, đếm số", entry: "Mới bắt đầu", exit: "Bài kiểm tra cuối khoá và một đoạn hội thoại 1 phút" },
      { code: "Sơ cấp 2", name: "Đời sống hằng ngày", courses: 2, sessions: 48, price: 3100000, goal: "Đuôi câu lịch sự, thì quá khứ và tương lai, mua sắm, hẹn gặp", entry: "Xong Sơ cấp 1 hoặc kiểm tra đầu vào", exit: "Bài kiểm tra cuối khoá, bộ đề luyện cơ bản" },
    ],
  },
];

/* ------------------------------------------------------------ Gói học */
export type Pack = { id: "nhom" | "nho" | "kem"; name: string; mult: number; size: string; note: string; rows: string[] };
export const PACKS: Pack[] = [
  { id: "nhom", name: "Lớp nhóm", mult: 1, size: "Tối đa 12 học viên", note: "Lựa chọn phổ biến, học cùng bạn cùng cấp", rows: ["Lịch cố định theo lớp", "Học bù tối đa 2 buổi, sang lớp cùng cấp", "Nhận xét tiến độ mỗi 12 buổi", "Giáo trình điện tử và thẻ từ vựng"] },
  { id: "nho", name: "Lớp nhỏ", mult: 1.6, size: "Tối đa 6 học viên", note: "Nhiều lượt nói hơn, hợp người cần tiến nhanh", rows: ["Lịch cố định, đổi giờ 1 lần mỗi khoá", "Học bù tối đa 3 buổi", "Nhận xét tiến độ mỗi 6 buổi", "Giáo trình điện tử, thẻ từ vựng, bài chữa riêng"] },
  { id: "kem", name: "Kèm riêng 1 – 1", mult: 3.4, size: "1 giáo viên, 1 học viên", note: "Lịch linh hoạt, nội dung theo mục tiêu của bạn", rows: ["Tự chọn giờ trong tuần, báo trước 24 giờ", "Học bù không giới hạn trong hạn khoá", "Nhận xét sau mỗi buổi", "Giáo trình thiết kế theo mục tiêu"] },
];

export const OFFERS = [
  { t: "Học thử 1 buổi miễn phí", d: "Vào lớp thật, đúng cấp của bạn, không cần đặt cọc." },
  { t: "Đăng ký sớm giảm 5%", d: "Đóng học phí trước ngày khai giảng ít nhất 7 ngày." },
  { t: "Đăng ký nhóm 3 người giảm 8%", d: "Bạn bè, đồng nghiệp hoặc anh chị em cùng đóng học phí một lần." },
  { t: "Đóng trọn lộ trình giảm 5%", d: "Đóng một lần cho hai khoá liền nhau, bảo lưu theo chính sách bên dưới." },
];
export const REFUND = [
  "Nghỉ sau buổi học thử, chưa đóng phí: không mất gì.",
  "Đã đóng phí nhưng dừng trước buổi chính thức thứ 3: hoàn 100% học phí, trừ phí giáo trình đã nhận.",
  "Dừng từ buổi thứ 4 đến buổi thứ 8: hoàn phần học phí của các buổi chưa học, trừ 10%.",
  "Từ buổi thứ 9 trở đi: không hoàn, nhưng bạn được bảo lưu các buổi còn lại tối đa 3 tháng.",
];

/* ------------------------------------------------------------ Cơ sở vật chất */
export const FACILITIES = [
  { t: "Phòng học nhỏ, tối đa 12 chỗ", d: "Sáu phòng học có máy chiếu, bảng trắng, máy lạnh và bàn ghép được thành nhóm.", img: "lop-ghe-vang", alt: "Phòng học với bàn dài, ghế vàng, máy chiếu và sàn gỗ", pos: "50% 55%" },
  { t: "Thư viện và góc đọc", d: "Truyện đọc theo cấp, từ điển, sách luyện thi cho mượn tại chỗ và về nhà.", img: "ke-sach", alt: "Kệ sách nhiều màu đầy sách giáo trình", pos: "50% 50%" },
  { t: "Góc tự học và chờ phụ huynh", d: "Bàn, ổ cắm, wifi và nước uống; phụ huynh có thể ngồi chờ trong giờ học của bé.", img: "hoc-ca-phe", alt: "Bàn học có sách mở, ghi chú, bút và laptop", pos: "50% 50%" },
] as const;
export const FACILITY_LIST = ["Phòng luyện nói và nghe riêng", "Wifi toàn trung tâm", "Khu để xe cho học viên", "Học trực tuyến qua Zoom khi cần", "Thẻ học viên mượn sách"];

/* ------------------------------------------------------------ Quy trình đăng ký */
export const PROCESS = [
  { t: "Kiểm tra đầu vào", d: "Làm bản nhanh ngay trên trang này (khoảng 3 phút) hoặc bài đầy đủ tại trung tâm (khoảng 20 phút), miễn phí. Bài chỉ để xếp lớp.", href: "#kiem-tra" },
  { t: "Tư vấn lộ trình", d: "Tư vấn viên trao đổi mục tiêu, lịch rảnh và gợi ý lớp phù hợp, báo học phí cụ thể.", href: "#dang-ky" },
  { t: "Học thử 1 buổi", d: "Vào lớp thật cùng giáo viên, xem cách học và trò chuyện với bạn cùng lớp.", href: "#khai-giang" },
  { t: "Đóng phí, nhận giáo trình", d: "Đóng học phí theo gói đã chọn, nhận giáo trình, thẻ học viên và nhóm lớp để cập nhật lịch.", href: "#hoc-phi" },
] as const;

/* ------------------------------------------------------------ FAQ */
export const FAQ = [
  { q: "Chưa biết gì có học được không?", a: "Được. Cấp 1 và các lớp sơ cấp dành cho người mới hoàn toàn: bạn bắt đầu từ bảng chữ cái và những câu chào đầu tiên. Bài kiểm tra đầu vào giúp xếp bạn đúng lớp." },
  { q: "Một lớp có bao nhiêu bạn?", a: "Lớp nhóm tối đa 12 học viên (thiếu nhi tối đa 10, các lớp cấp cao 8 – 10), lớp nhỏ tối đa 6 để mỗi bạn đều có thời gian nói." },
  { q: "Bé nhà tôi nhút nhát, có theo kịp không?", a: "Lớp thiếu nhi học qua trò chơi và bài hát, bé nói theo cặp trước khi nói trước lớp. Bạn có thể cho bé học thử 1 buổi và ngồi ngoài quan sát trước khi quyết định." },
  { q: "Tôi đi làm bận, học bù thế nào?", a: "Lớp nhóm cho học bù tối đa 2 buổi sang lớp cùng cấp khi bạn báo trước ít nhất 12 giờ. Lớp nhỏ và kèm riêng có chính sách học bù rộng hơn, ghi trong bảng gói học." },
  { q: "Nếu tôi học thử xong thấy không hợp?", a: "Học thử miễn phí và không ràng buộc. Nếu đã đóng phí rồi mới thấy chưa phù hợp, chính sách hoàn học phí theo số buổi đã học được ghi rõ ở mục Học phí." },
  { q: "Trung tâm có cam kết điểm đầu ra không?", a: "Không. Trung tâm cam kết số buổi, sĩ số, giáo trình và nhận xét tiến độ minh bạch. Kết quả thi phụ thuộc vào quá trình học của từng người, nên chúng mình không hứa điểm số." },
  { q: "Bài kiểm tra đầu vào có quy đổi sang chứng chỉ không?", a: "Không. Đây là thang cấp độ riêng của trung tâm để xếp lớp, không tương đương và không thay thế chứng chỉ quốc tế." },
  { q: "Tôi muốn học hai ngôn ngữ cùng lúc?", a: "Bạn có thể xếp hai lớp ở hai khung giờ khác nhau. Hãy ghi rõ nhu cầu khi tư vấn để tránh trùng lịch." },
  { q: "Học phí đã gồm giáo trình chưa?", a: "Mức giá trên trang đã gồm giáo trình điện tử và thẻ từ vựng. Sách in (nếu bạn muốn) được tính riêng và báo trước khi đăng ký." },
] as const;

/* ------------------------------------------------------------ Form quan tâm */
export const INTERESTS = [
  { id: "en", label: "Tiếng Anh giao tiếp" },
  { id: "ielts", label: "IELTS" },
  { id: "ja", label: "Tiếng Nhật JLPT" },
  { id: "ko", label: "Tiếng Hàn" },
] as const;
export const WHO = [
  { id: "kid", label: "Con tôi, 6 – 11 tuổi" },
  { id: "teen", label: "Con tôi, 12 – 17 tuổi" },
  { id: "me", label: "Bản thân tôi (đi làm, sinh viên)" },
] as const;
export const WHEN = [
  { id: "sang", label: "Sáng, 8:30 – 10:00" },
  { id: "chieu", label: "Chiều, 15:30 – 17:00" },
  { id: "toi", label: "Tối, 18:00 – 19:30" },
  { id: "tt", label: "Cuối tuần" },
] as const;
export const MODE = [
  { id: "tai", label: "Tại trung tâm" },
  { id: "online", label: "Trực tuyến" },
  { id: "either", label: "Đều được" },
] as const;
