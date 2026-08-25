import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import About from '@/components/About'
import Services from '@/components/Services'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import LocationFaq from '@/components/LocationFaq'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Services />
        <BeforeAfter />
        <Testimonials />
        <LocationFaq />
      </main>
      <Footer />
    </div>
  )
}
