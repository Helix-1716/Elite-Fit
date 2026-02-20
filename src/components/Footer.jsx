import { useRef, useEffect } from 'react'
import { animate } from 'animejs'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const socialRefs = useRef([])

  useEffect(() => {
    socialRefs.current.forEach((ref, index) => {
      if (ref) {
        const handleHover = () => {
          animate(ref, {
            scale: 1.1,
            translateY: -2,
            duration: 300,
            easing: 'easeOutQuad',
          })
        }
        const handleLeave = () => {
          animate(ref, {
            scale: 1,
            translateY: 0,
            duration: 300,
            easing: 'easeOutQuad',
          })
        }
        const handleClick = () => {
          animate(ref, {
            scale: 0.9,
            duration: 100,
            easing: 'easeOutQuad',
            complete: () => {
              animate(ref, {
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad',
              })
            },
          })
        }
        ref.addEventListener('mouseenter', handleHover)
        ref.addEventListener('mouseleave', handleLeave)
        ref.addEventListener('click', handleClick)
        return () => {
          ref.removeEventListener('mouseenter', handleHover)
          ref.removeEventListener('mouseleave', handleLeave)
          ref.removeEventListener('click', handleClick)
        }
      }
    })
  }, [])

  const footerLinks = {
    quickLinks: [
      { name: 'About Us', href: '#about' },
      { name: 'Programs', href: '#programs' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Testimonials', href: '#testimonials' },
    ],
    contact: [
      { name: 'Email: info@elitefit.com', href: 'mailto:info@elitefit.com' },
      { name: 'Phone: +91 98765 43210', href: 'tel:+919876543210' },
      { name: 'Address: 123 Fitness St, Mumbai', href: '#' },
    ],
  }

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="EliteFit logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(0,255,136,0.55)]"
              />
              <span className="text-xl font-bold tracking-tight">EliteFit</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your body. Transform your life. Join EliteFit today and
              start your fitness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-accent-green transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-accent-green transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social, index) => (
                <a
                  key={social}
                  ref={(el) => (socialRefs.current[index] = el)}
                  href="#"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:border-accent-green transition-colors cursor-pointer"
                  aria-label={social}
                >
                  <span className="text-sm">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} EliteFit Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
