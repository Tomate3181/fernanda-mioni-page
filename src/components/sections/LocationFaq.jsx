import { useEffect, useId, useState } from 'react'
import { FAQS } from '@/data/faqs'
import { SITE } from '@/config/site'
import { getStoredConsent, subscribeConsent } from '@/lib/consent'
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
      data-reveal-item
      className={cn(
        'rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ease-soft',
        open ? 'border-rose-ink/45 shadow-card' : 'border-champagne/60 hover:border-rose-gold/55',
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex min-h-13 w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-charcoal transition-colors duration-200 hover:text-rose-ink sm:px-6"
        >
          <span>{q}</span>
          <IconChevronDown
            className={cn(
              'size-4 shrink-0 text-rose-ink transition-transform duration-350 ease-soft',
              open && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <div
        id={id}
        className={cn(
          'grid transition-[grid-template-rows] duration-350 ease-soft',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <p
            className={cn(
              'px-5 pb-5 text-sm leading-relaxed text-muted-gray transition-[opacity,transform] duration-300 ease-soft sm:px-6',
              open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0',
            )}
          >
            {a}
          </p>
        </div>
      </div>
    </li>
  )
}

export default function LocationFaq() {
  const [openFaq, setOpenFaq] = useState(0)
  const [mapAllowed, setMapAllowed] = useState(() => Boolean(getStoredConsent()?.externalMedia))

  useEffect(() => {
    return subscribeConsent(() => {
      if (getStoredConsent()?.externalMedia) {
        setMapAllowed(true)
      }
    })
  }, [])

  return (
    <Section id="localizacao" tone="soft">
      <div className="grid gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* Localização */}
        <div className="flex flex-col gap-7">
          <SectionHeading title={`${address.city}, São Paulo`} align="left" />

          <div data-reveal className="overflow-hidden rounded-3xl border border-champagne/60 bg-white shadow-card">
            {mapAllowed ? (
              <iframe
                title="Mapa com a localização do estúdio Fernanda Mioni em Caçapava-SP"
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0 grayscale-[25%] sm:h-64"
              />
            ) : (
              <div className="flex h-56 flex-col items-center justify-center gap-3 border-b border-champagne/45 bg-bg-cream px-6 text-center sm:h-64">
                <span className="grid size-12 place-items-center rounded-full bg-white text-rose-ink shadow-card">
                  <IconMap className="size-5" />
                </span>
                <div className="max-w-xs">
                  <p className="text-sm font-semibold text-charcoal">
                    {address.street} — {address.district}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-gray">
                    O mapa do Google usa cookies de terceiros e só carrega quando você autorizar.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setMapAllowed(true)}>
                  Carregar mapa interativo
                </Button>
              </div>
            )}

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
                  <p className="text-sm text-muted-gray">Somente com hora marcada</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={address.mapsUrl}
                  variant="neutral"
                  size="lg"
                  icon={<IconMap className="size-4" />}
                  className="w-full sm:flex-1"
                >
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
        <div className="flex flex-col gap-7">
          <SectionHeading title="Dúvidas frequentes" align="left" />
          <ul data-reveal-group className="flex flex-col gap-3">
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
