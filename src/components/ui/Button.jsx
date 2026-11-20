import { cn } from './cn'

/*
 * Botão editorial com hitbox 100% estável (nunca "foge" subindo no hover)
 * e cortina interna suave isolada com named group (`group/btn`), para nunca
 * conflitar quando o botão estiver dentro de cards que também usam `group`.
 */
const VARIANTS = {
  primary: {
    base: 'bg-rose-ink text-white border border-rose-ink shadow-cta hover:border-charcoal hover:shadow-cta-hover',
    fill: 'bg-charcoal',
  },
  secondary: {
    base: 'bg-white/95 border border-charcoal/15 text-charcoal hover:border-rose-ink/50 hover:text-rose-ink',
    fill: 'bg-blush',
  },
  outline: {
    base: 'bg-transparent border border-rose-ink/45 text-rose-ink hover:border-rose-ink hover:text-white focus-visible:border-rose-ink focus-visible:text-white',
    fill: 'bg-rose-ink',
  },
  neutral: {
    base: 'bg-white border border-charcoal/20 text-charcoal hover:border-charcoal hover:text-white focus-visible:border-charcoal focus-visible:text-white',
    fill: 'bg-charcoal',
  },
  dark: {
    base: 'bg-white/5 border border-white/25 text-white hover:border-rose-ink focus-visible:border-rose-ink',
    fill: 'bg-rose-ink',
  },
}

const SIZES = {
  sm: 'h-11 px-5 text-xs gap-2',
  md: 'h-12 px-6 text-sm gap-2',
  lg: 'h-13 px-7 text-sm gap-2.5',
}

/**
 * Botão da marca. Com `href` vira link; links http abrem em nova aba.
 * Variantes: primary | secondary | outline | neutral | dark
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  children,
  type = 'button',
  ...props
}) {
  const style = VARIANTS[variant] ?? VARIANTS.primary

  const classes = cn(
    'group/btn relative isolate inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold tracking-wide',
    'transition-[color,border-color,box-shadow,transform] duration-300 ease-soft active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-55',
    style.base,
    SIZES[size],
    className,
  )

  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 translate-y-[102%] rounded-full transition-transform duration-350 ease-soft group-hover/btn:translate-y-0 group-focus-visible/btn:translate-y-0',
          style.fill,
        )}
      />
      {icon && (
        <span className="relative inline-flex shrink-0 transition-transform duration-300 ease-soft group-hover/btn:scale-105">
          {icon}
        </span>
      )}
      <span className="relative inline-flex items-center">{children}</span>
    </>
  )

  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  )
}
