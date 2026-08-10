import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useAuth } from '../../context/AuthContext'
import { usePageTransition } from './PageTransition'

const navItems = [
  {
    label: 'Dashboard',
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
]

const phaseItems = [
  {
    label: 'Crop Selection',
    path: '/dashboard/crop-selection',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
      </svg>
    ),
  },
  {
    label: 'Crop Maintenance',
    path: '/dashboard/crop-maintenance',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Harvest Intelligence',
    path: '/dashboard/harvest-intelligence',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l1-1h18l1 1" /><path d="M6 18V4c0-1.1.9-2 2-2h8a2 2 0 012 2v14" /><path d="M10 10h4" /><path d="M10 14h4" />
      </svg>
    ),
  },
  {
    label: 'Market & Selling',
    path: '/dashboard/market-selling',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
]

const settingsItem = {
  label: 'Settings',
  path: '/dashboard/settings',
  icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
}

function isActive(pathname, item) {
  if (item.exact) return pathname === item.path
  return pathname.startsWith(item.path)
}

function NavButton({ item, collapsed, pathname, onClick }) {
  const active = isActive(pathname, item)

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: collapsed ? '10px 0' : '10px 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 'var(--radius-sm)',
        color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        background: active ? 'var(--color-surface)' : 'transparent',
        fontWeight: active ? 600 : 400,
        fontSize: 'var(--text-sm)',
        transition: 'all var(--duration-fast) var(--ease-out)',
        cursor: 'pointer',
        border: 'none',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'var(--color-surface)'
          e.currentTarget.style.color = 'var(--color-text-primary)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--color-text-secondary)'
        }
      }}
    >
      <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
      {!collapsed && <span>{item.label}</span>}
    </button>
  )
}

export function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { logout } = useAuth()
  const { navigateTo } = usePageTransition()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch { /* logout failed silently */ }
  }

  const handleNav = (path) => {
    navigateTo(path)
  }

  if (isMobile) return null

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-raised)',
        borderRight: '1px solid var(--color-border)',
        overflow: 'hidden',
        zIndex: 'var(--z-raised)',
      }}
    >
      <div
        style={{
          height: 'var(--topbar-height)',
          display: 'flex',
          alignItems: 'center',
          padding: collapsed ? '0 calc((var(--sidebar-collapsed) - 32px) / 2)' : '0 20px',
          borderBottom: '1px solid var(--color-border)',
          gap: '10px',
          overflow: 'hidden',
          transition: 'padding var(--duration-normal) var(--ease-out)',
        }}
      >
        <img
          src="/crop-pilot.svg"
          alt="Crop Pilot"
          style={{
            width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
            objectFit: 'contain', flexShrink: 0,
          }}
        />
        {!collapsed && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>
            Crop Pilot
          </span>
        )}
      </div>

      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden auto' }}>
        {navItems.map(item => (
          <NavButton key={item.path} item={item} collapsed={collapsed} pathname={pathname} onClick={() => handleNav(item.path)} />
        ))}

        {!collapsed && (
          <div style={{
            fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)',
            letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
            padding: '16px 12px 6px', marginTop: '4px',
          }}>
            Farm Advisory
          </div>
        )}
        {collapsed && <div style={{ height: '8px' }} />}

        <div style={{ borderLeft: collapsed ? 'none' : '2px solid var(--color-accent-bg)', marginLeft: collapsed ? 0 : '4px', paddingLeft: collapsed ? 0 : '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {phaseItems.map(item => (
            <NavButton key={item.path} item={item} collapsed={collapsed} pathname={pathname} onClick={() => handleNav(item.path)} />
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <NavButton item={settingsItem} collapsed={collapsed} pathname={pathname} onClick={() => handleNav(settingsItem.path)} />
      </nav>

      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start', gap: '12px',
            padding: collapsed ? '10px 0' : '10px 12px', borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-sm)', color: '#c4564a',
            transition: 'all var(--duration-fast) var(--ease-out)', cursor: 'pointer',
            background: 'none', border: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196, 86, 74, 0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!collapsed && <span>Sign out</span>}
        </button>
        <button
          onClick={onToggle}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start', gap: '12px',
            padding: collapsed ? '10px 0' : '10px 12px', borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)',
            transition: 'all var(--duration-fast) var(--ease-out)', cursor: 'pointer',
            background: 'none', border: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-normal) var(--ease-out)', flexShrink: 0 }}>
            <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  )
}
