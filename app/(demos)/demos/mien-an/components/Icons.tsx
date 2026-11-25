export function Check() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 6.4 5 8.8l4.6-5.2" />
    </svg>
  );
}
export function Close() {
  return (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M3 3l12 12M15 3 3 15" />
    </svg>
  );
}
export function Symbol({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 80V44C18 24 32 10 50 10C68 10 82 24 82 44V80" />
      <path d="M50 76C34 70 24 54 28 39C42 42 50 56 50 76Z" />
      <path d="M50 76C66 70 76 54 72 39C58 42 50 56 50 76Z" />
      <path d="M50 57C44 46 44 34 50 26C56 34 56 46 50 57Z" />
      <path d="M31 87H69" />
    </svg>
  );
}
