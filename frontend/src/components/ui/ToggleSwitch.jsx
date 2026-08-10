export function ToggleSwitch({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
}) {
  return (
    <div style={{ width: '100%' }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--color-surface)',
          border: `1px solid ${error ? '#c4564a' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-sm)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all var(--duration-fast) var(--ease-out)',
        }}
        onMouseEnter={e => {
          if (!disabled) {
            e.currentTarget.style.borderColor = 'var(--color-border-strong)'
          }
        }}
        onMouseLeave={e => {
          if (!disabled) {
            e.currentTarget.style.borderColor = error ? '#c4564a' : 'var(--color-border)'
          }
        }}
      >
        {label && (
          <span
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {label}
          </span>
        )}
        <div
          style={{
            width: '44px',
            height: '24px',
            borderRadius: 'var(--radius-pill)',
            background: checked ? 'var(--color-accent)' : 'var(--color-border)',
            position: 'relative',
            transition: 'background var(--duration-normal) var(--ease-out)',
            flexShrink: 0,
            marginLeft: label ? 'var(--space-3)' : 0,
          }}
        >
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'var(--color-bg)',
              position: 'absolute',
              top: '3px',
              left: checked ? '23px' : '3px',
              transition: 'left var(--duration-normal) var(--ease-spring)',
              boxShadow: 'var(--shadow-xs)',
            }}
          />
        </div>
      </button>
      {error && (
        <p style={{ fontSize: 'var(--text-xs)', color: '#c4564a', marginTop: 'var(--space-1)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
