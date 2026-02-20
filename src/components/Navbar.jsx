import { useState, useEffect, useRef } from 'react'
import { animate } from 'animejs'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      animate(navRef.current, {
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
      })
    }
  }, [])

  useEffect(() => {
    if (logoRef.current) {
      const handleMouseEnter = () => {
        animate(logoRef.current, {
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad',
        })
      }
      const handleMouseLeave = () => {
        animate(logoRef.current, {
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad',
        })
      }
      logoRef.current.addEventListener('mouseenter', handleMouseEnter)
      logoRef.current.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        if (logoRef.current) {
          logoRef.current.removeEventListener('mouseenter', handleMouseEnter)
          logoRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToDashboard = () => {
    window.location.hash = 'dashboard'
    setMobileMenuOpen(false)
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleNavHover = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline')
    if (underline) {
      animate(underline, {
        width: '100%',
        duration: 400,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleNavLeave = (e) => {
    const underline = e.currentTarget.querySelector('.nav-underline')
    if (underline) {
      animate(underline, {
        width: '0%',
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleButtonHover = (e) => {
    animate(e.currentTarget, {
      scale: 1.05,
      translateY: -1,
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
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-bg/95 backdrop-blur-md border-b border-dark-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            ref={logoRef}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="EliteFit logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,255,136,0.55)]"
            />
            <span className="text-xl font-bold tracking-tight">EliteFit</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
                className="group relative text-gray-300 hover:text-accent-green transition-colors font-medium"
              >
                {item.name}
                <span className="nav-underline pointer-events-none absolute -bottom-1 left-0 h-0.5 w-0 bg-accent-green" />
              </button>
            ))}
            <button
              onClick={(e) => {
                handleButtonClick(e)
                scrollToDashboard()
              }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="group px-6 py-2 bg-accent-green text-dark-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors glow-green inline-flex items-center"
            >
              <span>Dashboard</span>
              <span className="btn-icon ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-dark-bg/10">
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
              className="group px-6 py-2 border-2 border-accent-green text-accent-green font-semibold rounded-lg hover:bg-accent-green/10 transition-colors inline-flex items-center ml-3"
            >
              <span>Join Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-dark-border">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-gray-300 hover:text-accent-green transition-colors py-2"
                style={{
                  animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={(e) => {
                handleButtonClick(e)
                scrollToDashboard()
              }}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="group w-full px-6 py-2 bg-accent-green text-dark-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors inline-flex items-center justify-center mb-3"
            >
              <span>Dashboard</span>
              <span className="btn-icon ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-dark-bg/10">
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
              className="group w-full px-6 py-2 border-2 border-accent-green text-accent-green font-semibold rounded-lg hover:bg-accent-green/10 transition-colors inline-flex items-center justify-center"
            >
              <span>Join Now</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
