import { useState, useRef, useCallback } from 'react'
import { IconArrows } from '@/components/icons'
import antesFoto from '@/imports/new/Antes.png'
import depoisFoto from '@/imports/new/Depois_.png'

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const applyPos = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  return (
    <section id="resultados" className="bg-white py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase"
            style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
          >
            ✦ Antes e Depois
          </div>
          <h2
            className="text-4xl sm:text-5xl text-[#2D282A]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Veja a transformação
          </h2>
          <p className="text-sm text-[#7A7375] leading-relaxed">
            Arraste o controle central para comparar o olhar antes e após o atendimento.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none"
          style={{
            height: 'clamp(280px, 45vw, 520px)',
            boxShadow: '0 24px 64px rgba(45,40,42,0.12)',
          }}
          onMouseDown={(e) => { dragging.current = true; applyPos(e.clientX) }}
          onMouseMove={(e) => { if (dragging.current) applyPos(e.clientX) }}
          onMouseUp={() => { dragging.current = false }}
          onMouseLeave={() => { dragging.current = false }}
          onTouchStart={(e) => { dragging.current = true; applyPos(e.touches[0].clientX) }}
          onTouchMove={(e) => { dragging.current = true; applyPos(e.touches[0].clientX) }}
          onTouchEnd={() => { dragging.current = false }}
        >
          {/* Before (left / full) */}
          <img
            src={antesFoto}
            alt="Antes — olhar natural"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          {/* After (right / clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          >
            <img
              src={depoisFoto}
              alt="Depois — cílios com extensão Fernanda Mioni"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Labels */}
          <span
            className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
            style={{ background: 'rgba(45,40,42,0.55)', backdropFilter: 'blur(8px)' }}
          >
            Antes
          </span>
          <span
            className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
            style={{ background: 'rgba(216,138,154,0.75)', backdropFilter: 'blur(8px)' }}
          >
            Depois
          </span>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ left: `calc(${pos}% - 1px)`, background: 'white', boxShadow: '0 0 12px rgba(0,0,0,0.3)' }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              left: `${pos}%`,
              background: 'white',
              boxShadow: '0 4px 20px rgba(45,40,42,0.25)',
              border: '2px solid rgba(216,138,154,0.5)',
            }}
          >
            <IconArrows />
          </div>
        </div>

        {/* Placeholder note */}
        <p className="text-center text-xs text-[#7A7375] mt-5 opacity-60">
          Resultados reais obtidos no estúdio Fernanda Mioni.
        </p>
      </div>
    </section>
  )
}
