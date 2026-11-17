import { useRef, useState } from 'react'
import { IMAGES } from '@/data/images'
import { ResponsiveImage, Section, SectionHeading } from '@/components/ui'
import { IconArrows } from '@/components/icons'

const SIZES = '(min-width: 1024px) 960px, 100vw'

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const frame = useRef(null)

  const moveTo = (clientX) => {
    const rect = frame.current.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPos((x / rect.width) * 100)
  }

  // Pointer events cobrem mouse, toque e caneta. O "capture" mantém o arraste
  // mesmo se o dedo sair da imagem; touch-action: pan-y deixa a página rolar.
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX)
  }

  const onKeyDown = (e) => {
    const steps = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 }
    if (!(e.key in steps)) return
    e.preventDefault()
    setPos((p) => Math.min(100, Math.max(0, p + steps[e.key])))
  }

  return (
    <Section id="resultados" tone="white" size="narrow">
      <SectionHeading
        eyebrow="Antes e depois"
        title="Veja a transformação"
        description="Arraste o controle para comparar o olhar antes e depois do atendimento."
        className="mb-12"
      />

      <div
        ref={frame}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl bg-bg-cream shadow-photo sm:aspect-video"
      >
        <ResponsiveImage
          image={IMAGES.antes}
          alt="Antes: olhar sem extensão de cílios"
          sizes={SIZES}
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <ResponsiveImage
            image={IMAGES.depois}
            alt="Depois: olhar com extensão de cílios feita por Fernanda Mioni"
            sizes={SIZES}
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-charcoal/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:left-5 sm:top-5">
          Antes
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-rose-ink/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:right-5 sm:top-5">
          Depois
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgb(0_0_0/0.3)]"
          style={{ left: `${pos}%` }}
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% mostrando o antes`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-rose-gold/60 bg-white text-rose-ink shadow-float"
          style={{ left: `${pos}%` }}
        >
          <IconArrows />
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted-gray">Resultados reais obtidos no estúdio Fernanda Mioni.</p>
    </Section>
  )
}
