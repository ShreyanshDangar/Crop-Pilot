import { useRef, useState, useCallback } from 'react'
import GalleryHeroScene from './GalleryHeroScene'
import { useTheme } from '../../context/ThemeContext'

export default function GalleryHero() {
  const heroRef = useRef()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])

  return (
    <section ref={heroRef} style={S.hero}>
      <GalleryHeroScene bgColor={isDark ? '#111315' : '#F8F3EC'} onReady={handleSceneReady} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-bg)',
          zIndex: 1,
          opacity: sceneReady ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
          pointerEvents: sceneReady ? 'none' : 'auto',
        }}
      />
      <div style={{
        ...S.overlay,
        zIndex: 2,
        background: isDark
          ? 'radial-gradient(ellipse at center, transparent 0%, rgba(17,19,21,0.25) 50%, rgba(17,19,21,0.6) 100%)'
          : 'radial-gradient(ellipse at center, transparent 0%, rgba(248,243,236,0.15) 50%, rgba(248,243,236,0.45) 100%)',
      }} />
      <span
        style={{
          position: 'absolute',
          top: 'clamp(16px, 2vw, 28px)',
          left: 'clamp(20px, 3vw, 40px)',
          zIndex: 3,
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          color: 'var(--color-text-tertiary)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          opacity: 0.7,
          pointerEvents: 'none',
        }}
      >
        Gallery
      </span>
    </section>
  )
}

const S = {
  hero: { position: 'relative', width: '100%', height: '100vh', minHeight: 700, overflow: 'hidden', background: 'var(--color-bg)' },
  overlay: { position: 'absolute', inset: 0, pointerEvents: 'none' },
}
