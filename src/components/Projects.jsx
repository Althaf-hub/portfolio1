import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'akaz',
    num: '01',
    name: 'AKAZ Sports Hub',
    subtitle: "Qatar's #1 Sports Platform",
    desc: "Qatar's premier sports enterprise and GCC distributor of compression gear, athletic footwear, and performance equipment. Built with a fluid product exploration interface, sub-second checkout pipeline, and high-conversion e-commerce architecture.",
    tags: ['Next.js 15', 'Tailwind CSS', 'GSAP Motion', 'E-Commerce Architecture', 'GCC Scale'],
    live: 'https://www.akazsportshub.com/',
    img: 'https://www.akazsportshub.com/images/hero-bg.png',
    placeholder: '⚡',
    featured: true,
    stats: '50K+ Monthly GCC Traffic • Sub-second Page Loads • Production Live',
  },
  {
    id: 'housematehub',
    num: '02',
    name: 'HouseMate Hub',
    subtitle: 'Household Services Marketplace',
    desc: '9-module full-stack platform connecting users with verified household workers — cleaners, cooks, nannies, drivers, and maintenance professionals. Built the booking calendar with conflict-free scheduling, worker verification pipeline, and UPI payment flow. Documented with a formal project report featuring UML diagrams (ER, use case, sequence, activity) covering user, worker, and admin workflows.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Supabase', 'UPI Payments', 'UML Documentation'],
    live: '#',
    placeholder: '🏠',
    featured: false,
    stats: '4-Member Team • 9 Modules • Conflict-free Scheduling • Formal Report with UML',
    hideActions: true,
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.editorial-project-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: '6rem 3rem 7rem',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
        {/* EDITORIAL SECTION HEADER */}
        <div className="editorial-section-header">
          <div className="editorial-section-tag projects-header-item">
            02 // SELECTED WORKS &amp; CASE STUDIES
          </div>
          <h2 className="editorial-section-title projects-header-item">
            Proven Systems, <span className="serif-italic">Shipped to Production</span>
          </h2>
          <p
            className="projects-header-item"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '680px',
              marginTop: '0.8rem',
              lineHeight: '1.6',
            }}
          >
            A curation of high-impact platforms, e-commerce engines, and motion-rich digital interfaces built for modern scale.
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="editorial-projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`editorial-project-card ${project.featured ? 'featured-card' : ''}`}
            >
              {/* IMAGE / PREVIEW CONTAINER */}
              <div className="project-image-box">
                {project.img ? (
                  <img
                    src={project.img}
                    alt={project.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      if (e.currentTarget.nextSibling) {
                        e.currentTarget.nextSibling.style.display = 'flex'
                      }
                    }}
                  />
                ) : null}
                <div
                  style={{
                    display: project.img ? 'none' : 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-card)',
                    fontSize: '3.5rem',
                  }}
                >
                  {project.placeholder}
                </div>
              </div>

              {/* PROJECT DETAILS */}
              <div className="project-details">
                <div>
                  <div className="project-category-badge">
                    <span>{project.num}</span>
                    <span>•</span>
                    <span>{project.featured ? 'Flagship Production Platform' : 'Full Stack Application'}</span>
                  </div>

                  <h3 className="project-title-editorial">{project.name}</h3>
                  <div className="project-subtitle-editorial">{project.subtitle}</div>

                  <p className="project-desc-editorial">{project.desc}</p>

                  {project.stats && (
                    <div
                      style={{
                        padding: '0.6rem 0.9rem',
                        background: 'rgba(204, 27, 41, 0.05)',
                        borderLeft: '2px solid var(--red-primary)',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--red-primary)',
                        marginBottom: '1.2rem',
                        fontWeight: 600,
                      }}
                    >
                      {project.stats}
                    </div>
                  )}

                  <div className="project-tags-list">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`tag-pill ${project.featured ? 'tag-featured' : ''}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {!project.hideActions && (
                  <div className="project-links-row">
                    {project.live && project.live !== '#' ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-editorial-red"
                      >
                        Visit Live Platform ↗
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="btn-editorial-outline"
                        onClick={() => alert(`Launching ${project.name} preview demo.`)}
                      >
                        View Architecture
                      </button>
                    )}
                    {project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-editorial-outline"
                      >
                        Codebase ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
