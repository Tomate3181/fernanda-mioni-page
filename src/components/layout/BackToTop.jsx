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
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full bg-rose-gradient text-white shadow-cta',
        'transition-[opacity,transform,box-shadow] duration-500 ease-soft hover:-translate-y-0.5 hover:shadow-cta-hover md:bottom-8 md:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <IconArrowUp />
    </button>
  )
}
