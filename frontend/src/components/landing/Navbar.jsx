import { useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Principles', href: '#principles' },
]

export function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { grantDemoAccess } = useAuth()

  const navRef = useRef(null)
  const buttonRefs = useRef([])
  const [bubble, setBubble] = useState({ left: 0, width: 0, opacity: 0 })

  const handleMouseEnter = useCallback((index) => {
    const btn = buttonRefs.current[index]
    const nav = navRef.current
    if (!btn || !nav) return
    const btnRect = btn.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()
    setBubble({
      left: btnRect.left - navRect.left,
      width: btnRect.width,
      opacity: 1,
    })
  }, [])

  const handleNavMouseLeave = useCallback(() => {
    setBubble(prev => ({ ...prev, opacity: 0 }))
  }, [])

  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const handleDemoAccess = useCallback(async () => {
    await grantDemoAccess()
    navigate('/dashboard')
  }, [grantDemoAccess, navigate])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '16px',
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: 'var(--z-nav)',
          width: isMobile ? 'calc(100% - 32px)' : 'min(920px, calc(100% - 64px))',
          willChange: 'opacity, transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '56px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(24px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            transition: 'all var(--duration-slow) var(--ease-out)',
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: 'var(--tracking-tight)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <img
              src="/crop-pilot.svg"
              alt="Crop Pilot logo"
              style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-xs)',
                objectFit: 'contain',
              }}
            />
            Crop Pilot
          </Link>

          {!isMobile && (
            <div
              ref={navRef}
              onMouseLeave={handleNavMouseLeave}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: `${bubble.left}px`,
                  width: `${bubble.width}px`,
                  height: '36px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--color-accent-bg)',
                  border: '1px solid var(--glass-border)',
                  opacity: bubble.opacity,
                  transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              {navLinks.map((link, i) => (
                <button
                  key={link.href}
                  ref={el => { buttonRefs.current[i] = el }}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    transition: 'color var(--duration-fast) var(--ease-out)',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <ThemeToggle size={18} />
            {!isMobile ? (
              <Button variant="primary" size="sm" onClick={handleDemoAccess} style={{ borderRadius: 'var(--radius-pill)' }}>
                See Demo
              </Button>
            ) : (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: mobileOpen ? '0' : '5px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  transition: 'all var(--duration-normal) var(--ease-out)',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: '16px',
                    height: '1.5px',
                    background: 'var(--color-text-primary)',
                    borderRadius: '2px',
                    transition: 'all var(--duration-normal) var(--ease-out)',
                    transform: mobileOpen ? 'rotate(45deg) translateY(0.75px)' : 'none',
                  }}
                />
                {!mobileOpen && (
                  <span
                    style={{
                      width: '12px',
                      height: '1.5px',
                      background: 'var(--color-text-primary)',
                      borderRadius: '2px',
                    }}
                  />
                )}
                <span
                  style={{
                    width: '16px',
                    height: '1.5px',
                    background: 'var(--color-text-primary)',
                    borderRadius: '2px',
                    transition: 'all var(--duration-normal) var(--ease-out)',
                    transform: mobileOpen ? 'rotate(-45deg) translateY(-0.75px)' : 'none',
                  }}
                />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '16px',
              right: '16px',
              zIndex: 'calc(var(--z-nav) - 1)',
              background: 'var(--glass-bg-strong)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                style={{
                  padding: '12px 16px',
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  textAlign: 'left',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-surface)'
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ padding: '8px 4px 4px' }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileOpen(false)
                  handleDemoAccess()
                }}
                style={{ width: '100%' }}
              >
                See Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
