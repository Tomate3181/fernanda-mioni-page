import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

export function useSmoothScroll() {
  useEffect(() => {
    // Detectar se é dispositivo móvel/touch
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Inicializar Lenis com configurações otimizadas
    const lenis = new Lenis({
      duration: 1.2,        // Duração da animação (mais suave)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing customizado suave
      direction: 'vertical', // Direção vertical
      gestureDirection: 'vertical', // Gestos verticais
      smooth: true,         // Ativar smooth scroll
      mouseMultiplier: 1,   // Multiplicador do mouse
      smoothTouch: false,   // Desativar smooth touch para performance mobile
      touchMultiplier: isMobile ? 1.5 : 2, // Multiplicador touch otimizado
      infinite: false,      // Não infinito
      normalizeWheel: true, // Normalizar wheel events
      lerp: isMobile ? 0.15 : 0.1, // Interpolação mais rápida em mobile
      wheelMultiplier: isMobile ? 0.8 : 1, // Reduzir sensibilidade em mobile
    })

    // Adicionar classe ao HTML para estilos CSS
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Função de animação frame
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Integração com GSAP ScrollTrigger se necessário
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Otimizar lag smoothing
    gsap.ticker.lagSmoothing(0)

    // Função para scroll suave para elementos
    window.scrollToSection = (target) => {
      lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }

    // Event listeners para links âncora
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          lenis.scrollTo(target, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })
        }
      }
    }

    // Adicionar listeners para todos os links âncora existentes
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick)
    })

    // Observer para novos links âncora
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const newAnchorLinks = node.querySelectorAll ? node.querySelectorAll('a[href^="#"]') : []
            newAnchorLinks.forEach(link => {
              link.addEventListener('click', handleAnchorClick)
            })
          }
        })
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup
    return () => {
      // Remover classes
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      
      // Destruir Lenis
      lenis.destroy()
      
      // Remover GSAP ticker
      gsap.ticker.remove()
      
      // Remover event listeners
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick)
      })
      
      // Desconectar observer
      observer.disconnect()
      
      // Remover função global
      delete window.scrollToSection
    }
  }, [])
}