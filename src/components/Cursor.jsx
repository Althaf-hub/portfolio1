import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current

    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' })
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' })
    }

    const onEnterLink = () => {
      gsap.to(cursor, { scale: 2, opacity: 0.6, duration: 0.25 })
    }

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25 })
    }

    window.addEventListener('mousemove', moveCursor)

    const addListeners = () => {
      const links = document.querySelectorAll('a, button, .project-card, .skill-card, .stepped-card')
      links.forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    // Add after a short delay to ensure DOM is ready
    setTimeout(addListeners, 500)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" style={{ transform: 'translate(-50%, -50%)' }} />
      <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-50%, -50%)' }} />
    </>
  )
}
