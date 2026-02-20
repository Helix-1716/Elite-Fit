import { useRef, useEffect, useState } from 'react'
import { animate } from 'animejs'

const Counter = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
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
    if (!isVisible) return

    const valueObj = { value: 0 }
    animate(valueObj, {
      value: end,
      duration: duration * 1000,
      easing: 'easeOutQuart',
      update: (anim) => {
        setCount(Math.floor(anim.progressValue * end))
      },
      complete: () => {
        setCount(end)
      },
    })

    animate(ref.current, {
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 500,
      easing: 'easeOutQuad',
    })
  }, [isVisible, end, duration])

  return (
    <div ref={ref} className="text-center opacity-0">
      <div className="text-5xl md:text-6xl font-black text-accent-green mb-2">
        {count}+
      </div>
      <div className="text-gray-400 text-lg font-medium">{label}</div>
    </div>
  )
}

const About = () => {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

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
            animate(contentRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo',
            })
            animate(imageRef.current, {
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              delay: 400,
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
    document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-card"
    >
      <div className="container mx-auto">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            About <span className="text-accent-green">EliteFit</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not just a gym. We're a community dedicated to helping you
            achieve your fitness goals with cutting-edge equipment, expert
            trainers, and a supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <Counter end={500} label="Members" />
          <Counter end={20} label="Trainers" />
          <Counter end={10} label="Years Experience" />
          <Counter end={200} label="Transformations" />
        </div>

        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-12 items-center opacity-0"
        >
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Your Journey Starts Here
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              At EliteFit, we believe fitness is a journey, not a destination.
              Our state-of-the-art facility is equipped with the latest
              equipment and technology to help you reach your peak performance.
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our certified trainers are passionate about helping you succeed.
              Whether you're a beginner or an experienced athlete, we provide
              personalized guidance to ensure you achieve your goals safely and
              effectively.
            </p>
            <button
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleButtonClick}
              className="group px-6 py-3 bg-accent-green text-dark-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors inline-flex items-center"
            >
              <span>Explore Programs</span>
              <span className="btn-icon ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-dark-bg/10">
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
          </div>
          <div
            ref={imageRef}
            className="relative h-96 rounded-2xl overflow-hidden opacity-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-green/20 to-accent-red/20"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80')] bg-cover bg-center opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
