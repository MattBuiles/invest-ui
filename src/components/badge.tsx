import type { ReactNode } from 'react'
import { cn } from '../cn'

export type Tone = 'accent' | 'up' | 'down' | 'warn' | 'flat'

const TONES: Record<Tone, string> = {
  accent: 'bg-[var(--iv-accent-soft)] text-accent',
  up: 'bg-[color-mix(in_oklab,var(--iv-up)_15%,transparent)] text-up',
  down: 'bg-[color-mix(in_oklab,var(--iv-down)_15%,transparent)] text-down',
  warn: 'bg-[color-mix(in_oklab,var(--iv-warn)_16%,transparent)] text-warn',
  flat: 'bg-surface-2 text-muted',
}

export function Badge({
  children,
  tone = 'flat',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
