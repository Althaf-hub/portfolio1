import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScallopWave from './ScallopWave'
import WireframePolygon from './WireframePolygon'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const roadPathRef = useRef(null)
  const cubeCarrierRef = useRef(null)
  const pillStartRef = useRef(null)
  const pillEndRef = useRef(null)
  const waypointRefs = useRef([])
  const cardRefs = useRef([])

  useEffect(() => {
    const updateRoad = () => {
      if (!containerRef.current || cardRefs.current.length < 4) return null
      const containerRect = containerRef.current.getBoundingClientRect()
      const cards = cardRefs.current.filter(Boolean)
      if (cards.length < 4) return null

      const c1 = cards[0].getBoundingClientRect()
      const c2 = cards[1].getBoundingClientRect()
      const c3 = cards[2].getBoundingClientRect()
      const c4 = cards[3].getBoundingClientRect()

      // Calculate path points inside each card's upper corridor
      const p1 = {
        x: c1.left - containerRect.left + c1.width / 2,
        y: c1.top - containerRect.top + 135,
      }
      const p2 = {
        x: c2.left - containerRect.left + c2.width / 2,
        y: c2.top - containerRect.top + 120,
      }
      const p3 = {
        x: c3.left - containerRect.left + c3.width / 2,
        y: c3.top - containerRect.top + 115,
      }
      const p4 = {
        x: c4.left - containerRect.left + c4.width / 2,
        y: c4.top - containerRect.top + 110,
      }

      const startX = p1.x - c1.width * 0.44
      const endX = p4.x + c4.width * 0.44

      const d = `
        M ${startX},${p1.y}
        L ${p1.x},${p1.y}
        C ${p1.x + (p2.x - p1.x) * 0.5},${p1.y} ${p1.x + (p2.x - p1.x) * 0.5},${p2.y} ${p2.x},${p2.y}
        C ${p2.x + (p3.x - p2.x) * 0.5},${p2.y} ${p2.x + (p3.x - p2.x) * 0.5},${p3.y} ${p3.x},${p3.y}
        C ${p3.x + (p4.x - p3.x) * 0.5},${p3.y} ${p3.x + (p4.x - p3.x) * 0.5},${p4.y} ${p4.x},${p4.y}
        L ${endX},${p4.y}
      `.replace(/\s+/g, ' ').trim()

      if (roadPathRef.current) roadPathRef.current.setAttribute('d', d)
      if (pillStartRef.current) {
        pillStartRef.current.style.left = `${startX}px`
        pillStartRef.current.style.top = `${p1.y}px`
      }
      if (pillEndRef.current) {
        pillEndRef.current.style.left = `${endX}px`
        pillEndRef.current.style.top = `${p4.y}px`
      }

      const points = [p1, p2, p3, p4]
      waypointRefs.current.forEach((node, i) => {
        if (node && points[i]) {
          node.setAttribute('cx', String(points[i].x))
          node.setAttribute('cy', String(points[i].y))
        }
      })

      return { p1, p2, p3, p4, startX, endX }
    }

    updateRoad()

    const ctx = gsap.context(() => {
      // Top bar title entrance
      gsap.from('.process-top-item', {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })

      const pathEl = roadPathRef.current
      const cubeEl = cubeCarrierRef.current

      if (pathEl && cubeEl) {
        const totalLength = pathEl.getTotalLength()
        const isDesktop = window.innerWidth >= 900

        // Set initial cube position at start inside Card 1
        const startPoint = pathEl.getPointAtLength(0)
        cubeEl.style.transform = `translate3d(${startPoint.x}px, ${startPoint.y}px, 0px) translate(-50%, -50%) rotate(0deg)`

        if (isDesktop) {
          // Pinned scroll timeline: scroll progress drives the cube across cards 1 to 4
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=1400',
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          // 1. Cards pop up into place
          tl.fromTo(
            cardRefs.current,
            {
              opacity: 0,
              y: 110,
              scale: 0.94,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05,
              duration: 0.25,
              ease: 'power2.out',
            }
          )

          // 2. Dash road and A/B markers reveal
          tl.fromTo(
            ['.process-road-path', '.process-road-pill', '.process-road-waypoint-svg'],
            { opacity: 0 },
            { opacity: 1, duration: 0.1, stagger: 0.02 },
            '-=0.1'
          )

          // 3. Cube rolls from A to B through all cards
          const progressObj = { val: 0 }

          tl.to(
            progressObj,
            {
              val: 1,
              duration: 0.85,
              ease: 'none',
              onUpdate: () => {
                const currentDistance = progressObj.val * totalLength
                const pt = pathEl.getPointAtLength(currentDistance)
                const rot = progressObj.val * 1080 // 3 full continuous rolling rotations

                cubeEl.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0px) translate(-50%, -50%) rotate(${rot}deg)`

                // Highlight cards dynamically as the cube rolls through them
                const activeIndex = progressObj.val < 0.25 ? 0 : progressObj.val < 0.52 ? 1 : progressObj.val < 0.78 ? 2 : 3
                cardRefs.current.forEach((card, idx) => {
                  if (card) {
                    if (idx === activeIndex) {
                      card.classList.add('is-active-step')
                    } else {
                      card.classList.remove('is-active-step')
                    }
                  }
                })
              },
            },
            '-=0.05'
          )
        } else {
          // Mobile view fallback
          gsap.fromTo(
            cardRefs.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: '.process-cards-stepped',
                start: 'top 85%',
              },
            }
          )
        }
      }
    }, sectionRef)

    const handleResize = () => {
      updateRoad()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ctx.revert()
    }
  }, [])

  const setCardRef = (index) => (el) => {
    if (el) cardRefs.current[index] = el
  }

  const setWaypointRef = (index) => (el) => {
    if (el) waypointRefs.current[index] = el
  }

  return (
    <section id="process" ref={sectionRef} className="process-section">
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        {/* TOP BAR */}
        <div className="process-top-bar">
          <div className="process-nav-tag process-top-item">
            <span>A</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 300 }}>→</span>
            <span>B</span>
          </div>

          <div className="process-headline process-top-item">
            From architecture to production. Engineering software that{' '}
            <span className="serif-italic">scales and performs</span>.
          </div>

          <div className="process-top-item">
            <a href="#projects" className="oval-badge-btn">
              Engineering Process
            </a>
          </div>
        </div>

        {/* STEPPED RED PROCESS CARDS CONTAINER */}
        <div ref={containerRef} className="process-cards-stepped">
          {/* SVG ROAD OVERLAY (CONNECTING A TO B THROUGH ALL 4 CARDS) */}
          <svg className="process-road-svg">
            {/* Dashed Road Path */}
            <path
              ref={roadPathRef}
              className="process-road-path"
            />

            {/* Waypoint circles inside cards */}
            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                ref={setWaypointRef(i)}
                r={4.5}
                fill="#ffffff"
                className="process-road-waypoint-svg"
              />
            ))}
          </svg>

          {/* START & END A / B PILLS */}
          <div ref={pillStartRef} className="process-road-pill process-pill-start">
            A
          </div>
          <div ref={pillEndRef} className="process-road-pill process-pill-end">
            B
          </div>

          {/* THE ROLLING 3D WIREFRAME CUBE CARRIER */}
          <div
            ref={cubeCarrierRef}
            className="process-cube-carrier"
          >
            <WireframePolygon size={120} />
          </div>

          {/* CARD 01: System Architecture & Requirements (Cube Origin) */}
          <div
            ref={setCardRef(0)}
            className="stepped-card card-step-1 is-active-step"
          >
            <div className="stepped-card-num">01</div>

            {/* Reserved Visual Slot for Cube Origin */}
            <div className="stepped-card-visual" style={{ minHeight: '160px' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  borderTop: '1px dashed rgba(255, 255, 255, 0.35)',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Scalloped divider inside card 01 */}
            <div style={{ margin: '1rem -1.8rem 1.4rem' }}>
              <ScallopWave color="#cc1b29" stroke="#ffffff" height={18} />
            </div>

            <div className="stepped-card-content">
              <h3 className="stepped-card-title">
                Architecture &amp;
                <span className="serif-italic">System Design</span>
              </h3>
              <p className="stepped-card-desc" style={{ marginBottom: '1.4rem' }}>
                Scoping product requirements, modeling normalized data schemas, and structuring modular component hierarchy designed for high scalability.
              </p>
              <div className="hero-scallop-card-actions">
                <span
                  className="btn-scallop-white"
                  style={{ pointerEvents: 'none', fontSize: '0.74rem', padding: '0.35rem 0.8rem' }}
                >
                  System Specs
                </span>
                <span
                  className="btn-scallop-outline"
                  style={{ pointerEvents: 'none', fontSize: '0.74rem', padding: '0.35rem 0.8rem' }}
                >
                  Clean Schemas
                </span>
                <span
                  className="btn-scallop-outline"
                  style={{ pointerEvents: 'none', fontSize: '0.74rem', padding: '0.35rem 0.8rem' }}
                >
                  API Contracts
                </span>
              </div>
            </div>
          </div>

          {/* CARD 02: Frontend & Motion Systems */}
          <div
            ref={setCardRef(1)}
            className="stepped-card card-step-2"
          >
            <div className="scallop-card-top-wave">
              <ScallopWave color="#cc1b29" stroke="#ffffff" height={20} />
            </div>

            {/* Upper corridor where cube rolls inside the card */}
            <div className="stepped-card-track-zone" />

            <div className="stepped-card-content">
              <div className="stepped-card-step-badge">STEP 02</div>
              <h3 className="stepped-card-title">
                Frontend &amp;
                <span className="serif-italic">Fluid Motion</span>
              </h3>
              <p className="stepped-card-desc">
                Translating complex design into accessible, pixel-perfect, 60fps applications using React, Next.js, TypeScript, and fluid GSAP micro-interactions.
              </p>
            </div>
          </div>

          {/* CARD 03: Full Stack & Backend Infrastructure */}
          <div
            ref={setCardRef(2)}
            className="stepped-card card-step-3"
          >
            <div className="scallop-card-top-wave">
              <ScallopWave color="#cc1b29" stroke="#ffffff" height={20} />
            </div>

            {/* Upper corridor where cube rolls inside the card */}
            <div className="stepped-card-track-zone" />

            <div className="stepped-card-content">
              <div className="stepped-card-step-badge">STEP 03</div>
              <h3 className="stepped-card-title">
                Full Stack &amp;
                <span className="serif-italic">Backend APIs</span>
              </h3>
              <p className="stepped-card-desc">
                Engineering secure REST &amp; WebSocket pipelines, robust database indexing in PostgreSQL/MongoDB, and sub-second endpoint response times.
              </p>
            </div>
          </div>

          {/* CARD 04: Production Scale & Delivery */}
          <div
            ref={setCardRef(3)}
            className="stepped-card card-step-4"
          >
            <div className="scallop-card-top-wave">
              <ScallopWave color="#cc1b29" stroke="#ffffff" height={20} />
            </div>

            {/* Upper corridor where cube arrives inside the last card */}
            <div className="stepped-card-track-zone" />

            <div className="stepped-card-content">
              <div className="stepped-card-step-badge">FINAL STEP 04</div>
              <h3 className="stepped-card-title">
                Shipping &amp;
                <span className="serif-italic">Production Scale</span>
              </h3>
              <p className="stepped-card-desc">
                Automated CI/CD deployments, zero-downtime releases, sub-second page performance auditing, and clean documentation built to empower engineering teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
