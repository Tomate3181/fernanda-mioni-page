import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function FluidCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Each blob has its own GSAP-driven position + size
    const blobs = [
      { x: 0.20, y: 0.30, r: 0.38, color: 'rgba(216,138,154,0.55)' },
      { x: 0.72, y: 0.20, r: 0.32, color: 'rgba(226,180,190,0.45)' },
      { x: 0.50, y: 0.70, r: 0.40, color: 'rgba(232,198,210,0.50)' },
      { x: 0.85, y: 0.65, r: 0.28, color: 'rgba(240,215,220,0.40)' },
      { x: 0.10, y: 0.75, r: 0.25, color: 'rgba(210,150,165,0.45)' },
    ]

    // Animate each blob to float naturally
    blobs.forEach((b, i) => {
      const loopX = () =>
        gsap.to(b, {
          x: Math.random() * 0.8 + 0.1,
          duration: 5 + i * 1.2,
          ease: 'sine.inOut',
          onComplete: loopX,
        })
      const loopY = () =>
        gsap.to(b, {
          y: Math.random() * 0.8 + 0.1,
          duration: 4.5 + i * 0.9,
          ease: 'sine.inOut',
          onComplete: loopY,
        })
      const loopR = () =>
        gsap.to(b, {
          r: 0.22 + Math.random() * 0.22,
          duration: 6 + i,
          ease: 'sine.inOut',
          onComplete: loopR,
        })
      loopX()
      loopY()
      loopR()
    })

    // Mouse influence blob
    const cursor = { x: 0.5, y: 0.5, r: 0.18, color: 'rgba(216,138,154,0.30)' }

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // Warm base gradient
      const base = ctx.createLinearGradient(0, 0, W, H)
      base.addColorStop(0, '#FDF0F2')
      base.addColorStop(0.5, '#FAE8ED')
      base.addColorStop(1, '#F8E0E8')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, W, H)

      // Draw all blobs with a soft radial gradient
      const allBlobs = [...blobs, cursor]
      allBlobs.forEach((b) => {
        const cx = b.x * W
        const cy = b.y * H
        const radius = b.r * Math.min(W, H)
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        g.addColorStop(0, b.color)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    // Smooth mouse tracking
    gsap.ticker.add(() => {
      gsap.to(cursor, {
        x: mouse.current.x,
        y: mouse.current.y,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })

    draw()

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    canvas.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animRef.current)
      gsap.globalTimeline.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
