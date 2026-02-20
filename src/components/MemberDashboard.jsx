import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'
import PaymentsPage from './PaymentsPage'
import WorkoutPlanPage from './WorkoutPlanPage'
import ProfileSettingsPage from './ProfileSettingsPage'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'payments', label: 'Payments', icon: '💳' },
  { id: 'workout', label: 'Workout Plan', icon: '💪' },
  { id: 'profile', label: 'Profile Settings', icon: '⚙️' },
]

const MemberDashboard = () => {
  const [profileImage, setProfileImage] = useState('/logo.png')
  const [memberName, setMemberName] = useState('John Doe')
  const [membershipId] = useState('ELT-2024-001234')
  const [membershipStatus, setMembershipStatus] = useState('Active')
  const [totalFeesPaid, setTotalFeesPaid] = useState(19999)
  const [dueFees, setDueFees] = useState(0)
  const [nextPaymentDate, setNextPaymentDate] = useState('2024-03-20')
  const [daysTrained, setDaysTrained] = useState(12)
  const [currentWeight, setCurrentWeight] = useState(75)
  const [targetWeight, setTargetWeight] = useState(70)
  const [bmi, setBmi] = useState(24.2)
  const [trainerName, setTrainerName] = useState('Sarah Johnson')
  
  const [workoutPlan, setWorkoutPlan] = useState([
    { id: 1, name: 'Bench Press', sets: '4x8', completed: false },
    { id: 2, name: 'Incline Dumbbell Press', sets: '3x10', completed: false },
    { id: 3, name: 'Cable Fly', sets: '3x12', completed: false },
    { id: 4, name: 'Dips', sets: '3x10', completed: false },
    { id: 5, name: 'Push-ups', sets: '3x15', completed: false },
  ])

  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const profileRef = useRef(null)
  const cardsRef = useRef([])
  const workoutRef = useRef(null)

  useEffect(() => {
    // Only animate when dashboard is active
    if (activeSection !== 'dashboard') return

    // Reset opacity for re-animation
    if (profileRef.current) {
      profileRef.current.style.opacity = '0'
    }
    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = '0'
      }
    })
    if (workoutRef.current) {
      workoutRef.current.style.opacity = '0'
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Animate profile section
      if (profileRef.current) {
        animate(profileRef.current, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: 100,
          easing: 'easeOutExpo',
        })
      }

      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          animate(card, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 200 + index * 100,
            easing: 'easeOutExpo',
          })
        }
      })

      // Animate workout section
      if (workoutRef.current) {
        animate(workoutRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          delay: 500,
          easing: 'easeOutExpo',
        })
      }
    }, 50)

    return () => clearTimeout(timer)
  }, [activeSection])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleExercise = (id) => {
    setWorkoutPlan((prev) =>
      prev.map((exercise) =>
        exercise.id === id
          ? { ...exercise, completed: !exercise.completed }
          : exercise
      )
    )
  }

  const workoutProgress =
    (workoutPlan.filter((ex) => ex.completed).length / workoutPlan.length) * 100

  const handleCardHover = (e) => {
    animate(e.currentTarget, {
      translateY: -5,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const handleCardLeave = (e) => {
    animate(e.currentTarget, {
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad',
    })
  }

  const downloadInvoice = () => {
    // Create a simple invoice download
    const invoiceContent = `
ELITEFIT GYM - INVOICE
========================

Member: ${memberName}
Membership ID: ${membershipId}
Date: ${new Date().toLocaleDateString()}

Total Fees Paid: ₹${totalFeesPaid.toLocaleString()}
Status: ${membershipStatus}

Thank you for being a member!
    `
    const blob = new Blob([invoiceContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `elitefit-invoice-${membershipId}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-dark-card border-r border-dark-border p-6 z-40 overflow-y-auto hidden md:block">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <img
              src="/logo.png"
              alt="EliteFit"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">EliteFit</span>
          </div>
          <p className="text-xs text-gray-400">Member Portal</p>
        </div>
        <button
          onClick={() => (window.location.hash = '')}
          className="mb-4 w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-bg rounded-lg transition-all text-sm flex items-center space-x-2"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Home</span>
        </button>

        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <button
              key={navItem.id}
              onClick={() => setActiveSection(navItem.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === navItem.id
                  ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg'
              }`}
            >
              <span>{navItem.icon}</span>
              <span className="font-medium">{navItem.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-dark-card border-b border-dark-border p-4 z-30 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-3 py-2 text-gray-400 hover:text-white rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="EliteFit"
            className="w-8 h-8 object-contain"
          />
          <span className="text-lg font-bold">EliteFit</span>
        </div>
        <button
          onClick={() => (window.location.hash = '')}
          className="px-3 py-2 text-gray-400 hover:text-white rounded-lg transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="fixed left-0 top-0 h-full w-64 bg-dark-card border-r border-dark-border p-6 z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src="/logo.png"
                  alt="EliteFit"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold">EliteFit</span>
              </div>
              <p className="text-xs text-gray-400">Member Portal</p>
            </div>
            <button
              onClick={() => {
                window.location.hash = ''
                setSidebarOpen(false)
              }}
              className="mb-4 w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-dark-bg rounded-lg transition-all text-sm flex items-center space-x-2"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </button>
            <nav className="space-y-2">
              {navItems.map((navItem) => (
                <button
                  key={navItem.id}
                  onClick={() => {
                    setActiveSection(navItem.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === navItem.id
                      ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                      : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                  }`}
                >
                  <span>{navItem.icon}</span>
                  <span className="font-medium">{navItem.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-8 lg:p-12 pt-20 md:pt-6">
        {/* Render different pages based on activeSection */}
        {activeSection === 'payments' && <PaymentsPage />}
        {activeSection === 'workout' && <WorkoutPlanPage />}
        {activeSection === 'profile' && <ProfileSettingsPage />}
        
        {/* Dashboard View (default) */}
        {activeSection === 'dashboard' && (
          <>
            {/* Profile Header */}
        <div
          ref={profileRef}
          className="glass rounded-2xl p-6 md:p-8 mb-8 opacity-0"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent-green/50 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-accent-green text-dark-bg p-2 rounded-full cursor-pointer hover:bg-accent-green/90 transition-colors shadow-lg">
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                {memberName}
              </h1>
              <p className="text-gray-400 mb-4">Membership ID: {membershipId}</p>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  membershipStatus === 'Active'
                    ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                    : 'bg-accent-red/20 text-accent-red border border-accent-red/30'
                }`}
              >
                {membershipStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Fees Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Fees Paid */}
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
            className="glass rounded-2xl p-6 opacity-0 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Total Fees Paid</h3>
            <p className="text-3xl font-black text-accent-green">
              ₹{totalFeesPaid.toLocaleString()}
            </p>
          </div>

          {/* Due Fees */}
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
            className="glass rounded-2xl p-6 opacity-0 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  dueFees > 0
                    ? 'bg-accent-red/20'
                    : 'bg-accent-green/20'
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    dueFees > 0 ? 'text-accent-red' : 'text-accent-green'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Due Fees</h3>
            {dueFees > 0 ? (
              <p className="text-3xl font-black text-accent-red">
                ₹{dueFees.toLocaleString()}
              </p>
            ) : (
              <p className="text-lg font-semibold text-accent-green">
                No Pending Dues
              </p>
            )}
          </div>

          {/* Next Payment Date */}
          <div
            ref={(el) => (cardsRef.current[2] = el)}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
            className="glass rounded-2xl p-6 opacity-0 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent-green/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm mb-2">Next Payment Date</h3>
            <p className="text-2xl font-black">
              {new Date(nextPaymentDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Today's Workout Plan */}
        <div
          ref={workoutRef}
          className="glass rounded-2xl p-6 md:p-8 mb-8 opacity-0"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black mb-2">Today's Workout</h2>
              <span className="inline-block px-4 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm font-semibold border border-accent-green/30">
                Chest Day
              </span>
            </div>
            <button
              onClick={downloadInvoice}
              className="mt-4 md:mt-0 px-6 py-2 bg-dark-bg border-2 border-accent-green text-accent-green rounded-lg font-semibold hover:bg-accent-green/10 transition-colors"
            >
              Download Invoice
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Workout Progress</span>
              <span className="text-accent-green font-semibold">
                {Math.round(workoutProgress)}%
              </span>
            </div>
            <div className="w-full h-3 bg-dark-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-green to-emerald-500 transition-all duration-500"
                style={{ width: `${workoutProgress}%` }}
              />
            </div>
          </div>

          {/* Exercises List */}
          <div className="space-y-4">
            {workoutPlan.map((exercise, index) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-4 bg-dark-bg rounded-xl border border-dark-border hover:border-accent-green/30 transition-all"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={exercise.completed}
                    onChange={() => toggleExercise(exercise.id)}
                    className="w-5 h-5 rounded border-2 border-gray-600 bg-dark-bg text-accent-green focus:ring-accent-green focus:ring-offset-0 cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        exercise.completed
                          ? 'text-gray-500 line-through'
                          : 'text-white'
                      }`}
                    >
                      {exercise.name}
                    </h3>
                    <p className="text-sm text-gray-400">{exercise.sets}</p>
                  </div>
                </div>
                {exercise.completed && (
                  <svg
                    className="w-6 h-6 text-accent-green"
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
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-gray-400 italic">
            "Push beyond your limits today."
          </p>
        </div>

        {/* Additional Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Attendance Tracker */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Attendance</h3>
              <svg
                className="w-6 h-6 text-accent-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-4xl font-black text-accent-green mb-2">
              {daysTrained}
            </p>
            <p className="text-gray-400 text-sm">Days trained this month</p>
          </div>

          {/* BMI / Weight Progress */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Weight Progress</h3>
              <svg
                className="w-6 h-6 text-accent-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Current</span>
                <span className="font-semibold">{currentWeight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Target</span>
                <span className="font-semibold text-accent-green">
                  {targetWeight} kg
                </span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-dark-border">
                <span className="text-gray-400">BMI</span>
                <span className="font-semibold">{bmi}</span>
              </div>
            </div>
          </div>

          {/* Trainer Assigned */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Your Trainer</h3>
              <svg
                className="w-6 h-6 text-accent-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="text-xl font-bold mb-2">{trainerName}</p>
            <p className="text-gray-400 text-sm">Personal Trainer</p>
            <button className="mt-4 w-full px-4 py-2 bg-accent-green/10 text-accent-green rounded-lg font-semibold hover:bg-accent-green/20 transition-colors text-sm">
              Contact Trainer
            </button>
          </div>
        </div>
        </>
        )}
      </main>

      {/* Add CSS animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default MemberDashboard
