import * as p from "../../../app/(demos)/demos/kim-hoan/data/pricing.ts";
import assert from "node:assert/strict";
const base = { type: "ring", material: "g18", stone: "syn", stoneMm: 4, size: 12, finish: "gloss", goldPerGram: 4_000_000 };
const q = p.quote(base);
assert.ok(q.ok); assert.equal(q.min, 12_670_000); assert.equal(q.max, 14_620_000);
assert.ok(Math.abs(q.weight - 3.332) < 0.01);
assert.equal(p.quote({ ...base, goldPerGram: 0 }).ok, false);
assert.equal(p.quote({ ...base, goldPerGram: NaN }).reason, "gold-price");
assert.equal(p.quote({ ...base, material: "s925", goldPerGram: 0 }).ok, true);
assert.equal(p.quote({ ...base, size: 13 }).ok, false);
assert.equal(p.quote({ ...base, stoneMm: 9 }).reason, "stone");
const none = p.quote({ ...base, stone: "none" }); assert.ok(none.ok && none.stone === 0 && none.setting === 0);
const nat = p.quote({ ...base, stone: "nat" }); assert.ok(nat.ok && nat.stone === q.stone * 3 && nat.max - nat.min > q.max - q.min);
const w = p.quote({ ...base, material: "w18", stone: "none" }); assert.ok(w.ok && w.extra === p.RHODIUM_FEE);
const ear = p.quote({ ...base, type: "earring", size: 14 }); assert.ok(ear.ok && ear.stone === 2 * 900_000 * 0 + 2 * 2_100_000);
for (const t of p.TYPES) for (const m of p.MATERIALS) { const r = p.quote({ ...base, type: t.id, material: m.id, size: t.defaultSize }); assert.ok(r.ok && r.min < r.max && r.min > 0); }
const hi = p.quote({ ...base, goldPerGram: 5_000_000 }); assert.ok(hi.max > q.max);
console.log("pricing.test: all assertions passed");
