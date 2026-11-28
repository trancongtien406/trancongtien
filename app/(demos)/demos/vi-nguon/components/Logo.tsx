export function Logo({ size = 26, light = true }: { size?: number; light?: boolean }) {
  const c = light ? "#fff" : "#0a0f2a";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2l12 7v14l-12 7-12-7V9z" fill={c} />
      <path d="M10.5 12.5c1.2 4.4 3 6.8 5.5 9 2.5-2.2 4.3-4.6 5.5-9-2 1.6-3.6 2.2-5.5 2.2s-3.5-.6-5.5-2.2z" fill={light ? "#0a1a6a" : "#fff"} />
    </svg>
  );
}
