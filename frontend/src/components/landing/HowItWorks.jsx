import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const StepVisual1 = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '14px', padding: '32px 28px', width: '100%', maxWidth: '300px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
          background: 'var(--color-olive)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <img
            src="/crop-pilot.svg"
            alt="Crop Pilot"
            width="22"
            height="22"
            style={{ display: 'block' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-primary)', opacity: 0.7 }}>Create Account</span>
          <div style={{ height: '4px', borderRadius: '2px', background: 'var(--color-border)', width: '45px' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '9px', fontWeight: 500, color: 'var(--color-text-tertiary)', paddingLeft: '2px' }}>Email</span>
        <div style={{
          height: '40px', borderRadius: 'var(--radius-sm)',
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
          border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 14px',
          boxShadow: 'var(--shadow-xs)',
        }}>
          <div style={{ height: '4px', borderRadius: '2px', background: 'var(--color-border)', width: '65%' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '9px', fontWeight: 500, color: 'var(--color-text-tertiary)', paddingLeft: '2px' }}>Password</span>
        <div style={{
          height: '40px', borderRadius: 'var(--radius-sm)',
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
          border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', padding: '0 14px',
          boxShadow: 'var(--shadow-xs)',
        }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3,4,5,6,7,8].map(d => (
              <div key={d} style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-text-tertiary)', opacity: 0.5 }} />
            ))}
          </div>
        </div>
      </div>
      <div style={{
        height: '40px', borderRadius: 'var(--radius-pill)', background: 'var(--color-olive)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        boxShadow: '0 2px 8px rgba(110, 117, 94, 0.3)',
      }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#FDFBF7', letterSpacing: '0.3px' }}>Create Account</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        padding: '4px 0',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-olive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        <span style={{ fontSize: '9px', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>Verified with 6-digit code</span>
      </div>
    </div>
  )
}

const StepScreenshot = ({ lightSrc, darkSrc, alt }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        src={lightSrc}
        alt={alt}
        loading="lazy"
        className="screenshot-light"
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          display: 'block', borderRadius: 'var(--radius-xl)',
        }}
      />
      <img
        src={darkSrc}
        alt={alt}
        loading="lazy"
        className="screenshot-dark"
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          display: 'none', borderRadius: 'var(--radius-xl)',
          position: 'absolute', top: 0, left: 0,
        }}
      />
    </div>
  )
}

const steps = [
  {
    number: '01',
    title: 'Sign up in seconds',
    description: 'Create your account with email and a quick verification code. No third-party logins, no complexity \u2014 just a secure, fast signup.',
    visual: 'mockup',
    gradient: 'linear-gradient(135deg, var(--color-sage) 0%, var(--color-olive) 100%)',
  },
  {
    number: '02',
    title: 'Describe your farm',
    description: 'Answer a guided set of questions about your location, land size, irrigation, budget, and crop history. The AI builds its analysis from your specific conditions.',
    visual: 'screenshot',
    lightSrc: '/1-Light.jpg',
    darkSrc: '/1-Dark.jpg',
    gradient: 'linear-gradient(135deg, var(--color-olive) 0%, var(--color-sage) 100%)',
  },
  {
    number: '03',
    title: 'Get AI-powered results',
    description: 'Receive structured result cards with crop recommendations, maintenance plans, harvest windows, and market strategies \u2014 tailored to your inputs.',
    visual: 'screenshot',
    lightSrc: '/2-Light.jpg',
    darkSrc: '/2-Dark.jpg',
    gradient: 'linear-gradient(135deg, var(--color-sage) 0%, var(--color-olive) 100%)',
  },
]

const StepCard = ({ step, children }) => {
  const [hovered, setHovered] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const defaultBrightness = isDark ? 'brightness(0.88)' : 'brightness(0.95)'
  const hoveredBrightness = isDark ? 'brightness(1.15)' : 'brightness(0.85)'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: '3 / 2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md), 0 0 0 1px var(--color-border)',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        filter: hovered ? hoveredBrightness : defaultBrightness,
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
        transition: 'filter 450ms ease-out, transform 450ms ease-out',
      }}>
        {children}
      </div>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(180deg, rgba(110, 117, 94, 0.18) 0%, rgba(169, 182, 158, 0.06) 60%, transparent 100%)`,
        borderRadius: 'var(--radius-xl)',
        opacity: hovered ? 0 : 0.8,
        transition: 'opacity 450ms ease-out',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        background: step.gradient,
        opacity: hovered ? 0.4 : 0.6,
        transition: 'opacity 450ms ease-out',
      }} />
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const numberVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const titleVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const descVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const staticVariant = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const nV = prefersReducedMotion ? staticVariant : numberVariants
  const tV = prefersReducedMotion ? staticVariant : titleVariants
  const dV = prefersReducedMotion ? staticVariant : descVariants
  const cV = prefersReducedMotion ? staticVariant : cardVariants
  const conV = prefersReducedMotion ? { hidden: {}, visible: {} } : containerVariants

  return (
    <section
      id="how-it-works"
      className="section-padding section-y"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--color-accent)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-5xl)',
              fontWeight: 700,
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--color-text-primary)',
            }}
          >
            How Crop Pilot works
          </h2>
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={conV}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                gap: 'clamp(1.5rem, 4vw, 4rem)',
                alignItems: 'center',
              }}
              className="how-it-works-step"
            >
              <div
                style={{ order: i % 2 === 1 ? 2 : 1 }}
                className="how-it-works-text"
              >
                <motion.span
                  variants={nV}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-6xl)',
                    fontWeight: 700,
                    color: 'var(--color-text-tertiary)',
                    opacity: 0.45,
                    lineHeight: 'var(--leading-none)',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  {step.number}
                </motion.span>
                <motion.h3
                  variants={tV}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px',
                  }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  variants={dV}
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                    maxWidth: '420px',
                  }}
                >
                  {step.description}
                </motion.p>
              </div>

              <motion.div
                variants={cV}
                style={{ order: i % 2 === 1 ? 1 : 2 }}
                className="how-it-works-visual"
              >
                <StepCard step={step}>
                  {step.visual === 'mockup' ? (
                    <StepVisual1 />
                  ) : (
                    <StepScreenshot
                      lightSrc={step.lightSrc}
                      darkSrc={step.darkSrc}
                      alt={step.title}
                    />
                  )}
                </StepCard>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-it-works-step {
            grid-template-columns: 1fr !important;
          }
          .how-it-works-text,
          .how-it-works-visual {
            order: unset !important;
          }
        }
        /* Theme-aware screenshot visibility — no JS re-render needed */
        :root .screenshot-light { display: block !important; }
        :root .screenshot-dark { display: none !important; }
        [data-theme="dark"] .screenshot-light { display: none !important; }
        [data-theme="dark"] .screenshot-dark { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; }
        @media (prefers-reduced-motion: reduce) {
          .how-it-works-step * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}
