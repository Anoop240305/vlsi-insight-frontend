/** @type {import('tailwindcss').Config} */
// Every colour comes from a CSS variable (src/styles/tokens.css), so one class
// like `bg-card` works in both light and dark mode. `/<alpha-value>` keeps
// opacity modifiers such as `bg-accent/10` working.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        card: v('card'),
        sidebar: v('rail'),
        line: v('line'),
        track: v('track'),
        ink: v('ink'),
        muted: v('muted'),
        accent: v('accent'),
        'accent-ink': v('accent-ink'),
        pass: v('pass'),
        warn: v('warn'),
        fail: v('fail'),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}