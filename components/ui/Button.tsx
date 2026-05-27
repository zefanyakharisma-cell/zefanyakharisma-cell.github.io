import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-cm-black disabled:opacity-40 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-cm-accent hover:bg-cm-accent/90 text-white focus:ring-cm-accent',
      secondary: 'bg-cm-elevated hover:bg-cm-border border border-cm-border text-cm-text focus:ring-cm-muted',
      ghost: 'hover:bg-cm-elevated text-cm-subtle hover:text-cm-text focus:ring-cm-muted',
      danger: 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 focus:ring-red-500',
      gold: 'bg-cm-gold/10 hover:bg-cm-gold/20 border border-cm-gold/20 text-cm-gold focus:ring-cm-gold',
    }

    const sizes = {
      sm: 'text-xs px-3 py-1.5 h-7',
      md: 'text-sm px-4 py-2 h-9',
      lg: 'text-sm px-5 py-2.5 h-10',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export { Button }
