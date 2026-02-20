import { useEffect, useState, useRef } from 'react'
import { animate } from 'animejs'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Programs from './components/Programs'
import WhyChooseUs from './components/WhyChooseUs'
import Pricing from './components/Pricing'
import Transformations from './components/Transformations'
import Testimonials from './components/Testimonials'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'
import MemberDashboard from './components/MemberDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const progressBarRef = useRef(null)
  const loadingRef = useRef(null)
  const lifterRef = useRef(null)
  const barbellRef = useRef(null)
  const textRef = useRef(null)

  // Handle routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'dashboard') {
        setCurrentPage('dashboard')
      } else {
        setCurrentPage('home')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Scroll progress handler (only for home page)
  useEffect(() => {
    if (currentPage !== 'home') return

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage])

  // Progress bar animation (only for home page)
  useEffect(() => {
    if (currentPage !== 'home' || !progressBarRef.current) return

    animate(progressBarRef.current, {
      scaleX: scrollProgress / 100,
      duration: 100,
      easing: 'linear',
    })
  }, [scrollProgress, currentPage])

  // Loading animation (only for home page)
  useEffect(() => {
    if (currentPage !== 'home') return

    if (loadingRef.current) {
      animate(loadingRef.current, {
        opacity: [1, 0],
        duration: 600,
        delay: 4000,
        easing: 'easeOutQuad',
        complete: () => {
          if (loadingRef.current) {
            loadingRef.current.style.pointerEvents = 'none'
          }
        },
      })
    }
    if (lifterRef.current) {
      animate(lifterRef.current, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        delay: 200,
        easing: 'easeOutBack',
      })
    }
    if (barbellRef.current) {
      animate(barbellRef.current, {
        translateY: [12, -14, 12],
        duration: 1200,
        delay: 500,
        loop: true,
        easing: 'easeInOutQuad',
      })
    }
    if (textRef.current) {
      animate(textRef.current, {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 600,
        delay: 400,
        easing: 'easeOutQuad',
      })
    }
  }, [currentPage])

  // Show dashboard if route is /dashboard
  if (currentPage === 'dashboard') {
    return <MemberDashboard />
  }

  return (
    <div className="relative">
      {/* Scroll Progress Indicator */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-green to-accent-red z-50 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Loading Animation - Bodybuilding Motion */}
      <div
        ref={loadingRef}
        className="fixed inset-0 bg-gradient-to-b from-black via-dark-bg to-black z-50 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Lifter + barbell */}
          <div ref={lifterRef} className="relative w-40 h-40 opacity-0">
            {/* Barbell */}
            <div
              ref={barbellRef}
              className="absolute inset-x-4 top-10 flex items-center justify-between"
            >
              <div className="w-6 h-10 rounded-md bg-gradient-to-b from-gray-300 to-gray-600 shadow-lg" />
              <div className="h-2 flex-1 mx-1 rounded-full bg-gradient-to-r from-gray-300 via-accent-green to-gray-300 shadow-[0_0_18px_rgba(0,255,136,0.5)]" />
              <div className="w-6 h-10 rounded-md bg-gradient-to-b from-gray-300 to-gray-600 shadow-lg" />
            </div>

            {/* Body */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
              {/* Head */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-200 to-gray-500 mb-1" />
              {/* Torso */}
              <div className="w-10 h-14 rounded-xl bg-gradient-to-b from-accent-green/80 to-emerald-700 shadow-[0_0_20px_rgba(0,255,136,0.4)] mb-1" />
              {/* Legs */}
              <div className="flex gap-3">
                <div className="w-3 h-8 rounded-full bg-gradient-to-b from-gray-300 to-gray-600" />
                <div className="w-3 h-8 rounded-full bg-gradient-to-b from-gray-300 to-gray-600" />
              </div>
            </div>
          </div>

          {/* Loading text */}
          <p
            ref={textRef}
            className="text-gray-300 text-sm tracking-wide uppercase flex items-center gap-2 opacity-0"
          >
            <span className="inline-block h-[1px] w-6 bg-accent-green/60" />
            Loading your next PR
            <span className="inline-block h-[1px] w-6 bg-accent-green/60" />
          </p>
        </div>
      </div>

      <Navbar />
      <Hero />
      <About />
      <Programs />
      <WhyChooseUs />
      <Pricing />
      <Transformations />
      <Testimonials />
      <BookingForm />
      <Footer />
    </div>
  )
}

export default App
