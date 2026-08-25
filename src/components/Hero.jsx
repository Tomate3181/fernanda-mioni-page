import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import fernandaHero from '@/imports/fernanda-hero.png'
import { waLink } from '@/utils/whatsapp'
import { IconWhatsApp } from '@/components/icons'
import FluidCanvas from './FluidCanvas'

export default function Hero() {
  const sectionRef = useRef(null)

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { opacity: 0, y: 16, duration: 0.7, delay: 0.3, ease: 'power2.out' })
      gsap.from('.hero-h1', { opacity: 0, y: 32, duration: 0.9, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.7, delay: 0.75, ease: 'power2.out' })
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.7, delay: 0.95, ease: 'power2.out' })
      gsap.from('.hero-stats', { opacity: 0, y: 16, duration: 0.7, delay: 1.1, ease: 'power2.out' })
      gsap.from('.hero-img', { opacity: 0, x: 40, duration: 1.0, delay: 0.6, ease: 'power3.out' })
      gsap.from('.hero-floatcard', { opacity: 0, scale: 0.9, duration: 0.6, delay: 1.2, ease: 'back.out(1.7)' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Animated fluid background */}
      <FluidCanvas />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-28 w-full grid md:grid-cols-[1fr_auto] gap-8 md:gap-4 items-center">
        {/* Left — text */}
        <div className="flex flex-col gap-7 max-w-xl">
          {/* Badge */}
          <div
            className="hero-badge inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(216,138,154,0.35)',
              color: '#b06070',
            }}
          >
            <span style={{ color: '#D88A9A' }}>✦</span>
            Especialista · Cílios &amp; Sobrancelhas · Caçapava‑SP
          </div>

          {/* Headline — bold & large */}
          <h1
            className="hero-h1 leading-[1.0] text-[#2D282A]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Realce a beleza{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c47485 0%, #D88A9A 50%, #e8a8b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              natural
            </span>
            <br />do seu olhar.
          </h1>

          {/* Sub */}
          <p className="hero-sub text-base leading-relaxed max-w-md" style={{ color: '#5a4a50' }}>
            Atendimento exclusivo e personalizado. Técnicas avançadas para
            valorizar os traços únicos de cada cliente — com elegância,
            cuidado e sofisticação.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-wrap gap-3 pt-1">
            <a
              href={waLink('Olá Fernanda! Gostaria de agendar um atendimento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2.5 px-7 py-4 rounded-full text-white text-sm font-bold overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #c4606e 0%, #D88A9A 60%, #e8a8b8 100%)',
                boxShadow: '0 10px 32px rgba(196,96,110,0.45), 0 2px 8px rgba(216,138,154,0.3)',
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                }}
              />
              <IconWhatsApp />
              Agendar Atendimento
            </a>

            <a
              href="#servicos"
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.70)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(216,138,154,0.5)',
                color: '#c4606e',
                boxShadow: '0 4px 16px rgba(216,138,154,0.15)',
              }}
            >
              Ver Estilos de Cílios
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Social proof */}
          <div className="hero-stats flex items-center gap-5 pt-1">
            {[
              { n: '500+', label: 'Clientes atendidas' },
              { n: '5★', label: 'Avaliação Google' },
              { n: '6 anos', label: 'De experiência' },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center gap-5">
                {i > 0 && <div className="w-px h-8" style={{ background: 'rgba(216,138,154,0.3)' }} />}
                <div className="flex flex-col">
                  <span
                    className="text-xl font-bold leading-tight"
                    style={{ fontFamily: 'var(--font-display)', color: '#2D282A' }}
                  >
                    {s.n}
                  </span>
                  <span className="text-[11px] tracking-wide" style={{ color: '#7A7375' }}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Fernanda cutout */}
        <div className="hero-img relative flex items-end justify-center self-end">
          {/* Glow behind the figure */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[80%] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 80%, rgba(216,138,154,0.35) 0%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />

          <img
            src={fernandaHero}
            alt="Fernanda Mioni — Especialista em Lash & Brow"
            className="relative z-10 w-[340px] md:w-[420px] lg:w-[500px] object-contain drop-shadow-2xl"
            style={{ maxHeight: '80vh' }}
          />

          {/* Floating card */}
          <div
            className="hero-floatcard absolute top-[12%] -left-6 md:-left-12 rounded-2xl px-4 py-3.5 z-20"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226,207,180,0.5)',
              boxShadow: '0 8px 32px rgba(45,40,42,0.10)',
            }}
          >
            <p className="text-[10px] tracking-[0.15em] uppercase font-semibold mb-0.5" style={{ color: '#D88A9A' }}>
              Próxima disponibilidade
            </p>
            <p className="text-sm font-bold" style={{ color: '#2D282A' }}>Agende pelo WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" style={{ color: '#b06070' }}>
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium">Explore</span>
        <div className="w-px h-8 animate-pulse" style={{ background: 'linear-gradient(to bottom, #D88A9A, transparent)' }} />
      </div>
    </section>
  )
}
