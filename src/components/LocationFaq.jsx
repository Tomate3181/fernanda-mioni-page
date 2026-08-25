import { useState } from 'react'
import { FAQS } from '@/data/faqs'
import { waLink } from '@/utils/whatsapp'
import { IconMap, IconWhatsApp, IconChevronDown } from '@/components/icons'

export default function LocationFaq() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section id="localizacao" className="bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Location */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
            >
              ✦ Onde estamos
            </div>
            <h2
              className="text-4xl sm:text-5xl text-[#2D282A] leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
            >
              Caçapava, São Paulo
            </h2>
          </div>

          <div
            className="rounded-2xl p-8 flex flex-col gap-6"
            style={{
              background: '#FDFBF9',
              border: '1px solid rgba(226,207,180,0.4)',
            }}
          >
            <div className="flex gap-4 items-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(216,138,154,0.12)' }}
              >
                <IconMap />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2D282A] mb-1">Endereço</p>
                <p className="text-sm text-[#7A7375] leading-relaxed">
                  Rua Coronel Jaime Rolemberg de Lima, 370<br />
                  Jardim São José — Caçapava, SP
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[#D88A9A]"
                style={{ background: 'rgba(216,138,154,0.12)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2D282A] mb-1">Horário de Atendimento</p>
                <p className="text-sm text-[#7A7375]">Seg–Sex: 9h às 19h</p>
                <p className="text-sm text-[#7A7375]">Sábado: 9h às 16h</p>
                <p className="text-sm text-[#7A7375]">Somente com agendamento</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Rua+Coronel+Jaime+Rolemberg+de+Lima,+370,+Jardim+São+José,+Caçapava+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:bg-[#2D282A] hover:text-white hover:border-[#2D282A] text-[#2D282A]"
                style={{ borderColor: 'rgba(45,40,42,0.2)' }}
              >
                <IconMap />
                Abrir no Maps
              </a>
              <a
                href={waLink('Olá Fernanda! Gostaria de agendar um horário.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)' }}
              >
                <IconWhatsApp />
                Agendar agora
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase"
              style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
            >
              ✦ Dúvidas Frequentes
            </div>
            <h2
              className="text-4xl sm:text-5xl text-[#2D282A] leading-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
            >
              Temos as respostas
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: '#FDFBF9',
                  border: openFaq === i ? '1px solid rgba(216,138,154,0.4)' : '1px solid rgba(226,207,180,0.35)',
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-[#2D282A]">{faq.q}</span>
                  <span className="text-[#D88A9A] shrink-0">
                    <IconChevronDown open={openFaq === i} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-[#7A7375] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
