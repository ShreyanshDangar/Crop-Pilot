import { useState } from 'react'

export function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  format,
  disabled = false,
  error,
}) {
  const [hovered, setHovered] = useState(false)
  const displayValue = format === 'currency'
    ? `INR ${Number(value).toLocaleString('en-IN')}`
    : value

  const percent = ((value - min) / (max - min)) * 100

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--space-2)',
          }}
        >
          <label
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: error ? '#c4564a' : 'var(--color-text-secondary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {label}
          </label>
          <span
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {displayValue}
          </span>
        </div>
      )}
      <div
        style={{
          position: 'relative',
          padding: 'var(--space-2) 0',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            width: '100%',
            height: '6px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: `linear-gradient(to right, var(--color-accent) ${percent}%, var(--color-border-strong) ${percent}%)`,
            borderRadius: 'var(--radius-pill)',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            transition: 'opacity var(--duration-fast) var(--ease-out)',
          }}
        />
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: ${hovered ? '18px' : '16px'};
            height: ${hovered ? '18px' : '16px'};
            border-radius: 50%;
            background: var(--color-accent);
            border: 2px solid var(--color-bg);
            box-shadow: var(--shadow-sm);
            cursor: pointer;
            transition: all var(--duration-fast) var(--ease-out);
          }
          input[type="range"]::-moz-range-thumb {
            width: ${hovered ? '18px' : '16px'};
            height: ${hovered ? '18px' : '16px'};
            border-radius: 50%;
            background: var(--color-accent);
            border: 2px solid var(--color-bg);
            box-shadow: var(--shadow-sm);
            cursor: pointer;
            transition: all var(--duration-fast) var(--ease-out);
          }
        `}</style>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <span>{format === 'currency' ? `INR ${min.toLocaleString('en-IN')}` : min}</span>
        <span>{format === 'currency' ? `INR ${max.toLocaleString('en-IN')}` : max}</span>
      </div>
      {error && (
        <p style={{ fontSize: 'var(--text-xs)', color: '#c4564a', marginTop: 'var(--space-1)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
