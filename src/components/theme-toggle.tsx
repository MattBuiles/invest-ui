'use client'

import { useTheme } from '../theme'
import { cn } from '../cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={resolved === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro'}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:text-fg',
        className
      )}
    >
      <span aria-hidden>{resolved === 'dark' ? '☾' : '☀'}</span>
      <span className="hidden sm:inline">{resolved === 'dark' ? 'Oscuro' : 'Claro'}</span>
    </button>
  )
}
