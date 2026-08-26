import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function FluidCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const animRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Detectar dispositivo móvel - se for mobile, usar background estático
    const isMobile = 'ontouchstart' in window || window.innerWidth <= 768

    if (isMobile) {
      // MOBILE: Background estático CSS apenas
      canvas.style.display = 'none'
      return
    }

    // DESKTOP APENAS: Canvas animado
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Blobs reduzidos para desktop apenas
    const blobs = [
      { x: 0.15, y: 0.25, r: 0.45, color: 'rgba(216,138,154,0.12)', targetX: 0.15, targetY: 0.25 },
      { x: 0.75, y: 0.18, r: 0.38, color: 'rgba(237,181,192,0.10)', targetX: 0.75, targetY: 0.18 },
      { x: 0.45, y: 0.65, r: 0.50, color: 'rgba(226,207,180,0.08)', targetX: 0.45, targetY: 0.65 },
      { x: 0.60, y: 0.35, r: 0.35, color: 'rgba(232,198,210,0.13)', targetX: 0.60, targetY: 0.35 },
      { x: 0.70, y: 0.45, r: 0.28, color: 'rgba(216,138,154,0.14)', targetX: 0.70, targetY: 0.45 },
    ]

    // Animações mais simples
    blobs.forEach((b, i) => {
      const animateBlob = () => {
        const moveRange = 0.08
        gsap.to(b, {
          x: b.targetX + (Math.random() - 0.5) * moveRange,
          y: b.targetY + (Math.random() - 0.5) * moveRange,
          r: b.r * (0.8 + Math.random() * 0.4),
          duration: 6 + i * 2,
          ease: 'sine.inOut',
          onComplete: animateBlob,
        })
      }
      gsap.delayedCall(i * 0.5, animateBlob)
    })

    // Mouse cursor simples
    const cursor = { 
      x: 0.5, y: 0.5, r: 0.15, 
      targetR: 0.15, intensity: 0
    }

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // Background simples
      const base = ctx.createLinearGradient(0, 0, W, H)
      base.addColorStop(0, '#FEFCFD')
      base.addColorStop(1, '#F7E8ED')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, W, H)

      // Blobs simples sem glow
      blobs.forEach((b) => {
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

      // Mouse cursor simples
      if (cursor.intensity > 0.01) {
        const cx = cursor.x * W
        const cy = cursor.y * H
        const radius = cursor.r * Math.min(W, H)
        
        const mouseGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        mouseGlow.addColorStop(0, `rgba(216,138,154,${cursor.intensity * 0.2})`)
        mouseGlow.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fillStyle = mouseGlow
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    // Mouse tracking simples
    let isMoving = false
    const updateCursor = () => {
      gsap.to(cursor, {
        x: mouse.current.x,
        y: mouse.current.y,
        intensity: isMoving ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    gsap.ticker.add(updateCursor)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
      isMoving = true
      setTimeout(() => isMoving = false, 100)
    }

    canvas.addEventListener('mousemove', onMove, { passive: true })
    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animRef.current)
      gsap.ticker.remove(updateCursor)
      gsap.globalTimeline.clear()
    }
  }, [])

  return (
    <>
      {/* Canvas para desktop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ display: 'block' }}
      />
      {/* Background estático para mobile */}
      <div 
        className="absolute inset-0 w-full h-full md:hidden"
        style={{
          background: 'linear-gradient(135deg, #FEFCFD 0%, #FDF8FA 25%, #FAF0F3 75%, #F7E8ED 100%)',
        }}
      />
    </>
  )
}
