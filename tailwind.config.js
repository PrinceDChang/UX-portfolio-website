/** @type {import('tailwindcss').Config} */

/** Purple scale used for legacy sky/cyan/indigo/teal outline utilities */
const purpleOutlineScale = {
  100: '#ebe4ff',
  200: '#d4c4ff',
  300: '#c4b5fd',
  400: '#b894ff',
  500: '#9970ff',
  600: '#7c52e8',
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        ink: 'var(--color-ink)',
        slate: 'var(--color-slate)',
        mist: 'var(--color-mist)',
        accent: 'var(--color-accent)',
        ocean: 'var(--color-accent)',
        sky: {
          DEFAULT: 'var(--color-sky)',
          ...purpleOutlineScale,
        },
        cyan: purpleOutlineScale,
        indigo: purpleOutlineScale,
        teal: purpleOutlineScale,
        glass: 'var(--color-glass)',
        'theme-border': 'var(--color-border)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        condensed: ['"Bebas Neue"', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(0, 0, 0, 0.45)',
        card: '0 8px 32px rgba(153, 112, 255, 0.18)',
        glow: '0 0 48px rgba(153, 112, 255, 0.22)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
