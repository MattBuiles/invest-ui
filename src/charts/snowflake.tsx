'use client'

import { useCanvas } from './use-canvas'

export interface SnowflakeAxis {
  label: string
  value: number // 0..1
}

// Radar de 5+ ejes (estilo Simply Wall St): Value/Future/Past/Health/Dividends.
export function Snowflake({ axes, size = 160 }: { axes: SnowflakeAxis[]; size?: number }) {
  const ref = useCanvas((ctx, w, h, cssVar) => {
    const cx = w / 2
    const cy = h / 2
    const R = Math.min(w, h) / 2 - 18
    const n = axes.length
    const accent = cssVar('--iv-accent')
    const pt = (i: number, f: number): [number, number] => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
      return [cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f]
    }
    ctx.strokeStyle = cssVar('--iv-grid')
    ctx.lineWidth = 1
    for (let g = 1; g <= 3; g++) {
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const [x, y] = pt(i, g / 3)
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
    }
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const [x, y] = pt(i, Math.max(0, Math.min(1, axes[i].value)))
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = cssVar('--iv-accent-soft')
    ctx.fill()
    ctx.strokeStyle = accent
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = cssVar('--iv-muted')
    ctx.font = '10px ui-sans-serif, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < n; i++) {
      const [x, y] = pt(i, 1.18)
      ctx.fillText(axes[i].label, x, y)
    }
  }, size)

  return <canvas ref={ref} style={{ width: '100%', maxWidth: size, height: size, margin: '0 auto' }} />
}
