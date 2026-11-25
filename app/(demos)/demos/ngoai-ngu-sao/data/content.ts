export const IMG = "/images/demos/ngoai-ngu-sao";
export const SLUG = "ngoai-ngu-sao";

export type Lang = "en" | "ja" | "ko";
export const LANGS: { id: Lang; name: string; native: string; tag: string }[] = [
  { id: "en", name: "Tiếng Anh", native: "English", tag: "EN" },
  { id: "ja", name: "Tiếng Nhật", native: "にほんご", tag: "JA" },
  { id: "ko", name: "Tiếng Hàn", native: "한국어", tag: "KO" },
];

export const NAV = [
  { href: "#ngon-ngu", label: "Ngôn ngữ" },
  { href: "#the-tu", label: "Thẻ từ vựng" },
  { href: "#hoi-thoai", label: "Hội thoại" },
  { href: "#cap-do", label: "Cấp độ" },
  { href: "#cong-cu", label: "Kiểm tra & lịch lớp" },
  { href: "#hoc-phi", label: "Học phí" },
];

/** Câu chào hero: dạng chữ hiển thị + cách đọc cho trình đọc màn hình. */
export const GREETINGS = [
  { text: "Xin chào", lang: "vi", sr: "Xin chào (tiếng Việt)", tone: "white" },
  { text: "Hello", lang: "en", sr: "Hello (tiếng Anh)", tone: "yellow" },
  { text: "こんにちは", lang: "ja", sr: "Konnichiwa, こんにちは (tiếng Nhật)", tone: "pink" },
  { text: "안녕하세요", lang: "ko", sr: "Annyeonghaseyo, 안녕하세요 (tiếng Hàn)", tone: "white" },
] as const;

export const MARQUEE_WORDS = [
  "Xin chào", "Hello", "こんにちは", "안녕하세요",
  "Cảm ơn", "Thank you", "ありがとう", "감사합니다",
];

