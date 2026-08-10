import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Principles', href: '#principles' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
]

const socialLinks = [
  {
    label: 'Twitter',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

function FooterLink({ label, href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li>
      <a
        href={href}
        style={{
          fontSize: 'var(--text-sm)',
          color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
          transition: 'color 0.3s ease, letter-spacing 0.3s ease',
          letterSpacing: hovered ? '0.04em' : '0',
          position: 'relative',
          display: 'inline-block',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
        <span
          style={{
            position: 'absolute',
            bottom: '-2px',
            left: 0,
            height: '1px',
            width: hovered ? '100%' : '0%',
            background: 'var(--color-olive)',
            transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </a>
    </li>
  )
}

function SocialIcon({ social }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={social.href}
      aria-label={social.label}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: 'var(--radius-pill)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
        background: hovered ? 'var(--color-accent-bg)' : 'transparent',
        transform: hovered ? 'scale(1.15) translateY(-2px)' : 'scale(1) translateY(0)',
        boxShadow: hovered ? '0 4px 12px rgba(110, 117, 94, 0.2)' : '0 0 0 transparent',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {social.icon}
    </a>
  )
}

export function Footer() {
  const footerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const stagger = (index) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
  })

  return (
    <footer
      ref={footerRef}
      className="section-padding"
      style={{
        position: 'relative',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 'clamp(3rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 3vw, 3rem)',
        overflow: 'hidden',
      }}
    >
      {/* Visual anchor — gradient separator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: isDark
            ? 'linear-gradient(90deg, transparent 0%, rgba(142, 154, 124, 0.4) 25%, rgba(142, 154, 124, 0.6) 50%, rgba(142, 154, 124, 0.4) 75%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(110, 117, 94, 0.2) 25%, rgba(110, 117, 94, 0.35) 50%, rgba(110, 117, 94, 0.2) 75%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '80px',
          background: isDark
            ? 'radial-gradient(ellipse at top, rgba(142, 154, 124, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at top, rgba(110, 117, 94, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.5fr) repeat(2, minmax(0, 1fr))',
            gap: 'clamp(3rem, 5vw, 6rem)',
            marginBottom: 'clamp(3rem, 5vw, 5rem)',
          }}
          className="footer-grid"
        >
          <div style={stagger(0)}>
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: 'var(--tracking-tight)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <img
                src="/crop-pilot.svg"
                alt="Crop Pilot logo"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: 'var(--radius-xs)',
                  objectFit: 'contain',
                }}
              />
              Crop Pilot
            </Link>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-tertiary)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: '300px',
              }}
            >
              Crop Pilot — AI-powered farm advisory for smarter farming decisions.
            </p>
          </div>

          {footerLinks.map((col, colIndex) => (
            <div key={col.title} style={stagger(colIndex + 1)}>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map(link => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            ...stagger(3),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '28px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            &copy; {new Date().getFullYear()} Crop Pilot. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {socialLinks.map(social => (
              <SocialIcon key={social.label} social={social} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
