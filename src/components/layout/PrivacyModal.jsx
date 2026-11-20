import { useEffect } from 'react'
import { SITE } from '@/config/site'
import { Button } from '@/components/ui'
import { IconClose } from '@/components/icons'

export default function PrivacyModal({ open, onClose, onManageCookies }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/55 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-champagne/60 bg-white p-6 shadow-photo sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-champagne/40 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-ink">LGPD · Lei nº 13.709/2018</p>
            <h2 id="privacy-modal-title" className="mt-1 font-display text-3xl font-medium text-charcoal">
              Política de Privacidade
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar política de privacidade"
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted-gray transition-colors hover:bg-blush hover:text-charcoal"
          >
            <IconClose className="size-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-muted-gray">
          <p>
            O estúdio <strong className="font-semibold text-charcoal">{SITE.name} {SITE.tagline}</strong> respeita a sua privacidade e trata dados pessoais apenas para finalidades claras e legítimas.
          </p>

          <div>
            <h3 className="text-sm font-semibold text-charcoal">1. Dados coletados no pré-agendamento</h3>
            <p className="mt-1">
              Nome, WhatsApp, e-mail e procedimento desejado são utilizados exclusivamente para organizar e confirmar o seu horário de atendimento. Não vendemos nem compartilhamos seus dados com terceiros.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-charcoal">2. Cookies e scripts de terceiros</h3>
            <p className="mt-1">
              Cookies essenciais registram sua escolha de consentimento. Ferramentas de análise (Google Analytics), marketing (Meta Pixel) e mapas incorporados (Google Maps) permanecem bloqueados até que você autorize expressamente.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-charcoal">3. Seus direitos como titular</h3>
            <p className="mt-1">
              Você pode solicitar confirmação, correção, exclusão de dados ou revogar seu consentimento a qualquer momento pelo e-mail{' '}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-rose-ink hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-champagne/40 pt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onClose()
              onManageCookies()
            }}
          >
            Gerenciar cookies
          </Button>
          <Button size="sm" onClick={onClose}>
            Entendi
          </Button>
        </div>
      </div>
    </div>
  )
}