export const LANG_CARDS: {
  id: Lang; title: string; sub: string; lead: string; img: string; alt: string; pos: string; bullets: string[]; glyph: string; tone: "yellow" | "pink" | "white";
}[] = [
  {
    id: "en", title: "Tiếng Anh", sub: "Nói được trước, hoàn thiện sau", glyph: "Aa", tone: "yellow",
    lead: "Từ chào hỏi đến thuyết trình nhỏ, mỗi buổi đều có phần nói theo cặp và theo nhóm.",
    img: "ban-do-viet", alt: "Bàn tay ghi chép vào sổ đặt trên bản đồ thế giới với chữ cái nhiều màu", pos: "50% 50%",
    bullets: ["Giao tiếp hằng ngày", "Phát âm và nghe tự nhiên", "Tiếng Anh đi làm và đi du lịch"],
  },
  {
    id: "ja", title: "Tiếng Nhật", sub: "Từ bảng chữ cái tới câu chuyện đầu tiên", glyph: "あ", tone: "pink",
    lead: "Bắt đầu bằng Hiragana và Katakana bằng thẻ lật, rồi ghép thành những câu chào, hỏi đường, gọi món.",
    img: "viet-chu", alt: "Tay viết chữ trong quyển vở tập viết chữ Á Đông", pos: "50% 50%",
    bullets: ["Hiragana, Katakana có lộ trình", "Mẫu câu theo tình huống", "Làm quen Kanji từng bước"],
  },
  {
    id: "ko", title: "Tiếng Hàn", sub: "Đọc được Hangul sau vài buổi", glyph: "가", tone: "white",
    lead: "Hangul có quy tắc rõ ràng nên bạn đọc được rất sớm; phần còn lại là luyện nghe nói qua hội thoại ngắn.",
    img: "so-han", alt: "Sổ ghi chú có dòng chữ Hàn trên bàn gỗ cạnh bút và cà phê", pos: "50% 40%",
    bullets: ["Hangul trong vài buổi đầu", "Kính ngữ dùng đúng chỗ", "Hội thoại đời thường"],
  },
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
  "Mỗi buổi học bắt đầu bằng việc mở miệng nói. Chúng mình sửa lỗi nhẹ nhàng, ôn từ bằng thẻ lật, luyện hội thoại theo tình huống thật và chỉ lên cấp khi bạn thấy mình đã tự tin.";

export const PILLARS = [
  { k: "Nói trước", v: "Phần nói theo cặp và nhóm nhỏ chiếm đầu buổi, ngay cả ở cấp độ đầu tiên." },
  { k: "Nhớ lâu", v: "Thẻ từ vựng lật, nhắc lại theo nhịp, không học dồn." },
  { k: "Sửa nhẹ", v: "Lỗi được ghi lại và sửa cuối câu, không ngắt lời bạn giữa chừng." },
  { k: "Lên cấp khi sẵn sàng", v: "Mỗi cấp có mục tiêu rõ; bạn tự đánh giá cùng giáo viên trước khi sang cấp mới." },
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
  { id: "cu", name: "Cú Sao", lang: "en", role: "Dẫn lớp tiếng Anh", line: "Nói sai cũng được, nói đi đã." },
  { id: "meo", name: "Mèo Sakura", lang: "ja", role: "Dẫn lớp tiếng Nhật", line: "Mỗi ngày một chữ, chẳng mấy mà đọc được truyện." },
  { id: "gau", name: "Gấu Bori", lang: "ko", role: "Dẫn lớp tiếng Hàn", line: "Hangul dễ hơn bạn nghĩ nhiều." },
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
export type ClassItem = { id: string; lang: Lang; level: Level["n"]; title: string; days: number[]; slot: Slot; mascot: Mascot["id"]; focus: string };
export const CLASSES: ClassItem[] = [
  { id: "en1a", lang: "en", level: 1, title: "Hello English", days: [2, 4], slot: "toi", mascot: "cu", focus: "Chào hỏi, số đếm, câu hỏi đầu tiên" },
  { id: "en1b", lang: "en", level: 1, title: "Hello English cuối tuần", days: [7], slot: "sang", mascot: "cu", focus: "Cùng nội dung, học dồn vào sáng thứ Bảy" },
  { id: "en2", lang: "en", level: 2, title: "Daily Talk", days: [3, 5], slot: "toi", mascot: "cu", focus: "Thói quen, mua sắm, hỏi đường" },
  { id: "en3", lang: "en", level: 3, title: "Speak Up", days: [2, 4], slot: "chieu", mascot: "cu", focus: "Kể trải nghiệm, nêu ý kiến" },
  { id: "en4", lang: "en", level: 4, title: "Talk the World", days: [3, 5], slot: "chieu", mascot: "cu", focus: "Thảo luận, thuyết trình nhỏ" },
  { id: "en5", lang: "en", level: 5, title: "Open Mic English", days: [7], slot: "chieu", mascot: "cu", focus: "Tranh luận và nghe nói tự nhiên" },
  { id: "ja1", lang: "ja", level: 1, title: "Hiragana Start", days: [2, 4], slot: "chieu", mascot: "meo", focus: "Hiragana, Katakana, câu chào" },
  { id: "ja2", lang: "ja", level: 2, title: "Nihongo Daily", days: [3, 5], slot: "toi", mascot: "meo", focus: "Mẫu câu đời sống, trợ từ cơ bản" },
  { id: "ja3", lang: "ja", level: 3, title: "Nihongo Talk", days: [2, 4], slot: "toi", mascot: "meo", focus: "Thể thông thường, kể chuyện" },
  { id: "ja4", lang: "ja", level: 4, title: "Nihongo Plus", days: [7], slot: "sang", mascot: "meo", focus: "Kanji thường dùng, đọc hiểu" },
  { id: "ko1", lang: "ko", level: 1, title: "Hangul Start", days: [3, 5], slot: "chieu", mascot: "gau", focus: "Hangul, phát âm, câu chào" },
  { id: "ko2", lang: "ko", level: 2, title: "Hanguk Daily", days: [2, 4], slot: "toi", mascot: "gau", focus: "Đuôi câu lịch sự, đời sống" },
  { id: "ko3", lang: "ko", level: 3, title: "Hanguk Talk", days: [3, 5], slot: "toi", mascot: "gau", focus: "Kể chuyện, nêu ý kiến" },
  { id: "ko4", lang: "ko", level: 4, title: "Hanguk Plus", days: [7], slot: "chieu", mascot: "gau", focus: "Ngữ pháp trung cấp, đọc hiểu" },
];

/* ---------- Học phí tham khảo ---------- */
export const PRICES: { lang: Lang; rows: { label: string; levels: string; price: number }[] }[] = [
  { lang: "en", rows: [{ label: "Cấp 1–2", levels: "Khởi động, Quen đường", price: 2400000 }, { label: "Cấp 3–4", levels: "Trò chuyện, Vững vàng", price: 2900000 }, { label: "Cấp 5", levels: "Tự tin", price: 3200000 }] },
  { lang: "ja", rows: [{ label: "Cấp 1–2", levels: "Khởi động, Quen đường", price: 2800000 }, { label: "Cấp 3–4", levels: "Trò chuyện, Vững vàng", price: 3200000 }, { label: "Cấp 5", levels: "Tự tin", price: 3600000 }] },
  { lang: "ko", rows: [{ label: "Cấp 1–2", levels: "Khởi động, Quen đường", price: 2700000 }, { label: "Cấp 3–4", levels: "Trò chuyện, Vững vàng", price: 3100000 }, { label: "Cấp 5", levels: "Tự tin", price: 3500000 }] },
];

export const FAQ = [
  { q: "Chưa biết gì có học được không?", a: "Được. Cấp 1 dành cho người mới hoàn toàn: bạn bắt đầu từ bảng chữ cái và những câu chào đầu tiên. Bài kiểm tra nhanh bên dưới cũng giúp bạn biết nên vào cấp nào." },
  { q: "Bài kiểm tra cấp độ có quy đổi sang chứng chỉ không?", a: "Không. Đây là thang cấp độ riêng của trung tâm (Cấp 1 đến 5) để xếp lớp. Bài kiểm tra không tương đương và không thay thế các chứng chỉ quốc tế." },
  { q: "Một lớp có bao nhiêu bạn?", a: "Lớp học theo nhóm nhỏ để mỗi bạn đều có thời gian nói. Sĩ số cụ thể của từng lớp sẽ được xác nhận khi tư vấn." },
  { q: "Tôi bận, có học bù được không?", a: "Có thể sắp xếp học bù sang buổi khác cùng cấp độ khi bạn báo trước. Chi tiết được trao đổi khi đăng ký." },
  { q: "Học phí trên trang là giá chính thức?", a: "Đó là mức giá tham khảo cho một khoá 24 buổi. Học phí chính thức và các ưu đãi được tư vấn viên xác nhận khi bạn đăng ký." },
  { q: "Tôi muốn học cả hai ngôn ngữ?", a: "Bạn có thể xếp hai lớp ở hai khung giờ khác nhau. Hãy ghi rõ nhu cầu trong phần tư vấn để được sắp lịch không trùng." },
];
