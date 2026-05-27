'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Modal({ open, onClose, title, description, children, size = 'md', className }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className={cn(
        'relative w-full bg-cm-surface border border-cm-border rounded-2xl shadow-elevated animate-slide-up',
        sizes[size],
        className
      )}>
        {(title || description) && (
          <div className="flex items-start justify-between px-6 py-5 border-b border-cm-border">
            <div>
              {title && <h2 className="text-base font-semibold text-cm-white">{title}</h2>}
              {description && <p className="text-sm text-cm-subtle mt-0.5">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-cm-subtle hover:text-cm-text transition-colors p-1 rounded-lg hover:bg-cm-elevated ml-4 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className={cn(!title && !description && 'pt-6')}>
          {children}
        </div>
      </div>
    </div>
  )
}
