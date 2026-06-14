import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { portraitSrc } from '../data/content'
import { NavDogIcon } from './nav/NavDogIcon'

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
]

function setResumeHoverOrigin(event: React.PointerEvent<HTMLAnchorElement>) {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  target.style.setProperty('--resume-hover-x', `${x}%`)
  target.style.setProperty('--resume-hover-y', `${y}%`)
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="site-nav-layer pointer-events-none flex justify-center px-4 pt-5 md:pt-6"
    >
      <nav
        className={`pointer-events-auto flex items-center gap-4 rounded-full border border-white/[0.08] py-2 pl-2 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow,background-color,border-color] duration-300 md:gap-8 md:py-2.5 md:pl-2.5 md:pr-2.5 ${
          scrolled
            ? 'bg-black/70 shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]'
            : 'bg-black/50 shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]'
        }`}
        aria-label="Main navigation"
      >
        <Link to="/#home" className="shrink-0" aria-label="Home">
          <img
            src={portraitSrc}
            alt="Oey Chang"
            className="h-9 w-9 rounded-full object-cover object-[center_18%] md:h-10 md:w-10"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-ink transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/dog"
          className="nav-dog-link flex shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="My dog, Wushu"
        >
          <NavDogIcon />
        </Link>

        <a
          href="https://docs.google.com/document/d/1PRhWQULdrhxiATykFpkIKLJeIBRO6PLr0GSEFbgDMg4/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-resume-cta shrink-0 rounded-full px-4 py-2 text-sm font-medium md:px-5 md:py-2.5"
          onPointerEnter={setResumeHoverOrigin}
        >
          <span className="relative z-10">Resume</span>
        </a>
      </nav>
    </motion.header>
  )
}
