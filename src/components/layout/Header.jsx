import { useEffect, useState } from 'react'
import logo from '@/assets/images/logo-monograma.svg'
import { NAV_LINKS, SITE } from '@/config/site'
import { waLink } from '@/lib/whatsapp'
import { Button, Container, cn } from '@/components/ui'
import { IconClose, IconMenu, IconWhatsApp } from '@/components/icons'

/** Retorna o id da seção que está no meio da tela. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
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
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-soft',
        'border-b',
        solid
          ? 'border-champagne/40 bg-white/85 shadow-[0_2px_32px_rgb(45_40_42/0.06)] backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-6 transition-[height] duration-500 ease-soft',
          scrolled ? 'h-16' : 'h-18 md:h-20',
        )}
      >
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${SITE.name} — início`}>
          <img
            src={logo}
            alt=""
            width="44"
            height="44"
            className={cn('w-auto transition-[height] duration-500 ease-soft', scrolled ? 'h-10' : 'h-12')}
          />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-charcoal">{SITE.name}</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-rose-ink">
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
                      'relative rounded-full px-4 py-2 text-sm tracking-wide transition-colors duration-300',
                      isActive ? 'text-charcoal' : 'text-muted-gray hover:text-charcoal',
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-4 -bottom-0.5 h-px origin-left bg-rose-gold transition-transform duration-500 ease-soft',
                        isActive ? 'scale-x-100' : 'scale-x-0',
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
            <Button href={waLink()} size="sm" icon={<IconWhatsApp />}>
              Agendar horário
            </Button>
          </div>
          <button
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full text-charcoal md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>

      {/* Menu mobile: abre com animação de altura (grid-rows 0fr → 1fr) */}
      <div
        id="menu-mobile"
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-400 ease-soft md:hidden',
          menuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
        )}
        inert={!menuOpen}
      >
        <nav aria-label="Menu mobile" className="overflow-hidden">
          <Container className="flex flex-col gap-1 border-t border-champagne/40 pb-6 pt-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-2 py-3 font-display text-2xl text-charcoal transition-colors active:bg-blush"
              >
                {l.label}
              </a>
            ))}
            <Button href={waLink()} size="lg" icon={<IconWhatsApp />} className="mt-3 w-full">
              Agendar horário
            </Button>
          </Container>
        </nav>
      </div>
    </header>
  )
}
