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
          black:       '#030712',
          surface:     '#0B1E3A',
          elevated:    '#122742',
          border:      '#1b3057',
          muted:       '#4a5a72',
          subtle:      '#7d8fb0',
          text:        '#c5d3ec',
          bright:      '#dde7fb',
          white:       '#eef3ff',
          gold:        '#D4B15A',
          'gold-dim':  '#8a6d2e',
          accent:      '#6FA8FF',
          'accent-dim':'#3a6bb0',
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
