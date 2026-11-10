import { cn } from './cn'

/** Etiqueta pequena acima dos títulos ("✦ Catálogo de Serviços"). */
export default function Eyebrow({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-rose-gold/25 bg-rose-gold/[0.07] px-3.5 py-1.5',
        'whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-ink sm:text-[11px] sm:tracking-[0.18em]',
        className,
      )}
    >
      <span aria-hidden="true" className="text-rose-gold">✦</span>
      {children}
    </span>
  )
}
