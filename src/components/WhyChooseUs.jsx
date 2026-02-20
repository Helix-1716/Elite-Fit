import { useRef, useEffect } from 'react'
import { animate } from 'animejs'

const features = [
  {
    title: 'Certified Trainers',
    description: 'All our trainers are certified professionals with years of experience.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Modern Equipment',
    description: 'State-of-the-art fitness equipment from leading brands worldwide.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'Flexible Timing',
    description: 'Open 24/7 to fit your schedule, whenever you need to train.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Affordable Plans',
    description: 'Competitive pricing with flexible payment options for everyone.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const WhyChooseUs = () => {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(sectionRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              easing: 'easeOutExpo',
            })
            animate(cardsRef.current, {
              opacity: [0, 1],
              translateX: (el, i) => (i % 2 === 0 ? [-30, 0] : [30, 0]),
              duration: 600,
              delay: (el, i) => i * 100,
              easing: 'easeOutExpo',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-100px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const handleCardHover = (e) => {
    animate(e.currentTarget, {
      translateY: -10,
      duration: 400,
      easing: 'easeOutQuad',
    })
    const icon = e.currentTarget.querySelector('.feature-icon')
    if (icon) {
      animate(icon, {
        scale: 1.1,
        rotate: 360,
        duration: 500,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleCardLeave = (e) => {
    animate(e.currentTarget, {
      translateY: 0,
      duration: 400,
      easing: 'easeOutQuad',
    })
  }

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-card"
    >
      <div className="container mx-auto">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Why Choose <span className="text-accent-green">Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We provide everything you need to achieve your fitness goals in a
            supportive and motivating environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
              className="glass rounded-2xl p-8 text-center group cursor-pointer opacity-0"
            >
              <div className="feature-icon text-accent-green mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent-green transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
