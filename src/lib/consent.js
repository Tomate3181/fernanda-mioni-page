/**
 * Gerenciador real de consentimento LGPD (Lei nº 13.709/2018).
 *
 * Nenhum script de rastreamento (Google Analytics 4, Meta Pixel) ou mídia
 * externa com cookies de terceiros é disparado antes do consentimento explícito
 * da visitante. As preferências ficam salvas com versão e timestamp em localStorage
 * e podem ser alteradas ou revogadas a qualquer momento.
 */

const STORAGE_KEY = 'fm_lgpd_consent_v1'
const CONSENT_VERSION = 1

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || ''

let gaLoaded = false
let pixelLoaded = false

const listeners = new Set()

function notify() {
  listeners.forEach((fn) => fn())
}

/** Lê o consentimento salvo ou retorna null se a visitante ainda não escolheu. */
export function getStoredConsent() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.version !== CONSENT_VERSION) return null
    return {
      version: CONSENT_VERSION,
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      externalMedia: Boolean(parsed.externalMedia),
      updatedAt: parsed.updatedAt || null,
    }
  } catch {
    return null
  }
}

/** Carrega o Google Analytics 4 apenas após consentimento explícito de `analytics`. */
function enableGoogleAnalytics() {
  if (!GA_ID || typeof document === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  window.gtag('consent', 'update', { analytics_storage: 'granted' })

  if (gaLoaded) return
  gaLoaded = true

  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  script.dataset.consentCategory = 'analytics'
  document.head.appendChild(script)
}

function disableGoogleAnalytics() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
  }
  if (GA_ID && typeof window !== 'undefined') {
    window[`ga-disable-${GA_ID}`] = true
  }
}

/** Carrega o Meta Pixel apenas após consentimento explícito de `marketing`. */
function enableMetaPixel() {
  if (!META_PIXEL_ID || typeof document === 'undefined') return

  if (!pixelLoaded) {
    pixelLoaded = true
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    }
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window.fbq = fbq
    window._fbq = fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.dataset.consentCategory = 'marketing'
    document.head.appendChild(script)

    window.fbq('consent', 'grant')
    window.fbq('init', META_PIXEL_ID)
    window.fbq('track', 'PageView')
  } else if (typeof window.fbq === 'function') {
    window.fbq('consent', 'grant')
  }
}

function disableMetaPixel() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('consent', 'revoke')
  }
}

/** Aplica os efeitos reais de consentimento aos scripts de terceiros. */
export function applyConsent(consent) {
  if (!consent) return

  if (consent.analytics) {
    if (GA_ID && typeof window !== 'undefined') {
      window[`ga-disable-${GA_ID}`] = false
    }
    enableGoogleAnalytics()
  } else {
    disableGoogleAnalytics()
  }

  if (consent.marketing) {
    enableMetaPixel()
  } else {
    disableMetaPixel()
  }
}

/** Salva novas preferências de consentimento e dispara/revoga scripts imediatamente. */
export function saveConsent({ analytics = false, marketing = false, externalMedia = false }) {
  const record = {
    version: CONSENT_VERSION,
    essential: true,
    analytics: Boolean(analytics),
    marketing: Boolean(marketing),
    externalMedia: Boolean(externalMedia),
    updatedAt: new Date().toISOString(),
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Modo privado estrito sem localStorage: ainda aplicamos em memória na sessão
  }

  applyConsent(record)
  notify()
  return record
}

/** Assina mudanças de consentimento (usado por CookieBanner e mapa interativo). */
export function subscribeConsent(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Inicializa scripts já autorizados anteriormente (nunca dispara sem opt-in prévio). */
export function initStoredConsent() {
  const existing = getStoredConsent()
  if (existing) applyConsent(existing)
}
