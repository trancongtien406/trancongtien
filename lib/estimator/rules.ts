import type { AnswerValue, AnswersMap } from "@/lib/estimator/types";

export type RuleCondition = {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "in"
    | "not_in"
    | "includes"
    | "exists"
    | "gt"
    | "gte"
    | "lt"
    | "lte";
  value?: AnswerValue | AnswerValue[];
};

export type RuleAction = {
  type: "SHOW_QUESTION" | "HIDE_QUESTION" | "ADD_FEATURE" | "RECOMMEND";
  target: string;
  payload?: Record<string, unknown>;
};

export type RuleDefinition = {
  conditions: RuleCondition[];
  actions: RuleAction[];
  match?: "all" | "any";
};

function asArray(value: AnswerValue | AnswerValue[] | undefined): AnswerValue[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

export function evaluateCondition(
  condition: RuleCondition,
  answers: AnswersMap,
): boolean {
  const actual = answers[condition.field];
  const expected = condition.value;

  switch (condition.operator) {
    case "equals":
      return actual === expected;
    case "not_equals":
      return actual !== expected;
    case "in":
      return asArray(expected as AnswerValue[]).includes(actual as AnswerValue);
    case "not_in":
      return !asArray(expected as AnswerValue[]).includes(actual as AnswerValue);
    case "includes":
      return Array.isArray(actual) && actual.includes(String(expected));
    case "exists":
      return actual != null && actual !== "" && !(Array.isArray(actual) && actual.length === 0);
    case "gt":
      return Number(actual) > Number(expected);
    case "gte":
      return Number(actual) >= Number(expected);
    case "lt":
      return Number(actual) < Number(expected);
    case "lte":
      return Number(actual) <= Number(expected);
    default:
      return false;
  }
}

export function evaluateRule(
  rule: RuleDefinition,
  answers: AnswersMap,
): boolean {
  const match = rule.match || "all";
  if (!rule.conditions.length) return true;
  if (match === "any") {
    return rule.conditions.some((c) => evaluateCondition(c, answers));
  }
  return rule.conditions.every((c) => evaluateCondition(c, answers));
}

export function parseRuleDefinition(raw: string): RuleDefinition | null {
  try {
    const parsed = JSON.parse(raw) as RuleDefinition;
    if (!parsed || !Array.isArray(parsed.conditions) || !Array.isArray(parsed.actions)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function collectVisibleQuestionKeys(
  allKeys: string[],
  rules: Array<{ questionKey: string; definition: string; active: boolean }>,
  answers: AnswersMap,
  productScopedKeys: string[],
): Set<string> {
  const visible = new Set(productScopedKeys.length ? productScopedKeys : allKeys);
  // Global questions (no product) always considered if in allKeys and not product-only
  for (const key of allKeys) {
    if (!productScopedKeys.length || productScopedKeys.includes(key)) {
      visible.add(key);
    }
  }

  for (const rule of rules) {
    if (!rule.active) continue;
    const def = parseRuleDefinition(rule.definition);
    if (!def || !evaluateRule(def, answers)) continue;
    for (const action of def.actions) {
      if (action.type === "SHOW_QUESTION") visible.add(action.target);
      if (action.type === "HIDE_QUESTION") visible.delete(action.target);
    }
  }
  return visible;
}
