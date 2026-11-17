import { IMAGES } from '@/data/images'
import { NAV_LINKS, SITE } from '@/config/site'
import { waLink } from '@/lib/whatsapp'
import { Button, Container } from '@/components/ui'
import { IconInstagram, IconMail, IconWhatsApp } from '@/components/icons'

const linkClass = 'text-sm text-white/60 transition-colors hover:text-white'
const iconLinkClass =
  'grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-rose-gold hover:text-white'

export default function Footer() {
  const { address } = SITE
  return (
    <footer className="bg-footer py-16 text-white md:py-20">
      <Container>
        <div className="mb-12 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <img
              src={IMAGES.logoCompleto.src}
              width={IMAGES.logoCompleto.width}
              height={IMAGES.logoCompleto.height}
              alt={`${SITE.name} ${SITE.tagline}`}
              loading="lazy"
              className="h-auto w-48"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Especialista em extensão de cílios, design de sobrancelhas e tricologia em {address.city}-{address.state}.
              Beleza com cuidado e sofisticação.
            </p>
            <div className="flex gap-3">
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href={waLink('Olá Fernanda!')} target="_blank" rel="noopener noreferrer" className={iconLinkClass} aria-label="WhatsApp">
                <IconWhatsApp />
              </a>
              <a href={`mailto:${SITE.email}`} className={iconLinkClass} aria-label="E-mail">
                <IconMail className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Rodapé" className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-gold">Navegação</h2>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-gold">Contato</h2>
            <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>
              {SITE.email}
            </a>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {SITE.instagram.handle}
            </a>
            <address className="text-sm not-italic leading-relaxed text-white/60">
              {address.street} — {address.complement}
              <br />
              {address.district} — {address.city}, {address.state}
              <br />
              CEP {address.zip}
            </address>
            <Button href={waLink()} variant="dark" size="sm" icon={<IconWhatsApp />} className="mt-2 self-start">
              Agendar pelo WhatsApp
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} {SITE.tagline}. Todos os direitos reservados.
          </p>
          <p>
            {address.city}, {address.state} — Brasil
          </p>
        </div>
      </Container>
    </footer>
  )
}
