import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.giant-letter', {
        opacity: 0,
        y: 40,
        stagger: 0.03,
        duration: 0.8,
        delay: 0.1,
      })
        .from('.sub-strip-item', {
          opacity: 0,
          y: -15,
          stagger: 0.08,
          duration: 0.6,
        }, '-=0.4')
        .from('.hero-statement-anim', {
          opacity: 0,
          y: 35,
          duration: 0.9,
        }, '-=0.3')
        .from('.hero-status-tag', {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
        }, '-=0.4')
        .from('.hero-project-teaser', {
          opacity: 0,
          y: 30,
          duration: 0.7,
        }, '-=0.3')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const letters = 'ALTHAF RAHMAN'.split('')

  return (
    <div id="hero" ref={heroRef} style={{ width: '100%', position: 'relative' }}>
      {/* 1. GIANT FULL-WIDTH LOGO / BANNER (REPLICATING NEUTOMNI HERO BANNER) */}
      <header className="site-giant-banner">
        <h1 className="site-giant-title" aria-label="Althaf Rahman">
          {letters.map((char, i) => (
            <span
              key={i}
              className="giant-letter"
              style={{ display: 'inline-block', minWidth: char === ' ' ? '0.35em' : 'auto' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </header>

      {/* 2. SUB-HEADER METADATA STRIP */}
      <div className="site-sub-strip">
        <div className="sub-strip-left sub-strip-item">
          Full Stack Developer &amp; Motion Engineer
        </div>

        <nav aria-label="Primary page navigation">
          <ul className="sub-strip-center">
            <li className="sub-strip-item"><a href="#process">Process</a></li>
            <li className="sub-strip-item"><a href="#projects">Portfolio</a></li>
            <li className="sub-strip-item"><a href="#skills">Tech Stack</a></li>
            <li className="sub-strip-item"><a href="#about">Workstation</a></li>
            <li className="sub-strip-item"><a href="#contact">Get In Touch</a></li>
          </ul>
        </nav>

        <div className="sub-strip-right sub-strip-item">
          <a href="mailto:althafmp248@gmail.com">
            althafmp248@gmail.com
          </a>
        </div>
      </div>

      {/* 3. HERO EDITORIAL STATEMENT */}
      <section className="hero-statement-section">
        <div className="hero-main-headline hero-statement-anim">
          <h2 className="hero-statement-title">
            I engineer web products for<br />
            teams &amp; companies that value<br />
            <span className="serif-italic">craft, speed &amp; scale</span>
          </h2>
        </div>

        {/* BOTTOM METADATA BAR WITH STATUS & FEATURED TEASER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          {/* FEATURED LIVE CASE STUDY TEASER (AKAZ SPORTS HUB) */}
          <div
            className="hero-project-teaser"
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--red-primary)',
              padding: '1.2rem 1.6rem',
              borderRadius: '2px',
              maxWidth: '460px',
              boxShadow: '0 12px 30px rgba(204, 27, 41, 0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--red-primary)',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              ★ FLAGSHIP PROJECT
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-dark)',
                marginBottom: '0.2rem',
              }}
            >
              AKAZ Sports Hub — Qatar&apos;s #1 Platform
            </div>
            <p
              style={{
                fontSize: '0.84rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: '0.8rem',
              }}
            >
              Engineered end-to-end: high-conversion e-commerce architecture, GCC scale &amp; fluid product motion.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <a
                href="https://www.akazsportshub.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-red"
                style={{ padding: '0.45rem 1rem', fontSize: '0.76rem' }}
              >
                Live Platform ↗
              </a>
            </div>
          </div>

          {/* STATUS PILL (OPEN FOR COMPANIES & RECRUITERS TO CHECK IN) */}
          <div className="hero-status-tag">
            <span className="hero-status-diamond">♦</span>
            <span>AVAILABLE FOR HIRE &amp; CONTRACTS</span>
          </div>
        </div>
      </section>
    </div>
  )
}
