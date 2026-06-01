/** Decorative travel artifacts on the pegboard — purely visual */
export function ProjectsWallDecor() {
  return (
    <div className="projects-wall__artifacts" aria-hidden="true">
      <svg className="projects-artifact projects-artifact--compass" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="34" stroke="#c4a574" strokeWidth="2" fill="#2a2318" />
        <circle cx="40" cy="40" r="28" stroke="#8a7355" strokeWidth="1" />
        <path d="M40 14 L44 40 L40 66 L36 40 Z" fill="#9970FF" opacity="0.9" />
        <path d="M14 40 L40 36 L66 40 L40 44 Z" fill="#e8dcc8" opacity="0.85" />
        <circle cx="40" cy="40" r="4" fill="#f4f0ea" />
      </svg>

      <svg className="projects-artifact projects-artifact--passport" viewBox="0 0 72 96" fill="none">
        <rect x="4" y="4" width="64" height="88" rx="4" fill="#1e3a5f" stroke="#c4a574" strokeWidth="1.5" />
        <circle cx="36" cy="38" r="14" stroke="#c4a574" strokeWidth="1" opacity="0.6" />
        <rect x="14" y="58" width="44" height="4" rx="1" fill="#c4a574" opacity="0.35" />
        <rect x="14" y="68" width="32" height="3" rx="1" fill="#c4a574" opacity="0.25" />
        <circle cx="52" cy="72" r="10" stroke="#c0392b" strokeWidth="1.5" fill="none" opacity="0.7" />
        <text x="52" y="75" textAnchor="middle" fill="#c0392b" fontSize="6" fontWeight="700">
          JP
        </text>
      </svg>

      <svg className="projects-artifact projects-artifact--tag" viewBox="0 0 100 48" fill="none">
        <path
          d="M8 8 H72 L92 24 L72 40 H8 Z"
          fill="#f4f0ea"
          stroke="#8a7355"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="24" r="5" stroke="#9970FF" strokeWidth="1.5" fill="none" />
        <line x1="32" y1="20" x2="58" y2="20" stroke="#a8a29e" strokeWidth="1" />
        <line x1="32" y1="28" x2="48" y2="28" stroke="#a8a29e" strokeWidth="1" />
        <path d="M4 12 V36" stroke="#6b5c45" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <svg className="projects-artifact projects-artifact--ticket" viewBox="0 0 120 56" fill="none">
        <rect x="2" y="2" width="116" height="52" rx="3" fill="#faf7f2" stroke="#8a7355" strokeWidth="1.5" />
        <line x1="80" y1="2" x2="80" y2="54" stroke="#d6d3d1" strokeWidth="1" strokeDasharray="4 3" />
        <text x="12" y="22" fill="#52525b" fontSize="8" fontWeight="700" letterSpacing="0.12em">
          BOARDING PASS
        </text>
        <text x="12" y="38" fill="#9970FF" fontSize="14" fontWeight="700" fontFamily="Bebas Neue, sans-serif">
          SEA → NRT
        </text>
        <text x="88" y="32" fill="#71717a" fontSize="7" textAnchor="middle">
          GATE
        </text>
        <text x="88" y="42" fill="#111" fontSize="11" fontWeight="700" textAnchor="middle">
          B12
        </text>
      </svg>

      <svg className="projects-artifact projects-artifact--map" viewBox="0 0 100 100" fill="none">
        <path d="M8 8 H92 V92 H8 Z" fill="#e8dcc8" stroke="#8a7355" strokeWidth="1" />
        <path d="M20 30 Q40 20 55 35 T85 28" stroke="#9970FF" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M25 55 Q45 48 60 58 T88 52" stroke="#4ade80" strokeWidth="1" fill="none" opacity="0.45" />
        <circle cx="42" cy="42" r="4" fill="#c0392b" opacity="0.8" />
        <circle cx="68" cy="58" r="3" fill="#9970FF" opacity="0.7" />
        <path d="M72 72 L78 82 L68 80 Z" fill="#1e3a5f" opacity="0.6" />
      </svg>

      <svg className="projects-artifact projects-artifact--camera" viewBox="0 0 64 48" fill="none">
        <rect x="4" y="14" width="56" height="30" rx="4" fill="#1a1a1a" stroke="#8a7355" strokeWidth="1.5" />
        <circle cx="32" cy="29" r="10" stroke="#c4a574" strokeWidth="1.5" fill="#111" />
        <circle cx="32" cy="29" r="6" stroke="#52525b" strokeWidth="1" />
        <rect x="22" y="8" width="20" height="8" rx="2" fill="#2a2a2a" stroke="#8a7355" strokeWidth="1" />
        <circle cx="48" cy="20" r="2" fill="#9970FF" opacity="0.8" />
      </svg>

      <svg className="projects-artifact projects-artifact--glasses" viewBox="0 0 80 32" fill="none">
        <circle cx="22" cy="16" r="14" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <circle cx="58" cy="16" r="14" stroke="#1a1a1a" strokeWidth="2.5" fill="none" />
        <path d="M36 16 H44" stroke="#1a1a1a" strokeWidth="2.5" />
        <path d="M8 14 L14 16 L8 18" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        <path d="M72 14 L66 16 L72 18" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <svg className="projects-artifact projects-artifact--stamp" viewBox="0 0 56 56" fill="none">
        <rect x="4" y="4" width="48" height="48" rx="2" stroke="#c0392b" strokeWidth="2" fill="none" opacity="0.75" />
        <text x="28" y="24" textAnchor="middle" fill="#c0392b" fontSize="7" fontWeight="700" opacity="0.8">
          ARRIVED
        </text>
        <text x="28" y="36" textAnchor="middle" fill="#c0392b" fontSize="9" fontWeight="700" opacity="0.8">
          TOKYO
        </text>
      </svg>

      <span className="projects-artifact projects-artifact--hook projects-artifact--hook-a" />
      <span className="projects-artifact projects-artifact--hook projects-artifact--hook-b" />
      <span className="projects-artifact projects-artifact--hook projects-artifact--hook-c" />
      <span className="projects-artifact projects-artifact--hook projects-artifact--hook-d" />
      <span className="projects-artifact projects-artifact--string projects-artifact--string-a" />
      <span className="projects-artifact projects-artifact--string projects-artifact--string-b" />
    </div>
  )
}
