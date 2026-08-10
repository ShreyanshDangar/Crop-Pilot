import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Modal({ isOpen, onClose, children, maxWidth = '480px' }) {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose()
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal-backdrop)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'var(--color-bg-overlay)',
            backdropFilter: 'blur(12px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
          }}
        >
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 'var(--z-modal)',
              width: '100%',
              maxWidth,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--glass-bg-strong)',
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                transition: 'all var(--duration-fast) var(--ease-out)',
                cursor: 'pointer',
                zIndex: 1,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-surface-hover)'
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-surface)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
