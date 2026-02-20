import { useRef, useEffect } from 'react'
import { animate } from 'animejs'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    text: 'EliteFit has completely transformed my life. The trainers are amazing and the facilities are top-notch. I\'ve lost 15kg in just 6 months!',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    text: 'The best gym I\'ve ever been to! The community is supportive, the equipment is modern, and the classes are fantastic. Highly recommended!',
  },
  {
    name: 'Amit Patel',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    rating: 5,
    text: 'I\'ve tried many gyms, but EliteFit stands out. The personal training sessions helped me achieve my goals faster than I ever imagined.',
  },
]

const Testimonials = () => {
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

  const handleCardHover = (e) => {
    animate(e.currentTarget, {
      translateY: -10,
      duration: 400,
      easing: 'easeOutQuad',
    })
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
      id="testimonials"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-bg"
    >
      <div className="container mx-auto">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            What Our <span className="text-accent-green">Members Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our members have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
              className="glass rounded-2xl p-8 opacity-0"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
