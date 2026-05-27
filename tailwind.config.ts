import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#0A84FF',
        'accent-soft': 'rgba(10,132,255,0.15)',
        'accent-warm': '#FF6B47',
        bg: '#F2F2F7',
        surface: 'rgba(255,255,255,0.72)',
        'text-primary': '#1C1C1E',
        'text-secondary': '#8E8E93',
        'text-tertiary': '#C7C7CC',
        warm: '#8B7355',
        navy: '#1E3A5F',
        steel: '#4A6B8A',
        cm: {
          black:       '#060608',
          surface:     '#0d0d10',
          elevated:    '#141418',
          border:      '#1e1e24',
          muted:       '#3a3a44',
          subtle:      '#6b6b7a',
          text:        '#c8c8d4',
          bright:      '#e8e8f0',
          white:       '#f5f5fa',
          gold:        '#c9a84c',
          'gold-dim':  '#8a6d2e',
          accent:      '#7c6ef7',
          'accent-dim':'#4a4399',
        },
      },
      borderRadius: {
        card: '22px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
        elevated: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
      },
      keyframes: {
        springIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        cmMarquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        cmScrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
      },
      animation: {
        springIn: 'springIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        fadeUp: 'fadeUp 0.5s ease both',
        cmMarquee: 'cmMarquee 30s linear infinite',
        cmScrollBounce: 'cmScrollBounce 2.2s ease-in-out infinite',
        'cm-fade-in': 'fadeIn 0.3s ease-out',
        'cm-slide-up': 'slideUp 0.4s ease-out',
        'cm-slide-in-right': 'slideInRight 0.3s ease-out',
        'cm-pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
