import { useEffect, useState, useRef } from 'react'
import { animate } from 'animejs'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroContentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (orb1Ref.current && orb2Ref.current) {
      const updateOrbs = () => {
        if (orb1Ref.current) {
          animate(orb1Ref.current, {
            translateX: mousePosition.x,
            translateY: mousePosition.y,
            duration: 2000,
            easing: 'easeOutQuad',
          })
        }
        if (orb2Ref.current) {
          animate(orb2Ref.current, {
            translateX: -mousePosition.x,
            translateY: -mousePosition.y,
            duration: 2000,
            easing: 'easeOutQuad',
          })
        }
      }
      updateOrbs()
    }
  }, [mousePosition])

  useEffect(() => {
    if (heroContentRef.current) {
      animate(heroContentRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 200,
        easing: 'easeOutExpo',
      })
    }
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 400,
        easing: 'easeOutExpo',
      })
    }
    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 600,
        easing: 'easeOutExpo',
      })
    }
    if (buttonsRef.current) {
      animate(buttonsRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: (el, i) => 800 + i * 100,
        easing: 'easeOutExpo',
      })
    }
    if (scrollIndicatorRef.current) {
      animate(scrollIndicatorRef.current, {
        opacity: [0, 1],
        duration: 600,
        delay: 1200,
        easing: 'easeOutQuad',
      })
      const dot = scrollIndicatorRef.current.querySelector('.scroll-dot')
      const indicator = scrollIndicatorRef.current.querySelector('.scroll-indicator')
      if (dot) {
        animate(dot, {
          translateY: [0, 12, 0],
          duration: 1500,
          delay: 1200,
          loop: true,
          easing: 'easeInOutQuad',
        })
      }
      if (indicator) {
        animate(indicator, {
          translateY: [0, 10, 0],
          duration: 1500,
          delay: 1200,
          loop: true,
          easing: 'easeInOutQuad',
        })
      }
    }
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleButtonHover = (e) => {
    animate(e.currentTarget, {
      scale: 1.05,
      translateY: -2,
      duration: 300,
      easing: 'easeOutQuad',
    })
    const icon = e.currentTarget.querySelector('.btn-icon')
    if (icon) {
      animate(icon, {
        translateX: 4,
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleButtonLeave = (e) => {
    animate(e.currentTarget, {
      scale: 1,
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad',
    })
    const icon = e.currentTarget.querySelector('.btn-icon')
    if (icon) {
      animate(icon, {
        translateX: 0,
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleButtonClick = (e) => {
    animate(e.currentTarget, {
      scale: 0.95,
      duration: 100,
      easing: 'easeOutQuad',
      complete: () => {
        animate(e.currentTarget, {
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad',
        })
      },
    })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
      </div>

      {/* Floating Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-20 left-20 w-72 h-72 bg-accent-green/20 rounded-full blur-3xl"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-20 right-20 w-96 h-96 bg-accent-red/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={heroContentRef} className="opacity-0">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight opacity-0"
          >
            <span className="bg-gradient-to-r from-white via-accent-green to-white bg-clip-text text-transparent">
              Transform Your Body.
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent-green via-white to-accent-red bg-clip-text text-transparent">
              Transform Your Life.
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto opacity-0"
          >
            Join thousands of members achieving their fitness goals with our
            state-of-the-art facilities and expert trainers.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
          >
            <button
              onClick={(e) => {
                handleButtonClick(e)
                scrollToSection('#contact')
              }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="group px-8 py-4 bg-accent-green text-dark-bg font-bold text-lg rounded-lg hover:bg-accent-green/90 transition-all glow-green shadow-lg shadow-accent-green/50 inline-flex items-center"
            >
              <span>Join Now</span>
              <span className="btn-icon ml-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-dark-bg/10">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={(e) => {
                handleButtonClick(e)
                scrollToSection('#contact')
              }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="group px-8 py-4 border-2 border-accent-green text-accent-green font-bold text-lg rounded-lg hover:bg-accent-green/10 transition-all inline-flex items-center"
            >
              <span>Book Free Trial</span>
              <span className="btn-icon ml-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-green/5">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h8M8 12h4m-7 5h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <div className="scroll-indicator w-6 h-10 border-2 border-accent-green rounded-full flex justify-center">
          <div className="scroll-dot w-1 h-3 bg-accent-green rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}

export default Hero
