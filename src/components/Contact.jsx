import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-anim-item', {
        opacity: 0,
        y: 35,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="contact-editorial-section">
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div
          className="contact-anim-item"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--red-primary)',
            marginBottom: '1.5rem',
          }}
        >
          <span>♦</span>
          <span>HIRING &amp; COLLABORATION</span>
        </div>

        <h2 className="contact-huge-headline contact-anim-item">
          Looking for a builder who delivers?<br />
          <span className="serif-italic">Let&apos;s build something great.</span>
        </h2>

        <p
          className="contact-anim-item"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.15rem',
            lineHeight: '1.7',
            maxWidth: '580px',
            margin: '0 auto 2.5rem',
          }}
        >
          Open to full-time software engineering roles, high-impact contract engineering, and technical consulting with teams worldwide.
        </p>

        <div className="contact-anim-item">
          <a
            href="mailto:althafmp248@gmail.com"
            className="contact-email-link"
          >
            althafmp248@gmail.com
          </a>
        </div>

        <div className="editorial-social-row contact-anim-item">
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="social-pill-btn"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:althafmp248@gmail.com?subject=Requesting%20Resume%20-%20Althaf%20Rahman"
            className="social-pill-btn"
            style={{ borderColor: 'var(--red-primary)', color: 'var(--red-primary)' }}
          >
            Request Resume 📄
          </a>
        </div>
      </div>
    </section>
  )
}
