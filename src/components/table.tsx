import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../cn'

// Tabla con scroll horizontal contenido (el body de la página nunca hace scroll lateral).
export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>
}

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return <table className={cn('w-full text-sm', className)} {...props} />
}

export function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn('pb-2 pr-4 text-left text-xs font-medium text-muted', className)}
      {...props}
    />
  )
}

export function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('border-t border-border py-2 pr-4 align-top', className)} {...props} />
}
