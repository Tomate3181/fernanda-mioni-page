import { useState } from 'react'
import { TESTIMONIALS } from '@/data/testimonials'
import { INSTA_IMGS } from '@/data/instagram'
import { IconStar } from '@/components/icons'

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))
  const next = () => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))

  return (
    <section className="bg-[#FDFBF9] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — testimonial carousel */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase"
                style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
              >
                ✦ Depoimentos
              </div>
              <h2
                className="text-4xl sm:text-5xl text-[#2D282A] leading-tight"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                O que nossas clientes dizem
              </h2>
            </div>

            {/* Card */}
            <div
              className="bg-white rounded-2xl p-8 relative"
              style={{
                boxShadow: '0 8px 32px rgba(45,40,42,0.07)',
                border: '1px solid rgba(226,207,180,0.35)',
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: TESTIMONIALS[active].stars }).map((_, i) => (
                  <IconStar key={i} />
                ))}
              </div>

              <p
                className="text-xl text-[#2D282A] leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}
              >
                "{TESTIMONIALS[active].text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#2D282A]">{TESTIMONIALS[active].name}</p>
                  <p className="text-xs text-[#7A7375]">{TESTIMONIALS[active].time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full border flex items-center justify-center text-[#7A7375] hover:text-[#D88A9A] hover:border-[#D88A9A] transition-colors cursor-pointer"
                    style={{ borderColor: 'rgba(226,207,180,0.6)' }}
                    aria-label="Anterior"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full border flex items-center justify-center text-[#7A7375] hover:text-[#D88A9A] hover:border-[#D88A9A] transition-colors cursor-pointer"
                    style={{ borderColor: 'rgba(226,207,180,0.6)' }}
                    aria-label="Próximo"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-1.5 mt-5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-1 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: i === active ? '24px' : '6px',
                      background: i === active ? '#D88A9A' : 'rgba(216,138,154,0.25)',
                    }}
                    aria-label={`Depoimento ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Instagram grid */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="text-2xl text-[#2D282A]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                >
                  Instagram
                </h3>
                <a
                  href="https://instagram.com/felashdesigner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#D88A9A] hover:underline"
                >
                  @felashdesigner
                </a>
              </div>
              <a
                href="https://instagram.com/felashdesigner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#7A7375] hover:text-[#D88A9A] transition-colors"
              >
                Ver perfil →
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {INSTA_IMGS.map((src, i) => (
                <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-[#F8F3EE]">
                  <img
                    src={src}
                    alt={`Trabalho Fernanda Mioni ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(216,138,154,0.4)', backdropFilter: 'blur(2px)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#7A7375] text-center opacity-70">
              Fotos reais do trabalho serão adicionadas em breve.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
