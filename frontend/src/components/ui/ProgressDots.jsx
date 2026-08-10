export function ProgressDots({ total, current, style }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        justifyContent: 'center',
        ...style,
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current
        const isCompleted = i < current

        return (
          <div
            key={i}
            style={{
              width: isActive ? '24px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-pill)',
              background: isActive
                ? 'var(--color-accent)'
                : isCompleted
                  ? 'var(--color-accent-soft)'
                  : 'var(--color-border)',
              transition: 'all var(--duration-normal) var(--ease-out)',
            }}
          />
        )
      })}
    </div>
  )
}
