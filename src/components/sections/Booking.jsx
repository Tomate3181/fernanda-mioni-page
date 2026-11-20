import { useId, useRef, useState } from 'react'
import { SERVICES, SERVICE_TABS } from '@/data/services'
import { SITE } from '@/config/site'
import { waLink } from '@/lib/whatsapp'
import { Button, Section, SectionHeading, cn } from '@/components/ui'
import { IconAlert, IconCalendar, IconCheck, IconClock, IconLoader, IconWhatsApp } from '@/components/icons'

const PERIODS = ['Manhã', 'Tarde', 'Sábado', 'Flexível']

const SERVICE_GROUPS = SERVICE_TABS.map((tab) => ({
  label: tab.label,
  items: SERVICES[tab.key].map((s) => `${s.title} (${s.duration})`),
}))

/** Formata telefone brasileiro progressivamente: (12) 99600-2138 */
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(name, value) {
  const trimmed = value.trim()

  if (name === 'name') {
    if (!trimmed) return 'Informe seu nome para o atendimento.'
    if (trimmed.length < 3) return 'Digite pelo menos 3 caracteres.'
    return ''
  }

  if (name === 'phone') {
    const digits = trimmed.replace(/\D/g, '')
    if (!digits) return 'Informe seu número de WhatsApp com DDD.'
    if (digits.length < 10 || digits.length > 11) return 'Digite um WhatsApp válido com DDD (10 ou 11 dígitos).'
    if (digits[0] === '0' || digits[1] === '0') return 'Informe um DDD válido (ex.: 12).'
    return ''
  }

  if (name === 'email') {
    if (!trimmed) return 'Informe um e-mail para receber o retorno.'
    if (!EMAIL_RE.test(trimmed)) return 'Digite um e-mail válido (ex.: nome@email.com).'
    return ''
  }

  if (name === 'service') {
    if (!trimmed) return 'Selecione o procedimento desejado.'
    return ''
  }

  return ''
}

function buildBookingMessage(data) {
  return [
    'Olá Fernanda! Gostaria de solicitar um pré-agendamento:',
    `• Nome: ${data.name.trim()}`,
    `• WhatsApp: ${data.phone.trim()}`,
    `• E-mail: ${data.email.trim()}`,
    `• Procedimento: ${data.service}`,
    `• Período preferido: ${data.period}`,
  ].join('\n')
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  service: '',
  period: 'Flexível',
}

