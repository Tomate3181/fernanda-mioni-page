import { useRef, useState } from 'react'
import { SERVICES, SERVICE_TABS } from '@/data/services'
import { waLink } from '@/lib/whatsapp'
import { Button, ResponsiveImage, Section, SectionHeading, cn } from '@/components/ui'
import { IconClock, IconWhatsApp } from '@/components/icons'

// Quantidade de colunas no desktop conforme o número de cards da aba
const GRID = {
  2: 'sm:grid-cols-2 max-w-3xl',
  3: 'sm:grid-cols-2 lg:grid-cols-3 max-w-5xl',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export default function Services() {
  const [active, setActive] = useState(SERVICE_TABS[0].key)
  const tabRefs = useRef([])
  const items = SERVICES[active]

  // Setas do teclado navegam entre as abas (padrão WAI-ARIA)
  const onKeyDown = (e, index) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!dir) return
    const next = (index + dir + SERVICE_TABS.length) % SERVICE_TABS.length
    setActive(SERVICE_TABS[next].key)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="servicos" tone="soft">
      <SectionHeading
        eyebrow="Catálogo de serviços"
        title="Escolha o seu estilo"
        description="Cada técnica é aplicada com precisão e personalizada para o formato do seu olho."
        className="mb-10"
      />

      <div className="mb-10 flex justify-center">
        <div
          role="tablist"
          aria-label="Categorias de serviço"
          className="inline-flex gap-1 rounded-full border border-champagne/50 bg-champagne/20 p-1"
        >
          {SERVICE_TABS.map((t, i) => {
            const selected = active === t.key
            return (
              <button
                key={t.key}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={selected}
                aria-controls="painel-servicos"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.key)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-[background-color,color,box-shadow] duration-300 sm:px-6 sm:text-sm',
                  selected ? 'bg-rose-gradient text-white shadow-cta' : 'text-muted-gray hover:text-charcoal',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <ul
        key={active}
        id="painel-servicos"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className={cn('mx-auto grid gap-5', GRID[items.length] ?? GRID[4])}
      >
        {items.map((s, i) => (
          <li
            key={s.title}
            style={{ animationDelay: `${i * 70}ms` }}
            className="group flex animate-fade-up flex-col overflow-hidden rounded-3xl border border-champagne/40 bg-white shadow-card transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1.5 hover:shadow-card-hover"
          >
            <div className="relative overflow-hidden bg-bg-cream">
              <ResponsiveImage
                image={s.image}
                alt={`${s.title} — trabalho de Fernanda Mioni`}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
              />
              <span className="glass absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-rose-ink">
                <IconClock className="size-3.5" />
                {s.duration}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-ink">{s.style}</p>
                <h3 className="font-display text-2xl font-medium leading-tight text-charcoal">{s.title}</h3>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-gray">{s.desc}</p>
              <Button
                href={waLink(`Olá Fernanda! Gostaria de agendar o serviço de ${s.title}.`)}
                variant="outline"
                size="sm"
                icon={<IconWhatsApp />}
                className="mt-2 w-full"
              >
                Quero este estilo
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
