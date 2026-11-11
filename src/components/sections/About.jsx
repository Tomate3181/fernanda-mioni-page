import { IMAGES } from '@/data/images'
import { waLink } from '@/lib/whatsapp'
import { Button, ResponsiveImage, Section, SectionHeading } from '@/components/ui'
import { IconWhatsApp } from '@/components/icons'

const SPECIALTIES = [
  { title: 'Extensão de cílios', description: 'Técnicas avançadas de extensão' },
  { title: 'Design de sobrancelhas', description: 'Mapeamento personalizado do rosto' },
  { title: 'Micropigmentação', description: 'Fio a fio naturalíssimo' },
  { title: 'Hidra Gloss', description: 'Tratamento hidratante para os lábios' },
]

const ACHIEVEMENTS = [
  'Mais de 6 anos de experiência',
  'Especialização em Tricologia',
  'Certificações nacionais e internacionais',
  'Mais de 500 clientes atendidas',
]

export default function About() {
  return (
    <Section id="sobre" tone="white" className="overflow-hidden">
      <SectionHeading
        eyebrow="Sobre a profissional"
        title={
          <>
            Especialista em <span className="italic text-rose-ink">Tricologia</span> e extensão de cílios
          </>
        }
        description="Transformando vidas através da ciência capilar e da arte do embelezamento."
        className="mb-14 md:mb-20"
      />

      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Foto */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-[linear-gradient(135deg,rgb(226_207_180/0.25),rgb(216_138_154/0.08))] sm:-inset-8"
          />
          <div className="relative overflow-hidden rounded-3xl shadow-photo ring-1 ring-rose-gold/20">
            <ResponsiveImage
              image={IMAGES.aboutFernanda}
              alt="Fernanda Mioni segurando equipamento de análise capilar"
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 448px, 90vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {/* Selo de certificação */}
          <div className="absolute -bottom-6 -right-2 flex items-center gap-3 rounded-2xl border border-champagne/50 bg-white/95 py-3 pl-3 pr-5 shadow-float backdrop-blur sm:-right-6">
            <ResponsiveImage image={IMAGES.seloTricologia} alt="" className="size-14 shrink-0" />
            <div className="leading-tight">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-ink">Certificada</p>
              <p className="text-sm font-semibold text-charcoal">Master in Lash &amp; Brow</p>
              <p className="text-xs text-muted-gray">Trichology</p>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-3xl font-medium leading-tight text-charcoal">
              Uma jornada dedicada à beleza e à saúde capilar
            </h3>
            <div className="flex flex-col gap-4 leading-relaxed text-muted-gray">
              <p>
                Fernanda Mioni é <strong className="font-semibold text-charcoal">especialista em Tricologia</strong> e
                extensão de cílios, com mais de 6 anos transformando a autoestima de suas clientes. Sua paixão pela
                ciência capilar a levou a se especializar em análises detalhadas do couro cabeludo e tratamentos
                personalizados.
              </p>
              <p>
                Combinando conhecimento científico com sensibilidade artística, Fernanda oferece uma abordagem única que
                vai além da estética — ela cuida da saúde dos seus fios e cílios, garantindo resultados duradouros e
                naturais.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-ink">Especialidades</h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {SPECIALTIES.map((s) => (
                <li key={s.title} className="rounded-2xl border border-champagne/40 bg-bg-soft p-4">
                  <p className="mb-0.5 text-sm font-semibold text-charcoal">{s.title}</p>
                  <p className="text-xs text-muted-gray">{s.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-ink">Conquistas</h4>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm text-muted-gray">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-rose-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Button
              href={waLink('Olá Fernanda! Gostaria de agendar uma consulta de tricologia e conhecer seus tratamentos.')}
              size="lg"
              icon={<IconWhatsApp className="size-5" />}
            >
              Agendar consulta de tricologia
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
