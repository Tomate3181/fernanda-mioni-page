import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { IMAGES } from '@/data/images'
import { SITE } from '@/config/site'
import { waLink } from '@/lib/whatsapp'
import { Button, Container, ResponsiveImage } from '@/components/ui'
import { IconArrowRight, IconWhatsApp } from '@/components/icons'

export default function Hero() {
  const root = useRef(null)

  // Entrada editorial com revelação por máscara nas linhas do H1 (desativada em reduced-motion)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(q('[data-hero="line"]'), { yPercent: 108, duration: 0.85, stagger: 0.09 }, 0.08)
        .from(q('[data-hero="copy"]'), { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.08 }, 0.34)
        .from(q('[data-hero="frame"]'), { autoAlpha: 0, scale: 0.985, duration: 0.9 }, 0.16)
        .from(q('[data-hero="img"]'), { autoAlpha: 0, y: 24, scale: 1.03, duration: 1.05 }, 0.22)
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-blush/70 pt-20"
    >
      {/* Fundo arquitetônico limpo em duas superfícies — zero glows borrados */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] border-l border-champagne/55 bg-bg-cream md:block"
      />

      <Container className="grid items-end gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-10">
        <div className="flex max-w-xl flex-col gap-6 pb-2 pt-8 md:pb-20 md:pt-8 lg:pb-28">
          <h1 className="font-display text-[clamp(2.65rem,6.4vw,5.15rem)] font-semibold leading-[0.98] tracking-[-0.018em] text-charcoal">
            <span className="block overflow-hidden pb-1">
              <span data-hero="line" className="block">
                Extensão de cílios
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero="line" className="block">
                e <span className="italic text-rose-ink">sobrancelhas</span>
              </span>
            </span>
            <span className="block overflow-hidden pb-1.5">
              <span data-hero="line" className="block">
                em Caçapava.
              </span>
            </span>
          </h1>

          <p data-hero="copy" className="max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            Atendimento 1:1 com hora marcada no Centro. Técnicas sob medida com base em tricologia para cuidar dos fios
            naturais.
          </p>

          <div data-hero="copy" className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <Button
              href={waLink('Olá Fernanda! Gostaria de agendar um horário.')}
              size="lg"
              icon={<IconWhatsApp className="size-5" />}
              className="w-full sm:w-auto"
            >
              Agendar pelo WhatsApp
            </Button>
            <Button href="#servicos" variant="secondary" size="lg" className="w-full sm:w-auto">
              Ver serviços
              <IconArrowRight className="ml-2 inline size-4 transition-transform duration-300 ease-soft group-hover:translate-x-1" />
            </Button>
          </div>

          <div
            data-hero="copy"
            className="mt-2 flex flex-col gap-1 border-t border-champagne/75 pt-5 text-xs text-muted-gray sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 sm:text-[13px]"
          >
            <span className="font-medium text-charcoal">
              {SITE.address.street} · {SITE.address.district}
            </span>
            <span aria-hidden="true" className="hidden text-champagne sm:inline">
              /
            </span>
            <span>Seg a Sex 9h–19h · Sáb 9h–16h</span>
          </div>
        </div>

        {/* Retrato editorial com moldura arquitetônica limpa (zero glow artificial) */}
        <div className="relative mx-auto w-full max-w-[20rem] self-end sm:max-w-sm md:mr-0 md:max-w-none">
          <div
            data-hero="frame"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 bottom-0 top-10 rounded-t-[10rem] border border-b-0 border-champagne/75 bg-white/55 sm:inset-x-6 md:inset-x-8 md:top-12"
          />
          <ResponsiveImage
            data-hero="img"
            image={IMAGES.heroFernanda}
            alt="Fernanda Mioni, especialista em extensão de cílios e design de sobrancelhas"
            sizes="(min-width: 768px) 44vw, 85vw"
            priority
            className="relative mx-auto aspect-[854/1280] h-auto max-h-[48svh] w-auto object-contain object-bottom drop-shadow-[0_18px_36px_rgb(45_40_42/0.12)] sm:max-h-[56svh] md:max-h-[82svh]"
          />
        </div>
      </Container>
    </section>
  )
}
