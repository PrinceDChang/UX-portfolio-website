export interface PrototypingFocusItem {
  label: string
  text: string
}

export interface PrototypingIntroContent {
  lead: string
  initialWork: string
  focusAreas: {
    label: string
    items: readonly PrototypingFocusItem[]
  }
  bullets: readonly string[]
}

const listClass =
  'list-disc space-y-3 pl-5 text-base leading-relaxed text-slate marker:text-white/80 md:text-lg md:leading-relaxed'
const nestedListClass =
  'mt-3 list-disc space-y-2.5 pl-5 marker:text-white/70 md:space-y-3'

interface PrototypingIntroProps {
  content: PrototypingIntroContent
  className?: string
}

export function PrototypingIntro({ content, className = '' }: PrototypingIntroProps) {
  return (
    <div className={className}>
      <p className="w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
        {content.lead}
      </p>

      <div className="prototyping-intro-panel relative mt-6 rounded-3xl bg-[#141418] px-7 py-8 ring-1 ring-white/[0.06] md:px-10 md:py-10">
        <span
          className="mb-5 block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(153,112,255,0.55)]"
          aria-hidden
        />

        <p className="text-base leading-relaxed text-slate md:text-lg md:leading-relaxed">
          <span className="font-semibold text-ink">Initial Work:</span> {content.initialWork}
        </p>

        <ul className={`mt-5 ${listClass}`}>
          <li>
            <span className="font-semibold text-ink">{content.focusAreas.label}</span>
            <ul className={nestedListClass}>
              {content.focusAreas.items.map((item) => (
                <li key={item.label}>
                  <span className="font-semibold text-ink">{item.label}</span>
                  {' – '}
                  {item.text}
                </li>
              ))}
            </ul>
          </li>
          {content.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
