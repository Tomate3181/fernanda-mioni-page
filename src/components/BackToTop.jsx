import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Detectar mobile para otimizar listeners
    const isMobile = 'ontouchstart' in window || window.innerWidth <= 768

    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    // Throttle em mobile para performance
    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          toggleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    const scrollHandler = isMobile ? optimizedScroll : toggleVisibility
    window.addEventListener('scroll', scrollHandler, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollToTop = () => {
    if (window.scrollToSection) {
      window.scrollToSection('#top')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full transition-opacity duration-300 touch-manipulation ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(135deg, #D88A9A 0%, #c47485 100%)',
        boxShadow: '0 8px 24px rgba(216,138,154,0.4)',
      }}
      aria-label="Voltar ao topo"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth={2} 
        className="w-5 h-5 md:w-6 md:h-6 mx-auto"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m18 15-6-6-6 6" />
      </svg>
    </button>
  )
}