interface VideoPrototypeCardProps {
  youtubeId?: string
  embedSrc?: string
  title: string
  footerLabel?: string
  className?: string
}

export function VideoPrototypeCard({
  youtubeId,
  embedSrc,
  title,
  footerLabel,
  className = '',
}: VideoPrototypeCardProps) {
  const resolvedSrc =
    embedSrc ??
    (youtubeId
      ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
      : undefined)

  if (!resolvedSrc) return null

  return (
    <article
      className={`overflow-hidden rounded-3xl bg-[#141418] ring-1 ring-white/[0.08] ${className}`}
    >
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={resolvedSrc}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {footerLabel && (
        <p className="border-t border-white/[0.06] px-5 py-4 text-sm text-slate md:px-8">
          {footerLabel}
        </p>
      )}
    </article>
  )
}
