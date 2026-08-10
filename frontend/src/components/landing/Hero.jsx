import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { useTheme } from '../../context/ThemeContext'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const fadeSlideUp = {
  hidden: { opacity: 0, willChange: 'opacity' },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
}

const fadeSlideUpSlow = {
  hidden: { opacity: 0, willChange: 'opacity' },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
}

const buttonContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
}

const buttonVariant = {
  hidden: { opacity: 0, willChange: 'opacity' },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

const scrollIndicatorVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.6, duration: 1, ease: 'easeOut' },
  },
}

export function Hero({ onAuthOpen }) {
  const containerRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '820px',
          padding: '0 clamp(1.5rem, 4vw, 3rem)',
          paddingTop: 'var(--navbar-height)',
        }}
      >
        <motion.h1
          variants={fadeSlideUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-7xl)',
            fontWeight: 700,
            lineHeight: 'var(--leading-none)',
            letterSpacing: 'var(--tracking-tighter)',
            color: 'var(--color-text-primary)',
            marginBottom: '24px',
          }}
        >
          <span>Smarter farming, from seed to </span>
          <motion.span
            variants={{
              hidden: { opacity: 0, willChange: 'opacity' },
              visible: {
                opacity: 1,
                transition: { duration: 0.9, delay: 0.15, ease: EASE_OUT_EXPO },
              },
            }}
            style={{
              color: 'var(--color-olive)',
              fontStyle: 'italic',
              display: 'inline-block',
            }}
          >
            sale
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeSlideUpSlow}
          style={{
            fontSize: 'var(--text-xl)',
            lineHeight: 'var(--leading-relaxed)',
            color: 'var(--color-text-secondary)',
            maxWidth: '580px',
            margin: '0 auto 40px',
          }}
        >
          AI-powered advisory that guides you through crop selection, maintenance, harvest timing, and market strategy.
        </motion.p>

        <motion.div
          variants={buttonContainerVariants}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.div variants={buttonVariant}>
            <Button variant="primary" size="lg" onClick={onAuthOpen}>
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </motion.div>
          <motion.div variants={buttonVariant}>
            <Button
              variant="glass"
              size="lg"
              onClick={() => {
                const el = document.querySelector('#features')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See Features
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={scrollIndicatorVariant}
        initial="hidden"
        animate="visible"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{
          fontSize: '10px',
          color: 'var(--color-text-tertiary)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Scroll
        </span>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
        }}>
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              style={{
                animation: 'scrollChevron 2s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
                opacity: 0.2,
              }}
            >
              <path
                d="M2 2L8 8L14 2"
                stroke={isDark ? 'rgba(142, 154, 124, 0.6)' : 'rgba(110, 117, 94, 0.5)'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
