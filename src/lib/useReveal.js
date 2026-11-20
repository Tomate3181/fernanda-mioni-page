import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Coreografia editorial de entrada ao rolar a página.
 * - Usa GSAP ScrollTrigger (dispara uma única vez, sem travar a rolagem).
 * - Desativado automaticamente sob `prefers-reduced-motion: reduce`.
 * - Qualquer elemento com `data-reveal` entra suavemente; `data-reveal-group`
 *   escalona os filhos `[data-reveal-item]` com ritmo editorial.
 */
export function useReveal(rootRef) {
  useLayoutEffect(() => {
    const el = rootRef?.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el)

      q('[data-reveal]').forEach((node) => {
        gsap.from(node, {
          autoAlpha: 0,
          y: 22,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: node,
            start: 'top 88%',
            once: true,
          },
        })
      })

      q('[data-reveal-group]').forEach((group) => {
        const items = group.querySelectorAll('[data-reveal-item]')
        if (!items.length) return
        gsap.from(items, {
          autoAlpha: 0,
          y: 20,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
        })
      })
    })

    return () => mm.revert()
  }, [rootRef])
}
