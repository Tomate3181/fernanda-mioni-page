import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMAGES } from '@/data/images'
import { ResponsiveImage, Section, SectionHeading } from '@/components/ui'
import { IconArrows } from '@/components/icons'

gsap.registerPlugin(ScrollTrigger)

const SIZES = '(min-width: 1024px) 896px, 100vw'

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const frame = useRef(null)
  const interacted = useRef(false)
  const hintTween = useRef(null)

  // Demonstração sutil ao entrar na tela (indica que o comparador é interativo)
  useEffect(() => {
    const el = frame.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const proxy = { value: 50 }
      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
          if (!interacted.current) setPos(proxy.value)
        },
      })
      tl.to(proxy, { value: 42, duration: 0.45, ease: 'power2.inOut' })
        .to(proxy, { value: 56, duration: 0.65, ease: 'power2.inOut' })
        .to(proxy, { value: 50, duration: 0.45, ease: 'power2.out' })

      hintTween.current = tl

      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (!interacted.current) tl.play()
        },
      })
    })

    return () => {
      hintTween.current?.kill()
      mm.revert()
    }
  }, [])

  const stopHint = () => {
    if (!interacted.current) {
      interacted.current = true
      hintTween.current?.kill()
    }
  }

  const moveTo = (clientX) => {
    const rect = frame.current.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    setPos((x / rect.width) * 100)
  }

  const onPointerDown = (e) => {
    stopHint()
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX)
  }

  const onKeyDown = (e) => {
    const steps = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 }
    if (!(e.key in steps)) return
    stopHint()
    e.preventDefault()
    setPos((p) => Math.min(100, Math.max(0, p + steps[e.key])))
  }

  return (
    <Section id="resultados" tone="white" size="narrow">
      <SectionHeading
        title="Resultados reais do estúdio"
        description="Arraste o controle lateral ou use as setas do teclado para comparar o olhar antes e depois."
        className="mb-10 md:mb-12"
      />

      <div
        ref={frame}
        data-reveal
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="relative mx-auto aspect-[4/3] max-w-4xl cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl bg-bg-cream shadow-photo ring-1 ring-champagne/60 sm:aspect-video"
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

        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-charcoal/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:left-5 sm:top-5">
          Antes
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-rose-ink/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:right-5 sm:top-5">
          Depois
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_10px_rgb(0_0_0/0.28)]"
          style={{ left: `${pos}%` }}
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparar resultado antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% mostrando o antes`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full border-2 border-rose-ink/75 bg-white text-rose-ink shadow-float transition-[transform,background-color,color] duration-200 ease-soft hover:bg-rose-ink hover:text-white active:cursor-grabbing active:scale-95"
          style={{ left: `${pos}%` }}
        >
          <IconArrows />
        </div>
      </div>
    </Section>
  )
}
