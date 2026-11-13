import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const links = [
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Workstation', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className="navbar">
      <a href="#hero" className="navbar-logo" onClick={(e) => scrollTo(e, '#hero')}>
        AR<span className="dot" />
      </a>

      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => scrollTo(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="navbar-contact-btn"
        onClick={(e) => scrollTo(e, '#contact')}
      >
        Get In Touch
      </a>
    </nav>
  )
}
