import { motion } from 'framer-motion'

const attributes = [
  { label: '4 Phases', sublabel: 'Full Lifecycle' },
  { label: '28 Cards', sublabel: 'Result Types' },
  { label: 'Photo Analysis', sublabel: 'Built In' },
  { label: 'Claude AI', sublabel: 'Powered' },
]

export function Metrics() {
  return (
    <section
      className="section-padding"
      style={{
        paddingTop: 'clamp(3rem, 5vw, 5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        background: 'var(--color-surface)',
      }}
    >
      <div className="content-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            textAlign: 'center',
          }}
        >
          {attributes.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 'clamp(16px, 2vw, 28px)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  lineHeight: 'var(--leading-none)',
                  marginBottom: '8px',
                  letterSpacing: 'var(--tracking-tighter)',
                }}
              >
                {m.label}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-tertiary)',
                  fontWeight: 500,
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {m.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
