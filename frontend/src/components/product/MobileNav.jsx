import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { usePageTransition } from './PageTransition'

const mainTabs = [
  {
    label: 'Home',
    path: '/dashboard',
    exact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Farm',
    path: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

const phaseLinks = [
  { label: 'Crop Selection', path: '/dashboard/crop-selection', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
    </svg>
  )},
  { label: 'Crop Maintenance', path: '/dashboard/crop-maintenance', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )},
  { label: 'Harvest Intelligence', path: '/dashboard/harvest-intelligence', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22l1-1h18l1 1" /><path d="M6 18V4c0-1.1.9-2 2-2h8a2 2 0 012 2v14" /><path d="M10 10h4" /><path d="M10 14h4" />
    </svg>
  )},
  { label: 'Market & Selling', path: '/dashboard/market-selling', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  )},
]

function isActive(pathname, tab) {
  if (tab.exact) return pathname === tab.path
  if (tab.path) return pathname.startsWith(tab.path)
  return false
}

function isFarmActive(pathname) {
  return phaseLinks.some(p => pathname.startsWith(p.path))
}

export function MobileNav() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { pathname } = useLocation()
  const { navigateTo } = usePageTransition()
  const [showPhases, setShowPhases] = useState(false)

  if (!isMobile) return null

  const farmActive = isFarmActive(pathname)

  return (
    <>
      <AnimatePresence>
        {showPhases && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--color-bg-overlay)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={() => setShowPhases(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: '80px',
                left: 'var(--space-4)',
                right: 'var(--space-4)',
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'blur(24px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                padding: 'var(--space-3)',
              }}
            >
              <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', padding: 'var(--space-2) var(--space-3)' }}>
                Farm Advisory
              </p>
              {phaseLinks.map(phase => {
                const active = pathname.startsWith(phase.path)
                return (
                  <button
                    key={phase.path}
                    onClick={() => {
                      setShowPhases(false)
                      navigateTo(phase.path)
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: active ? 600 : 400,
                      color: active ? 'var(--color-accent)' : 'var(--color-text-primary)',
                      background: active ? 'var(--color-accent-bg)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background var(--duration-fast) var(--ease-out)',
                    }}
                  >
                    <span style={{ display: 'flex', color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>
                      {phase.icon}
                    </span>
                    {phase.label}
                  </button>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '68px',
          zIndex: 'var(--z-nav)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'blur(20px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
          borderTop: '1px solid var(--glass-border)',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.06)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {mainTabs.map(tab => {
          const active = tab.path === null ? farmActive : isActive(pathname, tab)
          const isFarmTab = tab.path === null

          return (
            <button
              key={tab.label}
              onClick={() => {
                if (isFarmTab) {
                  setShowPhases(prev => !prev)
                } else {
                  setShowPhases(false)
                  navigateTo(tab.path)
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                color: active ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                transition: 'color var(--duration-fast) var(--ease-out)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex' }}>{tab.icon}</span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: active ? 600 : 400,
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
