import type { FeatureNode } from "@/lib/estimator/dependencies";
import type { AnswersMap } from "@/lib/estimator/types";

export type RoadmapPhase = {
  phase: string;
  items: string[];
};

export function estimateTimelineWeeks(input: {
  selectedFeatures: FeatureNode[];
  answers: AnswersMap;
  optimized?: boolean;
}): { min: number; max: number } {
  const units = input.selectedFeatures.reduce((s, f) => s + f.baseUnits, 0);
  // Rough: ~4 units / week with parallel FE/BE
  let weeks = Math.ceil(units / 4);
  const timeline = String(input.answers.timeline || "STANDARD");
  if (timeline === "RUSH" || timeline === "ASAP") weeks = Math.ceil(weeks * 0.75);
  if (timeline === "FLEXIBLE") weeks = Math.ceil(weeks * 1.1);
  if (input.optimized) weeks = Math.max(3, Math.ceil(weeks * 0.85));

  const min = Math.max(3, weeks - 1);
  const max = Math.max(min + 1, weeks + 2);
  return { min, max };
}

export function buildRoadmap(input: {
  productKey?: string | null;
  selectedFeatures: FeatureNode[];
  deferredFeatures: FeatureNode[];
}): RoadmapPhase[] {
  const names = (list: FeatureNode[]) => list.map((f) => f.name);
  const core = input.selectedFeatures.filter((f) => f.priority === "MUST_HAVE");
  const should = input.selectedFeatures.filter((f) => f.priority === "SHOULD_HAVE");
  const nice = input.selectedFeatures.filter(
    (f) => f.priority === "NICE_TO_HAVE" || f.priority === "GROWTH",
  );

  const phases: RoadmapPhase[] = [
    {
      phase: "Phase 1 — Foundation",
      items: [
        "Business analysis & UX",
        "Architecture & project setup",
        "Authentication & core data",
        ...names(core).slice(0, 6),
      ],
    },
    {
      phase: "Phase 2 — Core product",
      items: names(should).length ? names(should) : ["Admin portal", "Core workflows", "QA"],
    },
  ];

  if (nice.length || input.deferredFeatures.length) {
    phases.push({
      phase: "Phase 3 — Growth",
      items: [
        ...names(nice),
        ...names(input.deferredFeatures).slice(0, 8),
      ].filter(Boolean),
    });
  }

  phases.push({
    phase: "Phase 4 — Launch",
    items: ["Hardening & security", "Production deploy", "Monitoring", "Handover"],
  });

  return phases;
}
