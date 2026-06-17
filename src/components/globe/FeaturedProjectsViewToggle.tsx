export type FeaturedProjectsViewMode = 'globe' | 'list'

interface FeaturedProjectsViewToggleProps {
  view: FeaturedProjectsViewMode
  onChange: (view: FeaturedProjectsViewMode) => void
}

function GlobeIcon() {
  return (
    <svg
      className="projects-view-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75" />
      <ellipse cx="12" cy="12" rx="3.5" ry="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 9.5h17M3.5 14.5h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg
      className="projects-view-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export function FeaturedProjectsViewToggle({ view, onChange }: FeaturedProjectsViewToggleProps) {
  return (
    <div className="projects-view-toggle" role="group" aria-label="Featured projects display">
      <button
        type="button"
        aria-pressed={view === 'list'}
        aria-label="Grid view"
        title="Grid view"
        className={`projects-view-toggle__btn ${view === 'list' ? 'projects-view-toggle__btn--active' : ''}`}
        onClick={() => onChange('list')}
      >
        <GridIcon />
      </button>
      <button
        type="button"
        aria-pressed={view === 'globe'}
        aria-label="Globe view"
        title="Globe view"
        className={`projects-view-toggle__btn ${view === 'globe' ? 'projects-view-toggle__btn--active' : ''}`}
        onClick={() => onChange('globe')}
      >
        <GlobeIcon />
      </button>
    </div>
  )
}
