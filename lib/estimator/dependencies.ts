export type FeatureNode = {
  id: string;
  key: string;
  name: string;
  priority: string;
  complexity: string;
  baseUnits: number;
  technicalRisk: string;
  optional: boolean;
};

export type DependencyEdge = {
  fromKey: string;
  toKey: string;
  type: string;
  message: string | null;
};

export type DependencyResolution = {
  selected: string[];
  autoAdded: Array<{ key: string; reason: string }>;
  conflicts: Array<{ a: string; b: string; message: string }>;
  recommendations: Array<{ key: string; reason: string }>;
};

/**
 * Resolve REQUIRES transitively. CONFLICTS_WITH reported, not auto-removed.
 */
export function resolveFeatureDependencies(
  selectedKeys: string[],
  features: FeatureNode[],
  edges: DependencyEdge[],
): DependencyResolution {
  const byKey = new Map(features.map((f) => [f.key, f]));
  const selected = new Set(selectedKeys.filter((k) => byKey.has(k)));
  const autoAdded: Array<{ key: string; reason: string }> = [];
  const recommendations: Array<{ key: string; reason: string }> = [];
  const conflicts: Array<{ a: string; b: string; message: string }> = [];

  let changed = true;
  while (changed) {
    changed = false;
    for (const key of [...selected]) {
      for (const edge of edges) {
        if (edge.fromKey !== key) continue;
        if (edge.type === "REQUIRES" && !selected.has(edge.toKey) && byKey.has(edge.toKey)) {
          selected.add(edge.toKey);
          autoAdded.push({
            key: edge.toKey,
            reason:
              edge.message ||
              `${byKey.get(key)?.name || key} yêu cầu ${byKey.get(edge.toKey)?.name || edge.toKey}`,
          });
          changed = true;
        }
        if (edge.type === "RECOMMENDS" && !selected.has(edge.toKey) && byKey.has(edge.toKey)) {
          if (!recommendations.some((r) => r.key === edge.toKey)) {
            recommendations.push({
              key: edge.toKey,
              reason:
                edge.message ||
                `Nên cân nhắc ${byKey.get(edge.toKey)?.name || edge.toKey} khi có ${byKey.get(key)?.name || key}`,
            });
          }
        }
        if (edge.type === "CONFLICTS_WITH" && selected.has(edge.toKey)) {
          conflicts.push({
            a: key,
            b: edge.toKey,
            message:
              edge.message ||
              `${byKey.get(key)?.name || key} xung đột với ${byKey.get(edge.toKey)?.name || edge.toKey}`,
          });
        }
      }
    }
  }

  return {
    selected: [...selected],
    autoAdded,
    conflicts,
    recommendations,
  };
}
