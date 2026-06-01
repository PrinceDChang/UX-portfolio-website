import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AboutIntro } from '../components/about/AboutIntro'
import { AboutTriptych } from '../components/about/AboutTriptych'
import { CaseStudyShell } from '../components/case-study/CaseStudyShell'

export function AboutPage() {
  return (
    <CaseStudyShell>
      <article className="about-page mx-auto max-w-6xl px-6 pb-28 md:px-10 md:pb-36">
        <AboutIntro />
        <AboutTriptych />

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="about-page__footer mt-20 rounded-3xl border border-white/8 bg-elevated/50 px-8 py-10 md:px-12 md:py-12"
        >
          <p className="section-label mb-3">Let&apos;s connect</p>
          <h2 className="font-display text-3xl text-ink md:text-4xl">Want to collaborate?</h2>
          <p className="mt-4 max-w-lg text-slate">
            Whether it&apos;s a product challenge, a photo walk, or a conversation about design —
            I&apos;d love to hear from you.
          </p>
          <Link
            to="/#contact"
            className="mt-8 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent hover:shadow-glow"
          >
            Get in touch
          </Link>
        </motion.footer>
      </article>
    </CaseStudyShell>
  )
}
