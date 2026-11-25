import type { AnswersMap } from "@/lib/estimator/types";

export type ScoreResult = {
  score: number;
  band: "HOT" | "WARM" | "COLD";
  reasons: string[];
};

export function scoreLead(input: {
  answers: AnswersMap;
  hasContact: boolean;
  completionRatio: number;
  estimateMin?: number;
  budgetVnd?: number | null;
}): ScoreResult {
  let score = 0;
  const reasons: string[] = [];

  const budget =
    input.budgetVnd ??
    (typeof input.answers.budget_vnd === "number"
      ? input.answers.budget_vnd
      : null);

  if (budget && budget >= 30_000_000) {
    score += 25;
    reasons.push("Ngân sách phù hợp");
  } else if (budget && budget < 15_000_000) {
    score -= 20;
    reasons.push("Ngân sách thấp");
  }

  if (input.answers.timeline && input.answers.timeline !== "UNKNOWN") {
    score += 10;
    reasons.push("Timeline rõ");
  }

  if (input.answers.company || input.hasContact) {
    score += 10;
    reasons.push("Có thông tin tổ chức/liên hệ");
  }

  if (input.hasContact) {
    score += 10;
    reasons.push("Đã để lại SĐT/email");
  }

  if (input.completionRatio >= 0.9) {
    score += 15;
    reasons.push("Hoàn thành gần hết flow");
  } else if (input.completionRatio >= 0.5) {
    score += 8;
  }

  if (input.answers.decision_maker === true || input.answers.decision_maker === "YES") {
    score += 10;
    reasons.push("Decision maker");
  }

  if (input.answers.intent === "RESEARCHING") {
    score -= 10;
    reasons.push("Chỉ đang tìm hiểu");
  }

  if (
    budget != null &&
    input.estimateMin != null &&
    budget < input.estimateMin * 0.5
  ) {
    score -= 15;
    reasons.push("Ngân sách lệch xa estimate");
  }

  score = Math.max(0, Math.min(100, score));
  const band = score >= 80 ? "HOT" : score >= 50 ? "WARM" : "COLD";
  return { score, band, reasons };
}
