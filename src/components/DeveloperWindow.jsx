import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const handsOnSkills = [
  {
    category: 'Frontend Engineering',
    badge: 'UI & 60fps Motion',
    icon: '💻',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'GSAP Animation', 'Lenis Smooth Scroll'],
    summary: 'Extensive hands-on experience engineering interactive, mobile-first, 60fps web applications. Transforming complex Figma designs into pixel-perfect code with accessible components and silky micro-interactions.',
  },
  {
    category: 'Backend & APIs',
    badge: 'Server Architecture',
    icon: '⚡',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'WebSockets / Socket.io', 'JWT & OAuth Auth', 'Server-side Caching'],
    summary: 'Designing modular API architectures, secure authentication pipelines, and real-time bidirectional communication channels. Hands-on experience handling high concurrency and asynchronous tasks.',
  },
  {
    category: 'Database & Data Modeling',
    badge: 'Data Layer',
    icon: '🗄️',
    skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Mongoose', 'Schema Migrations', 'Query Optimization'],
    summary: 'Structuring normalized relational databases in PostgreSQL as well as flexible document stores in MongoDB. Hands-on with indexing, aggregations, data integrity, and automated schema migrations.',
  },
  {
    category: 'Production Architecture',
    badge: 'Qatar #1 Platform',
    icon: '🚀',
    skills: ['AKAZ Sports Hub (Qatar)', 'E-Commerce Engines', 'Payment Gateways', 'Performance Auditing', 'Vite / Turbopack'],
    summary: 'Architected and shipped production-grade platforms including Qatar’s premier sports platform (akazsportshub.com). Hands-on with catalog architectures, conversion-focused UX, and sub-second loading speeds.',
  },
]

const codeSnippet = `// althaf_profile.ts
export const developer: FullStackDeveloper = {
  name: "Althaf Rahman",
  role: "Full Stack Web Developer & Motion Engineer",
  designPhilosophy: "Editorial elegance + 60fps performance",
  focus: ["High-Performance UIs", "Scalable APIs", "Fluid Motion Systems"],
  experience: {
    frontend: ["React 19", "Next.js 15", "TypeScript", "Tailwind v4", "GSAP"],
    backend: ["Node.js", "Express", "REST", "WebSockets"],
    database: ["PostgreSQL", "MongoDB", "Prisma ORM"],
    flagshipProject: "AKAZ Sports Hub (Qatar)"
  },
  availability: "Open for freelance & full-time roles"
};`

export default function DeveloperWindow() {
  const [activeTab, setActiveTab] = useState('experience')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const windowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        windowRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: windowRef.current,
            start: 'top 82%',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div
        ref={windowRef}
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '2rem auto 0',
          background: '#ffffff',
          border: '1.5px solid var(--border-subtle)',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(204, 27, 41, 0.08), 0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        {/* WINDOW HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.9rem 1.6rem',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          {/* Traffic Lights */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: 'var(--red-primary)' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
          </div>

          {/* Window Title */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              letterSpacing: '1px',
              fontWeight: 600,
            }}
          >
            althaf-workstation — zsh
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              padding: '0.35rem 0.8rem',
              borderRadius: '2px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--red-primary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Full Specs ↗
          </button>
        </div>

        {/* TAB CONTROLS */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.8rem 1.6rem',
            background: '#ffffff',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`skill-tab-pill ${activeTab === 'experience' ? 'active' : ''}`}
            style={{ padding: '0.4rem 1.1rem', fontSize: '0.78rem' }}
          >
            Hands-on Engineering
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`skill-tab-pill ${activeTab === 'code' ? 'active' : ''}`}
            style={{ padding: '0.4rem 1.1rem', fontSize: '0.78rem' }}
          >
            Profile Blueprint (TS)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('akaz')}
            className={`skill-tab-pill ${activeTab === 'akaz' ? 'active' : ''}`}
            style={{ padding: '0.4rem 1.1rem', fontSize: '0.78rem' }}
          >
            ★ AKAZ Sports Hub Case
          </button>
        </div>

        {/* TAB 1: HANDS ON SPECIALIZATION */}
        {activeTab === 'experience' && (
          <div
            style={{
              padding: '2rem 1.8rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.4rem',
              background: 'var(--bg-secondary)',
            }}
          >
            {handsOnSkills.map((spec) => (
              <div
                key={spec.category}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{spec.icon}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        background: 'rgba(204, 27, 41, 0.08)',
                        color: 'var(--red-primary)',
                        fontWeight: 700,
                      }}
                    >
                      {spec.badge}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: 'var(--text-dark)',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {spec.category}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem',
                    }}
                  >
                    {spec.summary}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {spec.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        padding: '0.2rem 0.5rem',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '2px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CODE BLUEPRINT */}
        {activeTab === 'code' && (
          <div
            style={{
              padding: '2rem',
              background: '#151515',
              color: '#f0f0f0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.7',
              overflowX: 'auto',
            }}
          >
            <pre style={{ margin: 0 }}>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* TAB 3: AKAZ SPORTS HUB PRODUCTION SPOTLIGHT */}
        {activeTab === 'akaz' && (
          <div
            style={{
              padding: '2.4rem',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--red-primary)',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  FLAGSHIP PRODUCTION CASE STUDY
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    color: 'var(--text-dark)',
                    marginTop: '0.2rem',
                  }}
                >
                  AKAZ Sports Hub — Qatar&apos;s #1 Platform
                </h3>
              </div>
              <a
                href="https://www.akazsportshub.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-editorial-red"
              >
                Visit akazsportshub.com ↗
              </a>
            </div>

            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                maxWidth: '850px',
                marginBottom: '1.5rem',
              }}
            >
              Architected and engineered the primary digital storefront and distributor portal for Qatar’s leading athletic performance supplier. Built from the ground up for sub-second page loads, responsive GCC mobile shopping, and fluid GSAP animation.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.2rem',
                padding: '1.4rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
              }}
            >
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--red-primary)' }}>&lt; 0.8s</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>Median Time to Interactive</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--red-primary)' }}>100%</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>Custom Fluid Motion (GSAP)</div>
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--red-primary)' }}>GCC</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>Regional Scalability</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULL SPECS MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1.5rem',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '6px',
              maxWidth: '680px',
              width: '100%',
              padding: '2.5rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              border: '2px solid var(--red-primary)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-dark)' }}>
                Workstation <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--red-primary)' }}>Specs</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Dedicated to crafting elite web software. Engineered with React 19, Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, and GSAP motion orchestration.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <a href="#contact" className="btn-editorial-red" onClick={() => setIsModalOpen(false)}>
                Discuss a Project
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
