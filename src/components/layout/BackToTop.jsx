import { useEffect, useState } from 'react'
import { scrollToTarget } from '@/lib/useSmoothScroll'
import { cn } from '@/components/ui'
import { IconArrowUp } from '@/components/icons'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 700)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label="Voltar ao topo"
      inert={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        'group fixed bottom-5 right-5 z-40 isolate grid size-12 place-items-center overflow-hidden rounded-full border border-charcoal/15 bg-charcoal text-white shadow-float',
        'transition-[opacity,transform,border-color] duration-350 ease-soft active:scale-[0.95] md:bottom-8 md:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 translate-y-full rounded-full bg-rose-ink transition-transform duration-350 ease-soft group-hover:translate-y-0"
      />
      <IconArrowUp className="size-5 transition-transform duration-300 ease-soft group-hover:-translate-y-0.5" />
    </button>
  )
}
