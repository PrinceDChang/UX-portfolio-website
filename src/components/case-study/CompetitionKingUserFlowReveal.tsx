import { useState } from 'react'
import { CoplanUserFlowReveal } from './CoplanUserFlowReveal'
import { competitionKingUserFlows } from '../../data/competitionKingUserFlows'

interface CompetitionKingUserFlowRevealProps {
  className?: string
}

export function CompetitionKingUserFlowReveal({
  className = '',
}: CompetitionKingUserFlowRevealProps) {
  const [activeId, setActiveId] = useState(competitionKingUserFlows[0].id)
  const activeFlow =
    competitionKingUserFlows.find((flow) => flow.id === activeId) ??
    competitionKingUserFlows[0]

  return (
    <div className={`relative ${className}`}>
      <div
        className="mb-3 flex flex-wrap gap-1 rounded-xl bg-[#1a1a26]/95 p-1 ring-1 ring-white/[0.1] backdrop-blur-sm md:absolute md:left-6 md:top-6 md:z-20 md:mb-0"
        role="tablist"
        aria-label="User journey flows"
      >
        {competitionKingUserFlows.map((flow) => {
          const isActive = flow.id === activeId
          return (
            <button
              key={flow.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`competition-king-flow-${flow.id}`}
              onClick={() => setActiveId(flow.id)}
              className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-3 sm:text-[11px] ${
                isActive
                  ? 'bg-accent/20 text-ink ring-1 ring-accent/40'
                  : 'text-slate hover:bg-white/[0.06] hover:text-ink'
              }`}
            >
              {flow.shortLabel}
            </button>
          )
        })}
      </div>

      <div
        id={`competition-king-flow-${activeFlow.id}`}
        role="tabpanel"
        className="relative md:pt-0"
      >
        <CoplanUserFlowReveal
          key={activeFlow.id}
          data={activeFlow.data}
          viewW={activeFlow.viewW}
          viewH={activeFlow.viewH}
          ariaLabel={activeFlow.ariaLabel}
          className="mt-0"
        />
      </div>
    </div>
  )
}
