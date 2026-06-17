import { motion } from 'framer-motion'
import { testimonials } from '../data/content'

const testimonialsInView = {
  once: true,
  margin: '-22% 0px -22% 0px',
} as const

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Testimonials() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={testimonialsInView}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="section-title mb-5">What My Clients Say</h2>
          <p className="section-copy">
            Here&apos;s what my clients have shared about their experiences working with me. Their
            trust and satisfaction motivate me to continue delivering designs that make an impact.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={testimonialsInView}
          variants={gridVariants}
        >
          {testimonials.map((item) => (
            <motion.blockquote
              key={item.name}
              variants={cardVariants}
              className="rounded-[1.75rem] bg-elevated p-8 shadow-card ring-2 ring-accent"
            >
              <p className="text-base leading-relaxed text-slate">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-theme-border pt-5">
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-accent/80">{item.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
