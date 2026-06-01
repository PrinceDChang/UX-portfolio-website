interface SplitHeroPillar {
  title: string
  icon?: string
  body: string
}

interface SplitHeroCardsProps {
  label: string
  headline: string
  body: string
  pillars?: readonly SplitHeroPillar[]
  className?: string
}

const cardClass =
  'rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10'

export function SplitHeroCards({
  label,
  headline,
  body,
  pillars = [],
  className = '',
}: SplitHeroCardsProps) {
  return (
    <div className={`grid gap-4 md:gap-5 ${className}`}>
      <article className={cardClass}>
        <p className="section-label mb-5">{label}</p>
        <h3 className="font-display text-2xl uppercase leading-[1.1] tracking-wide text-ink md:text-[2rem] lg:text-4xl">
          {headline}
        </h3>
        <div className="mt-6 w-full space-y-4 text-slate">
          {body.split('\n\n').map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-base leading-relaxed md:text-[17px] md:leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {pillars.length > 0 && (
      <div
        className={`grid gap-4 md:gap-5 ${
          pillars.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
        }`}
      >
        {pillars.map((pillar) => (
          <article key={pillar.title} className={cardClass}>
            <h4 className="font-display text-xl uppercase leading-tight tracking-wide text-ink md:text-2xl">
              {pillar.title}
              {pillar.icon && (
                <span className="ml-2 inline-block normal-case" aria-hidden>
                  {pillar.icon}
                </span>
              )}
            </h4>
            <p className="mt-5 text-base leading-relaxed text-slate md:text-[17px] md:leading-relaxed">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
      )}
    </div>
  )
}
