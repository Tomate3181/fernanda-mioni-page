import { cn } from './cn'
import Container from './Container'

const TONES = {
  white: 'bg-white',
  soft: 'bg-bg-soft',
  cream: 'bg-bg-cream',
}

/** Seção padrão da página: fundo, espaçamento vertical e container. */
export default function Section({ id, tone = 'white', size, className, containerClassName, children, ...props }) {
  return (
    <section id={id} className={cn('relative py-20 md:py-28', TONES[tone], className)} {...props}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}
