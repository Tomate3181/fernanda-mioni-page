import { IMAGES } from '@/data/images'
import { waLink } from '@/lib/whatsapp'
import { Button, ResponsiveImage, Section, SectionHeading } from '@/components/ui'
import { IconWhatsApp } from '@/components/icons'

const CREDENTIALS = [
  {
    title: 'Extensão de cílios',
    detail: 'Volume Brasileiro, Russo, Fox Eye e Lash Lifting.',
  },
  {
    title: 'Sobrancelhas e lábios',
    detail: 'Design estratégico, micropigmentação fio a fio e Hidra Gloss.',
  },
  {
    title: 'Formação em Tricologia',
    detail: 'Análise dos fios naturais para extensão segura e durável.',
  },
  {
    title: '6+ anos em Caçapava',
    detail: 'Mais de 500 clientes atendidas com certificações internacionais.',
  },
]

export default function About() {
  return (
    <Section id="sobre" tone="white" className="overflow-hidden">
      <SectionHeading
        title={
          <>
            Fernanda Mioni · <span className="italic text-rose-ink">Cílios e Tricologia</span>
          </>
        }
        description="Mais de 6 anos em Caçapava unindo estética precisa e cuidado com a saúde dos fios."
        className="mb-12 md:mb-16"
      />

      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Foto com moldura arquitetônica limpa */}
        <div data-reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[1.9rem] border border-champagne/65 bg-bg-cream sm:-inset-4"
          />
          <div className="group relative overflow-hidden rounded-3xl shadow-photo">
            <ResponsiveImage
              image={IMAGES.aboutFernanda}
              alt="Fernanda Mioni segurando equipamento de análise capilar no estúdio"
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 90vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.025]"
            />
          </div>

          {/* Selo de certificação */}
          <div className="absolute -bottom-5 -right-2 flex items-center gap-3 rounded-2xl border border-champagne/65 bg-white py-2.5 pl-2.5 pr-4 shadow-float sm:-right-5">
            <ResponsiveImage image={IMAGES.seloTricologia} alt="" sizes="56px" className="size-12 shrink-0 sm:size-14" />
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-ink">Certificada</p>
              <p className="text-sm font-semibold text-charcoal">Master in Lash &amp; Brow</p>
              <p className="text-xs text-muted-gray">Trichology</p>
            </div>
          </div>
        </div>

        {/* Texto conciso e escaneável */}
        <div data-reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-3xl font-medium leading-tight text-charcoal">
              Estética do olhar com base científica
            </h3>
            <p className="text-base leading-relaxed text-muted-gray">
              Formada em Tricologia, Fernanda analisa a resistência dos fios naturais antes de cada procedimento. Assim
              cada extensão mantém leveza, retenção prolongada e crescimento saudável.
            </p>
          </div>

          <ul data-reveal-group className="grid gap-4 sm:grid-cols-2">
            {CREDENTIALS.map((item) => (
              <li key={item.title} data-reveal-item className="border-t border-champagne/65 pt-4">
                <p className="text-sm font-semibold text-charcoal">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-gray">{item.detail}</p>
              </li>
            ))}
          </ul>

          <div className="pt-1">
            <Button
              href={waLink('Olá Fernanda! Gostaria de agendar uma avaliação ou extensão de cílios.')}
              size="lg"
              icon={<IconWhatsApp className="size-5" />}
            >
              Agendar pelo WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
