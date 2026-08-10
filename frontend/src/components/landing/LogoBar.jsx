import { motion } from 'framer-motion'

const marqueeText = 'Crop Selection \u00b7 Crop Maintenance \u00b7 Harvest Intelligence \u00b7 Market & Selling \u00b7 Photo Analysis \u00b7 AI-Powered Results \u00b7 '

export function LogoBar() {
  return (
    <section
      style={{
        padding: 'clamp(3rem, 6vw, 5rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
          color: 'var(--color-text-tertiary)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          marginBottom: '28px',
        }}
      >
        Guiding every phase
      </motion.p>

      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
        >
          <span
            style={{
              flexShrink: 0,
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              color: 'var(--color-text-tertiary)',
              opacity: 0.5,
              letterSpacing: 'var(--tracking-tight)',
              paddingRight: '2rem',
            }}
          >
            {marqueeText}
          </span>
          <span
            style={{
              flexShrink: 0,
              fontSize: 'var(--text-lg)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              color: 'var(--color-text-tertiary)',
              opacity: 0.5,
              letterSpacing: 'var(--tracking-tight)',
              paddingRight: '2rem',
            }}
          >
            {marqueeText}
          </span>
        </div>
      </div>
    </section>
  )
}
