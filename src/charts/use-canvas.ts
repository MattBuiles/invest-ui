'use client'

import { useEffect, useRef } from 'react'

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, cssVar: (n: string) => string) => void

// Canvas theme-aware: redibuja en mount, resize, cambio de data-theme y de
// prefers-color-scheme. Lee los tokens vía getComputedStyle en cada draw.
export function useCanvas(draw: DrawFn, height: number) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const drawRef = useRef(draw)
  drawRef.current = draw

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const cssVar = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim()

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = cv.clientWidth || cv.parentElement?.clientWidth || 300
      cv.width = w * dpr
      cv.height = height * dpr
      cv.style.height = height + 'px'
      const ctx = cv.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, height)
      drawRef.current(ctx, w, height, cssVar)
    }

    render()
    const ro = new ResizeObserver(render)
    ro.observe(cv)
    const mo = new MutationObserver(render)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', render)

    return () => {
      ro.disconnect()
      mo.disconnect()
      mq.removeEventListener('change', render)
    }
  }, [height])

  return ref
}
