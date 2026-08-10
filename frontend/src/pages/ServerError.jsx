import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'

export function ServerError() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'var(--color-bg)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          maxWidth: '480px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(6rem, 15vw, 10rem)',
            fontWeight: 700,
            lineHeight: 'var(--leading-none)',
            color: 'var(--color-border-strong)',
            marginBottom: '8px',
            letterSpacing: 'var(--tracking-tighter)',
          }}
        >
          500
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: '32px',
          }}
        >
          We're experiencing an unexpected issue. Please try again,
          or return home while we sort things out.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
          <Link to="/">
            <Button variant="secondary" size="md">
              Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
