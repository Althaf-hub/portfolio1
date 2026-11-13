import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function PixelHeading() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const terminalRef = useRef(null)
  const [resolved, setResolved] = useState(false)
  const [typedCommand, setTypedCommand] = useState('')
  const [commandFinished, setCommandFinished] = useState(false)

  // 1. Typing animation for "enter" command
  useEffect(() => {
    const fullCmd = 'enter'
    let charIndex = 0
    const delayTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex <= fullCmd.length) {
          setTypedCommand(fullCmd.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setCommandFinished(true)
        }
      }, 70)
    }, 300)

    return () => clearTimeout(delayTimer)
  }, [])

  // 2. Terminal container entrance animation
  useEffect(() => {
    if (!terminalRef.current) return
    gsap.fromTo(
      terminalRef.current,
      {
        opacity: 0,
        y: 25,
        scale: 0.95,
        borderColor: 'rgba(59, 130, 246, 0.15)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        borderColor: 'rgba(59, 130, 246, 0.45)',
        duration: 0.8,
        ease: 'power3.out',
      }
    )
  }, [])

  // 3. Pixel resolution canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let startTime = null
    const DURATION = 2000 // ms total transition

    // High DPI sizing
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const w = Math.max(rect.width, 320)
      const h = Math.max(rect.height, 160)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }
    resize()
    window.addEventListener('resize', resize)

    // Offscreen render of the text to sample pixels
    const renderTextToBuffer = (w, h) => {
      const offCanvas = document.createElement('canvas')
      offCanvas.width = w
      offCanvas.height = h
      const offCtx = offCanvas.getContext('2d')
      if (!offCtx) return null

      offCtx.fillStyle = '#000000'
      offCtx.fillRect(0, 0, w, h)

      const isMobile = w < 640 * dpr

      if (isMobile) {
        // Two lines for mobile screens
        const fontSize = Math.min(w * 0.16, 90 * dpr)
        offCtx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`
        offCtx.textAlign = 'center'
        offCtx.textBaseline = 'middle'

        offCtx.fillStyle = '#ffffff'
        offCtx.fillText('ALTHAF', w / 2, h * 0.35)

        offCtx.fillStyle = '#60a5fa'
        offCtx.fillText('RAHMAN', w / 2, h * 0.72)
      } else {
        // Single line for desktop
        const fontSize = Math.min(w * 0.105, 82 * dpr)
        offCtx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`
        offCtx.textAlign = 'center'
        offCtx.textBaseline = 'middle'

        // Measure width to center ALTHAF + RAHMAN
        const althafWidth = offCtx.measureText('ALTHAF ').width
        const totalWidth = offCtx.measureText('ALTHAF RAHMAN').width
        const startX = (w - totalWidth) / 2

        offCtx.fillStyle = '#ffffff'
        offCtx.textAlign = 'left'
        offCtx.fillText('ALTHAF ', startX, h * 0.52)

        offCtx.fillStyle = '#60a5fa'
        offCtx.fillText('RAHMAN', startX + althafWidth, h * 0.52)
      }

      return offCtx.getImageData(0, 0, w, h)
    }

    // Animation loop for pixel blocks shrinking down
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / DURATION, 1)

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // Block size decreases as animation progresses
      let blockSize = 1
      if (progress < 0.2) {
        blockSize = Math.round(32 * dpr)
      } else if (progress < 0.4) {
        blockSize = Math.round(20 * dpr)
      } else if (progress < 0.6) {
        blockSize = Math.round(12 * dpr)
      } else if (progress < 0.78) {
        blockSize = Math.round(7 * dpr)
      } else if (progress < 0.9) {
        blockSize = Math.round(3 * dpr)
      } else {
        blockSize = Math.round(1 * dpr)
      }

      const imgData = renderTextToBuffer(w, h)
      if (imgData) {
        const data = imgData.data

        for (let y = 0; y < h; y += blockSize) {
          for (let x = 0; x < w; x += blockSize) {
            const index = (y * w + x) * 4
            const r = data[index]
            const g = data[index + 1]
            const b = data[index + 2]

            // If the sampled pixel is part of the text
            if (r > 30 || g > 30 || b > 30) {
              const noise = progress < 0.85 ? (Math.random() > 0.1 ? 1 : 0.35) : 1
              const alpha = Math.min(1, progress * 1.5 * noise)

              // Accent color vs white
              if (b > r + 20) {
                ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`
              } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
              }

              const gap = progress < 0.6 ? 2 * dpr : progress < 0.85 ? 1 * dpr : 0
              ctx.fillRect(x, y, Math.max(1, blockSize - gap), Math.max(1, blockSize - gap))
            }
          }
        }
      }

      if (progress < 1) {
        animId = requestAnimationFrame(animate)
      } else {
        setResolved(true)
      }
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      ref={terminalRef}
      className="hero-terminal-window"
      style={{
        maxWidth: '920px',
        width: '100%',
        margin: '0 auto 1.5rem',
        background: 'linear-gradient(180deg, #101018 0%, #08080d 100%)',
        border: '1px solid rgba(59, 130, 246, 0.35)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow:
          '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(37, 99, 235, 0.18)',
        textAlign: 'left',
        position: 'relative',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* 1. TERMINAL TITLE BAR */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 1.25rem',
          background: '#13131e',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* macOS Traffic Light Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span
            style={{
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#ff5f56',
              boxShadow: '0 0 6px rgba(255, 95, 86, 0.5)',
            }}
          />
          <span
            style={{
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#ffbd2e',
              boxShadow: '0 0 6px rgba(255, 189, 46, 0.5)',
            }}
          />
          <span
            style={{
              width: '11px',
              height: '11px',
              borderRadius: '50%',
              background: '#27c93f',
              boxShadow: '0 0 6px rgba(39, 201, 63, 0.5)',
            }}
          />
        </div>

        {/* Terminal Tab Path */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: '#8b8ba7',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span>althaf@portfolio:</span>
          <span style={{ color: '#60a5fa' }}>~/hero/enter.sh</span>
        </div>

        {/* Live Status Badge */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: '#34d399',
            background: 'rgba(52, 211, 153, 0.12)',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            border: '1px solid rgba(52, 211, 153, 0.28)',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#34d399',
              boxShadow: '0 0 8px #34d399',
            }}
          />
          PIXEL ENGINE READY
        </div>
      </div>

      {/* 2. TERMINAL SHELL PROMPT: TYPING "ENTER" */}
      <div
        style={{
          padding: '0.85rem 1.5rem 0.4rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#94a3b8',
          borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
          background: 'rgba(255, 255, 255, 0.015)',
        }}
      >
        <span style={{ color: '#34d399', fontWeight: 600 }}>visitor@system:~$</span>
        <span style={{ color: '#60a5fa', fontWeight: 600 }}>{typedCommand}</span>
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '14px',
            background: '#60a5fa',
            animation: 'cursor-blink 1s step-start infinite',
          }}
        />
        {commandFinished && (
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.68rem',
              color: '#34d399',
              background: 'rgba(52, 211, 153, 0.1)',
              padding: '0.15rem 0.5rem',
              borderRadius: '3px',
              border: '1px solid rgba(52, 211, 153, 0.2)',
            }}
          >
            [STATUS: 200 OK ↵]
          </span>
        )}
      </div>

      {/* 3. TERMINAL SCREEN: PIXELATED RESOLUTION CANVAS */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '170px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem 2.2rem',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Matrix Scanline background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }}
        />

        {/* The Pixel Decode Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: resolved ? 0 : 1,
            transition: 'opacity 0.6s ease',
            zIndex: 2,
          }}
        />

        {/* Resolved Clean Typography */}
        <h1
          className="hero-name"
          style={{
            margin: 0,
            opacity: resolved ? 1 : 0,
            transition: 'opacity 0.6s ease',
            pointerEvents: resolved ? 'auto' : 'none',
            zIndex: 1,
            textAlign: 'center',
            fontSize: 'clamp(2.6rem, 6.8vw, 5.2rem)',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.05,
          }}
        >
          <span style={{ color: '#ffffff' }}>
            Althaf
          </span>{' '}
          <span
            style={{
              color: 'var(--accent-light)',
            }}
          >
            Rahman
          </span>
        </h1>
      </div>

      {/* 4. TERMINAL FOOTER LOG */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.45rem 1.25rem',
          background: '#0d0d15',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: '#64748b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: '#34d399' }}>●</span>
          <span>SYSTEM: INITIALIZED</span>
        </div>
        <div>
          <span>RENDER_ENGINE: </span>
          <span style={{ color: '#60a5fa' }}>CANVAS_2D_PIXELS</span>
        </div>
      </div>
    </div>
  )
}
