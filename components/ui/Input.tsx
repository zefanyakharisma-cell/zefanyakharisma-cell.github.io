import { cn } from '@/lib/utils'
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = inputId ? `${inputId}-error` : undefined
    const hintId = inputId ? `${inputId}-hint` : undefined
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-cm-subtle uppercase tracking-widest mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            'w-full bg-cm-elevated border border-cm-border rounded-lg px-3.5 py-2.5 text-sm text-cm-text placeholder:text-cm-muted',
            'focus:outline-none focus:ring-1 focus:ring-cm-accent focus:border-cm-accent',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'transition-colors duration-150',
            error && 'border-red-500/50 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
        {hint && !error && <p id={hintId} className="mt-1.5 text-xs text-cm-subtle">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = inputId ? `${inputId}-error` : undefined
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-cm-subtle uppercase tracking-widest mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full bg-cm-elevated border border-cm-border rounded-lg px-3.5 py-2.5 text-sm text-cm-text placeholder:text-cm-muted resize-none',
            'focus:outline-none focus:ring-1 focus:ring-cm-accent focus:border-cm-accent',
            'disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150',
            error && 'border-red-500/50 focus:ring-red-500',
            className
          )}
          rows={4}
          {...props}
        />
        {error && <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const errorId = inputId ? `${inputId}-error` : undefined
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-cm-subtle uppercase tracking-widest mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full bg-cm-elevated border border-cm-border rounded-lg px-3.5 py-2.5 text-sm text-cm-text',
            'focus:outline-none focus:ring-1 focus:ring-cm-accent focus:border-cm-accent',
            'disabled:opacity-40 cursor-pointer transition-colors duration-150',
            error && 'border-red-500/50',
            className
          )}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-cm-surface">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
