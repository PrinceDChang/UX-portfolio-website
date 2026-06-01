import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DottedGlobe } from './globe/DottedGlobe'

export function FeaturedProjects() {
  return (
    <section id="projects" className="section-ambient py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="section-title mb-5">Featured Projects</h2>
          <p className="section-copy">
            These selected projects reflect my passion for blending strategy with creativity —
            solving real problems through thoughtful design and impactful storytelling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <DottedGlobe />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/projects"
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent hover:shadow-glow"
          >
            Browse All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
