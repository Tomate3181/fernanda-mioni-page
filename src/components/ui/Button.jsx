import { cn } from './cn'

const VARIANTS = {
  primary:
    'bg-rose-gradient text-white shadow-cta hover:shadow-cta-hover hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'glass border border-rose-gold/50 text-rose-ink hover:border-rose-gold hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-rose-gold/45 text-rose-ink hover:bg-rose-ink hover:border-rose-ink hover:text-white',
  neutral:
    'border border-charcoal/20 text-charcoal hover:bg-charcoal hover:border-charcoal hover:text-white',
  dark:
    'border border-rose-gold/35 bg-rose-gold/20 text-white hover:bg-rose-gold/35',
}

const SIZES = {
  sm: 'h-10 px-5 text-xs gap-1.5',
  md: 'h-12 px-6 text-sm gap-2',
  lg: 'h-14 px-7 text-sm gap-2.5',
}

/**
 * Botão da marca. Com `href` vira link; links http abrem em nova aba.
 * Variantes: primary | secondary | outline | neutral | dark
 */
export default function Button({ href, variant = 'primary', size = 'md', icon, className, children, ...props }) {
  const classes = cn(
    'group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold tracking-wide',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-soft',
    VARIANTS[variant],
    SIZES[size],
    className,
  )

  const content = (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgb(255_255_255/0.28)_50%,transparent_70%)] transition-transform duration-700 ease-soft group-hover:translate-x-full"
        />
      )}
      {icon}
      <span className="relative">{children}</span>
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
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
