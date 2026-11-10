import tricologista from '@/imports/new/foto de tricologista(1).jpg'
import { waLink } from '@/utils/whatsapp'
import { IconWhatsApp } from '@/components/icons'

export default function About() {
  const specialties = [
    { title: 'Tricologia Capilar', description: 'Análise detalhada do couro cabeludo' },
    { title: 'Lash & Brow Design', description: 'Técnicas avançadas de extensão' },
    { title: 'Micropigmentação', description: 'Fio a fio naturalíssimo' },
    { title: 'Tratamentos Capilares', description: 'Protocolos personalizados' }
  ]

  const achievements = [
    'Mais de 6 anos de experiência',
    'Especialização em Tricologia',
    'Certificações Nacionais e Internacionais',
    'Mais de 500 clientes atendidas'
  ]

  return (
    <section id="sobre" className="bg-white py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#D88A9A] text-[10px] font-medium tracking-[0.18em] uppercase mb-6"
            style={{ background: 'rgba(216,138,154,0.07)', border: '1px solid rgba(216,138,154,0.2)' }}
          >
            ✦ Sobre a Profissional
          </div>
          
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#2D282A] mb-4"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            Especialista em{' '}
            <em className="text-[#D88A9A] not-italic">Tricologia</em>{' '}
            e Extensão de Cílios
          </h2>
          
          <p className="text-[#7A7375] text-lg max-w-3xl mx-auto">
            Transformando vidas através da ciência capilar e da arte do embelezamento
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Photo column */}
          <div className="relative">
            {/* Background decorative shape */}
            <div
              className="absolute -inset-8 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, rgba(226,207,180,0.15) 0%, rgba(216,138,154,0.05) 100%)' }}
            />
            
            {/* Main photo */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ 
                  boxShadow: '0 32px 80px rgba(45,40,42,0.12)',
                  aspectRatio: '4/5'
                }}
              >
                <img
                  src={tricologista}
                  alt="Fernanda Mioni — Tricologista e Especialista em Lash Design"
                  className="w-full h-full object-cover"
                />
                {/* Rose gold border overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(216,138,154,0.25)' }}
                />
              </div>

              {/* Floating certification badge */}
              <div
                className="absolute -bottom-6 -right-6 bg-white rounded-xl px-6 py-4 shadow-xl"
                style={{ border: '1px solid rgba(226,207,180,0.3)' }}
              >
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.15em] text-[#D88A9A] uppercase font-medium mb-1">
                    Certificada em
                  </p>
                  <p className="text-sm font-bold text-[#2D282A]">Tricologia</p>
                  <p className="text-xs text-[#7A7375]">Capilar Avançada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="space-y-8">
            {/* Story */}
            <div className="space-y-4">
              <h3
                className="text-2xl font-semibold text-[#2D282A]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Uma jornada dedicada à beleza e saúde capilar
              </h3>
              
              <div className="space-y-4 text-[#7A7375] leading-relaxed">
                <p>
                  Fernanda Mioni é <strong className="text-[#2D282A] font-semibold">especialista em Tricologia</strong> 
                  {' '}e extensão de cílios com mais de 6 anos transformando a autoestima de suas clientes. 
                  Sua paixão pela ciência capilar a levou a se especializar em análises detalhadas do 
                  couro cabeludo e tratamentos personalizados.
                </p>
                
                <p>
                  Combinando conhecimento científico com sensibilidade artística, Fernanda oferece 
                  uma abordagem única que vai além da estética — ela cuida da saúde dos seus fios e cílios, 
                  garantindo resultados duradouros e naturais.
                </p>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#2D282A]">Especialidades</h4>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl"
                    style={{ background: '#FDFBF9', border: '1px solid rgba(226,207,180,0.3)' }}
                  >
                    <h5 className="font-semibold text-[#2D282A] text-sm mb-1">
                      {specialty.title}
                    </h5>
                    <p className="text-xs text-[#7A7375]">
                      {specialty.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#2D282A]">Conquistas</h4>
              
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: '#D88A9A' }}
                    />
                    <p className="text-[#7A7375] text-sm">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={waLink('Olá Fernanda! Gostaria de agendar uma consulta de tricologia e conhecer seus tratamentos.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)',
                  boxShadow: '0 8px 32px rgba(216,138,154,0.3)',
                }}
              >
                <IconWhatsApp className="w-5 h-5" />
                Agendar Consulta de Tricologia
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
