/** Hình dáng người mẫu hình học, vẽ bằng SVG (không ảnh). variant 0..5. */
export function Figure({ variant, label }: { variant: number; label: string }) {
  return (
    <svg viewBox="0 0 200 420" role="img" aria-label={label} style={{ width: "100%", height: "100%" }}>
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="100" cy="34" r="17" fill="currentColor" />
        <rect x="94" y="48" width="12" height="18" fill="currentColor" />
        {variant === 0 && (<>
          <path d="M64 70h72l22 262H42z" fill="var(--pd-fill)" />
          <path d="M64 70l-26 150 12 4 24-110zM136 70l26 150-12 4-24-110z" fill="var(--pd-fill)" />
          <path d="M100 70v262M84 70l16 70 16-70" fill="none" />
          <path d="M52 168h96v14H52z" fill="var(--pd-red)" stroke="none" />
          <path d="M72 332v76M128 332v76" fill="none" />
        </>)}
        {variant === 1 && (<>
          <path d="M78 70h44l6 70 34 268H38l34-268z" fill="var(--pd-fill)" />
          <path d="M100 224l30 184" stroke="var(--pd-red)" strokeWidth="4" fill="none" />
          <path d="M78 70L56 190M122 70l22 120" fill="none" />
        </>)}
        {variant === 2 && (<>
          <path d="M40 76l60-10 60 10 8 130h-30v-70l-6 70H108l-8 0-8 0H68l-6-70v70H32z" fill="var(--pd-fill)" />
          <path d="M70 206h30v202H64zM100 206h30l6 202h-36z" fill="var(--pd-fill)" />
          <path d="M100 66v140M86 66l14 54 14-54" fill="none" />
          <circle cx="100" cy="150" r="3" fill="var(--pd-red)" stroke="none" />
          <circle cx="100" cy="176" r="3" fill="var(--pd-red)" stroke="none" />
        </>)}
        {variant === 3 && (<>
          <path d="M100 66L14 250h172z" fill="var(--pd-fill)" />
          <path d="M100 66L52 250h96z" fill="var(--pd-red)" stroke="none" />
          <path d="M84 250v158M116 250v158" fill="none" />
        </>)}
        {variant === 4 && (<>
          <path d="M76 70h48l10 110H66z" fill="var(--pd-fill)" />
          <path d="M66 180h68l36 228h-52l-18-150-18 150H48z" fill="var(--pd-red)" />
          <path d="M66 180h68" stroke="var(--pd-ink)" strokeWidth="6" fill="none" />
        </>)}
        {variant === 5 && (<>
          <path d="M70 70h60l6 70H64z" fill="var(--pd-fill)" />
          <path d="M64 140h72l36 150H28z" fill="var(--pd-fill)" />
          <path d="M52 140l-6 150M70 140l-10 150M88 140l-6 150M112 140l6 150M130 140l10 150M148 140l6 150" fill="none" />
          <path d="M82 290v118M118 290v118" fill="none" />
          <path d="M64 140h72" stroke="var(--pd-red)" strokeWidth="6" fill="none" />
        </>)}
      </g>
    </svg>
  );
}
