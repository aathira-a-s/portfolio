/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Outfit', 'system-ui', 'sans-serif'],
        mono:  ['Fira Code', 'monospace'],
      },
      colors: {
        // Core palette — light luxury
        ivory:    '#f8f6f2',
        cream:    '#f2ede6',
        parchment:'#e8e0d4',
        sand:     '#d4c8b8',
        mink:     '#9c8c7c',
        charcoal: '#2c2c2c',
        carbon:   '#1a1a1a',
        gold: {
          50:  '#fdf9ef',
          100: '#faf0d0',
          200: '#f3db9a',
          300: '#e9c05e',
          400: '#dfa832',
          500: '#c9890f',
          600: '#a8690a',
          700: '#85500c',
          800: '#6d4012',
          900: '#5c3613',
        },
        warm: {
          50:  '#faf8f5',
          100: '#f5f0e8',
          200: '#ede4d4',
          300: '#dfd2bc',
          400: '#ccba9f',
          500: '#b8a284',
          600: '#9e8768',
          700: '#826d52',
          800: '#6b5844',
          900: '#59493a',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9890f 0%, #dfa832 50%, #c9890f 100%)',
        'hero-overlay':  'linear-gradient(to right, rgba(26,26,26,0.65) 0%, rgba(26,26,26,0.2) 60%, transparent 100%)',
        'card-hover':    'linear-gradient(180deg, transparent 60%, rgba(26,26,26,0.6) 100%)',
      },
      boxShadow: {
        'luxury': '0 2px 20px rgba(44,44,44,0.08)',
        'luxury-lg': '0 8px 40px rgba(44,44,44,0.12)',
        'gold': '0 0 24px rgba(201,137,15,0.25)',
      },
      animation: {
        'shimmer': 'shimmer 1.8s linear infinite',
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
      keyframes: {
        shimmer:  { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
        fadeUp:   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      letterSpacing: {
        'widest2': '0.2em',
        'widest3': '0.3em',
      },
    },
  },
  plugins: [],
}
