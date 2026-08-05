'use client'

import { useCanvas } from './use-canvas'

function scoreColor(total: number, cssVar: (n: string) => string): string {
  if (total >= 75) return cssVar('--iv-up')
  if (total >= 60) return cssVar('--iv-accent')
  if (total >= 45) return cssVar('--iv-warn')
  return cssVar('--iv-down')
}

export function ScoreGauge({ total, size = 104 }: { total: number; size?: number }) {
  const ref = useCanvas((ctx, w, h, cssVar) => {
    const cx = w / 2
    const cy = h / 2
    const r = size / 2 - 10
    const pct = Math.max(0, Math.min(100, total)) / 100
    ctx.lineWidth = 9
    ctx.lineCap = 'round'
    ctx.strokeStyle = cssVar('--iv-surface-2')
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = scoreColor(total, cssVar)
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct)
    ctx.stroke()
    ctx.fillStyle = cssVar('--iv-fg')
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `700 ${size * 0.28}px ui-monospace, monospace`
    ctx.fillText(String(total), cx, cy - 2)
    ctx.fillStyle = cssVar('--iv-muted')
    ctx.font = `${size * 0.11}px ui-sans-serif, system-ui, sans-serif`
    ctx.fillText('/ 100', cx, cy + size * 0.18)
  }, size)

  return <canvas ref={ref} style={{ width: size, height: size, flex: 'none' }} />
}
