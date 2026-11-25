/** Hàng cây thông nhọn xác định theo seed, dùng làm silhouette (SVG path). Đáy lấp đầy tới y = H. */
export function trees(n: number, seed: number, W: number, H: number, baseY: number, minH: number, maxH: number): string {
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const step = W / n;
  let d = `M0 ${H}V${baseY}`;
  for (let i = 0; i < n; i++) {
    const x = i * step + r() * step * 0.35;
    const h = minH + r() * (maxH - minH);
    const w = step * (0.55 + r() * 0.35);
    const t = (a: number) => (baseY - h * a).toFixed(0);
    const X = (a: number) => (x + w * a).toFixed(0);
    d += ` L${X(0)} ${baseY} L${X(0.3)} ${t(0.38)} L${X(0.14)} ${t(0.38)} L${X(0.38)} ${t(0.72)} L${X(0.24)} ${t(0.72)} L${X(0.5)} ${t(1)} L${X(0.76)} ${t(0.72)} L${X(0.62)} ${t(0.72)} L${X(0.86)} ${t(0.38)} L${X(0.7)} ${t(0.38)} L${X(1)} ${baseY}`;
  }
  return `${d} L${W} ${baseY}V${H}Z`;
}
