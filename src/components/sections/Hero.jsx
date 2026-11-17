import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { IMAGES } from '@/data/images'
import { SITE } from '@/config/site'
import { waLink } from '@/lib/whatsapp'
import { Button, Container, Eyebrow, ResponsiveImage } from '@/components/ui'
import { IconArrowRight, IconWhatsApp } from '@/components/icons'
import LavaLamp from '@/components/effects/LavaLamp'

export default function Hero() {
  const root = useRef(null)

  // Entrada em cascata. useLayoutEffect evita o "pisca" antes da animação.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
        .from(q('[data-hero="text"]'), { autoAlpha: 0, y: 28, stagger: 0.12 }, 0.15)
        .from(q('[data-hero="img"]'), { autoAlpha: 0, y: 40, scale: 0.97, duration: 1.2 }, 0.3)
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-svh items-end overflow-hidden bg-blush pt-20">
      <LavaLamp className="absolute inset-0 -z-10" />

      {/* Textura de ruído bem sutil, dá profundidade ao fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      <Container className="grid items-end gap-4 md:grid-cols-[1.05fr_1fr] md:gap-8">
        <div className="flex max-w-xl flex-col gap-6 pb-4 pt-6 md:pb-20 md:pt-0 lg:pb-28">
          <div data-hero="text">
            <Eyebrow className="glass">Cílios · Sobrancelhas · Caçapava-SP</Eyebrow>
          </div>

          <h1
            data-hero="text"
            className="font-display text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.01em] text-charcoal text-balance"
          >
            Realce a beleza <span className="text-rose-gradient italic">natural</span> do seu olhar.
          </h1>

          <p data-hero="text" className="max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Atendimento exclusivo e personalizado. Técnicas avançadas para valorizar os traços únicos de cada
            cliente — com elegância, cuidado e sofisticação.
          </p>

          <div data-hero="text" className="flex flex-wrap gap-3">
            <Button
              href={waLink('Olá Fernanda! Gostaria de agendar um atendimento.')}
              size="lg"
              icon={<IconWhatsApp className="size-5" />}
            >
              Agendar atendimento
            </Button>
            <Button href="#servicos" variant="secondary" size="lg">
              Ver serviços
              <IconArrowRight className="ml-2 inline size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          <dl data-hero="text" className="mt-2 flex items-center gap-5 sm:gap-7">
            {SITE.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-5 sm:gap-7">
                {i > 0 && <span aria-hidden="true" className="h-9 w-px bg-rose-gold/30" />}
                <div className="flex flex-col-reverse">
                  <dt className="text-[11px] tracking-wide text-muted-gray">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold leading-tight text-charcoal">{s.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div data-hero="img" className="relative mx-auto w-full max-w-[22rem] self-end sm:max-w-md md:mr-0 md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-x-[5%] bottom-0 h-3/4 rounded-full bg-[radial-gradient(ellipse_at_50%_80%,rgb(216_138_154/0.4),transparent_70%)] blur-3xl"
          />
          <ResponsiveImage
            image={IMAGES.heroFernanda}
            alt="Fernanda Mioni, especialista em cílios e sobrancelhas"
            sizes="(min-width: 768px) 45vw, 90vw"
            priority
            className="relative mx-auto h-auto max-h-[82svh] w-auto object-contain object-bottom drop-shadow-[0_24px_48px_rgb(45_40_42/0.18)]"
          />
        </div>
      </Container>
    </section>
  )
}
