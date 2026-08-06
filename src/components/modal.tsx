'use client'

import { useEffect, type ReactNode } from 'react'
import { cn } from '../cn'

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children: ReactNode
  className?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-lg font-semibold text-fg">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
