import { useEffect } from 'react'
import Lenis from 'lenis'

const HEADER_OFFSET = -80
let lenis = null

/**
 * Smooth scroll com Lenis apenas em desktops com ponteiro fino,
 * hardware adequado e sem preferência por movimento reduzido.
 * Em celulares, dispositivos fracos ou com `prefers-reduced-motion`,
 * mantém o scroll nativo do navegador para não travar a rolagem.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const fineMql = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const lowEndDevice =
      (typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4) ||
      Boolean(navigator.connection?.saveData)

    const sync = () => {
      const shouldEnable = fineMql.matches && !reducedMql.matches && !lowEndDevice
      if (shouldEnable && !lenis) {
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.1,
          anchors: { offset: HEADER_OFFSET, duration: 1.0 },
          stopInertiaOnNavigate: true,
        })
      } else if (!shouldEnable && lenis) {
        lenis.destroy()
        lenis = null
      }
    }

    sync()
    fineMql.addEventListener('change', sync)
    reducedMql.addEventListener('change', sync)

    return () => {
      fineMql.removeEventListener('change', sync)
      reducedMql.removeEventListener('change', sync)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

/** Rola até um seletor/elemento (ou 0 para o topo), respeitando reduced-motion. */
export function scrollToTarget(target) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (lenis && !reduced) {
    lenis.scrollTo(target, { offset: target === 0 ? 0 : HEADER_OFFSET, duration: 1.0 })
    return
  }

  const behavior = reduced ? 'auto' : 'smooth'
  if (target === 0) {
    window.scrollTo({ top: 0, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior, block: 'start' })
}
