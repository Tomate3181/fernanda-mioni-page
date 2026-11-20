import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const listRef = useRef(null)
  const tabRefs = useRef([])
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })
  const items = SERVICES[active]

  const activeIndex = SERVICE_TABS.findIndex((t) => t.key === active)

  const syncIndicator = useCallback(() => {
    const btn = tabRefs.current[activeIndex]
    if (!btn) return
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true })
  }, [activeIndex])

  useLayoutEffect(() => {
    syncIndicator()
  }, [syncIndicator])

  useEffect(() => {
    const container = listRef.current
    if (!container) return
    const ro = new ResizeObserver(syncIndicator)
    ro.observe(container)
    return () => ro.disconnect()
  }, [syncIndicator])

  // Navegação completa por teclado nas abas (WAI-ARIA)
  const onKeyDown = (e, index) => {
    let next = null
    if (e.key === 'ArrowRight') next = (index + 1) % SERVICE_TABS.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + SERVICE_TABS.length) % SERVICE_TABS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = SERVICE_TABS.length - 1

    if (next === null) return
    e.preventDefault()
    setActive(SERVICE_TABS[next].key)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="servicos" tone="soft" className="py-16 md:py-24">
      <SectionHeading
        title="Procedimentos sob medida"
        description="Escolha a categoria para comparar duração, acabamento e solicitar seu horário."
        className="mb-7 md:mb-9"
      />

      {/* Abas com indicador deslizante suave (zero salto seco) */}
      <div data-reveal className="mb-8 flex justify-center md:mb-10">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Categorias de serviço"
          className="relative inline-flex max-w-full items-center gap-1 rounded-full border border-champagne/65 bg-white p-1 shadow-card"
        >
          <span
            aria-hidden="true"
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left - 4}px)`,
            }}
            className={cn(
              'pointer-events-none absolute bottom-1 left-1 top-1 rounded-full bg-rose-ink transition-[transform,width,opacity] duration-350 ease-soft',
              indicator.ready ? 'opacity-100' : 'opacity-0',
            )}
          />
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
                  'relative z-10 min-h-10 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 ease-soft sm:px-6 sm:text-sm',
                  selected ? 'text-white' : 'text-muted-gray hover:text-charcoal',
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
            style={{ animationDelay: `${i * 55}ms` }}
            className="group flex animate-fade-up flex-col overflow-hidden rounded-3xl border border-champagne/55 bg-white shadow-card transition-[border-color,box-shadow] duration-300 ease-soft hover:border-rose-ink/40 hover:shadow-card-hover"
          >
            <div className="relative overflow-hidden bg-bg-cream">
              <ResponsiveImage
                image={s.image}
                alt={`${s.title} — procedimento realizado por Fernanda Mioni`}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 92vw"
                className="aspect-square w-full object-cover transition-transform duration-600 ease-soft group-hover:scale-[1.035]"
              />
              <span className="glass tabular-lining absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/70 px-2.5 py-1 text-xs font-semibold text-charcoal">
                <IconClock className="size-3.5 text-rose-ink" />
                {s.duration}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-5">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-ink">{s.style}</p>
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
                Agendar este estilo
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
