import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Process from './components/Process'
import Projects from './components/Projects'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'

import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Lenis Smooth Scrolling configured for soft, buttery feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    // Ensure ScrollTrigger calculations are accurate after initial render
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(refreshTimer)
      gsap.ticker.remove(updateTicker)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Process />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <footer className="editorial-footer">
        <div>
          <span>Designed &amp; Built with editorial craft by </span>
          <strong style={{ color: 'var(--red-primary)' }}>Althaf Rahman</strong>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          © 2026 — All Rights Reserved.
        </div>
      </footer>
    </>
  )
}

export default App
