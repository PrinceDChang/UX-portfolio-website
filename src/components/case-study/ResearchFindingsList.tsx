export interface ResearchFinding {
  number: number
  quotes?: readonly string[]
  observation?: string
  stats?: readonly string[]
  findingTitle: string
  finding: string
  recommendation: string
}

export function ResearchFindingsList({
  findings,
  className = '',
}: {
  findings: readonly ResearchFinding[]
  className?: string
}) {
  return (
    <div className={`space-y-6 md:space-y-8 ${className}`.trim()}>
      {findings.map((item) => (
        <article
          key={item.number}
          className="rounded-3xl border border-white/[0.08] bg-elevated/60 px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10"
        >
          <p className="font-display text-3xl leading-none text-accent md:text-4xl">
            {String(item.number).padStart(2, '0')}.
          </p>

          {item.quotes && item.quotes.length > 0 && (
            <div className="mt-5 space-y-3">
              {item.quotes.map((quote) => (
                <p
                  key={quote}
                  className="border-l-2 border-accent/35 pl-4 font-display text-lg leading-relaxed text-ink md:text-xl"
                >
                  &ldquo;{quote}&rdquo;
                </p>
              ))}
            </div>
          )}

          {item.observation && (
            <p className="mt-5 text-base leading-relaxed text-slate md:text-[17px]">
              {item.observation}
            </p>
          )}

          {item.stats && item.stats.length > 0 && (
            <ul className="mt-5 space-y-2 text-base leading-relaxed text-slate md:text-[17px]">
              {item.stats.map((stat) => (
                <li key={stat} className="flex gap-3">
                  <span className="shrink-0" aria-hidden>
                    📊
                  </span>
                  <span>{stat}</span>
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-6 text-lg font-semibold text-ink md:text-xl">{item.findingTitle}</h3>
          <p className="mt-3 text-base leading-relaxed text-slate md:text-[17px]">
            {item.finding}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Recommendation
          </p>
          <p className="mt-2 text-base leading-relaxed text-slate md:text-[17px]">
            {item.recommendation}
          </p>
        </article>
      ))}
    </div>
  )
}
