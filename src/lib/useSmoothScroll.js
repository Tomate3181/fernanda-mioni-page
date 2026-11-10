import { useEffect } from 'react'
import Lenis from 'lenis'

const HEADER_OFFSET = -80
let lenis = null

/**
 * Smooth scroll com Lenis apenas em dispositivos com mouse/trackpad.
 * Em celulares (e para quem prefere menos movimento) fica o scroll nativo,
 * que já é suave e respeita o `scroll-padding-top` do CSS.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: HEADER_OFFSET, duration: 1.2 },
      stopInertiaOnNavigate: true,
    })

    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

/** Rola até um seletor/elemento (ou 0 para o topo), com ou sem Lenis. */
export function scrollToTarget(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: target === 0 ? 0 : HEADER_OFFSET, duration: 1.2 })
    return
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
