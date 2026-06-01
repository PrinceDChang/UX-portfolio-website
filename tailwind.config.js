/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#09090f',
        surface: '#111118',
        elevated: '#1a1a26',
        ink: '#f4f4f5',
        slate: '#9494a8',
        mist: '#13131b',
        accent: '#9970FF',
        ocean: '#9970FF',
        sky: '#b894ff',
        glass: 'rgba(26, 26, 36, 0.78)',
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
