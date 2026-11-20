import { cn } from './cn'

/** Bloco de título editorial de seção: H2 direto + descrição concisa (sem badges/pills decorativos). */
export default function SectionHeading({ title, description, align = 'center', as: Tag = 'h2', className }) {
  const centered = align === 'center'
  return (
    <div
      data-reveal
      className={cn('flex flex-col gap-3.5', centered ? 'items-center text-center' : 'items-start', className)}
    >
      <Tag className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-charcoal text-balance sm:text-5xl">
        {title}
      </Tag>
      {description && (
        <p className={cn('text-base leading-relaxed text-muted-gray text-pretty', centered ? 'max-w-xl' : 'max-w-lg')}>
          {description}
        </p>
      )}
    </div>
  )
}
