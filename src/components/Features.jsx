export default function Features() {
  const cards = [
    {
      emoji: '✦',
      title: 'Atendimento Exclusivo',
      desc: 'Um horário por cliente. Sem correria, sem pressa. Toda a atenção voltada para você e para o resultado perfeito.',
    },
    {
      emoji: '◈',
      title: 'Produtos Premium',
      desc: 'Materiais hipoalergênicos de alta retenção e segurança total, selecionados criteriosamente para o seu conforto.',
    },
    {
      emoji: '◉',
      title: 'Mapeamento Personalizado',
      desc: 'Cílios e sobrancelhas desenhados especificamente para a anatomia do seu olho e o formato do seu rosto.',
    },
  ]

  return (
    <section className="bg-[#FDFBF9] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group bg-white rounded-2xl p-8 transition-all duration-400 hover:-translate-y-1"
              style={{
                boxShadow: '0 8px 24px rgba(45,40,42,0.05)',
                border: '1px solid rgba(226,207,180,0.3)',
              }}
            >
              <span className="text-2xl text-[#D88A9A] mb-5 block">{c.emoji}</span>
              <h3
                className="text-xl mb-3 text-[#2D282A]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {c.title}
              </h3>
              <p className="text-sm text-[#7A7375] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
