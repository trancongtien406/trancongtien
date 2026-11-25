import type { Lang } from "../data/content";

export type Question = { id: string; tier: 1 | 2 | 3 | 4 | 5; prompt: string; options: string[]; answer: number };

/** 10 câu mỗi ngôn ngữ: mỗi bậc (tier 1–5) có 2 câu, điểm câu = bậc. Tối đa 30 điểm. */
export const QUESTIONS: Record<Lang, Question[]> = {
  en: [
    { id: "en1", tier: 1, prompt: "Chọn câu đúng: She ___ a student.", options: ["am", "is", "are", "be"], answer: 1 },
    { id: "en2", tier: 1, prompt: "Câu nào dùng để chào vào buổi sáng?", options: ["Good night", "Good morning", "Good bye", "See you"], answer: 1 },
    { id: "en3", tier: 2, prompt: "I ___ to school every day.", options: ["go", "goes", "going", "gone"], answer: 0 },
    { id: "en4", tier: 2, prompt: "How ___ is this book? (hỏi giá)", options: ["many", "much", "long", "old"], answer: 1 },
    { id: "en5", tier: 3, prompt: "If it rains tomorrow, we ___ at home.", options: ["stayed", "staying", "will stay", "would stayed"], answer: 2 },
    { id: "en6", tier: 3, prompt: "She has lived here ___ 2019.", options: ["for", "since", "from", "during"], answer: 1 },
    { id: "en7", tier: 4, prompt: "The report ___ before Friday.", options: ["must finish", "must be finished", "must finishing", "must to be finished"], answer: 1 },
    { id: "en8", tier: 4, prompt: "He suggested ___ earlier.", options: ["leaving", "to leave", "leave", "left"], answer: 0 },
    { id: "en9", tier: 5, prompt: "If I had known, I ___ you.", options: ["would tell", "would have told", "will tell", "had told"], answer: 1 },
    { id: "en10", tier: 5, prompt: "Hardly ___ the door when the phone rang.", options: ["she opened", "she had opened", "had she opened", "did she opened"], answer: 2 },
  ],
  ja: [
    { id: "ja1", tier: 1, prompt: "「おはよう」nghĩa là gì?", options: ["Chào buổi sáng", "Cảm ơn", "Xin lỗi", "Tạm biệt"], answer: 0 },
    { id: "ja2", tier: 1, prompt: "「ありがとう」nghĩa là gì?", options: ["Xin lỗi", "Tạm biệt", "Cảm ơn", "Chúc ngủ ngon"], answer: 2 },
    { id: "ja3", tier: 2, prompt: "わたしは がくせい ___。", options: ["です", "ます", "を", "が"], answer: 0 },
    { id: "ja4", tier: 2, prompt: "これ ___ ほんです。", options: ["を", "は", "に", "で"], answer: 1 },
    { id: "ja5", tier: 3, prompt: "あした ともだちに ___。", options: ["あいました", "あいません", "あいます", "あっています"], answer: 2 },
    { id: "ja6", tier: 3, prompt: "えきは どこ ___ ありますか。", options: ["を", "に", "で", "と"], answer: 1 },
    { id: "ja7", tier: 4, prompt: "ほんを ___ ながら、おんがくを ききます。", options: ["よんで", "よむ", "よみ", "よんだ"], answer: 2 },
    { id: "ja8", tier: 4, prompt: "「〜てもいいですか」dùng để làm gì?", options: ["Bắt buộc phải làm", "Xin phép được làm gì", "Cấm làm", "Nói đã làm xong"], answer: 1 },
    { id: "ja9", tier: 5, prompt: "せんせいに ほめ ___ うれしかったです。", options: ["させて", "たら", "られて", "ても"], answer: 2 },
    { id: "ja10", tier: 5, prompt: "「〜わけにはいかない」nghĩa gần nhất là?", options: ["Có thể làm", "Đã làm rồi", "Chắc chắn làm", "Không thể làm vì lý do nào đó"], answer: 3 },
  ],
  ko: [
    { id: "ko1", tier: 1, prompt: "「안녕하세요」nghĩa là gì?", options: ["Tạm biệt", "Xin chào", "Xin lỗi", "Chúc ngủ ngon"], answer: 1 },
    { id: "ko2", tier: 1, prompt: "「감사합니다」nghĩa là gì?", options: ["Cảm ơn", "Xin lỗi", "Không sao", "Hẹn gặp lại"], answer: 0 },
    { id: "ko3", tier: 2, prompt: "저는 학생 ___.", options: ["합니다", "입니다", "있습니다", "갑니다"], answer: 1 },
    { id: "ko4", tier: 2, prompt: "책___ 읽어요.", options: ["가", "를", "을", "에"], answer: 2 },
    { id: "ko5", tier: 3, prompt: "내일 친구를 ___.", options: ["만났어요", "만날 거예요", "만나지 않았어요", "만나고 있었어요"], answer: 1 },
    { id: "ko6", tier: 3, prompt: "학교___ 가요.", options: ["를", "을", "에", "이"], answer: 2 },
    { id: "ko7", tier: 4, prompt: "비가 ___ 우산을 썼어요.", options: ["올까", "오면서", "와서", "오지만"], answer: 2 },
    { id: "ko8", tier: 4, prompt: "「-(으)ㄹ 수 있다」nghĩa là gì?", options: ["Phải làm", "Không nên làm", "Đã làm", "Có thể làm"], answer: 3 },
    { id: "ko9", tier: 5, prompt: "「-는 바람에」thường dùng khi nói về?", options: ["Nguyên nhân dẫn tới kết quả không mong muốn", "Lời hứa", "Lời ra lệnh", "Câu hỏi đường"], answer: 0 },
    { id: "ko10", tier: 5, prompt: "「-(으)ㄴ/는 척하다」nghĩa là gì?", options: ["Muốn làm", "Giả vờ làm", "Quyết định làm", "Thử làm"], answer: 1 },
  ],
};

export const MAX_SCORE = 30;

export type TestResult = {
  correct: number;
  total: number;
  score: number;
  level: 1 | 2 | 3 | 4 | 5;
  wrongTiers: number[];
};

export function scoreTest(lang: Lang, answers: Record<string, number | undefined>): TestResult {
  const qs = QUESTIONS[lang];
  let score = 0, correct = 0;
  const wrongTiers: number[] = [];
  for (const q of qs) {
    if (answers[q.id] === q.answer) { score += q.tier; correct += 1; }
    else wrongTiers.push(q.tier);
  }
  const level = (score <= 5 ? 1 : score <= 11 ? 2 : score <= 18 ? 3 : score <= 25 ? 4 : 5) as TestResult["level"];
  return { correct, total: qs.length, score, level, wrongTiers };
}

/** Lớp gợi ý: lớp đúng cấp của ngôn ngữ, nếu không có thì lấy cấp gần nhất thấp hơn. */
export function suggestLevelForClass(lang: Lang, level: number, available: number[]): number {
  const sorted = [...available].sort((a, b) => a - b);
  let best = sorted[0] ?? level;
  for (const l of sorted) if (l <= level) best = l;
  return best;
}