export default function Booking({ onOpenPrivacy }) {
  const formId = useId()
  const [values, setValues] = useState(INITIAL_FORM)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | sent
  const [submittedData, setSubmittedData] = useState(null)

  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    email: useRef(null),
    service: useRef(null),
  }

  const updateField = (name, rawValue) => {
    const value = name === 'phone' ? formatPhone(rawValue) : rawValue
    setValues((prev) => ({ ...prev, [name]: value }))

    if (touched[name] || value.trim().length > 0) {
      setTouched((prev) => ({ ...prev, [name]: true }))
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const requiredFields = ['name', 'phone', 'email', 'service']
    const nextErrors = {}
    const nextTouched = { ...touched }

    for (const key of requiredFields) {
      nextTouched[key] = true
      const msg = validateField(key, values[key])
      if (msg) nextErrors[key] = msg
    }

    setTouched(nextTouched)
    setErrors(nextErrors)

    const firstInvalid = requiredFields.find((key) => nextErrors[key])
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus()
      return
    }

    setStatus('loading')
    const snapshot = { ...values }

    window.setTimeout(() => {
      setSubmittedData(snapshot)
      setStatus('sent')
    }, 600)
  }

  const inputStateClass = (key) => {
    const hasError = Boolean(touched[key] && errors[key])
    const isValid = Boolean(touched[key] && !errors[key] && values[key].trim())
    return cn(
      'h-12 w-full rounded-xl border bg-white px-4 text-base text-charcoal placeholder:text-muted-gray/60',
      'transition-[border-color,box-shadow] duration-250 ease-soft focus:outline-none',
      hasError
        ? 'border-red-600/80 pr-10 focus:border-red-600 focus:ring-2 focus:ring-red-600/15'
        : isValid
          ? 'border-emerald-700/55 pr-10 focus:border-rose-ink focus:ring-2 focus:ring-rose-ink/15'
          : 'border-champagne/75 hover:border-rose-gold/75 focus:border-rose-ink focus:ring-2 focus:ring-rose-ink/15',
    )
  }

  return (
    <Section id="agendamento" tone="white">
      <div className="grid items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        {/* Contexto e horários */}
        <div className="flex flex-col gap-6">
          <SectionHeading
            title="Reserve o seu horário"
            description="Preencha os dados para adiantar seu atendimento. A confirmação da data acontece pelo WhatsApp."
            align="left"
          />

          <div data-reveal className="flex flex-col gap-4 rounded-3xl border border-champagne/60 bg-bg-soft p-6">
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-rose-ink">
                <IconClock className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal">Horários disponíveis</p>
                {SITE.hours.map((h) => (
                  <p key={h.label} className="text-sm text-muted-gray">
                    {h.label}: {h.value}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-champagne/45 pt-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush text-rose-ink">
                <IconCalendar className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal">Atendimento 1:1 com hora marcada</p>
                <p className="text-sm text-muted-gray">
                  Prefere falar direto? Chame no{' '}
                  <a
                    href={waLink('Olá Fernanda! Gostaria de verificar os horários disponíveis.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-rose-ink underline-offset-4 transition-colors hover:text-charcoal hover:underline"
                  >
                    WhatsApp {SITE.whatsappDisplay}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário com validação inline em tempo real */}
        <div data-reveal className="rounded-3xl border border-champagne/60 bg-bg-soft p-6 shadow-card sm:p-8">
          {status === 'sent' && submittedData ? (
            <div role="status" aria-live="polite" className="animate-fade-up flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-700/10 text-emerald-800">
                  <IconCheck className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    Solicitação pronta
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-medium text-charcoal">
                    Tudo certo, {submittedData.name.trim().split(' ')[0]}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-gray">
                    Seus dados foram validados. Envie a mensagem pronta pelo WhatsApp para Fernanda confirmar o melhor
                    horário.
                  </p>
                </div>
              </div>

              <dl className="grid gap-3 rounded-2xl border border-champagne/55 bg-white p-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-gray">Procedimento</dt>
                  <dd className="font-semibold text-charcoal">{submittedData.service}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-gray">Período</dt>
                  <dd className="font-semibold text-charcoal">{submittedData.period}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-gray">WhatsApp</dt>
                  <dd className="font-semibold text-charcoal">{submittedData.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-gray">E-mail</dt>
                  <dd className="truncate font-semibold text-charcoal">{submittedData.email}</dd>
                </div>
              </dl>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={waLink(buildBookingMessage(submittedData))}
                  size="lg"
                  icon={<IconWhatsApp className="size-5" />}
                  className="w-full sm:flex-1"
                >
                  Confirmar no WhatsApp
                </Button>
                <Button variant="neutral" size="lg" onClick={() => setStatus('idle')} className="w-full sm:w-auto">
                  Alterar dados
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-busy={status === 'loading'} className="flex flex-col gap-5">
              {/* Nome */}
              <div>
                <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Nome completo
                </label>
                <div className="relative">
                  <input
                    ref={fieldRefs.name}
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Como prefere ser chamada"
                    value={values.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    aria-invalid={Boolean(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? `${formId}-name-err` : undefined}
                    className={inputStateClass('name')}
                  />
                  {touched.name && !errors.name && values.name.trim() && (
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-700">
                      <IconCheck className="size-4" />
                    </span>
                  )}
                  {touched.name && errors.name && (
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-red-700">
                      <IconAlert className="size-4" />
                    </span>
                  )}
                </div>
                {touched.name && errors.name && (
                  <p id={`${formId}-name-err`} role="alert" className="mt-1.5 animate-fade-up text-xs font-medium text-red-700">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* WhatsApp + E-mail */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      ref={fieldRefs.phone}
                      id={`${formId}-phone`}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="(12) 99999-9999"
                      value={values.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={Boolean(touched.phone && errors.phone)}
                      aria-describedby={touched.phone && errors.phone ? `${formId}-phone-err` : undefined}
                      className={inputStateClass('phone')}
                    />
                    {touched.phone && !errors.phone && values.phone.trim() && (
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-700">
                        <IconCheck className="size-4" />
                      </span>
                    )}
                    {touched.phone && errors.phone && (
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-red-700">
                        <IconAlert className="size-4" />
                      </span>
                    )}
                  </div>
                  {touched.phone && errors.phone && (
                    <p id={`${formId}-phone-err`} role="alert" className="mt-1.5 animate-fade-up text-xs font-medium text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      ref={fieldRefs.email}
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      placeholder="voce@email.com"
                      value={values.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? `${formId}-email-err` : undefined}
                      className={inputStateClass('email')}
                    />
                    {touched.email && !errors.email && values.email.trim() && (
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-700">
                        <IconCheck className="size-4" />
                      </span>
                    )}
                    {touched.email && errors.email && (
                      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-red-700">
                        <IconAlert className="size-4" />
                      </span>
                    )}
                  </div>
                  {touched.email && errors.email && (
                    <p id={`${formId}-email-err`} role="alert" className="mt-1.5 animate-fade-up text-xs font-medium text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Procedimento */}
              <div>
                <label htmlFor={`${formId}-service`} className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Procedimento desejado
                </label>
                <select
                  ref={fieldRefs.service}
                  id={`${formId}-service`}
                  name="service"
                  required
                  value={values.service}
                  onChange={(e) => updateField('service', e.target.value)}
                  onBlur={() => handleBlur('service')}
                  aria-invalid={Boolean(touched.service && errors.service)}
                  aria-describedby={touched.service && errors.service ? `${formId}-service-err` : undefined}
                  className={cn(inputStateClass('service'), !values.service && 'text-muted-gray')}
                >
                  <option value="">Selecione uma opção</option>
                  {SERVICE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.items.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Avaliação / orientação com a Fernanda">Avaliação / orientação com a Fernanda</option>
                </select>
                {touched.service && errors.service && (
                  <p id={`${formId}-service-err`} role="alert" className="mt-1.5 animate-fade-up text-xs font-medium text-red-700">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Período preferido */}
              <fieldset>
                <legend className="mb-2 block text-sm font-semibold text-charcoal">Período preferido</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {PERIODS.map((period) => {
                    const active = values.period === period
                    return (
                      <label
                        key={period}
                        className={cn(
                          'flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition-[background-color,border-color,color,transform] duration-250 ease-soft active:scale-[0.98]',
                          active
                            ? 'border-rose-ink bg-rose-ink text-white'
                            : 'border-champagne/70 bg-white text-muted-gray hover:border-rose-ink/45 hover:text-charcoal',
                        )}
                      >
                        <input
                          type="radio"
                          name="period"
                          value={period}
                          checked={active}
                          onChange={() => setValues((prev) => ({ ...prev, period }))}
                          className="sr-only"
                        />
                        {period}
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div className="flex flex-col gap-3 pt-1">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  icon={status === 'loading' ? <IconLoader className="size-4" /> : <IconCalendar className="size-4" />}
                  className="w-full"
                >
                  {status === 'loading' ? 'Preparando solicitação...' : 'Solicitar horário'}
                </Button>
                <p className="text-center text-xs leading-relaxed text-muted-gray">
                  Seus dados são usados apenas para retorno do agendamento, conforme nossa{' '}
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
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
