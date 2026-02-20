import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export const useAnime = (options) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && options) {
      const animation = animate(ref.current, options)
      return () => animation.pause()
    }
  }, [options])

  return ref
}

export const useScrollAnime = (options, trigger = true) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!trigger || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, options)
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
  }, [trigger, options])

  return ref
}
