import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar botão após scroll de 300px
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    if (window.scrollToSection) {
      // Usar Lenis se disponível
      window.scrollToSection('#top')
    } else {
      // Fallback para scroll nativo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
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
        className="w-5 h-5 mx-auto"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m18 15-6-6-6 6" />
      </svg>
    </button>
  )
}