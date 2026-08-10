import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import GalleryHero from '../components/GalleryHero'
import { LogoBar } from '../components/landing/LogoBar'
import { FeatureSection } from '../components/landing/FeatureSection'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Testimonials } from '../components/landing/Testimonials'
import { Metrics } from '../components/landing/Metrics'
import { FinalCTA } from '../components/landing/FinalCTA'
import { Footer } from '../components/landing/Footer'
import { AuthModal } from '../components/auth/AuthModal'
import { useAuthRedirect } from '../hooks/useAuthRedirect'

export function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [authOpen, setAuthOpen] = useState(() => searchParams.get('auth') === 'open')

  useAuthRedirect()

  useEffect(() => {
    if (searchParams.get('auth') === 'open') {
      setSearchParams({}, { replace: true })
    }
  }, [searchParams, setSearchParams])

  return (
    <>
      <Navbar />
      <main>
        <Hero onAuthOpen={() => setAuthOpen(true)} />
        <GalleryHero />
        <LogoBar />
        <FeatureSection />
        <HowItWorks />
        <Testimonials />
        <Metrics />
        <FinalCTA onAuthOpen={() => setAuthOpen(true)} />
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
