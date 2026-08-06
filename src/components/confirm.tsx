'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Modal } from './modal'
import { Button } from './button'

export type ConfirmOptions = {
  title?: ReactNode
  message?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}

type ConfirmFn = (opts?: ConfirmOptions) => Promise<boolean>

const ConfirmContext = createContext<ConfirmFn | null>(null)

/** Async replacement for window.confirm(). Requires <ConfirmProvider>. */
export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within <ConfirmProvider>')
  return ctx
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null)
  const resolver = useRef<((v: boolean) => void) | null>(null)

  const confirm = useCallback<ConfirmFn>((o) => {
    setOpts(o ?? {})
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve
    })
  }, [])

  const close = useCallback((result: boolean) => {
    resolver.current?.(result)
    resolver.current = null
    setOpts(null)
  }, [])

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Modal
        open={opts !== null}
        onClose={() => close(false)}
        title={opts?.title ?? 'Confirmar'}
      >
        {opts?.message && (
          <p className="mt-2 text-sm text-muted">{opts.message}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={() => close(false)}>
            {opts?.cancelLabel ?? 'Cancelar'}
          </Button>
          <Button
            size="sm"
            onClick={() => close(true)}
            className={
              opts?.danger
                ? 'bg-[var(--iv-down)] text-white hover:opacity-90'
                : undefined
            }
          >
            {opts?.confirmLabel ?? 'Confirmar'}
          </Button>
        </div>
      </Modal>
    </ConfirmContext.Provider>
  )
}
