import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={toggleTheme}
      className="theme-toggle shrink-0"
    >
      <motion.span
        className="theme-toggle__track"
        animate={{
          backgroundColor: isLight ? '#9970ff' : '#1e2433',
        }}
        transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="theme-toggle__scene" aria-hidden>
          {isLight ? (
            <>
              <span className="theme-toggle__sun" />
              <span className="theme-toggle__cloud theme-toggle__cloud--a" />
              <span className="theme-toggle__cloud theme-toggle__cloud--b" />
              <span className="theme-toggle__cloud theme-toggle__cloud--c" />
            </>
          ) : (
            <>
              <span className="theme-toggle__star theme-toggle__star--a" />
              <span className="theme-toggle__star theme-toggle__star--b" />
              <span className="theme-toggle__star theme-toggle__star--c" />
              <span className="theme-toggle__moon" />
            </>
          )}
        </span>
      </motion.span>
    </button>
  )
}
