import { useEffect, useRef } from 'react'

/**
 * Fundo "lava lamp": bolhas que sobem, descem e se fundem como cera derretida.
 *
 * Técnica: metaballs. Para cada pixel somamos a "influência" de cada bolha
 * (r² / distância²). Onde a soma passa de ~1 existe cera. Quando duas bolhas
 * se aproximam, as influências se somam e elas se fundem naturalmente.
 *
 * Para ficar leve, o campo é calculado numa grade de baixa resolução (1 ponto
 * a cada CELL px) e o navegador amplia o canvas com suavização — as bordas
 * ficam macias de graça. Pausa fora da tela, com a aba oculta e respeita
 * "reduzir movimento".
 */

// px de tela por ponto calculado (menor = mais nítido e mais pesado)
const CELL_DESKTOP = 4
const CELL_MOBILE = 6

// Cores da marca (RGB)
const PALETTE = [
  [216, 138, 154], // rose-gold
  [237, 181, 192], // rose-gold-light
  [226, 196, 170], // champagne quente
  [200, 120, 140], // rose profundo
]

// x: posição horizontal base (0–1) · r: raio relativo · period: segundos por ciclo
const BLOBS = [
  { x: 0.78, r: 0.16, period: 34, phase: 0.0, color: 0 },
  { x: 0.62, r: 0.12, period: 41, phase: 2.1, color: 1 },
  { x: 0.9, r: 0.11, period: 29, phase: 4.0, color: 3 },
  { x: 0.48, r: 0.1, period: 47, phase: 1.2, color: 2 },
  { x: 0.7, r: 0.09, period: 26, phase: 5.1, color: 1 },
  { x: 0.18, r: 0.11, period: 52, phase: 3.3, color: 2 },
  { x: 0.3, r: 0.08, period: 38, phase: 0.7, color: 0 },
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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const frameInterval = finePointer ? 0 : 1000 / 30 // celulares: 30 fps bastam
    const cell = finePointer ? CELL_DESKTOP : CELL_MOBILE

    let w = 0
    let h = 0
    let image = null
    let wide = true

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

    // "Gota quente" que segue o cursor
    const heat = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, r: 0, tr: 0 }
    let idleTimer
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (e.clientY > rect.bottom) return
      heat.tx = (e.clientX - rect.left) / rect.width
      heat.ty = (e.clientY - rect.top) / rect.height
      heat.tr = 0.075
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => (heat.tr = 0.04), 1200)
    }

    let time = 0
    const state = BLOBS.map(() => ({ x: 0, y: 0, r: 0, sy: 1, c: null }))

    const step = (dt) => {
      time += dt
      const scale = (w + h) / 2
      BLOBS.forEach((b, i) => {
        const s = state[i]
        const a = (time / b.period) * Math.PI * 2 + b.phase
        // Sobe e desce como na lâmpada; no celular as bolhas ficam mais centralizadas
        const baseX = wide ? b.x : 0.2 + b.x * 0.6
        s.x = (baseX + Math.sin(a * 0.7 + b.phase) * 0.05) * w
        s.y = (0.5 + Math.sin(a) * 0.55) * h
        // Estica na vertical quando está em movimento (velocidade ~ cos)
        s.sy = 1 + Math.abs(Math.cos(a)) * 0.35
        s.r = b.r * scale * (wide ? 1 : 1.25) * (1 + Math.sin(a * 1.7) * 0.08)
        s.c = PALETTE[b.color]
      })
      heat.x += (heat.tx - heat.x) * 0.06
      heat.y += (heat.ty - heat.y) * 0.06
      heat.r += (heat.tr - heat.r) * 0.04
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

          // Borda definida da cera + interior que ganha cor aos poucos (sem "anéis")
          let alpha = smoothstep(0.9, 1.12, field) * (0.36 + (1 - Math.exp(-Math.max(0, field - 1) * 0.35)) * 0.2)
          // No desktop o lado do texto fica mais suave para não brigar com a leitura
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

    // Loop com pausa automática
    let running = false
    let visible = true
    let raf = 0
    let last = 0
    let acc = 0

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
      if (running || reducedMotion || !visible || document.hidden) return
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
    const ro = new ResizeObserver(resize)

    time = 8 // começa com as bolhas já espalhadas
    resize()
    step(0)
    draw()

    ro.observe(canvas)
    io.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    if (finePointer && !reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true })
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      clearTimeout(idleTimer)
      document.removeEventListener('visibilitychange', onVisibility)
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
