import { motion } from 'framer-motion'

export function Contact() {
  return (
    <section id="contact" className="section-ambient py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex rounded-full bg-accent/15 px-4 py-2 text-sm font-medium text-accent ring-1 ring-accent/25">
            Hi
          </div>
          <h2 className="section-title mb-5">Let&apos;s work together</h2>
          <p className="section-copy">
            Let&apos;s build something impactful together—whether it&apos;s your brand, your
            website, or your next big idea.
          </p>
          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate">Email</p>
            <a href="mailto:oey1118@uw.edu" className="text-lg font-medium text-ink hover:text-accent">
              oey1118@uw.edu
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[2rem] bg-surface p-8 ring-1 ring-accent/35"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Name
              <input
                type="text"
                placeholder="Your name"
                className="rounded-2xl border border-transparent bg-elevated px-4 py-3 text-sm text-ink outline-none ring-1 ring-accent/35 placeholder:text-slate/60 focus:ring-accent/55"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Email
              <input
                type="email"
                placeholder="you@email.com"
                className="rounded-2xl border border-transparent bg-elevated px-4 py-3 text-sm text-ink outline-none ring-1 ring-accent/35 placeholder:text-slate/60 focus:ring-accent/55"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Service Needed ?
              <select className="rounded-2xl border border-transparent bg-elevated px-4 py-3 text-sm text-ink outline-none ring-1 ring-accent/35 focus:ring-accent/55">
                <option>Select…</option>
                <option>Branding</option>
                <option>Web design</option>
                <option>UI / UX</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              What Can I Help You...
              <textarea
                rows={4}
                placeholder="Tell me about your project"
                className="rounded-2xl border border-transparent bg-elevated px-4 py-3 text-sm text-ink outline-none ring-1 ring-accent/35 placeholder:text-slate/60 focus:ring-accent/55"
              />
            </label>

            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 hover:shadow-glow"
            >
              Submit
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
