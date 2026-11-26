export const IMG = "/images/demos/ngoai-ngu-sao";
export const SLUG = "ngoai-ngu-sao";

export type Lang = "en" | "ja" | "ko";
export const LANGS: { id: Lang; name: string; native: string; tag: string }[] = [
  { id: "en", name: "Tiếng Anh", native: "English", tag: "EN" },
  { id: "ja", name: "Tiếng Nhật", native: "にほんご", tag: "JA" },
  { id: "ko", name: "Tiếng Hàn", native: "한국어", tag: "KO" },
];

export const NAV = [
  { href: "#chuong-trinh", label: "Chương trình" },
  { href: "#lo-trinh", label: "Lộ trình" },
  { href: "#khai-giang", label: "Lịch khai giảng" },
  { href: "#hoc-phi", label: "Học phí" },
  { href: "#co-so", label: "Cơ sở" },
  { href: "#dang-ky", label: "Đăng ký" },
];

/* ---------- Thẻ từ vựng ---------- */
export type Vocab = { word: string; say: string; mean: string; ex: string; exVi: string; icon: "umbrella" | "hand" | "clock" | "cup" | "heart" | "drop" | "people" | "sun" };
export const VOCAB: Record<Lang, Vocab[]> = {
  en: [
    { word: "Umbrella", say: "/ʌmˈbrelə/", mean: "Cái ô, cái dù", ex: "It's raining, take an umbrella.", exVi: "Trời đang mưa, hãy mang ô nhé.", icon: "umbrella" },
    { word: "Borrow", say: "/ˈbɒrəʊ/", mean: "Mượn", ex: "May I borrow your pen?", exVi: "Mình mượn bút của bạn được không?", icon: "hand" },
    { word: "Schedule", say: "/ˈʃedjuːl/", mean: "Lịch trình", ex: "What's your schedule today?", exVi: "Hôm nay lịch của bạn thế nào?", icon: "clock" },
    { word: "Delicious", say: "/dɪˈlɪʃəs/", mean: "Rất ngon", ex: "This coffee is delicious.", exVi: "Ly cà phê này rất ngon.", icon: "cup" },
  ],
  ja: [
    { word: "ありがとう", say: "arigatō", mean: "Cảm ơn", ex: "ほんとうに ありがとう。", exVi: "Thật sự cảm ơn bạn.", icon: "heart" },
    { word: "みず", say: "mizu", mean: "Nước", ex: "みずを ください。", exVi: "Cho tôi xin nước.", icon: "drop" },
    { word: "ともだち", say: "tomodachi", mean: "Bạn bè", ex: "ともだちと べんきょうします。", exVi: "Tôi học cùng bạn.", icon: "people" },
    { word: "おいしい", say: "oishii", mean: "Ngon", ex: "このコーヒーは おいしいです。", exVi: "Ly cà phê này ngon.", icon: "cup" },
  ],
  ko: [
    { word: "고마워요", say: "gomawoyo", mean: "Cảm ơn", ex: "도와줘서 고마워요.", exVi: "Cảm ơn vì đã giúp mình.", icon: "heart" },
    { word: "물", say: "mul", mean: "Nước", ex: "물 좀 주세요.", exVi: "Cho tôi xin chút nước.", icon: "drop" },
    { word: "친구", say: "chingu", mean: "Bạn bè", ex: "친구를 만나요.", exVi: "Tôi gặp bạn.", icon: "people" },
    { word: "맛있어요", say: "masisseoyo", mean: "Ngon", ex: "커피가 맛있어요.", exVi: "Cà phê ngon.", icon: "cup" },
  ],
};

export const MANIFESTO =
  "Mỗi buổi học ở Mở Lời bắt đầu bằng việc mở miệng nói. Giáo viên sửa lỗi nhẹ nhàng cuối câu, từ mới được ôn bằng thẻ lật, và bạn chỉ lên cấp khi thấy mình đã tự tin.";

