import { useState } from 'react'
import { SERVICES } from '@/data/services'
import { waLink } from '@/utils/whatsapp'
import { IconWhatsApp } from '@/components/icons'

export default function Services() {
  const [activeTab, setActiveTab] = useState('cilios')

  const tabs = [
    { key: 'cilios', label: 'Cílios · Lash' },
    { key: 'sobrancelhas', label: 'Sobrancelhas · Brow' },
    { key: 'combos', label: 'Kits & Combos' },
  ]

  const current = SERVICES[activeTab]

  return (
    <section id="servicos" className="bg-[#FDFBF9] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase"
            style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
          >
            ✦ Catálogo de Serviços
          </div>
          <h2
            className="text-4xl sm:text-5xl text-[#2D282A]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Escolha o seu estilo
          </h2>
          <p className="text-sm text-[#7A7375] max-w-md leading-relaxed">
            Cada técnica é aplicada com precisão e personalizada para o formato do seu olho.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex p-1 rounded-full gap-1"
            style={{ background: 'rgba(226,207,180,0.2)', border: '1px solid rgba(226,207,180,0.4)' }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer"
                style={
                  activeTab === t.key
                    ? {
                        background: 'linear-gradient(135deg, #D88A9A, #c47485)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(216,138,154,0.35)',
                      }
                    : { color: '#7A7375' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {current.map((s) => (
            <div
              key={s.title}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1.5"
              style={{
                boxShadow: '0 4px 20px rgba(45,40,42,0.06)',
                border: '1px solid rgba(226,207,180,0.25)',
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-[#F8F3EE]">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(45,40,42,0.2) 0%, transparent 50%)' }}
                />
                <span
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium text-[#D88A9A] tracking-wide"
                  style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}
                >
                  {s.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h3
                    className="text-lg text-[#2D282A] mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-[10px] text-[#D88A9A] tracking-widest uppercase font-medium">{s.style}</p>
                </div>
                <p className="text-xs text-[#7A7375] leading-relaxed">{s.desc}</p>
                <a
                  href={waLink(`Olá Fernanda! Gostaria de agendar o serviço de ${s.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-semibold text-[#D88A9A] border transition-all duration-300 hover:bg-[#D88A9A] hover:text-white hover:border-[#D88A9A]"
                  style={{ borderColor: 'rgba(216,138,154,0.4)' }}
                >
                  <IconWhatsApp />
                  Quero este estilo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
