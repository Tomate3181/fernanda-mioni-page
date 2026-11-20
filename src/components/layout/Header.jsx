import { useEffect, useState } from 'react'
import logo from '@/assets/images/logo-monograma.svg'
import { NAV_LINKS, SITE } from '@/config/site'
import { Button, Container, cn } from '@/components/ui'
import { IconCalendar } from '@/components/icons'

/** Retorna o id da seção visível no meio da tela (null na hero). */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          setActive(e.target.id === 'top' ? null : e.target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )

    const targets = ['top', ...ids]
    targets.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 24)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu com Esc ou ao passar para o layout desktop
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const mql = window.matchMedia('(min-width: 768px)')
    const onResize = () => mql.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mql.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mql.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-350 ease-soft',
        solid
          ? 'border-champagne/55 bg-white/92 shadow-[0_2px_20px_rgb(45_40_42/0.05)] backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-4 transition-[height] duration-350 ease-soft',
          scrolled ? 'h-16' : 'h-18 md:h-20',
        )}
      >
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3 transition-opacity duration-200 hover:opacity-85"
          aria-label={`${SITE.name} — início`}
        >
          <img
            src={logo}
            alt=""
            width="44"
            height="44"
            className={cn('w-auto transition-[height] duration-350 ease-soft', scrolled ? 'h-10' : 'h-11 md:h-12')}
          />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">{SITE.name}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-ink">
              {SITE.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'group relative inline-flex items-center px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-250 ease-soft',
                      isActive ? 'text-charcoal' : 'text-muted-gray hover:text-charcoal',
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3.5 bottom-1 h-[1.5px] origin-left bg-rose-ink transition-transform duration-300 ease-soft',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="#agendamento" size="sm" icon={<IconCalendar className="size-4" />}>
              Agendar horário
            </Button>
          </div>

          {/* Botão menu mobile com morph suave entre linhas e X */}
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full text-charcoal transition-colors duration-200 hover:bg-blush/80 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={cn(
                  'absolute left-0 top-0 block h-[1.5px] w-5 rounded-full bg-charcoal transition-transform duration-300 ease-soft',
                  menuOpen ? 'translate-y-[6px] rotate-45' : 'translate-y-0 rotate-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[6px] block h-[1.5px] w-5 rounded-full bg-charcoal transition-opacity duration-200',
                  menuOpen ? 'opacity-0' : 'opacity-100',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[12px] block h-[1.5px] w-5 rounded-full bg-charcoal transition-transform duration-300 ease-soft',
                  menuOpen ? '-translate-y-[6px] -rotate-45' : 'translate-y-0 rotate-0',
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Menu mobile com transição fluida de altura e opacidade */}
      <div
        id="menu-mobile"
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-350 ease-soft md:hidden',
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
        inert={!menuOpen}
      >
        <nav aria-label="Menu mobile" className="overflow-hidden">
          <Container className="flex flex-col gap-1 border-t border-champagne/40 pb-6 pt-3">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${i * 35}ms` : '0ms' }}
                className={cn(
                  'rounded-xl px-2 py-3 font-display text-2xl text-charcoal transition-[opacity,transform,background-color] duration-300 ease-soft hover:bg-blush/60 active:bg-blush',
                  menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0',
                )}
              >
                {l.label}
              </a>
            ))}
            <Button
              href="#agendamento"
              size="lg"
              icon={<IconCalendar className="size-4" />}
              onClick={() => setMenuOpen(false)}
              className="mt-3 w-full"
            >
              Agendar horário
            </Button>
          </Container>
        </nav>
      </div>
    </header>
  )
}
