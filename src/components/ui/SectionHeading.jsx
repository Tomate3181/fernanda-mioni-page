import { cn } from './cn'
import Eyebrow from './Eyebrow'

/** Bloco de título de seção: etiqueta + H2 + texto de apoio. */
export default function SectionHeading({ eyebrow, title, description, align = 'center', as: Tag = 'h2', className }) {
  const centered = align === 'center'
  return (
    <div className={cn('flex flex-col gap-4', centered ? 'items-center text-center' : 'items-start', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="font-display text-4xl font-medium leading-[1.1] text-charcoal text-balance sm:text-5xl">
        {title}
      </Tag>
      {description && (
        <p className={cn('text-base leading-relaxed text-muted-gray text-pretty', centered && 'max-w-xl')}>
          {description}
        </p>
      )}
    </div>
  )
}
