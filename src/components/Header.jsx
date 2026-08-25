import { useState, useEffect } from 'react'
import logoNew from '@/imports/logo-FM.svg'
import { waLink } from '@/utils/whatsapp'
import { IconWhatsApp } from '@/components/icons'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre mim', href: '#sobre' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Localização', href: '#localizacao' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.88)'
          : 'rgba(255,255,255,0.60)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(226,207,180,0.3)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 32px rgba(45,40,42,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0 group">
          <img
            src={logoNew}
            alt="FM Monogram — Fernanda Mioni"
            className="h-11 w-auto object-contain"
            style={{ transform: 'scale(2.0)' }}
          />
          <div className="hidden sm:block leading-tight">
            <span
              className="block text-sm font-medium tracking-[0.12em] text-[#2D282A] uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Fernanda Mioni
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-[#D88A9A] uppercase">
              Lash &amp; Brow
            </span>
          </div>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#7A7375] hover:text-[#2D282A] tracking-wide transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href={waLink('Olá Fernanda! Gostaria de agendar um horário.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)',
              boxShadow: '0 4px 16px rgba(216,138,154,0.3)',
            }}
          >
            <IconWhatsApp />
            Agendar Horário
          </a>
          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-[#7A7375]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E2CFB4]/30 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#2D282A] py-1"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink('Olá Fernanda! Gostaria de agendar um horário.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white text-sm font-medium"
            style={{ background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)' }}
          >
            <IconWhatsApp />
            Agendar Horário
          </a>
        </div>
      )}
    </header>
  )
}
