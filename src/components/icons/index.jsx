// Ícones SVG do site. Todos herdam a cor do texto (currentColor) e são decorativos
// por padrão (aria-hidden); quem precisa de rótulo coloca aria-label no botão/link.

const Outline = ({ className = 'size-5', strokeWidth = 1.5, children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
)

export const IconWhatsApp = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export const IconInstagram = ({ className = 'size-4' }) => (
  <Outline className={className} strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Outline>
)

export const IconChevronDown = ({ className = 'size-4' }) => (
  <Outline className={className}>
    <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </Outline>
)

export const IconChevronLeft = ({ className = 'size-4' }) => (
  <Outline className={className}>
    <path d="M15.75 19.5L8.25 12l7.5-7.5" />
  </Outline>
)

export const IconChevronRight = ({ className = 'size-4' }) => (
  <Outline className={className}>
    <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </Outline>
)

export const IconArrowRight = ({ className = 'size-4' }) => (
  <Outline className={className} strokeWidth={2}>
    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </Outline>
)

export const IconArrowUp = ({ className = 'size-5' }) => (
  <Outline className={className} strokeWidth={2}>
    <path d="m18 15-6-6-6 6" />
  </Outline>
)

export const IconMenu = ({ className = 'size-6' }) => (
  <Outline className={className}>
    <path d="M3.75 7h16.5M3.75 12h16.5m-16.5 5h16.5" />
  </Outline>
)

export const IconClose = ({ className = 'size-6' }) => (
  <Outline className={className}>
    <path d="M6 18L18 6M6 6l12 12" />
  </Outline>
)

export const IconStar = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export const IconArrows = ({ className = 'size-5' }) => (
  <Outline className={className} strokeWidth={2}>
    <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
  </Outline>
)

export const IconMap = ({ className = 'size-5' }) => (
  <Outline className={className}>
    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </Outline>
)

export const IconClock = ({ className = 'size-5' }) => (
  <Outline className={className}>
    <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Outline>
)

export const IconMail = ({ className = 'size-5' }) => (
  <Outline className={className}>
    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </Outline>
)

// Ícones dos diferenciais
export const IconHeart = ({ className = 'size-6' }) => (
  <Outline className={className}>
    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </Outline>
)

export const IconSparkles = ({ className = 'size-6' }) => (
  <Outline className={className}>
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </Outline>
)

export const IconEye = ({ className = 'size-6' }) => (
  <Outline className={className}>
    <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </Outline>
)

export const IconCheck = ({ className = 'size-4' }) => (
  <Outline className={className} strokeWidth={2}>
    <path d="M4.5 12.75l6 6 9-13.5" />
  </Outline>
)

export const IconAlert = ({ className = 'size-4' }) => (
  <Outline className={className} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4m0 4h.01" />
  </Outline>
)

export const IconShield = ({ className = 'size-5' }) => (
  <Outline className={className}>
    <path d="M12 3l7.5 3v6c0 4.5-3.2 7.8-7.5 9-4.3-1.2-7.5-4.5-7.5-9V6L12 3z" />
    <path d="M9.5 12.25l1.75 1.75 3.5-3.75" />
  </Outline>
)

export const IconCalendar = ({ className = 'size-5' }) => (
  <Outline className={className}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3.5v3m8-3v3M3.5 9.5h17" />
  </Outline>
)

export const IconLoader = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" className="opacity-25" />
    <path
      d="M21 12a9 9 0 00-9-9"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
)

