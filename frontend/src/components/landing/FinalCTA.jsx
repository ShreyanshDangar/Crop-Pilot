import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

const stats = [
  { value: '4 phases', label: 'Full lifecycle' },
  { value: '28 cards', label: 'Result types' },
  { value: 'Photo analysis', label: 'Built in' },
]

export function FinalCTA({ onAuthOpen }) {
  return (
    <section
      className="section-padding section-y"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 5vw, 5rem)',
            marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 700,
                color: 'var(--color-olive)',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-wide)',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={{
          width: '60px', height: '1px', background: 'var(--color-border-strong)',
          margin: '0 auto', marginBottom: 'clamp(2.5rem, 4vw, 4rem)',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-6xl)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--color-text-primary)',
              marginBottom: '20px',
            }}
          >
            Ready to grow with{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-olive)' }}>
              Crop Pilot
            </span>
            ?
          </h2>
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '520px',
              margin: '0 auto 40px',
            }}
          >
            AI-powered farm advisory from crop selection to market selling. No setup headaches — just answers.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="xl" onClick={onAuthOpen}>
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
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
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)',
              marginTop: '24px',
              letterSpacing: 'var(--tracking-wide)',
            }}
          >
            No credit card required. Free during early access.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
