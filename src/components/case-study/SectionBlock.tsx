import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
}

export function SectionBlock({
  id,
  label,
  title,
  titleClassName,
  children,
  className = '',
}: {
  id?: string
  label?: string
  title?: string
  titleClassName?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.section
      {...fadeUp}
      id={id}
      className={`mx-auto max-w-6xl px-6 ${id ? 'scroll-mt-28 md:scroll-mt-32' : ''} ${className}`}
    >
      {label && <p className="section-label mb-4">{label}</p>}
      {title && (
        <h2
          className={
            titleClassName ??
            'mb-6 font-display text-3xl leading-tight text-ink md:text-4xl'
          }
        >
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  )
}
