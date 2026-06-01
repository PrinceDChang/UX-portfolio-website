export interface CaseStudyConclusionContent {
  lead: string
  insights: readonly string[]
  nextSteps: {
    label: string
    items: readonly string[]
  }
}

const bulletListClass =
  'space-y-4 text-base leading-relaxed text-slate md:text-lg md:leading-relaxed'

interface CaseStudyConclusionProps {
  content: CaseStudyConclusionContent
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className={bulletListClass}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyConclusion({ content }: CaseStudyConclusionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <p className="w-full max-w-none text-base leading-relaxed text-slate md:text-lg">
        {content.lead}
      </p>

      <BulletList items={content.insights} />

      <div>
        <p className="text-base font-semibold text-ink md:text-lg">{content.nextSteps.label}</p>
        <div className="mt-4">
          <BulletList items={content.nextSteps.items} />
        </div>
      </div>
    </div>
  )
}
