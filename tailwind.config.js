/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Die substrate" base surfaces
        substrate: {
          950: '#0A0E13',
          900: '#0E141B',
          800: '#131A23',
          700: '#1A2330',
          600: '#232E3D',
        },
        trace: {
          DEFAULT: '#2B3646',
          bright: '#3E4E63',
        },
        // Copper trace accent (primary)
        copper: {
          400: '#E8A567',
          500: '#C6813F',
          600: '#A3672E',
        },
        // Signal / clock line accent (secondary)
        signal: {
          400: '#6EE7DD',
          500: '#3FBDB2',
          600: '#2C8D85',
        },
        // Status colors, matched to real timing-report semantics
        pass: '#5FB98A',
        warn: '#E0B84B',
        fail: '#E1636B',
        ink: {
          100: '#EAF0F6',
          300: '#B7C3D1',
          500: '#7E8FA1',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-fine': 'linear-gradient(to right, rgba(110,231,221,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,231,221,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-fine': '28px 28px',
      },
      boxShadow: {
        trace: '0 0 0 1px rgba(198,129,63,0.25), 0 8px 24px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'pulse-trace': {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        'pulse-trace': 'pulse-trace 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
