import { useRef, useEffect } from 'react'
import { animate } from 'animejs'

const programs = [
  {
    name: 'Weight Training',
    description: 'Build strength and muscle with our comprehensive weight training programs.',
    icon: '💪',
    color: 'from-accent-green to-emerald-600',
  },
  {
    name: 'Cardio',
    description: 'Boost your cardiovascular health with high-intensity cardio sessions.',
    icon: '🏃',
    color: 'from-accent-red to-rose-600',
  },
  {
    name: 'Personal Training',
    description: 'One-on-one sessions with certified trainers for personalized guidance.',
    icon: '👤',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'CrossFit',
    description: 'High-intensity functional training for ultimate fitness transformation.',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'Yoga & Zumba',
    description: 'Find balance and flexibility with our yoga and dance fitness classes.',
    icon: '🧘',
    color: 'from-purple-500 to-pink-600',
  },
]

const Programs = () => {
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
              translateY: [30, 0],
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

  const handleCardHover = (index) => (e) => {
    animate(e.currentTarget, {
      scale: 1.05,
      translateY: -10,
      duration: 400,
      easing: 'easeOutQuad',
    })
    const icon = e.currentTarget.querySelector('.program-icon')
    if (icon) {
      animate(icon, {
        scale: 1.1,
        rotate: [0, 5, -5, 0],
        duration: 500,
        easing: 'easeOutQuad',
      })
    }
    const arrow = e.currentTarget.querySelector('.arrow-icon')
    if (arrow) {
      animate(arrow, {
        translateX: 10,
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleCardLeave = (e) => {
    animate(e.currentTarget, {
      scale: 1,
      translateY: 0,
      duration: 400,
      easing: 'easeOutQuad',
    })
    const arrow = e.currentTarget.querySelector('.arrow-icon')
    if (arrow) {
      animate(arrow, {
        translateX: 0,
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
  }

  return (
    <section
      id="programs"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-bg"
    >
      <div className="container mx-auto">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Our <span className="text-accent-green">Programs</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from a variety of programs designed to meet your fitness
            goals and lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.name}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              className="group relative opacity-0"
            >
              <div className="glass rounded-2xl p-8 h-full cursor-pointer transition-all duration-300 hover:border-accent-green/50">
                <div
                  className={`program-icon w-16 h-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center text-3xl mb-6 transition-transform duration-300`}
                >
                  {program.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-green transition-colors">
                  {program.name}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {program.description}
                </p>
                <div className="mt-6 text-accent-green font-semibold flex items-center">
                  <span>Learn More</span>
                  <span className="arrow-icon ml-2 inline-block">
                    <svg
                      className="w-5 h-5"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
