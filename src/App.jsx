import { useRef, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import CookieBanner from '@/components/layout/CookieBanner'
import PrivacyModal from '@/components/layout/PrivacyModal'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Testimonials from '@/components/sections/Testimonials'
import Booking from '@/components/sections/Booking'
import LocationFaq from '@/components/sections/LocationFaq'
import { useSmoothScroll } from '@/lib/useSmoothScroll'
import { useReveal } from '@/lib/useReveal'

export default function App() {
  const mainRef = useRef(null)
  useSmoothScroll()
  useReveal(mainRef)

  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:shadow-float"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main ref={mainRef} id="conteudo">
        <Hero />
        <Features />
        <About />
        <Services />
        <BeforeAfter />
        <Testimonials />
        <Booking onOpenPrivacy={() => setPrivacyOpen(true)} />
        <LocationFaq />
      </main>
      <Footer
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenCookiePreferences={() => setCookiePrefsOpen(true)}
      />
      <BackToTop />
      <CookieBanner
        forceOpen={cookiePrefsOpen}
        onClosePreferences={() => setCookiePrefsOpen(false)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />
      <PrivacyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onManageCookies={() => setCookiePrefsOpen(true)}
      />
    </>
  )
}
