import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DeveloperWindow from './DeveloperWindow'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-anim-header', {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '6rem 3rem 7rem',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        {/* EDITORIAL HEADER */}
        <div className="editorial-section-header">
          <div className="editorial-section-tag about-anim-header">
            04 // WORKSTATION &amp; PROFILE
          </div>
          <h2 className="editorial-section-title about-anim-header">
            Engineering with <span className="serif-italic">Craft &amp; Discipline</span>
          </h2>
          <p
            className="about-anim-header"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '680px',
              marginTop: '0.8rem',
              lineHeight: '1.6',
            }}
          >
            I treat web development as digital architecture: uncompromising precision, resilient data structures, and smooth 60fps orchestration.
          </p>
        </div>

        {/* WORKSTATION CARDS & DEVELOPER WINDOW */}
        <div style={{ marginTop: '3rem' }}>
          <DeveloperWindow />
        </div>
      </div>
    </section>
  )
}
