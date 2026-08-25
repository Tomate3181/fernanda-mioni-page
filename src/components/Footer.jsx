import logoFull from '@/imports/image-3.png'
import { waLink } from '@/utils/whatsapp'
import { IconWhatsApp } from '@/components/icons'

export default function Footer() {
  const navItems = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre a Fernanda', href: '#sobre' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Localização', href: '#localizacao' },
    { label: 'Agendar Horário', href: waLink('Olá Fernanda! Gostaria de agendar.') },
  ]

  return (
    <footer
      className="py-16 md:py-20"
      style={{ background: '#1a1714' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <img
              src={logoFull}
              alt="Fernanda Mioni Lash & Brow"
              className="w-44 object-contain"
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Especialista em extensão de cílios e design de sobrancelhas em Caçapava‑SP.
              Beleza com cuidado e sofisticação.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/felashdesigner"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={waLink('Olá Fernanda!')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
                aria-label="WhatsApp"
              >
                <IconWhatsApp />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.18em] uppercase text-[#D88A9A] font-medium">Navegação</h4>
            {navItems.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.18em] uppercase text-[#D88A9A] font-medium">Contato</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:alinemioni1987@gmail.com"
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                alinemioni1987@gmail.com
              </a>
              <a
                href="https://instagram.com/felashdesigner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                @felashdesigner
              </a>
              <p className="text-sm text-white/50 leading-relaxed">
                Rua Coronel Jaime Rolemberg de Lima, 370<br />
                Jardim São José — Caçapava, SP
              </p>
            </div>

            <a
              href={waLink('Olá Fernanda! Gostaria de agendar um horário.')}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-medium mt-2 transition-all duration-300 hover:opacity-90"
              style={{ background: 'rgba(216,138,154,0.25)', border: '1px solid rgba(216,138,154,0.35)' }}
            >
              <IconWhatsApp />
              Agendar pelo WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-white/30">
            © 2025 Fernanda Mioni Lash &amp; Brow. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20">Caçapava, SP — Brasil</p>
        </div>
      </div>
    </footer>
  )
}
