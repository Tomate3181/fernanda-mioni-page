import { Section } from '@/components/ui'
import { IconEye, IconHeart, IconSparkles } from '@/components/icons'

const FEATURES = [
  {
    icon: IconHeart,
    title: 'Atendimento exclusivo',
    desc: 'Um horário por cliente. Sem correria, sem pressa. Toda a atenção voltada para você e para o resultado perfeito.',
  },
  {
    icon: IconSparkles,
    title: 'Produtos premium',
    desc: 'Materiais hipoalergênicos de alta retenção e segurança total, selecionados criteriosamente para o seu conforto.',
  },
  {
    icon: IconEye,
    title: 'Mapeamento personalizado',
    desc: 'Cílios e sobrancelhas desenhados especificamente para a anatomia do seu olho e o formato do seu rosto.',
  },
]

export default function Features() {
  return (
    <Section id="diferenciais" tone="soft" aria-label="Diferenciais" className="py-16 md:py-24">
      <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <li
            key={title}
            className="group rounded-3xl border border-champagne/40 bg-white p-7 shadow-card transition-[transform,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:shadow-card-hover md:p-8"
          >
            <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-blush text-rose-ink transition-colors duration-500 group-hover:bg-rose-gold group-hover:text-white">
              <Icon />
            </span>
            <h3 className="mb-2 font-display text-2xl font-medium text-charcoal">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-gray">{desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
