import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const baseStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  letterSpacing: 'var(--tracking-wide)',
  borderRadius: 'var(--radius-pill)',
  cursor: 'pointer',
  transition: 'all var(--duration-normal) var(--ease-out)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  position: 'relative',
  overflow: 'hidden',
}

const variants = {
  primary: {
    background: 'var(--color-ink)',
    color: 'var(--color-canvas)',
    border: '1px solid transparent',
  },
  secondary: {
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    border: '1px solid transparent',
  },
  glass: {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
    WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturate))',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--glass-border)',
  },
  accent: {
    background: 'var(--color-olive)',
    color: '#FDFBF7',
    border: '1px solid transparent',
  },
}

const hoverVariants = {
  primary: {
    background: 'var(--color-ink-muted)',
    transform: 'translateY(-1px)',
    boxShadow: 'var(--shadow-md)',
  },
  secondary: {
    background: 'var(--color-surface-hover)',
    borderColor: 'var(--color-border-strong)',
    transform: 'translateY(-1px)',
  },
  ghost: {
    background: 'var(--color-surface)',
  },
  glass: {
    borderColor: 'var(--glass-border-hover)',
    boxShadow: 'var(--shadow-glass)',
    transform: 'translateY(-1px)',
  },
  accent: {
    background: 'var(--color-accent-hover)',
    transform: 'translateY(-1px)',
    boxShadow: 'var(--shadow-md)',
  },
}

const sizes = {
  sm: { padding: '8px 18px', fontSize: 'var(--text-sm)' },
  md: { padding: '10px 24px', fontSize: 'var(--text-base)' },
  lg: { padding: '14px 32px', fontSize: 'var(--text-lg)' },
  xl: { padding: '16px 40px', fontSize: 'var(--text-lg)' },
}

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className,
    style,
    ...props
  },
  ref
) {
  const variantStyle = variants[variant] || variants.primary
  const sizeStyle = sizes[size] || sizes.md
  const hoverStyle = hoverVariants[variant] || hoverVariants.primary

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(className)}
      style={{
        ...baseStyles,
        ...variantStyle,
        ...sizeStyle,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled || loading ? 'none' : 'auto',
        ...style,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyle)
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, {
            ...variantStyle,
            ...sizeStyle,
            transform: 'translateY(0)',
            boxShadow: 'none',
            ...style,
          })
        }
      }}
      onMouseDown={e => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0) scale(0.98)'
        }
      }}
      onMouseUp={e => {
        if (!disabled) {
          Object.assign(e.currentTarget.style, hoverStyle)
        }
      }}
      {...props}
    >
      {loading && (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      )}
      {children}
    </button>
  )
})
