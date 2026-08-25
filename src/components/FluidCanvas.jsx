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

    // Enhanced blob system with more organic movement
    const blobs = [
      { x: 0.15, y: 0.25, r: 0.45, vx: 0, vy: 0, color: 'rgba(216,138,154,0.12)', targetX: 0.15, targetY: 0.25 },
      { x: 0.75, y: 0.18, r: 0.38, vx: 0, vy: 0, color: 'rgba(237,181,192,0.10)', targetX: 0.75, targetY: 0.18 },
      { x: 0.45, y: 0.65, r: 0.50, vx: 0, vy: 0, color: 'rgba(226,207,180,0.08)', targetX: 0.45, targetY: 0.65 },
      { x: 0.88, y: 0.70, r: 0.32, vx: 0, vy: 0, color: 'rgba(240,232,216,0.11)', targetX: 0.88, targetY: 0.70 },
      { x: 0.08, y: 0.78, r: 0.28, vx: 0, vy: 0, color: 'rgba(210,150,165,0.09)', targetX: 0.08, targetY: 0.78 },
      { x: 0.60, y: 0.35, r: 0.35, vx: 0, vy: 0, color: 'rgba(232,198,210,0.13)', targetX: 0.60, targetY: 0.35 },
      { x: 0.30, y: 0.85, r: 0.22, vx: 0, vy: 0, color: 'rgba(248,227,235,0.08)', targetX: 0.30, targetY: 0.85 },
      // Novos blobs para região central/direita
      { x: 0.70, y: 0.45, r: 0.28, vx: 0, vy: 0, color: 'rgba(216,138,154,0.14)', targetX: 0.70, targetY: 0.45 },
      { x: 0.85, y: 0.35, r: 0.25, vx: 0, vy: 0, color: 'rgba(237,181,192,0.12)', targetX: 0.85, targetY: 0.35 },
      { x: 0.55, y: 0.20, r: 0.30, vx: 0, vy: 0, color: 'rgba(226,207,180,0.10)', targetX: 0.55, targetY: 0.20 },
      { x: 0.92, y: 0.55, r: 0.22, vx: 0, vy: 0, color: 'rgba(210,150,165,0.11)', targetX: 0.92, targetY: 0.55 },
    ]

    // Enhanced floating animations with more organic movement
    blobs.forEach((b, i) => {
      const animateBlob = () => {
        // More organic floating pattern
        const moveRange = 0.15 + (i * 0.05)
        const baseX = b.targetX
        const baseY = b.targetY
        
        gsap.to(b, {
          x: baseX + (Math.random() - 0.5) * moveRange,
          y: baseY + (Math.random() - 0.5) * moveRange,
          r: (0.20 + Math.random() * 0.35) + (i * 0.03),
          duration: 8 + (i * 1.5) + Math.random() * 4,
          ease: 'sine.inOut',
          onComplete: animateBlob,
        })
      }
      
      // Stagger the initial animations
      gsap.delayedCall(i * 0.8, animateBlob)
    })

    // Interactive mouse blob with enhanced responsiveness
    const cursor = { 
      x: 0.5, 
      y: 0.5, 
      r: 0.18, 
      targetR: 0.18,
      color: 'rgba(216,138,154,0.25)',
      intensity: 0
    }

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      // Subtle animated gradient background
      const time = Date.now() * 0.001
      const base = ctx.createRadialGradient(
        W * (0.5 + Math.sin(time * 0.3) * 0.1), 
        H * (0.5 + Math.cos(time * 0.2) * 0.1), 
        0,
        W * 0.5, 
        H * 0.5, 
        Math.max(W, H)
      )
      base.addColorStop(0, '#FEFCFD')
      base.addColorStop(0.3, '#FDF8FA')
      base.addColorStop(0.7, '#FAF0F3')
      base.addColorStop(1, '#F7E8ED')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, W, H)

      // Enhanced blob rendering with glow effects
      const allBlobs = [...blobs]
      
      // First pass: larger glows
      ctx.globalCompositeOperation = 'multiply'
      allBlobs.forEach((b) => {
        const cx = b.x * W
        const cy = b.y * H
        const radius = b.r * Math.min(W, H) * 1.8
        
        const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        outerGlow.addColorStop(0, b.color.replace(/[\d\.]+\)$/g, '0.06)'))
        outerGlow.addColorStop(0.5, b.color.replace(/[\d\.]+\)$/g, '0.03)'))
        outerGlow.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fillStyle = outerGlow
        ctx.fill()
      })

      // Second pass: main blobs with enhanced gradients
      ctx.globalCompositeOperation = 'normal'
      allBlobs.forEach((b) => {
        const cx = b.x * W
        const cy = b.y * H
        const radius = b.r * Math.min(W, H)
        
        // Multi-stop radial gradient for more depth
        const g = ctx.createRadialGradient(
          cx - radius * 0.2, cy - radius * 0.2, 0,
          cx, cy, radius
        )
        g.addColorStop(0, b.color.replace(/[\d\.]+\)$/g, '0.20)'))
        g.addColorStop(0.4, b.color)
        g.addColorStop(0.8, b.color.replace(/[\d\.]+\)$/g, '0.05)'))
        g.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      // Interactive mouse cursor blob with pulsing effect
      if (cursor.intensity > 0.01) {
        const cx = cursor.x * W
        const cy = cursor.y * H
        const radius = cursor.r * Math.min(W, H)
        const pulseRadius = radius * (1 + Math.sin(Date.now() * 0.008) * 0.3)
        
        const mouseGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseRadius)
        mouseGlow.addColorStop(0, `rgba(216,138,154,${cursor.intensity * 0.35})`)
        mouseGlow.addColorStop(0.5, `rgba(237,181,192,${cursor.intensity * 0.18})`)
        mouseGlow.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.beginPath()
        ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2)
        ctx.fillStyle = mouseGlow
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    // Enhanced mouse tracking with momentum
    let isMoving = false
    let moveTimeout

    const updateCursor = () => {
      gsap.to(cursor, {
        x: mouse.current.x,
        y: mouse.current.y,
        r: isMoving ? cursor.targetR * 2.2 : cursor.targetR,
        intensity: isMoving ? 1 : 0,
        duration: isMoving ? 0.3 : 1.5,
        ease: isMoving ? 'power2.out' : 'power3.out',
        overwrite: 'auto',
      })
    }

    gsap.ticker.add(updateCursor)
    draw()

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
      
      isMoving = true
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        isMoving = false
      }, 150)
    }

    const onLeave = () => {
      isMoving = false
      gsap.to(cursor, {
        intensity: 0,
        r: cursor.targetR,
        duration: 2,
        ease: 'power2.out'
      })
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      clearTimeout(moveTimeout)
      cancelAnimationFrame(animRef.current)
      gsap.globalTimeline.clear()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ display: 'block' }}
    />
  )
}
