import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

export function useSmoothScroll() {
  useEffect(() => {
    // Detectar se é dispositivo móvel/touch
    const isMobile = 'ontouchstart' in window || 
                    navigator.maxTouchPoints > 0 || 
                    window.innerWidth <= 768

    let lenis = null

    if (!isMobile) {
      // APENAS DESKTOP: Lenis completo
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        infinite: false,
        normalizeWheel: true,
        lerp: 0.1,
      })

      document.documentElement.classList.add('lenis', 'lenis-smooth')

      function raf(time) {
        if (lenis) {
          lenis.raf(time)
        }
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      gsap.ticker.add((time) => {
        if (lenis) {
          lenis.raf(time * 1000)
        }
      })

      gsap.ticker.lagSmoothing(0)
    }

    // Função simplificada para scroll
    window.scrollToSection = (target) => {
      const element = typeof target === 'string' ? document.querySelector(target) : target
      if (!element) return

      if (lenis && !isMobile) {
        // Desktop: Lenis
        lenis.scrollTo(element, { duration: 1.5 })
      } else {
        // Mobile: scroll nativo básico
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Event listeners simplificados para mobile
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          window.scrollToSection(target)
        }
      }
    }

    // Apenas adicionar listeners, sem observers complexos em mobile
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick, { passive: false })
    })

    // Cleanup simplificado
    return () => {
      if (lenis && !isMobile) {
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
        lenis.destroy()
        gsap.ticker.remove()
      }
      
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick)
      })
      
      delete window.scrollToSection
    }
  }, [])
}