export const PILLARS = [
  { k: "Nói trước", v: "15 phút đầu mỗi buổi là nói theo cặp và theo nhóm nhỏ, kể cả ở cấp đầu tiên." },
  { k: "Lớp nhỏ", v: "Tối đa 12 học viên một lớp (lớp thiếu nhi tối đa 10) để buổi nào bạn cũng có lượt nói." },
  { k: "Sửa nhẹ, ôn đúng nhịp", v: "Lỗi được ghi lại và sửa cuối câu; từ vựng nhắc lại bằng thẻ lật sau 1, 3 và 7 ngày." },
  { k: "Lên cấp khi sẵn sàng", v: "Mỗi cấp có bài kiểm tra cuối khoá của trung tâm và buổi nhận xét riêng với giáo viên." },
];

/* ---------- Hội thoại ---------- */
export type Bubble = { who: "a" | "b"; text: string; vi: string };
export const DIALOGUES: Record<Lang, { title: string; a: string; b: string; lines: Bubble[] }> = {
  en: {
    title: "Gặp nhau ở quán cà phê", a: "Mi", b: "Sam",
    lines: [
      { who: "a", text: "Hi! Is this seat free?", vi: "Chào bạn! Chỗ này còn trống không?" },
      { who: "b", text: "Yes, please sit down.", vi: "Còn nhé, mời bạn ngồi." },
      { who: "a", text: "Thanks! I'm Mi. What's your name?", vi: "Cảm ơn! Mình là Mi. Bạn tên gì?" },
      { who: "b", text: "I'm Sam. Nice to meet you!", vi: "Mình là Sam. Rất vui được gặp bạn!" },
      { who: "a", text: "Nice to meet you too. Are you learning English?", vi: "Mình cũng vậy. Bạn đang học tiếng Anh à?" },
      { who: "b", text: "Yes, and it's really fun.", vi: "Ừ, và nó vui lắm." },
    ],
  },
  ja: {
    title: "Lần đầu làm quen", a: "Mi", b: "Sam",
    lines: [
      { who: "a", text: "こんにちは。はじめまして。", vi: "Xin chào. Rất vui được gặp bạn." },
      { who: "b", text: "はじめまして。サムです。", vi: "Rất vui được gặp bạn. Mình là Sam." },
      { who: "a", text: "ミです。よろしく おねがいします。", vi: "Mình là Mi. Mong được giúp đỡ." },
      { who: "b", text: "こちらこそ。にほんごを べんきょうしますか。", vi: "Mình cũng vậy. Bạn có học tiếng Nhật không?" },
      { who: "a", text: "はい、まいにち べんきょうします。", vi: "Có, mình học mỗi ngày." },
      { who: "b", text: "いいですね。がんばりましょう。", vi: "Hay quá. Cùng cố gắng nhé." },
    ],
  },
  ko: {
    title: "Lần đầu làm quen", a: "Mi", b: "Sam",
    lines: [
      { who: "a", text: "안녕하세요? 저는 미예요.", vi: "Xin chào. Mình là Mi." },
      { who: "b", text: "안녕하세요. 저는 샘이에요.", vi: "Xin chào. Mình là Sam." },
      { who: "a", text: "만나서 반가워요.", vi: "Rất vui được gặp bạn." },
      { who: "b", text: "저도 반가워요. 한국어를 공부해요?", vi: "Mình cũng vui. Bạn học tiếng Hàn à?" },
      { who: "a", text: "네, 매일 공부해요.", vi: "Vâng, mình học mỗi ngày." },
      { who: "b", text: "정말 좋아요!", vi: "Thật tuyệt!" },
    ],
  },
};

