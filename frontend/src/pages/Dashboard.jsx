import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { Skeleton } from '../components/ui/Skeleton'
import { useAuth } from '../context/AuthContext'
import { usePageTransition } from '../components/product/PageTransition'
import { getStats, getSessions } from '../services/farmService'
import { PHASES } from '../config/phases'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString()
}

function getPhaseByKey(key) {
  return PHASES.find(p => p.key === key) || PHASES.find(p => p.slug === key)
}

function getPhaseById(id) {
  return PHASES.find(p => p.id === Number(id)) || PHASES.find(p => p.key === `phase${id}`)
}

const phaseIconsSmall = {
  1: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
    </svg>
  ),
  2: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  3: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22l1-1h18l1 1" /><path d="M6 18V4c0-1.1.9-2 2-2h8a2 2 0 012 2v14" /><path d="M10 10h4" /><path d="M10 14h4" />
    </svg>
  ),
  4: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
}

const phaseIcons = {
  phase1: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
    </svg>
  ),
  phase2: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  phase3: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22l1-1h18l1 1" /><path d="M6 18V4c0-1.1.9-2 2-2h8a2 2 0 012 2v14" /><path d="M10 10h4" /><path d="M10 14h4" />
    </svg>
  ),
  phase4: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
}

export function Dashboard() {
  const { user } = useAuth()
  const { navigateTo } = usePageTransition()
  const navigate = useNavigate()
  const greeting = getGreeting()
  const displayName = user?.name?.split(' ')[0] || ''

  const [stats, setStats] = useState(null)
  const [sessions, setSessions] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      try {
        const [statsData, sessionsData] = await Promise.all([
          getStats().catch(() => null),
          getSessions().catch(() => null),
        ])
        if (!cancelled) {
          setStats(statsData?.stats || statsData)
          setSessions(Array.isArray(sessionsData) ? sessionsData : sessionsData?.sessions || [])
        }
      } catch {
        // Silently handle — zero-data display will show
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  const handleNavigatePhase = useCallback((slug) => {
    navigateTo(`/dashboard/${slug}`)
  }, [navigateTo])

  // Zone 1 — Stats Row
  const statCards = [
    {
      label: 'Total Sessions',
      // Source: GET /api/farm/stats → totalSessions
      value: loading ? null : (stats?.totalSessions ?? 0),
      display: loading ? null : `${stats?.totalSessions ?? 0} sessions`,
    },
    {
      label: 'Last Active',
      value: stats?.lastActivePhase,
      display: loading ? null : stats?.lastActivePhase
        ? `${stats.lastActivePhase.phaseName} — ${formatRelativeTime(stats.lastActivePhase.updatedAt)}`
        : 'No sessions yet',
    },
    {
      label: 'Phases Explored',
      value: loading ? null : (stats?.phasesUsed ?? 0),
      display: loading ? null : `${stats?.phasesUsed ?? 0} of 4 phases`,
    },
  ]

  const [showAllSessions, setShowAllSessions] = useState(false)

  const isNewUser = !loading && (!stats?.totalSessions || stats.totalSessions === 0)
  const sessionList = sessions || []
  const SESSION_LIMIT = 6
  const visibleSessions = showAllSessions ? sessionList : sessionList.slice(0, SESSION_LIMIT)

  return (
    <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
          {greeting}{displayName ? `, ${displayName}` : ''}
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
          Your farm advisory dashboard. Track sessions and explore AI-powered guidance.
        </p>
      </div>

      {/* Zone 1 — Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 'var(--space-4)', marginBottom: 'clamp(24px, 3vw, 40px)' }}>
        {statCards.map(stat => (
          <div key={stat.label} className="glass-card" style={{ padding: 'var(--space-5) var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>
              {stat.label}
            </span>
            {loading ? (
              <Skeleton width="80%" height="28px" />
            ) : (
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {stat.display}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Zone 2 — Farm Analytics */}
      <div className="glass-card" style={{ padding: 'clamp(24px, 4vw, 48px)', marginBottom: 'clamp(24px, 3vw, 40px)' }}>
        {isNewUser ? (
          <EmptyState
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 20h10" /><path d="M10 20c5.5-2.5 8-8 8-14" /><path d="M6 6c0 6 2.5 11.5 8 14" /><path d="M12 2c-2.5 4-4 8-4 14" />
              </svg>
            }
            title="Your farm insights await"
            description="Your farm insights will appear here as you complete advisory sessions. Begin with crop selection to get AI-powered recommendations."
            actionLabel="Begin with Crop Selection"
            onAction={() => handleNavigatePhase('crop-selection')}
          />
        ) : (
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>
              Farm Analytics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Completed</span>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{stats?.totalSessions ?? 0} sessions</p>
              </div>
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Coverage</span>
                <p style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{stats?.phasesUsed ?? 0}/4 phases</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Zone 3 — Session History Feed */}
      <div className="glass-card" style={{ padding: 'clamp(20px, 3vw, 32px)', marginBottom: 'clamp(24px, 3vw, 40px)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>
          Session History
        </h3>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[1, 2, 3].map(i => <Skeleton key={i} height="52px" />)}
          </div>
        ) : visibleSessions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {visibleSessions.map(session => {
              const phase = getPhaseById(session.phaseId) || getPhaseByKey(session.phaseId || session.phase)
              const displayName = session.sessionName || session.phaseName || phase?.title || 'Session'
              return (
                <div
                  key={session._id || session.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-sm)',
                    gap: 'var(--space-3)',
                    transition: 'background var(--duration-fast) var(--ease-out)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-surface-hover)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface)' }}
                  onClick={() => {
                    if (!phase) return
                    navigate(`/dashboard/${phase.slug}?session=${session._id}`)
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1, minWidth: 0 }}>
                    <span style={{ color: 'var(--color-text-tertiary)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                      {phaseIconsSmall[session.phaseId] || phaseIconsSmall[1]}
                    </span>
                    <span className="session-name" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {displayName}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
                      {formatRelativeTime(session.createdAt || session.date)}
                    </span>
                  </div>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 500,
                      color: 'var(--color-text-tertiary)',
                      padding: 0,
                      whiteSpace: 'nowrap',
                      transition: 'color var(--duration-fast) var(--ease-out)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-tertiary)' }}
                    onClick={e => {
                      e.stopPropagation()
                      if (phase) navigate(`/dashboard/${phase.slug}?session=${session._id}`)
                    }}
                  >
                    <span className="session-action-text">View Results</span> <span style={{ marginLeft: '2px' }}>&rarr;</span>
                  </button>
                </div>
              )
            })}
            {sessionList.length > SESSION_LIMIT && (
              <div style={{ textAlign: 'center', paddingTop: 'var(--space-3)' }}>
                <button
                  onClick={() => setShowAllSessions(prev => !prev)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-body)',
                    padding: 'var(--space-1) var(--space-3)',
                  }}
                >
                  {showAllSessions ? 'Show Less' : `View All Sessions (${sessionList.length})`}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-3)' }}>
              Your session history will appear here.
            </p>
            <Button variant="secondary" size="sm" onClick={() => handleNavigatePhase('crop-selection')}>
              Begin with Crop Selection
            </Button>
          </div>
        )}
      </div>

      {/* Responsive styles for session rows */}
      <style>{`
        @media (max-width: 768px) {
          .session-name {
            max-width: 120px !important;
          }
          .session-action-text {
            display: none;
          }
        }
      `}</style>

      {/* Zone 4 — Phase Entry Points */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>
          Farm Advisory Phases
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'var(--space-4)' }}>
          {PHASES.map((phase, index) => {
            const isFirst = index === 0 && isNewUser

            return (
              <div
                key={phase.key}
                className="glass-card"
                style={{
                  padding: 'var(--space-5)',
                  transition: 'all var(--duration-normal) var(--ease-out)',
                  border: isFirst ? '1px solid var(--color-accent)' : undefined,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-accent-bg)', color: 'var(--color-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {phaseIcons[phase.key]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                      {phase.title}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                      {phase.subtitle}
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-4)' }}>
                  {phase.description}
                </p>
                <Button
                  variant={isFirst ? 'accent' : 'secondary'}
                  size="sm"
                  onClick={() => handleNavigatePhase(phase.slug)}
                  style={{ width: '100%' }}
                >
                  Begin
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
