import { useId, useState } from 'react'
import { FAQS } from '@/data/faqs'
import { SITE } from '@/config/site'
import { waLink } from '@/lib/whatsapp'
import { Button, Section, SectionHeading, cn } from '@/components/ui'
import { IconChevronDown, IconClock, IconMap, IconWhatsApp } from '@/components/icons'

const { address } = SITE
const mapEmbed =
  'https://www.google.com/maps?output=embed&q=' +
  encodeURIComponent(`${address.street}, ${address.district}, ${address.city} - ${address.state}, ${address.zip}`)

function FaqItem({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <li
      className={cn(
        'rounded-2xl border bg-bg-soft transition-colors duration-300',
        open ? 'border-rose-gold/45' : 'border-champagne/50',
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-charcoal sm:px-6"
        >
          {q}
          <IconChevronDown
            className={cn('size-4 shrink-0 text-rose-ink transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      </h3>
      <div
        id={id}
        className={cn(
          'grid transition-[grid-template-rows] duration-400 ease-soft',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-gray sm:px-6">{a}</p>
        </div>
      </div>
    </li>
  )
}

export default function LocationFaq() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <Section id="localizacao" tone="white">
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        {/* Localização */}
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Onde estamos" title={`${address.city}, São Paulo`} align="left" />

          <div className="overflow-hidden rounded-3xl border border-champagne/50 bg-bg-soft">
            <iframe
              title="Mapa com a localização do estúdio"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full border-0 grayscale-[35%] sm:h-64"
            />
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-rose-ink">
                  <IconMap />
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold text-charcoal">Endereço</p>
                  <address className="text-sm not-italic leading-relaxed text-muted-gray">
                    {address.street} — {address.complement}
                    <br />
                    {address.district} — {address.city}, {address.state}
                    <br />
                    CEP {address.zip}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-rose-ink">
                  <IconClock />
                </span>
                <div>
                  <p className="mb-1 text-sm font-semibold text-charcoal">Horário de atendimento</p>
                  {SITE.hours.map((h) => (
                    <p key={h.label} className="text-sm text-muted-gray">
                      {h.label}: {h.value}
                    </p>
                  ))}
                  <p className="text-sm text-muted-gray">Somente com agendamento</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={address.mapsUrl} variant="neutral" size="lg" icon={<IconMap className="size-4" />} className="w-full sm:flex-1">
                  Abrir no Maps
                </Button>
                <Button href={waLink()} size="lg" icon={<IconWhatsApp />} className="w-full sm:flex-1">
                  Agendar agora
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow="Dúvidas frequentes" title="Temos as respostas" align="left" />
          <ul className="flex flex-col gap-2.5">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
