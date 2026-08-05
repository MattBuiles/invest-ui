import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface p-5 shadow-[var(--iv-shadow)]',
        className
      )}
      {...props}
    />
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
      {children}
    </h2>
  )
}
