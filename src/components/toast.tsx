'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '../cn'

export type ToastTone = 'success' | 'error' | 'info'

export type ToastInput = {
  title?: ReactNode
  message: ReactNode
  tone?: ToastTone
  duration?: number
}

type ToastItem = ToastInput & { id: number; tone: ToastTone }
type ToastFn = (t: ToastInput) => void

const ToastContext = createContext<ToastFn | null>(null)

/** Fire a transient toast. Requires <ToastProvider>. */
export function useToast(): ToastFn {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const TONE_BAR: Record<ToastTone, string> = {
  success: 'bg-[var(--iv-up)]',
  error: 'bg-[var(--iv-down)]',
  info: 'bg-accent',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const remove = useCallback(
    (id: number) => setItems((x) => x.filter((t) => t.id !== id)),
    []
  )

  const toast = useCallback<ToastFn>(
    (t) => {
      const id = ++idRef.current
      setItems((x) => [...x, { ...t, id, tone: t.tone ?? 'info' }])
      setTimeout(() => remove(id), t.duration ?? 3500)
    },
    [remove]
  )

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
          >
            <span className={cn('w-1 shrink-0', TONE_BAR[t.tone])} />
            <div className="flex-1 p-3">
              {t.title && (
                <p className="text-sm font-semibold text-fg">{t.title}</p>
              )}
              <p className="text-sm text-muted">{t.message}</p>
            </div>
            <button
              type="button"
              onClick={() => remove(t.id)}
              aria-label="Cerrar"
              className="px-3 text-muted transition-colors hover:text-fg"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
