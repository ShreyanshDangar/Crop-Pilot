import { useState } from 'react'

export function MultiSelect({
  label,
  options = [],
  value = [],
  onChange,
  disabled = false,
  error,
}) {
  const [hovered, setHovered] = useState(null)

  const toggleOption = (option) => {
    if (disabled) return
    const next = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option]
    onChange(next)
  }

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: error ? '#c4564a' : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        {options.map(option => {
          const selected = value.includes(option)
          const isHovered = hovered === option

          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => toggleOption(option)}
              onMouseEnter={() => setHovered(option)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-pill)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-body)',
                fontWeight: selected ? 600 : 400,
                color: selected ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                background: selected
                  ? 'var(--color-accent)'
                  : isHovered
                    ? 'var(--color-surface-hover)'
                    : 'var(--color-surface)',
                border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                transition: 'all var(--duration-fast) var(--ease-out)',
                whiteSpace: 'nowrap',
              }}
            >
              {selected && (
                <span style={{ marginRight: 'var(--space-1)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
              {option}
            </button>
          )
        })}
      </div>
      {error && (
        <p style={{ fontSize: 'var(--text-xs)', color: '#c4564a', marginTop: 'var(--space-2)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
