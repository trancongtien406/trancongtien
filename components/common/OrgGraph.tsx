export function OrgGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Sơ đồ luồng phát triển full-stack, app và AI Agent: Discovery đến Growth"
    >
      <rect width="640" height="420" rx="24" fill="#F8FAFC" />
      <path
        d="M80 210h480"
        stroke="#CBD5E1"
        strokeWidth="2"
        strokeDasharray="6 8"
      />
      {[
        { x: 80, label: "Discover", sub: "01", color: "#8B5CF6" },
        { x: 176, label: "Plan", sub: "02", color: "#3B82F6" },
        { x: 272, label: "Design", sub: "03", color: "#10B981" },
        { x: 368, label: "Build", sub: "04", color: "#F59E0B" },
        { x: 464, label: "Launch", sub: "05", color: "#F43F5E" },
        { x: 560, label: "Grow", sub: "06", color: "#2563EB" },
      ].map((node) => (
        <g key={node.label} transform={`translate(${node.x} 210)`}>
          <circle r="28" fill="white" stroke={node.color} strokeWidth="3" />
          <text
            textAnchor="middle"
            y="5"
            fill={node.color}
            fontSize="12"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            {node.sub}
          </text>
          <text
            textAnchor="middle"
            y="52"
            fill="#0F172A"
            fontSize="13"
            fontWeight="600"
            fontFamily="system-ui,sans-serif"
          >
            {node.label}
          </text>
        </g>
      ))}
      <rect x="200" y="40" width="240" height="64" rx="16" fill="#2563EB" />
      <text
        x="320"
        y="68"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        Full-stack, App & AI Agent
      </text>
      <text
        x="320"
        y="88"
        textAnchor="middle"
        fill="#BFDBFE"
        fontSize="11"
        fontFamily="system-ui,sans-serif"
      >
        From Idea → Product → Growth
      </text>
      <path d="M320 104v50" stroke="#93C5FD" strokeWidth="2" />
    </svg>
  );
}
