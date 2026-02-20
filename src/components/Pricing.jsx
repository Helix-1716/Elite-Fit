import { useRef, useState, useEffect } from 'react'
import { animate } from 'animejs'

const pricingPlans = [
  {
    name: 'Standard',
    prices: {
      monthly: '₹1,999',
      yearly: '₹19,999',
    },
    periods: {
      monthly: '/month',
      yearly: '/year',
    },
    features: [
      'Access to all equipment',
      'Group fitness classes',
      'Locker facilities',
      'Free parking',
      '24/7 gym access',
    ],
    popular: false,
    color: 'border-gray-700',
  },
  {
    name: 'Premium',
    prices: {
      monthly: '₹3,499',
      yearly: '₹34,999',
    },
    periods: {
      monthly: '/month',
      yearly: '/year',
    },
    features: [
      'Everything in Standard',
      'Personal trainer sessions (2/month)',
      'Nutrition consultation',
      'Priority class booking',
      'Spa & sauna access',
      'Towel service',
    ],
    popular: true,
    color: 'border-accent-green',
  },
]

const Pricing = () => {
  const ref = useRef(null)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const priceRefs = useRef([])
  const [billingPeriod, setBillingPeriod] = useState('monthly')

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
              delay: (el, i) => i * 200,
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
    priceRefs.current.forEach((priceRef) => {
      if (priceRef) {
        animate(priceRef, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 300,
          easing: 'easeOutQuad',
        })
      }
    })
  }, [billingPeriod])

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
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="pricing"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-bg"
    >
      <div className="container mx-auto">
        <div ref={sectionRef} className="text-center mb-10 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Choose Your <span className="text-accent-green">Plan</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Flexible pricing options to suit your fitness journey.
          </p>
        </div>

        {/* Billing period toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="glass inline-flex items-center rounded-full p-1 text-sm">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`relative px-4 py-1.5 rounded-full transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-accent-green text-dark-bg font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`relative px-4 py-1.5 rounded-full transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-accent-green text-dark-bg font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
            </button>
          </div>
          {billingPeriod === 'yearly' && (
            <span className="ml-3 text-xs font-semibold text-accent-green bg-accent-green/10 px-3 py-1 rounded-full">
              Save up to 2 months
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
              className={`relative glass rounded-2xl p-8 border-2 ${plan.color} opacity-0 ${
                plan.popular ? 'lg:scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="bg-accent-green text-dark-bg px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                    {billingPeriod === 'yearly' && (
                      <span className="text-[11px] text-accent-green bg-dark-bg px-3 py-0.5 rounded-full border border-accent-green/40">
                        Best value (Yearly)
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div
                  ref={(el) => (priceRefs.current[index] = el)}
                  key={billingPeriod}
                  className="flex items-baseline justify-center opacity-0"
                >
                  <span className="text-5xl font-black text-accent-green">
                    {plan.prices[billingPeriod]}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {plan.periods[billingPeriod]}
                  </span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="mt-2 text-xs text-gray-400">
                    Billed once per year
                  </p>
                )}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-accent-green mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onClick={handleButtonClick}
                className={`group w-full py-4 rounded-lg font-bold text-lg transition-all inline-flex items-center justify-center ${
                  plan.popular
                    ? 'bg-accent-green text-dark-bg hover:bg-accent-green/90 glow-green'
                    : 'bg-dark-card border-2 border-accent-green text-accent-green hover:bg-accent-green/10'
                }`}
              >
                <span>Get Started</span>
                <span className="btn-icon ml-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/10">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
