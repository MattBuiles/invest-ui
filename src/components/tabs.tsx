'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '../cn'

export interface TabDef {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ tabs }: { tabs: TabDef[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors',
              active === t.id
                ? 'border-b-2 border-accent text-fg'
                : 'text-muted hover:text-fg'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} hidden={t.id !== active} className="mt-4 space-y-6">
          {t.content}
        </div>
      ))}
    </div>
  )
}
