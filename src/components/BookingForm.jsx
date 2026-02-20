import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    trainer: '',
    date: '',
    timeSlot: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ref = useRef(null)
  const calendarRef = useRef(null)
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const programs = [
    'Weight Training',
    'Cardio',
    'Personal Training',
    'CrossFit',
    'Yoga & Zumba',
  ]

  const trainers = [
    'John Smith',
    'Sarah Johnson',
    'Mike Davis',
    'Emma Wilson',
    'David Brown',
  ]

  const timeSlots = ['Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)', 'Evening (6 PM - 10 PM)']

  const today = new Date()
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const startOfMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  )
  const startDay = startOfMonth.getDay()
  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate()

  const calendarDays = []
  for (let i = 0; i < startDay; i += 1) {
    calendarDays.push(null)
  }
  for (let d = 1; d <= daysInMonth; d += 1) {
    const dateObj = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      d,
    )
    calendarDays.push({
      dateObj,
      iso: dateObj.toISOString().split('T')[0],
    })
  }

  const formatDisplayDate = (value) => {
    if (!value) return ''
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ''
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}-${month}-${year}`
  }

  const handleDaySelect = (iso, dateObj) => {
    if (dateObj < normalizedToday) return
    setFormData((prev) => ({ ...prev, date: iso }))
    setErrors((prev) => ({ ...prev, date: '' }))
    setIsCalendarOpen(false)
  }

  useEffect(() => {
    if (!isCalendarOpen) return
    const handleClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isCalendarOpen])

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
            animate(formRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
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
    if (showSuccess) {
      const modal = document.querySelector('.success-modal')
      const content = document.querySelector('.success-content')
      const icon = document.querySelector('.success-icon')
      if (modal) {
        animate(modal, {
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutQuad',
        })
      }
      if (content) {
        animate(content, {
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 500,
          delay: 100,
          easing: 'easeOutExpo',
        })
      }
      if (icon) {
        animate(icon, {
          scale: [0, 1],
          duration: 500,
          delay: 300,
          easing: 'easeOutBack',
        })
      }
    }
  }, [showSuccess])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number'
    }
    if (!formData.program) newErrors.program = 'Please select a program'
    if (!formData.trainer) newErrors.trainer = 'Please select a trainer'
    if (!formData.date) newErrors.date = 'Please select a date'
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      // Save booking to Firestore
      await addDoc(collection(db, 'bookings'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        program: formData.program,
        trainer: formData.trainer,
        date: formData.date,
        timeSlot: formData.timeSlot,
        message: formData.message || '',
        createdAt: serverTimestamp(),
        status: 'pending',
      })

      // Show success message
      setShowSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          program: '',
          trainer: '',
          date: '',
          timeSlot: '',
          message: '',
        })
      }, 3000)
    } catch (error) {
      console.error('Error saving booking:', error)
      // Show error message to user
      setErrors({ submit: 'Failed to submit booking. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleButtonHover = (e) => {
    animate(e.currentTarget, {
      scale: 1.02,
      translateY: -1,
      duration: 300,
      easing: 'easeOutQuad',
    })
    const icon = e.currentTarget.querySelector('.btn-icon')
    if (icon) {
      animate(icon, {
        translateX: 4,
        translateY: -2,
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
        translateY: 0,
        duration: 300,
        easing: 'easeOutQuad',
      })
    }
  }

  const handleButtonClick = (e) => {
    animate(e.currentTarget, {
      scale: 0.98,
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
      id="contact"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-card"
    >
      <div className="container mx-auto max-w-4xl">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Book Your <span className="text-accent-green">Free Trial</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div ref={formRef} className="glass rounded-2xl p-8 md:p-12 opacity-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg focus:outline-none focus:border-accent-green transition-colors ${
                    errors.name ? 'border-accent-red' : 'border-dark-border'
                  }`}
                />
                {errors.name && (
                  <p className="text-accent-red text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg focus:outline-none focus:border-accent-green transition-colors ${
                    errors.email ? 'border-accent-red' : 'border-dark-border'
                  }`}
                />
                {errors.email && (
                  <p className="text-accent-red text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg focus:outline-none focus:border-accent-green transition-colors ${
                    errors.phone ? 'border-accent-red' : 'border-dark-border'
                  }`}
                />
                {errors.phone && (
                  <p className="text-accent-red text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Select Program *
                </label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg focus:outline-none focus:border-accent-green transition-colors ${
                    errors.program ? 'border-accent-red' : 'border-dark-border'
                  }`}
                >
                  <option value="">Select Program *</option>
                  {programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
                {errors.program && (
                  <p className="text-accent-red text-sm mt-1">{errors.program}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Select Trainer *
                </label>
                <select
                  name="trainer"
                  value={formData.trainer}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg focus:outline-none focus:border-accent-green transition-colors ${
                    errors.trainer ? 'border-accent-red' : 'border-dark-border'
                  }`}
                >
                  <option value="">Select Trainer *</option>
                  {trainers.map((trainer) => (
                    <option key={trainer} value={trainer}>
                      {trainer}
                    </option>
                  ))}
                </select>
                {errors.trainer && (
                  <p className="text-accent-red text-sm mt-1">{errors.trainer}</p>
                )}
              </div>

              <div ref={calendarRef} className="relative">
                <label className="block text-gray-300 mb-2 font-medium">
                  Date *
                </label>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen((open) => !open)}
                  className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg text-left flex items-center justify-between focus:outline-none focus:border-accent-green transition-colors ${
                    errors.date ? 'border-accent-red' : 'border-dark-border'
                  }`}
                >
                  <span className={formData.date ? 'text-white' : 'text-gray-500'}>
                    {formData.date ? formatDisplayDate(formData.date) : 'dd-mm-yyyy'}
                  </span>
                  <span className="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-dark-card border border-dark-border text-gray-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V5m8 2V5m-9 6h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </button>
                {errors.date && (
                  <p className="text-accent-red text-sm mt-1">{errors.date}</p>
                )}

                {isCalendarOpen && (
                  <div className="absolute right-0 md:left-0 mt-2 z-20 w-72 glass rounded-xl p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            (prev) =>
                              new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                          )
                        }
                        className="p-1 rounded-lg hover:bg-accent-green/10 text-gray-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <span className="text-sm font-semibold">
                        {calendarMonth.toLocaleString('default', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            (prev) =>
                              new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                          )
                        }
                        className="p-1 rounded-lg hover:bg-accent-green/10 text-gray-300"
                      >
                        <svg
                          className="w-4 h-4"
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
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                        <div key={day} className="py-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {calendarDays.map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="py-1" />
                        }
                        const isPast = day.dateObj < normalizedToday
                        const isSelected = formData.date === day.iso
                        return (
                          <button
                            key={day.iso}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleDaySelect(day.iso, day.dateObj)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                              isSelected
                                ? 'bg-accent-green text-dark-bg shadow-md'
                                : isPast
                                  ? 'text-gray-600 opacity-40 cursor-not-allowed'
                                  : 'text-gray-200 hover:bg-accent-green/10'
                            }`}
                          >
                            {day.dateObj.getDate()}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Time Slot *
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-dark-bg border-2 rounded-lg focus:outline-none focus:border-accent-green transition-colors ${
                  errors.timeSlot ? 'border-accent-red' : 'border-dark-border'
                }`}
              >
                <option value="">Select Time Slot *</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.timeSlot && (
                <p className="text-accent-red text-sm mt-1">{errors.timeSlot}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your fitness goals..."
                className="w-full px-4 py-3 bg-dark-bg border-2 border-dark-border rounded-lg focus:outline-none focus:border-accent-green transition-colors resize-none"
              />
            </div>

            {errors.submit && (
              <div className="mb-4 p-3 bg-accent-red/10 border border-accent-red/30 rounded-lg">
                <p className="text-accent-red text-sm">{errors.submit}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={handleButtonClick}
              className={`group w-full py-4 bg-accent-green text-dark-bg font-bold text-lg rounded-lg hover:bg-accent-green/90 transition-all glow-green inline-flex items-center justify-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-bg"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Book Your Free Trial</span>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </form>

          {showSuccess && (
            <div
              className="success-modal fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowSuccess(false)}
            >
              <div
                className="success-content glass rounded-2xl p-8 max-w-md mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="success-icon w-16 h-16 bg-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-dark-bg"
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
                </div>
                <h3 className="text-2xl font-bold mb-2">Booking Successful!</h3>
                <p className="text-gray-400">
                  We've received your request. Our team will contact you within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BookingForm
