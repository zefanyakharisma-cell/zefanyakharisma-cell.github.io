import type { Config } from 'tailwindcss'

// Colours, radii and shadows from the PCU Design System (app/styles/pcu.css).
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#19304b',
        smoke: '#f1f1f1',
        cerise: '#ec008c',
        amber: '#ffbc00',
        teal: '#45b8bc',
        blue: '#3880d0',
        emerald: '#135d50',
        line: '#e2e5e9',
        ink: { DEFAULT: '#000000', secondary: '#46505c', muted: '#5f6b78' },
        accent: { strong: '#2a64a8', pending: '#b34700' },
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        panel: '12px',
        lg: '16px',
        pill: '9999px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
    },
  },
  plugins: [],
}

export default config
