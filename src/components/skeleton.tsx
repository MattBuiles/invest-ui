import { cn } from '../cn'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-surface-2 motion-reduce:animate-none',
        className
      )}
    />
  )
}
