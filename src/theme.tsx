'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
interface ThemeCtx {
  theme: Theme | null // null = seguir el SO
  resolved: Theme
  toggle: () => void
  set: (t: Theme | null) => void
}

const Ctx = createContext<ThemeCtx | null>(null)
const KEY = 'iv-theme'

function systemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(null)

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as Theme | null) ?? null
    setThemeState(saved)
    apply(saved)
  }, [])

  const apply = (t: Theme | null) => {
    const el = document.documentElement
    if (t) el.setAttribute('data-theme', t)
    else el.removeAttribute('data-theme')
  }

  const set = useCallback((t: Theme | null) => {
    setThemeState(t)
    if (t) localStorage.setItem(KEY, t)
    else localStorage.removeItem(KEY)
    apply(t)
  }, [])

  const resolved: Theme = theme ?? (systemDark() ? 'dark' : 'light')
  const toggle = useCallback(() => set(resolved === 'dark' ? 'light' : 'dark'), [resolved, set])

  return <Ctx.Provider value={{ theme, resolved, toggle, set }}>{children}</Ctx.Provider>
}

export function useTheme(): ThemeCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  return c
}
