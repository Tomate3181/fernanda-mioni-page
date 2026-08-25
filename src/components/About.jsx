import fernandaArms from '@/imports/image-7.png'
import fernandaProducts from '@/imports/image-6.png'
import { waLink } from '@/utils/whatsapp'
import { IconWhatsApp } from '@/components/icons'

export default function About() {
  const tags = ['Volume Russo', 'Fox Eye', 'Lash Lifting', 'Henna & Laminação', 'Design Personalizado']

  return (
    <section id="sobre" className="bg-white py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Photo column */}
        <div className="relative flex justify-center md:justify-end order-2 md:order-1">
          {/* Champagne bg shape */}
          <div
            className="absolute -inset-6 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(226,207,180,0.25) 0%, rgba(216,138,154,0.08) 100%)' }}
          />
          <div className="relative">
            {/* Main photo */}
            <div
              className="relative w-72 sm:w-80 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 24px 64px rgba(45,40,42,0.15)' }}
            >
              <img
                src={fernandaArms}
                alt="Fernanda Mioni — Especialista em Lash e Brow"
                className="w-full object-cover"
              />
              {/* Rose gold border inset */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(216,138,154,0.3)' }}
              />
            </div>

            {/* Small floating card */}
            <div
              className="absolute -bottom-5 -right-5 md:-right-10 rounded-xl px-5 py-4 shadow-lg"
              style={{ background: 'white', border: '1px solid rgba(226,207,180,0.5)' }}
            >
              <p className="text-[10px] tracking-[0.15em] text-[#D88A9A] uppercase font-medium mb-1">
                Certificada por
              </p>
              <p className="text-sm font-semibold text-[#2D282A]">Cursos Nacionais</p>
              <p className="text-xs text-[#7A7375]">e Internacionais</p>
            </div>

            {/* Second photo inset */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-xl overflow-hidden"
              style={{
                boxShadow: '0 8px 24px rgba(45,40,42,0.12)',
                border: '3px solid white',
              }}
            >
              <img
                src={fernandaProducts}
                alt="Fernanda com materiais de trabalho"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text column */}
        <div className="order-1 md:order-2 flex flex-col gap-6">
          <div
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase"
            style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
          >
            ✦ Sobre a Profissional
          </div>

          <h2
            className="text-4xl sm:text-5xl leading-tight text-[#2D282A]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Dedicada à arte{' '}
            <em className="text-[#D88A9A] not-italic">do olhar</em>{' '}
            há mais de 6 anos.
          </h2>

          <p className="text-[#7A7375] leading-relaxed text-sm">
            Fernanda Mioni é especialista em extensão de cílios e design de sobrancelhas com
            mais de 6 anos de experiência. Apaixonada pela arte do embelezamento, ela combina
            técnica apurada e sensibilidade estética para criar resultados que valorizam a
            beleza natural de cada cliente.
          </p>
          <p className="text-[#7A7375] leading-relaxed text-sm">
            Com certificações em cursos nacionais e internacionais, Fernanda oferece mais do
            que um procedimento — proporciona um momento de autocuidado e transformação, em um
            ambiente exclusivo, tranquilo e inteiramente dedicado a você.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs text-[#7A7375] font-medium"
                style={{ background: '#FDFBF9', border: '1px solid rgba(226,207,180,0.5)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={waLink('Olá Fernanda! Gostaria de conhecer melhor seu trabalho e agendar um horário.')}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold mt-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)',
              boxShadow: '0 6px 20px rgba(216,138,154,0.3)',
            }}
          >
            <IconWhatsApp />
            Agendar com a Fernanda
          </a>
        </div>
      </div>
    </section>
  )
}
