interface HtmlPrototypeEmbedProps {
  src: string
  title: string
  className?: string
}

export function HtmlPrototypeEmbed({
  src,
  title,
  className = '',
}: HtmlPrototypeEmbedProps) {
  return (
    <div
      className={`pointer-events-auto overflow-hidden bg-[#0d0d0d] ${className}`}
    >
      <iframe
        src={src}
        title={title}
        className="block h-[min(88vh,920px)] w-full min-h-[560px] border-0 md:min-h-[640px]"
        allow="fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
