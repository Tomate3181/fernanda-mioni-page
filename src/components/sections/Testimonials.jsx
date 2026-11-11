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
    <figure className="relative rounded-3xl border border-champagne/40 bg-white p-7 shadow-card sm:p-9">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-7 top-2 font-display text-[7rem] leading-none text-rose-gold/15"
      >
        “
      </span>
      <div className="mb-5 flex gap-0.5 text-rose-gold" aria-label={`${t.stars} de 5 estrelas`} role="img">
        {Array.from({ length: t.stars }, (_, i) => (
          <IconStar key={i} />
        ))}
      </div>

      <blockquote key={active} className="animate-fade-up">
        <p className="min-h-[7.5rem] font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">{t.text}</p>
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
                className="grid size-10 place-items-center rounded-full border border-champagne text-muted-gray transition-colors hover:border-rose-gold hover:text-rose-ink"
              >
                <Icon />
              </button>
            ))}
          </div>
        )}
      </figcaption>

      {total > 1 && (
        <div className="mt-6 flex gap-1.5">
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
                  'block h-1 rounded-full transition-all duration-500 ease-soft',
                  i === active ? 'w-6 bg-rose-gold' : 'w-1.5 bg-rose-gold/30',
                )}
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  )
}

/** Convite para avaliar no Google (aparece enquanto não houver depoimentos). */
function ReviewInvite() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-champagne/40 bg-white p-7 shadow-card sm:p-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgb(216_138_154/0.18),transparent_70%)]"
      />
      <div className="mb-5 flex gap-1 text-rose-gold" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <IconStar key={i} className="size-5" />
        ))}
      </div>
      <p className="font-display text-2xl leading-snug text-charcoal sm:text-[1.7rem]">
        Já foi atendida pela Fernanda? Conte como foi a sua experiência.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-gray">
        Sua avaliação no Google leva menos de um minuto e ajuda outras mulheres a conhecerem o trabalho do estúdio.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button href={SITE.google.reviewUrl} size="lg" icon={<IconStar className="size-4" />} className="w-full sm:w-auto">
          Avaliar no Google
        </Button>
        <Button href={SITE.google.profileUrl} variant="neutral" size="lg" className="w-full sm:w-auto">
          Ver perfil
        </Button>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const hasTestimonials = TESTIMONIALS.length > 0

  return (
    <Section id="depoimentos" tone="soft">
      <div className="grid items-start gap-16 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-8">
          {hasTestimonials ? (
            <>
              <SectionHeading eyebrow="Depoimentos" title="O que nossas clientes dizem" align="left" />
              <TestimonialCarousel items={TESTIMONIALS} />
            </>
          ) : (
            <>
              <SectionHeading eyebrow="Sua opinião" title="Sua experiência inspira outras clientes" align="left" />
              <ReviewInvite />
            </>
          )}
        </div>

        {/* Galeria / Instagram */}
        <div className="flex flex-col gap-6 md:pt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl font-medium text-charcoal">No Instagram</h3>
              <p className="text-sm text-muted-gray">Trabalhos recentes do estúdio</p>
            </div>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-ink hover:underline"
            >
              <IconInstagram />
              {SITE.instagram.handle}
            </a>
          </div>

          <ul className="grid grid-cols-3 gap-2 sm:gap-3">
            {INSTA_GALLERY.map((g) => (
              <li key={g.image.src}>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-bg-cream"
                >
                  <ResponsiveImage
                    image={g.image}
                    alt={g.alt}
                    sizes="(min-width: 768px) 200px, 31vw"
                    className="size-full object-cover transition-transform duration-700 ease-soft group-hover:scale-110"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-rose-ink/45 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <IconInstagram className="size-6" />
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
