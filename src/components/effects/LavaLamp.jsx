import { useEffect, useRef } from 'react'

/**
 * Fundo "lava lamp": metaballs orgânicas na paleta da marca que sobem,
 * descem e se fundem suavemente em canvas de baixa resolução (leve na CPU).
 *
 * - Anima continuamente enquanto a hero está visível e a aba ativa.
 * - No desktop responde ao movimento do cursor com uma gota quente suave.
 * - Pausa automaticamente fora da tela, em abas ocultas ou sob
 *   `prefers-reduced-motion: reduce`.
 */

const CELL_DESKTOP = 6
const CELL_MOBILE = 8

const PALETTE = [
  [216, 138, 154], // rose-gold
  [237, 181, 192], // rose-gold-light
  [226, 196, 170], // champagne quente
  [200, 120, 140], // rose profundo
]

// x: posição horizontal base (0–1) · r: raio relativo · period: segundos por ciclo
const BLOBS = [
  { x: 0.78, r: 0.165, period: 16, phase: 0.0, color: 0 },
  { x: 0.62, r: 0.125, period: 19, phase: 2.1, color: 1 },
  { x: 0.9, r: 0.115, period: 14, phase: 4.0, color: 3 },
  { x: 0.48, r: 0.105, period: 22, phase: 1.2, color: 2 },
  { x: 0.7, r: 0.095, period: 13, phase: 5.1, color: 1 },
  { x: 0.18, r: 0.115, period: 24, phase: 3.3, color: 2 },
  { x: 0.3, r: 0.085, period: 17, phase: 0.7, color: 0 },
]

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export default function LavaLamp({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reducedMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const saveData = Boolean(navigator.connection?.saveData)

    const canAnimate = () => !reducedMql.matches && !saveData
    const frameInterval = finePointer ? 1000 / 45 : 1000 / 28
    const cell = finePointer ? CELL_DESKTOP : CELL_MOBILE

    let w = 0
    let h = 0
    let image = null
    let wide = true

    const heat = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, r: 0, tr: 0 }
    let idleTimer
    const onPointerMove = (e) => {
      if (!canAnimate()) return
      const rect = canvas.getBoundingClientRect()
      if (e.clientY > rect.bottom) return
      heat.tx = (e.clientX - rect.left) / rect.width
      heat.ty = (e.clientY - rect.top) / rect.height
      heat.tr = 0.085
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        heat.tr = 0.04
      }, 1200)
    }

    let time = 8
    const state = BLOBS.map(() => ({ x: 0, y: 0, r: 0, sy: 1, c: null }))

    const step = (dt) => {
      time += dt
      const scale = (w + h) / 2
      BLOBS.forEach((b, i) => {
        const s = state[i]
        const a = (time / b.period) * Math.PI * 2 + b.phase
        const baseX = wide ? b.x : 0.2 + b.x * 0.6
        s.x = (baseX + Math.sin(a * 0.75 + b.phase) * 0.065) * w
        s.y = (0.5 + Math.sin(a) * 0.54) * h
        s.sy = 1 + Math.abs(Math.cos(a)) * 0.38
        s.r = b.r * scale * (wide ? 1 : 1.25) * (1 + Math.sin(a * 1.6) * 0.09)
        s.c = PALETTE[b.color]
      })
      heat.x += (heat.tx - heat.x) * 0.08
      heat.y += (heat.ty - heat.y) * 0.08
      heat.r += (heat.tr - heat.r) * 0.05
    }

    const draw = () => {
      if (!image) return
      const data = image.data
      const n = state.length
      const scale = (w + h) / 2
      const hx = heat.x * w
      const hy = heat.y * h
      const hr2 = (heat.r * scale) ** 2
      const heatColor = PALETTE[0]

      let p = 0
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let field = 0
          let cr = 0
          let cg = 0
          let cb = 0
          for (let i = 0; i < n; i++) {
            const s = state[i]
            const dx = x - s.x
            const dy = (y - s.y) / s.sy
            const f = (s.r * s.r) / (dx * dx + dy * dy + 1)
            field += f
            cr += s.c[0] * f
            cg += s.c[1] * f
            cb += s.c[2] * f
          }
          if (hr2 > 1) {
            const dx = x - hx
            const dy = y - hy
            const f = hr2 / (dx * dx + dy * dy + 1)
            field += f
            cr += heatColor[0] * f
            cg += heatColor[1] * f
            cb += heatColor[2] * f
          }

          let alpha = smoothstep(0.9, 1.12, field) * (0.36 + (1 - Math.exp(-Math.max(0, field - 1) * 0.35)) * 0.2)
          if (wide) alpha *= 0.45 + 0.55 * smoothstep(0.15, 0.6, x / w)

          data[p] = cr / field
          data[p + 1] = cg / field
          data[p + 2] = cb / field
          data[p + 3] = alpha * 255
          p += 4
        }
      }
      ctx.putImageData(image, 0, 0)
    }

    let running = false
    let visible = true
    let raf = 0
    let last = 0
    let acc = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.ceil(rect.width / cell))
      h = Math.max(1, Math.ceil(rect.height / cell))
      canvas.width = w
      canvas.height = h
      image = ctx.createImageData(w, h)
      wide = rect.width >= 768
      if (!running) {
        step(0)
        draw()
      }
    }

    const loop = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      acc += dt * 1000
      if (acc >= frameInterval) {
        step(acc / 1000)
        acc = 0
        draw()
      }
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || !canAnimate() || !visible || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    const onVisibility = () => (document.hidden ? stop() : start())
    const onMotionChange = () => (canAnimate() ? start() : stop())
    const ro = new ResizeObserver(resize)

    resize()
    step(0)
    draw()

    ro.observe(canvas)
    io.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    reducedMql.addEventListener('change', onMotionChange)
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      clearTimeout(idleTimer)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMql.removeEventListener('change', onMotionChange)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div aria-hidden="true" className={className}>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#FFFDFC_0%,#FCF4F6_45%,#F7E6EB_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full blur-[2px]" />
    </div>
  )
}
