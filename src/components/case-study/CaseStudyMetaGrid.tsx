interface CaseStudyMetaDetail {
  label: string
  value: string
}

interface CaseStudyMetaGridProps {
  details: readonly CaseStudyMetaDetail[]
  className?: string
}

export function CaseStudyMetaGrid({ details, className = '' }: CaseStudyMetaGridProps) {
  return (
    <dl className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`.trim()}>
      {details.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-elevated/80 px-5 py-4 ring-2 ring-accent/60 backdrop-blur-sm"
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">
            {item.label}
          </dt>
          <dd className="mt-1 whitespace-pre-line text-sm font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
