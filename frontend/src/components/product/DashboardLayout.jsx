import { useState, useCallback, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { MobileNav } from './MobileNav'
import { PageTransitionProvider } from './PageTransition'
import { useFarm } from '../../context/FarmContext'
import { PHASES } from '../../config/phases'

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 15 * 1024 * 1024

function getPhaseFromPath(pathname) {
  const slugMap = {
    'crop-maintenance': 'phase2',
    'harvest-intelligence': 'phase3',
    'market-selling': 'phase4',
  }
  for (const [slug, key] of Object.entries(slugMap)) {
    if (pathname.includes(slug)) return key
  }
  return null
}

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const dragCounter = useRef(0)
  const { pathname } = useLocation()
  const { phases, setPhaseImage } = useFarm()

  const activePhaseKey = getPhaseFromPath(pathname)

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    if (!activePhaseKey) return
    dragCounter.current++
    if (dragCounter.current === 1) setDragActive(true)
  }, [activePhaseKey])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) setDragActive(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    dragCounter.current = 0
    setDragActive(false)
    if (!activePhaseKey) return

    const files = Array.from(e.dataTransfer.files).filter(f =>
      IMAGE_TYPES.includes(f.type) && f.size <= MAX_SIZE
    )
    if (files.length === 0) return

    const images = phases[activePhaseKey]?.images || [null, null, null, null]
    const emptySlots = []
    for (let i = 0; i < 4; i++) {
      if (!images[i]) emptySlots.push(i)
    }

    let slotIdx = 0
    for (const file of files) {
      if (slotIdx >= emptySlots.length) break
      setPhaseImage(activePhaseKey, emptySlots[slotIdx], {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
      })
      slotIdx++
    }
  }, [activePhaseKey, phases, setPhaseImage])

  return (
    <PageTransitionProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(prev => !prev)}
        />

        <div
          style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Topbar />

          <main
            style={{
              flex: 1,
              padding: 'clamp(16px, 3vw, 32px)',
              paddingBottom: '84px',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            <Outlet />
            {dragActive && activePhaseKey && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(110, 117, 94, 0.08)',
                border: '2px dashed var(--color-accent)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 'var(--z-modal)',
                pointerEvents: 'none',
              }}>
                <div style={{
                  padding: 'var(--space-6) var(--space-8)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 'var(--space-3)' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                    Drop photos here
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
                    JPEG, PNG, WebP up to 15MB each
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>

        <MobileNav />
      </div>
    </PageTransitionProvider>
  )
}
