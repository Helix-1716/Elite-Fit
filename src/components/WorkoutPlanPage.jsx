import { useState, useRef, useEffect } from 'react'
import { animate } from 'animejs'

const WorkoutPlanPage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [workoutPlans, setWorkoutPlans] = useState({
    Monday: {
      name: 'Chest Day',
      exercises: [
        { id: 1, name: 'Bench Press', sets: '4x8', reps: '8', completed: false },
        { id: 2, name: 'Incline Dumbbell Press', sets: '3x10', reps: '10', completed: false },
        { id: 3, name: 'Cable Fly', sets: '3x12', reps: '12', completed: false },
        { id: 4, name: 'Dips', sets: '3x10', reps: '10', completed: false },
        { id: 5, name: 'Push-ups', sets: '3x15', reps: '15', completed: false },
      ],
    },
    Tuesday: {
      name: 'Back Day',
      exercises: [
        { id: 1, name: 'Deadlift', sets: '4x6', reps: '6', completed: false },
        { id: 2, name: 'Pull-ups', sets: '4x8', reps: '8', completed: false },
        { id: 3, name: 'Barbell Row', sets: '4x8', reps: '8', completed: false },
        { id: 4, name: 'Lat Pulldown', sets: '3x10', reps: '10', completed: false },
        { id: 5, name: 'Cable Row', sets: '3x12', reps: '12', completed: false },
      ],
    },
    Wednesday: {
      name: 'Shoulder Day',
      exercises: [
        { id: 1, name: 'Overhead Press', sets: '4x8', reps: '8', completed: false },
        { id: 2, name: 'Lateral Raises', sets: '3x12', reps: '12', completed: false },
        { id: 3, name: 'Front Raises', sets: '3x12', reps: '12', completed: false },
        { id: 4, name: 'Rear Delt Fly', sets: '3x15', reps: '15', completed: false },
        { id: 5, name: 'Shrugs', sets: '4x12', reps: '12', completed: false },
      ],
    },
    Thursday: {
      name: 'Leg Day',
      exercises: [
        { id: 1, name: 'Squats', sets: '4x8', reps: '8', completed: false },
        { id: 2, name: 'Leg Press', sets: '4x10', reps: '10', completed: false },
        { id: 3, name: 'Romanian Deadlift', sets: '3x10', reps: '10', completed: false },
        { id: 4, name: 'Leg Curls', sets: '3x12', reps: '12', completed: false },
        { id: 5, name: 'Calf Raises', sets: '4x15', reps: '15', completed: false },
      ],
    },
    Friday: {
      name: 'Arms Day',
      exercises: [
        { id: 1, name: 'Barbell Curl', sets: '4x8', reps: '8', completed: false },
        { id: 2, name: 'Tricep Dips', sets: '3x10', reps: '10', completed: false },
        { id: 3, name: 'Hammer Curls', sets: '3x10', reps: '10', completed: false },
        { id: 4, name: 'Tricep Pushdown', sets: '3x12', reps: '12', completed: false },
        { id: 5, name: 'Cable Curls', sets: '3x12', reps: '12', completed: false },
      ],
    },
    Saturday: {
      name: 'Cardio & Core',
      exercises: [
        { id: 1, name: 'Running', sets: '30 min', reps: '30 min', completed: false },
        { id: 2, name: 'Plank', sets: '3x60s', reps: '60s', completed: false },
        { id: 3, name: 'Russian Twists', sets: '3x20', reps: '20', completed: false },
        { id: 4, name: 'Leg Raises', sets: '3x15', reps: '15', completed: false },
        { id: 5, name: 'Mountain Climbers', sets: '3x30', reps: '30', completed: false },
      ],
    },
    Sunday: {
      name: 'Rest Day',
      exercises: [
        { id: 1, name: 'Light Stretching', sets: '20 min', reps: '20 min', completed: false },
        { id: 2, name: 'Yoga', sets: '30 min', reps: '30 min', completed: false },
        { id: 3, name: 'Meditation', sets: '15 min', reps: '15 min', completed: false },
      ],
    },
  })

  const pageRef = useRef(null)
  const exerciseRefs = useRef([])

  useEffect(() => {
    if (pageRef.current) {
      animate(pageRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      })
    }
  }, [])

  useEffect(() => {
    exerciseRefs.current.forEach((ref, index) => {
      if (ref) {
        animate(ref, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 400,
          delay: index * 50,
          easing: 'easeOutExpo',
        })
      }
    })
  }, [selectedDay])

  const toggleExercise = (day, exerciseId) => {
    setWorkoutPlans((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.map((ex) =>
          ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
        ),
      },
    }))
  }

  const currentPlan = workoutPlans[selectedDay]
  const progress =
    (currentPlan.exercises.filter((ex) => ex.completed).length /
      currentPlan.exercises.length) *
    100

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div ref={pageRef} className="opacity-0">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Workout Plan</h1>
        <p className="text-gray-400">Your personalized weekly workout schedule</p>
      </div>

      {/* Day Selector */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedDay === day
                  ? 'bg-accent-green text-dark-bg'
                  : 'bg-dark-bg text-gray-400 hover:text-white border-2 border-dark-border'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Plan Card */}
      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black mb-2">{currentPlan.name}</h2>
            <span className="inline-block px-4 py-1 bg-accent-green/20 text-accent-green rounded-full text-sm font-semibold border border-accent-green/30">
              {selectedDay}
            </span>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">Progress</span>
              <span className="text-accent-green font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="w-64 h-3 bg-dark-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-green to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {currentPlan.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              ref={(el) => (exerciseRefs.current[index] = el)}
              className="flex items-center justify-between p-4 bg-dark-bg rounded-xl border border-dark-border hover:border-accent-green/30 transition-all opacity-0"
            >
              <div className="flex items-center space-x-4 flex-1">
                <input
                  type="checkbox"
                  checked={exercise.completed}
                  onChange={() => toggleExercise(selectedDay, exercise.id)}
                  className="w-5 h-5 rounded border-2 border-gray-600 bg-dark-bg text-accent-green focus:ring-accent-green focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-lg ${
                      exercise.completed
                        ? 'text-gray-500 line-through'
                        : 'text-white'
                    }`}
                  >
                    {exercise.name}
                  </h3>
                  <div className="flex gap-4 mt-1">
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Sets:</span> {exercise.sets}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Reps:</span> {exercise.reps}
                    </p>
                  </div>
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
          "Consistency is the key to transformation."
        </p>
      </div>

      {/* Weekly Overview */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Weekly Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {days.map((day) => {
            const dayPlan = workoutPlans[day]
            const dayProgress =
              (dayPlan.exercises.filter((ex) => ex.completed).length /
                dayPlan.exercises.length) *
              100
            return (
              <div
                key={day}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'border-accent-green bg-accent-green/10'
                    : 'border-dark-border hover:border-accent-green/30'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <p className="text-sm font-semibold mb-2">{day.slice(0, 3)}</p>
                <p className="text-xs text-gray-400 mb-2">{dayPlan.name}</p>
                <div className="w-full h-2 bg-dark-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-green transition-all"
                    style={{ width: `${dayProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">{Math.round(dayProgress)}%</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkoutPlanPage
