import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TerminalHeading() {
  const containerRef = useRef(null)
  const deviceRef = useRef(null)
  const titleRef = useRef(null)
  const statusBadgeRef = useRef(null)
  const [typedCommand, setTypedCommand] = useState('')
  const fullCommand = 'mount --stack fullstack-developer.env'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Device / Terminal receives the heading from Hero and docks it
      // The terminal frame scales in and borders illuminate as the heading arrives
      gsap.fromTo(
        deviceRef.current,
        {
          opacity: 0.6,
          y: 40,
          scale: 0.94,
          borderColor: 'rgba(59, 130, 246, 0.1)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          borderColor: 'rgba(59, 130, 246, 0.55)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(37, 99, 235, 0.2)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            onEnter: () => {
              // Trigger typing animation for terminal command
              let i = 0
              const interval = setInterval(() => {
                if (i <= fullCommand.length) {
                  setTypedCommand(fullCommand.slice(0, i))
                  i++
                } else {
                  clearInterval(interval)
                }
              }, 25)
            },
          },
        }
      )

      // 2. Docked Title expansion & illumination on arrival
      gsap.fromTo(
        titleRef.current,
        {
          scale: 0.88,
          opacity: 0.2,
          y: -25,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // 3. Status badge pop
      gsap.from(statusBadgeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto 2.5rem',
        perspective: '1200px',
      }}
    >
      {/* TERMINAL / DEVICE FRAME */}
      <div
        ref={deviceRef}
        style={{
          background: 'linear-gradient(180deg, #101017 0%, #08080c 100%)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(37, 99, 235, 0.1)',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* TERMINAL TOP BAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            background: '#13131c',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f' }} />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#8b8ba7',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>workstation@althaf:</span>
            <span style={{ color: '#60a5fa' }}>~/stack/production</span>
          </div>

          <div
            ref={statusBadgeRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#34d399',
              background: 'rgba(52, 211, 153, 0.12)',
              padding: '0.2rem 0.6rem',
              borderRadius: '3px',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }} />
            STACK DOCKED &amp; READY
          </div>
        </div>

        {/* TERMINAL SCREEN BODY */}
        <div style={{ padding: '2.5rem 2rem 2.8rem', textAlign: 'center' }}>
          {/* Simulated live prompt line */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#60a5fa',
              marginBottom: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(37, 99, 235, 0.08)',
              padding: '0.4rem 1rem',
              borderRadius: '4px',
              border: '1px solid rgba(37, 99, 235, 0.25)',
            }}
          >
            <span style={{ color: '#34d399' }}>althaf@system:~$</span>
            <span style={{ color: '#f3f4f6' }}>{typedCommand || 'mount --stack fullstack-developer.env'}</span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                background: '#60a5fa',
                animation: 'cursor-blink 1s step-start infinite',
              }}
            />
          </div>

          {/* DOCKED HEADLINE - 100% SOLID BRIGHT FULLY VISIBLE TEXT */}
          <div ref={titleRef}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 6.2vw, 5.2rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
                margin: '0.5rem 0 1rem',
                textTransform: 'uppercase',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem 1rem',
              }}
            >
              {/* FULL STACK in solid pure white */}
              <span
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 20px rgba(255, 255, 255, 0.25)',
                }}
              >
                FULL STACK
              </span>

              {/* DEVELOPER in solid electric blue */}
              <span
                style={{
                  color: '#3b82f6',
                  textShadow: '0 0 35px rgba(59, 130, 246, 0.6), 0 2px 10px rgba(0, 0, 0, 0.8)',
                  display: 'inline-block',
                }}
              >
                DEVELOPER
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#93c5fd',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              ✦ Hands-On Production Engineering &amp; Interactive Web UIs ✦
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
