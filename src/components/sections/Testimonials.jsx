import { useState } from 'react'
import { TESTIMONIALS } from '@/data/testimonials'
import { INSTA_GALLERY } from '@/data/instagram'
import { SITE } from '@/config/site'
import { ResponsiveImage, Section, SectionHeading, cn } from '@/components/ui'
import { IconChevronLeft, IconChevronRight, IconInstagram, IconStar } from '@/components/icons'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const total = TESTIMONIALS.length
  const go = (dir) => setActive((a) => (a + dir + total) % total)
  const t = TESTIMONIALS[active]

  return (
    <Section id="depoimentos" tone="soft">
      <div className="grid items-start gap-16 md:grid-cols-2 md:gap-20">
        {/* Depoimentos */}
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Depoimentos" title="O que nossas clientes dizem" align="left" />

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
              <p className="min-h-[7.5rem] font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">
                {t.text}
              </p>
            </blockquote>

            <figcaption className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                <p className="text-xs text-muted-gray">{t.time}</p>
              </div>
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
            </figcaption>

            <div className="mt-6 flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
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
          </figure>
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
