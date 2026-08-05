import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { cn } from '../cn'

const control =
  'w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: ReactNode
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-fg">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </label>
  )
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, className)} {...props} />
}