/* ---------- Cấp độ ---------- */
export type Level = { n: 1 | 2 | 3 | 4 | 5; name: string; goal: string; weeks: string; can: string[] };
export const LEVELS: Level[] = [
  { n: 1, name: "Khởi động", goal: "Chào hỏi, giới thiệu bản thân, đọc được bảng chữ cái", weeks: "Khoảng 2 khoá đầu", can: ["Giới thiệu tên, nghề, nơi ở", "Hỏi và trả lời câu rất ngắn", "Đọc, viết bảng chữ cái"] },
  { n: 2, name: "Quen đường", goal: "Nói về thói quen, đồ ăn, mua sắm, hỏi đường", weeks: "Khoảng 2 khoá", can: ["Kể chuyện một ngày", "Gọi món, mặc cả đơn giản", "Hiểu thông báo ngắn"] },
  { n: 3, name: "Trò chuyện", goal: "Trò chuyện về kế hoạch, sở thích, kinh nghiệm", weeks: "Khoảng 2 khoá", can: ["Kể trải nghiệm đã qua", "Nêu ý kiến và lý do", "Viết tin nhắn, email ngắn"] },
  { n: 4, name: "Vững vàng", goal: "Thảo luận, kể chuyện liền mạch, xử lý tình huống", weeks: "Khoảng 2–3 khoá", can: ["Thuyết trình nhỏ", "Giải thích vấn đề, đề xuất", "Đọc bài viết phổ thông"] },
  { n: 5, name: "Tự tin", goal: "Giao tiếp linh hoạt trong học tập, công việc, du lịch", weeks: "Theo mục tiêu của bạn", can: ["Tranh luận, đàm phán cơ bản", "Nghe video, podcast tự nhiên", "Viết đoạn dài, mạch lạc"] },
];

/* ---------- Giáo viên: nhân vật vector ---------- */
export type Mascot = { id: "cu" | "meo" | "gau"; name: string; lang: Lang; role: string; line: string };
export const MASCOTS: Mascot[] = [
  { id: "cu", name: "Cú Sao", lang: "en", role: "Giáo viên tiếng Anh", line: "Nói sai cũng được, nói đi đã." },
  { id: "meo", name: "Mèo Sakura", lang: "ja", role: "Giáo viên tiếng Nhật", line: "Mỗi ngày một chữ, chẳng mấy mà đọc được truyện." },
  { id: "gau", name: "Gấu Bori", lang: "ko", role: "Giáo viên tiếng Hàn", line: "Hangul dễ hơn bạn nghĩ nhiều." },
];

