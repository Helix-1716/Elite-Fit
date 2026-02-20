import { useState, useEffect, useRef } from 'react'
import { animate } from 'animejs'

const transformations = [
  {
    name: 'Rajesh Kumar',
    before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    duration: '6 months',
    program: 'Weight Training',
  },
  {
    name: 'Priya Sharma',
    before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    duration: '4 months',
    program: 'Cardio & Yoga',
  },
  {
    name: 'Amit Patel',
    before: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    duration: '8 months',
    program: 'CrossFit',
  },
]

const Transformations = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

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

  useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 500,
        easing: 'easeOutExpo',
      })
    }
  }, [currentIndex])

  useEffect(() => {
    if (!ref.current) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformations.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="transformations"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-card"
    >
      <div className="container mx-auto">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Real <span className="text-accent-green">Transformations</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See the incredible results our members have achieved.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            key={currentIndex}
            ref={cardRef}
            className="glass rounded-2xl p-8 md:p-12 opacity-0"
          >
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
                  Before
                </h3>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                  <img
                    src={transformations[currentIndex].before}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
                  After
                </h3>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                  <img
                    src={transformations[currentIndex].after}
                    alt="After"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">
                {transformations[currentIndex].name}
              </h4>
              <div className="flex items-center justify-center gap-6 text-gray-400">
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-accent-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {transformations[currentIndex].duration}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-accent-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {transformations[currentIndex].program}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {transformations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-accent-green'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Transformations
