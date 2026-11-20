import { useState } from 'react'
import { TESTIMONIALS } from '@/data/testimonials'
import { INSTA_GALLERY } from '@/data/instagram'
import { SITE } from '@/config/site'
import { Button, ResponsiveImage, Section, SectionHeading, cn } from '@/components/ui'
import { IconChevronLeft, IconChevronRight, IconInstagram, IconStar } from '@/components/icons'

function TestimonialCarousel({ items }) {
  const [active, setActive] = useState(0)
  const total = items.length
  const go = (dir) => setActive((a) => (a + dir + total) % total)
  const t = items[active]

  return (
    <figure className="relative rounded-3xl border border-champagne/55 bg-white p-7 shadow-card sm:p-9">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-7 top-2 font-display text-[7rem] leading-none text-champagne/45"
      >
        “
      </span>
      <div className="mb-5 flex gap-0.5 text-rose-gold" aria-label={`${t.stars} de 5 estrelas`} role="img">
        {Array.from({ length: t.stars }, (_, i) => (
          <IconStar key={i} />
        ))}
      </div>

      <blockquote key={active} className="animate-fade-up">
        <p className="min-h-[6.5rem] font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">{t.text}</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-charcoal">{t.name}</p>
          <p className="text-xs text-muted-gray">{t.time}</p>
        </div>
        {total > 1 && (
          <div className="flex gap-2">
            {[
              { dir: -1, label: 'Depoimento anterior', Icon: IconChevronLeft },
              { dir: 1, label: 'Próximo depoimento', Icon: IconChevronRight },
            ].map(({ dir, label, Icon }) => (
              <button
                key={dir}
                type="button"
                onClick={() => go(dir)}
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-champagne text-muted-gray transition-colors duration-250 ease-soft hover:border-rose-ink hover:bg-rose-ink hover:text-white active:scale-95"
              >
                <Icon />
              </button>
            ))}
          </div>
        )}
      </figcaption>

      {total > 1 && (
        <div className="mt-5 flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver depoimento ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              className="grid h-6 place-items-center"
            >
              <span
                className={cn(
                  'block h-1 rounded-full transition-all duration-300 ease-soft',
                  i === active ? 'w-6 bg-rose-ink' : 'w-1.5 bg-champagne',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  )
}

/** Convite para avaliar no Google (superfície limpa, sem glow artificial). */
function ReviewInvite() {
  return (
    <div
      data-reveal
      className="rounded-3xl border border-champagne/55 bg-white p-7 shadow-card sm:p-9"
    >
      <div className="mb-4 flex gap-1 text-rose-gold" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar key={i} className="size-5" />
        ))}
      </div>
      <p className="font-display text-2xl leading-snug text-charcoal sm:text-[1.7rem]">
        Já foi atendida pela Fernanda? Conte como foi.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-gray">
        Sua avaliação no Google leva menos de um minuto e ajuda novas clientes de Caçapava a escolherem com segurança.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href={SITE.google.reviewUrl} size="md" icon={<IconStar className="size-4" />} className="w-full sm:w-auto">
          Avaliar no Google
        </Button>
        <Button href={SITE.google.profileUrl} variant="neutral" size="md" className="w-full sm:w-auto">
          Ver perfil no Google
        </Button>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const hasTestimonials = TESTIMONIALS.length > 0

  return (
    <Section id="depoimentos" tone="soft">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="flex flex-col gap-7">
          {hasTestimonials ? (
            <>
              <SectionHeading title="Avaliações das clientes" align="left" />
              <TestimonialCarousel items={TESTIMONIALS} />
            </>
          ) : (
            <>
              <SectionHeading title="Sua experiência no estúdio" align="left" />
              <ReviewInvite />
            </>
          )}
        </div>

        {/* Galeria / Instagram */}
        <div data-reveal className="flex flex-col gap-6 md:pt-2">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl font-medium text-charcoal">No Instagram</h3>
              <p className="text-sm text-muted-gray">Trabalhos recentes do estúdio</p>
            </div>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-rose-ink transition-colors hover:text-charcoal"
            >
              <IconInstagram />
              <span>{SITE.instagram.handle}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-charcoal transition-transform duration-300 ease-soft group-hover:scale-x-100"
              />
            </a>
          </div>

          <ul data-reveal-group className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {INSTA_GALLERY.map((g) => (
              <li key={g.image.src} data-reveal-item>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-bg-cream ring-1 ring-champagne/50 transition-shadow duration-300 ease-soft hover:shadow-card-hover"
                >
                  <ResponsiveImage
                    image={g.image}
                    alt={g.alt}
                    sizes="(min-width: 768px) 200px, 31vw"
                    className="size-full object-cover transition-transform duration-600 ease-soft group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-charcoal/45 text-white opacity-0 transition-opacity duration-300 ease-soft group-hover:opacity-100">
                    <IconInstagram className="size-5 transition-transform duration-300 ease-soft group-hover:scale-110" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
