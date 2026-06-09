export type ProjectsViewMode = 'wall' | 'tickets'

interface ProjectsViewToggleProps {
  view: ProjectsViewMode
  onChange: (view: ProjectsViewMode) => void
}

function PinboardIcon() {
  return (
    <svg
      className="projects-view-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="6.75" cy="6.75" r="1" fill="currentColor" />
      <circle cx="17.25" cy="17.25" r="1" fill="currentColor" />
    </svg>
  )
}

function TicketStackIcon() {
  return (
    <svg
      className="projects-view-toggle__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 7.5h16a1 1 0 0 1 1 1v3.5H3V8.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M3 12h18v3.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V12Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M5 16.5h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8 9.5v0M11 9.5h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 14v0M11 14h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function ProjectsViewToggle({ view, onChange }: ProjectsViewToggleProps) {
  return (
    <div
      className="projects-view-toggle"
      role="group"
      aria-label="Project display layout"
    >
      <button
        type="button"
        aria-pressed={view === 'wall'}
        aria-label="Pinboard view"
        title="Pinboard view"
        className={`projects-view-toggle__btn ${view === 'wall' ? 'projects-view-toggle__btn--active' : ''}`}
        onClick={() => onChange('wall')}
      >
        <PinboardIcon />
      </button>
      <button
        type="button"
        aria-pressed={view === 'tickets'}
        aria-label="Ticket stack view"
        title="Ticket stack view"
        className={`projects-view-toggle__btn ${view === 'tickets' ? 'projects-view-toggle__btn--active' : ''}`}
        onClick={() => onChange('tickets')}
      >
        <TicketStackIcon />
      </button>
    </div>
  )
}
