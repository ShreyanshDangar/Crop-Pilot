import { useState, useRef, useEffect } from 'react'

export function DropdownSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
}) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const hasValue = value !== undefined && value !== '' && value !== null

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => { if (!disabled) setOpen(prev => !prev) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: label ? '24px 40px 8px 16px' : '14px 40px 14px 16px',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-body)',
          color: hasValue ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
          background: 'var(--color-input-bg)',
          border: `1px solid ${error ? '#c4564a' : focused || open ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
          borderRadius: 'var(--radius-sm)',
          transition: 'all var(--duration-normal) var(--ease-out)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          textAlign: 'left',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => {
          if (!disabled && !open) e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        }}
        onMouseLeave={e => {
          if (!disabled && !open && !focused) e.currentTarget.style.borderColor = error ? '#c4564a' : 'var(--color-border-strong)'
        }}
      >
        {hasValue ? value : (label && !open ? '\u00A0' : placeholder)}
      </button>

      {label && (
        <span
          style={{
            position: 'absolute',
            left: '16px',
            top: hasValue || open ? '6px' : '50%',
            transform: hasValue || open ? 'none' : 'translateY(-50%)',
            fontSize: hasValue || open ? 'var(--text-xs)' : 'var(--text-base)',
            lineHeight: 1,
            color: error ? '#c4564a' : open ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
            fontWeight: hasValue || open ? 500 : 400,
            letterSpacing: hasValue || open ? 'var(--tracking-wide)' : 'var(--tracking-normal)',
            transition: 'all var(--duration-normal) var(--ease-out)',
            pointerEvents: 'none',
          }}
        >
          {label}
        </span>
      )}

      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-text-tertiary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: 'absolute',
          right: '14px',
          top: '50%',
          transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
          transition: 'transform var(--duration-normal) var(--ease-out)',
          pointerEvents: 'none',
        }}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            maxHeight: '240px',
            overflowY: 'auto',
            background: 'var(--glass-bg-strong)',
            backdropFilter: 'blur(20px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 'var(--z-modal)',
            padding: 'var(--space-1)',
          }}
        >
          {options.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              style={{
                width: '100%',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-body)',
                color: option === value ? 'var(--color-accent)' : 'var(--color-text-primary)',
                fontWeight: option === value ? 600 : 400,
                background: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background var(--duration-fast) var(--ease-out)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-surface)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p style={{ fontSize: 'var(--text-xs)', color: '#c4564a', marginTop: 'var(--space-1)', paddingLeft: 'var(--space-1)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
