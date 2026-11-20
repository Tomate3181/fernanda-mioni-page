import { Section } from '@/components/ui'
import { IconEye, IconHeart, IconSparkles } from '@/components/icons'

const FEATURES = [
  {
    icon: IconHeart,
    title: 'Atendimento 1:1',
    desc: 'Um horário reservado só para você, sem atendimentos simultâneos nem pressa.',
  },
  {
    icon: IconSparkles,
    title: 'Materiais hipoalergênicos',
    desc: 'Adesivos e fios selecionados para alta retenção, leveza e conforto ocular.',
  },
  {
    icon: IconEye,
    title: 'Mapeamento facial',
    desc: 'Curvatura e comprimento definidos conforme a anatomia dos olhos e a saúde dos fios.',
  },
]

export default function Features() {
  return (
    <Section id="diferenciais" tone="soft" aria-label="Diferenciais do estúdio" className="py-16 md:py-24">
      <ul data-reveal-group className="grid gap-5 md:grid-cols-3 md:gap-6">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <li
            key={title}
            data-reveal-item
            className="group rounded-3xl border border-champagne/55 bg-white p-7 shadow-card transition-[border-color,box-shadow] duration-300 ease-soft hover:border-rose-ink/40 hover:shadow-card-hover md:p-8"
          >
            <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-blush text-rose-ink transition-colors duration-300 ease-soft group-hover:bg-rose-ink group-hover:text-white">
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
