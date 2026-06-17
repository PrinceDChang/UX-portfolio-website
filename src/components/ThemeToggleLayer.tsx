import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

export function ThemeToggleLayer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="theme-toggle-layer pointer-events-none fixed right-4 top-5 z-[101] md:right-6 md:top-6"
    >
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </motion.div>
  )
}
