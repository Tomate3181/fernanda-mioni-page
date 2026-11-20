import { useEffect, useState } from 'react'
import { getStoredConsent, saveConsent, subscribeConsent } from '@/lib/consent'
import { Button, Container, cn } from '@/components/ui'
import { IconClose, IconShield } from '@/components/icons'

const CATEGORIES = [
  {
    key: 'essential',
    title: 'Essenciais',
    desc: 'Necessários para o funcionamento do site e registro da sua escolha de privacidade.',
    locked: true,
  },
  {
    key: 'analytics',
    title: 'Análise e desempenho (Google Analytics)',
    desc: 'Mede acessos de forma agregada para melhorar o atendimento. Só carrega com seu aceite.',
  },
  {
    key: 'marketing',
    title: 'Marketing (Meta Pixel)',
    desc: 'Avalia campanhas do estúdio no Instagram e Facebook. Só dispara após autorização.',
  },
  {
    key: 'externalMedia',
    title: 'Mapa interativo (Google Maps)',
    desc: 'Permite carregar o mapa incorporado com a localização do estúdio automaticamente.',
  },
]

export default function CookieBanner({ forceOpen, onClosePreferences, onOpenPrivacy }) {
  const [stored, setStored] = useState(() => getStoredConsent())
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState(() => ({
    analytics: stored?.analytics ?? false,
    marketing: stored?.marketing ?? false,
    externalMedia: stored?.externalMedia ?? false,
  }))

  useEffect(() => {
    return subscribeConsent(() => {
      const next = getStoredConsent()
      setStored(next)
      if (next) {
        setPrefs({
          analytics: next.analytics,
          marketing: next.marketing,
          externalMedia: next.externalMedia,
        })
      }
    })
  }, [])

  const isVisible = !stored || forceOpen
  const showDetails = expanded || forceOpen

  if (!isVisible) return null

  const finish = (nextPrefs) => {
    saveConsent(nextPrefs)
    setExpanded(false)
    onClosePreferences?.()
  }

  return (
    <aside
      role="dialog"
      aria-modal={forceOpen ? 'true' : undefined}
      aria-label="Preferências de cookies e privacidade"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-champagne/65 bg-white/95 shadow-[0_-8px_32px_rgb(45_40_42/0.08)] backdrop-blur-xl"
    >
      <Container className="py-3.5 sm:py-4">
        {showDetails && (
          <div className="mb-4 border-b border-champagne/40 pb-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-ink">
                Gerenciar preferências de cookies (LGPD)
              </p>
              <button
                type="button"
                onClick={() => {
                  setExpanded(false)
                  onClosePreferences?.()
                }}
                aria-label="Fechar detalhes de cookies"
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted-gray transition-colors hover:bg-blush hover:text-charcoal"
              >
                <IconClose className="size-4" />
              </button>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {CATEGORIES.map((cat) => {
                const checked = cat.locked ? true : prefs[cat.key]
                return (
                  <li
                    key={cat.key}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-champagne/45 bg-bg-soft px-3.5 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-charcoal">{cat.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-gray">{cat.desc}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={cat.title}
                      disabled={cat.locked}
                      onClick={() => setPrefs((p) => ({ ...p, [cat.key]: !p[cat.key] }))}
                      className={cn(
                        'relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200',
                        checked ? 'border-rose-ink bg-rose-ink' : 'border-champagne bg-champagne/40',
                        cat.locked && 'cursor-not-allowed opacity-70',
                      )}
                    >
                      <span
                        className={cn(
                          'block size-4 rounded-full bg-white shadow-sm transition-transform duration-200',
                          checked ? 'translate-x-5.5' : 'translate-x-1',
                        )}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-2.5 lg:items-center">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-blush text-rose-ink lg:mt-0">
              <IconShield className="size-4" />
            </span>
            <p className="text-xs leading-relaxed text-muted-gray sm:text-[13px]">
              <strong className="font-semibold text-charcoal">Privacidade (LGPD):</strong> análise, marketing e mapa só
              carregam com seu aceite.{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="font-semibold text-rose-ink underline-offset-4 hover:underline"
              >
                Política de Privacidade
              </button>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
            <Button
              size="sm"
              onClick={() => finish({ analytics: true, marketing: true, externalMedia: true })}
              className="h-10 flex-1 sm:flex-none"
            >
              Aceitar todos
            </Button>
            <Button
              variant="neutral"
              size="sm"
              onClick={() => finish({ analytics: false, marketing: false, externalMedia: false })}
              className="h-10 flex-1 sm:flex-none"
            >
              Apenas essenciais
            </Button>
            {showDetails ? (
              <Button variant="outline" size="sm" onClick={() => finish(prefs)} className="h-10 w-full sm:w-auto">
                Salvar escolhas
              </Button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="px-2.5 py-2 text-xs font-semibold text-rose-ink underline-offset-4 hover:underline"
              >
                Personalizar
              </button>
            )}
          </div>
        </div>
      </Container>
    </aside>
  )
}
