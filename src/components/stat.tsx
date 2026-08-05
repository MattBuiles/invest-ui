import type { ReactNode } from 'react'
import { cn } from '../cn'

export function Stat({
  label,
  value,
  className,
}: {
  label: string
  value: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-xl border border-border bg-surface-2 px-4 py-3', className)}>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="iv-tabular mt-1 text-lg font-semibold">{value}</div>
    </div>
  )
}
