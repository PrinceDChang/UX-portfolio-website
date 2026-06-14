import { motion } from 'framer-motion'
import { testimonials } from '../data/content'

export function Testimonials() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="section-title mb-5">What My Clients Say</h2>
          <p className="section-copy">
            Here&apos;s what my clients have shared about their experiences working with me. Their
            trust and satisfaction motivate me to continue delivering designs that make an impact.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[1.75rem] bg-elevated p-8 shadow-card ring-1 ring-accent/35 transition hover:ring-accent/55"
            >
              <p className="text-base leading-relaxed text-slate">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-white/8 pt-5">
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-accent/80">{item.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
