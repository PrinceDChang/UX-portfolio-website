interface CaseStudyPrototypeCaptionProps {
  title: string
  caption: string
  openUrl: string
  ctaLabel?: string
}

const prototypeCtaClassName =
  'group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow ring-2 ring-accent/80 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(153,112,255,0.45)] hover:ring-white/25 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function CaseStudyPrototypeCaption({
  title,
  caption,
  openUrl,
  ctaLabel = 'Open prototype in new tab',
}: CaseStudyPrototypeCaptionProps) {
  return (
    <figcaption className="flex items-center justify-between gap-4 border-t border-white/8 px-6 py-5">
      <div className="min-w-0">
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-slate">{caption}</p>
      </div>
      <a
        href={openUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={prototypeCtaClassName}
      >
        {ctaLabel}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </a>
    </figcaption>
  )
}

interface PrototypeLink {
  label: string
  openUrl: string
}

interface CaseStudyPrototypeCaptionGroupProps {
  title: string
  caption: string
  links: readonly PrototypeLink[]
}

export function CaseStudyPrototypeCaptionGroup({
  title,
  caption,
  links,
}: CaseStudyPrototypeCaptionGroupProps) {
  return (
    <figcaption className="flex flex-col gap-4 border-t border-white/8 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="min-w-0">
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-slate">{caption}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        {links.map((link) => (
          <a
            key={link.openUrl}
            href={link.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={prototypeCtaClassName}
          >
            {link.label}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        ))}
      </div>
    </figcaption>
  )
}
