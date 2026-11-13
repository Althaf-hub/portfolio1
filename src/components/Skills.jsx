import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    category: 'Frontend & UI',
    icon: '💻',
    skills: [
      { name: 'React 19', icon: '⚛️', pct: 94, tag: 'Core Library' },
      { name: 'Next.js 15', icon: '▲', pct: 90, tag: 'SSR / Fullstack' },
      { name: 'TypeScript', icon: '🔷', pct: 88, tag: 'Type Safety' },
      { name: 'JavaScript (ESNext)', icon: '🟨', pct: 95, tag: 'Modern Standards' },
      { name: 'Tailwind CSS v4', icon: '💨', pct: 92, tag: 'Design Systems' },
      { name: 'GSAP Animation', icon: '✨', pct: 88, tag: 'Fluid Motion' },
      { name: 'HTML5 & Accessible CSS', icon: '🌐', pct: 96, tag: 'Semantic & A11y' },
    ],
  },
  {
    category: 'Backend & APIs',
    icon: '⚡',
    skills: [
      { name: 'Node.js', icon: '🟢', pct: 85, tag: 'Server Runtime' },
      { name: 'Express.js', icon: '🚂', pct: 88, tag: 'REST Pipelines' },
      { name: 'WebSockets & Socket.io', icon: '🔌', pct: 82, tag: 'Realtime Comms' },
      { name: 'REST & GraphQL APIs', icon: '🔄', pct: 90, tag: 'API Architecture' },
    ],
  },
  {
    category: 'Databases & Cloud',
    icon: '🗄️',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', pct: 84, tag: 'Relational DB' },
      { name: 'MongoDB', icon: '🍃', pct: 78, tag: 'Document Store' },
      { name: 'Prisma ORM', icon: '💎', pct: 86, tag: 'Data Modeling' },
      { name: 'Git & GitHub CI', icon: '🔀', pct: 90, tag: 'Version Control' },
      { name: 'Vite & Build Tooling', icon: '⚡', pct: 92, tag: 'Optimized Bundles' },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState(skillCategories[0].category)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header-anim', {
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

  const currentCategory = skillCategories.find((c) => c.category === activeFilter)

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: '6rem 3rem 7rem',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        {/* HEADER */}
        <div className="editorial-section-header">
          <div className="editorial-section-tag skills-header-anim">
            03 // TECHNICAL MASTERY &amp; TOOLS
          </div>
          <h2 className="editorial-section-title skills-header-anim">
            Engineered for <span className="serif-italic">Precision &amp; 60fps Speed</span>
          </h2>
          <p
            className="skills-header-anim"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '680px',
              marginTop: '0.8rem',
              lineHeight: '1.6',
            }}
          >
            A battle-tested stack selected for performance, maintainability, and silky user interactions.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="skills-tab-nav">
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              type="button"
              className={`skill-tab-pill ${activeFilter === cat.category ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.category)}
            >
              <span style={{ marginRight: '0.4rem' }}>{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* SKILLS GRID */}
        <div className="editorial-skills-grid">
          {currentCategory?.skills.map((skill) => (
            <div key={skill.name} className="editorial-skill-item">
              <div className="skill-item-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                  <span className="skill-item-name">{skill.name}</span>
                </div>
                <span className="skill-item-pct">{skill.pct}%</span>
              </div>

              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {skill.tag}
              </div>

              <div className="skill-meter-track">
                <div
                  className="skill-meter-fill"
                  style={{ width: `${skill.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
