import { Skeleton, SkeletonText } from './Skeleton'

const badgeColors = {
  success: { bg: 'rgba(169, 182, 158, 0.15)', color: 'var(--color-accent)' },
  warning: { bg: 'rgba(196, 156, 74, 0.12)', color: '#c49c4a' },
  danger: { bg: 'rgba(196, 86, 74, 0.12)', color: '#c4564a' },
  info: { bg: 'var(--color-accent-bg)', color: 'var(--color-accent)' },
}

export function ResultCard({
  title,
  icon,
  badge,
  badgeType = 'info',
  loading = false,
  children,
  style,
}) {
  if (loading) {
    return (
      <div
        className="glass-card"
        style={{
          padding: 'var(--space-5)',
          ...style,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <Skeleton width="32px" height="32px" borderRadius="var(--radius-sm)" />
          <Skeleton width="60%" height="18px" />
        </div>
        <SkeletonText lines={4} />
      </div>
    )
  }

  const colors = badgeColors[badgeType] || badgeColors.info

  return (
    <div
      className="glass-card"
      style={{
        padding: 'var(--space-5)',
        transition: 'all var(--duration-normal) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = ''
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        {icon && (
          <div
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-accent-bg)',
              color: 'var(--color-accent)',
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            flex: 1,
          }}
        >
          {title}
        </h4>
        {badge && (
          <span
            style={{
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-pill)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              background: colors.bg,
              color: colors.color,
              letterSpacing: 'var(--tracking-wide)',
              whiteSpace: 'nowrap',
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
