const LOGO_OUTLINE_FILTER_ID = 'case-study-logo-outline'

interface CaseStudyLogoProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function CaseStudyLogo({
  src,
  alt,
  width,
  height,
  className = '',
}: CaseStudyLogoProps) {
  return (
    <span className={`case-study-logo-wrap inline-flex max-w-full ${className}`}>
      <svg className="case-study-logo-defs" aria-hidden focusable="false">
        <defs>
          <filter
            id={LOGO_OUTLINE_FILTER_ID}
            colorInterpolationFilters="sRGB"
            x="-12%"
            y="-30%"
            width="124%"
            height="160%"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="1.35"
              result="strokeShape"
            />
            <feFlood floodColor="#ffffff" floodOpacity="1" result="strokeColor" />
            <feComposite in="strokeColor" in2="strokeShape" operator="in" result="stroke" />
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="0.65"
              result="innerStrokeShape"
            />
            <feFlood floodColor="#ffffff" floodOpacity="0.92" result="innerStrokeColor" />
            <feComposite
              in="innerStrokeColor"
              in2="innerStrokeShape"
              operator="in"
              result="innerStroke"
            />
            <feMerge>
              <feMergeNode in="stroke" />
              <feMergeNode in="innerStroke" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        srcSet={`${src} ${width}w`}
        sizes="(max-width: 640px) min(92vw, 420px), (max-width: 1024px) 55vw, 360px"
        className="case-study-logo-on-dark"
        decoding="sync"
        fetchPriority="high"
        draggable={false}
      />
    </span>
  )
}
