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
      },
      animation: {
        springIn: 'springIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        fadeUp: 'fadeUp 0.5s ease both',
        cmMarquee: 'cmMarquee 30s linear infinite',
        cmScrollBounce: 'cmScrollBounce 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