/* ---------- Lịch lớp tuần ---------- */
export type Slot = "sang" | "chieu" | "toi";
export const SLOTS: { id: Slot; label: string; time: string }[] = [
  { id: "sang", label: "Sáng", time: "8:30 – 10:00" },
  { id: "chieu", label: "Chiều", time: "15:30 – 17:00" },
  { id: "toi", label: "Tối", time: "18:00 – 19:30" },
];
export const DAYS = [
  { n: 2, short: "T2", long: "Thứ Hai" },
  { n: 3, short: "T3", long: "Thứ Ba" },
  { n: 4, short: "T4", long: "Thứ Tư" },
  { n: 5, short: "T5", long: "Thứ Năm" },
  { n: 6, short: "T6", long: "Thứ Sáu" },
  { n: 7, short: "T7", long: "Thứ Bảy" },
];
export type ClassItem = { id: string; lang: Lang; level: Level["n"]; title: string; days: number[]; slot: Slot; mascot: Mascot["id"]; focus: string; start: string; seats: number };
export const CLASSES: ClassItem[] = [
  { id: "en1a", lang: "en", level: 1, title: "Hello English", days: [2, 4], slot: "toi", mascot: "cu", focus: "Chào hỏi, số đếm, câu hỏi đầu tiên", start: "2026-12-07", seats: 12 },
  { id: "en1b", lang: "en", level: 1, title: "Hello English cuối tuần", days: [7], slot: "sang", mascot: "cu", focus: "Cùng nội dung, học dồn vào sáng thứ Bảy", start: "2026-12-05", seats: 12 },
  { id: "en2", lang: "en", level: 2, title: "Daily Talk", days: [3, 5], slot: "toi", mascot: "cu", focus: "Thói quen, mua sắm, hỏi đường", start: "2026-12-08", seats: 12 },
  { id: "en3", lang: "en", level: 3, title: "Speak Up", days: [2, 4], slot: "chieu", mascot: "cu", focus: "Kể trải nghiệm, nêu ý kiến", start: "2026-12-14", seats: 12 },
  { id: "en4", lang: "en", level: 4, title: "Talk the World", days: [3, 5], slot: "chieu", mascot: "cu", focus: "Thảo luận, thuyết trình nhỏ", start: "2026-12-15", seats: 10 },
  { id: "en5", lang: "en", level: 5, title: "Open Mic English", days: [7], slot: "chieu", mascot: "cu", focus: "Tranh luận và nghe nói tự nhiên", start: "2026-12-19", seats: 8 },
  { id: "ja1", lang: "ja", level: 1, title: "Hiragana Start", days: [2, 4], slot: "chieu", mascot: "meo", focus: "Hiragana, Katakana, câu chào", start: "2026-12-07", seats: 12 },
  { id: "ja2", lang: "ja", level: 2, title: "Nihongo Daily", days: [3, 5], slot: "toi", mascot: "meo", focus: "Mẫu câu đời sống, trợ từ cơ bản", start: "2026-12-10", seats: 12 },
  { id: "ja3", lang: "ja", level: 3, title: "Nihongo Talk", days: [2, 4], slot: "toi", mascot: "meo", focus: "Thể thông thường, kể chuyện", start: "2026-12-21", seats: 10 },
  { id: "ja4", lang: "ja", level: 4, title: "Nihongo Plus", days: [7], slot: "sang", mascot: "meo", focus: "Kanji thường dùng, đọc hiểu", start: "2026-12-26", seats: 8 },
  { id: "ko1", lang: "ko", level: 1, title: "Hangul Start", days: [3, 5], slot: "chieu", mascot: "gau", focus: "Hangul, phát âm, câu chào", start: "2026-12-10", seats: 12 },
  { id: "ko2", lang: "ko", level: 2, title: "Hanguk Daily", days: [2, 4], slot: "toi", mascot: "gau", focus: "Đuôi câu lịch sự, đời sống", start: "2026-12-14", seats: 10 },
  { id: "ko3", lang: "ko", level: 3, title: "Hanguk Talk", days: [3, 5], slot: "toi", mascot: "gau", focus: "Kể chuyện, nêu ý kiến", start: "2026-12-17", seats: 10 },
  { id: "ko4", lang: "ko", level: 4, title: "Hanguk Plus", days: [7], slot: "chieu", mascot: "gau", focus: "Ngữ pháp trung cấp, đọc hiểu", start: "2027-01-09", seats: 8 },
];

/* ---------- Học phí tham khảo ---------- */
export const PRICES: { lang: Lang; rows: { label: string; levels: string; price: number }[] }[] = [
  { lang: "en", rows: [{ label: "Cấp 1–2", levels: "Khởi động, Quen đường", price: 2400000 }, { label: "Cấp 3–4", levels: "Trò chuyện, Vững vàng", price: 2900000 }, { label: "Cấp 5", levels: "Tự tin", price: 3200000 }] },
  { lang: "ja", rows: [{ label: "Cấp 1–2", levels: "Khởi động, Quen đường", price: 2800000 }, { label: "Cấp 3–4", levels: "Trò chuyện, Vững vàng", price: 3200000 }, { label: "Cấp 5", levels: "Tự tin", price: 3600000 }] },
  { lang: "ko", rows: [{ label: "Cấp 1–2", levels: "Khởi động, Quen đường", price: 2700000 }, { label: "Cấp 3–4", levels: "Trò chuyện, Vững vàng", price: 3100000 }, { label: "Cấp 5", levels: "Tự tin", price: 3500000 }] },
];

