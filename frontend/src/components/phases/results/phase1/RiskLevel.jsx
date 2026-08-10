import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
)

const levelBadge = { Low: 'success', Medium: 'warning', High: 'danger' }
const levelColors = {
  success: 'var(--color-accent)',
  warning: '#c49c4a',
  danger: '#c4564a',
}

export function RiskLevel({ data, loading }) {
  return (
    <ResultCard title="Risk Assessment" icon={icon} loading={loading}>
      {data?.risks?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {data.risks.map((risk, i) => {
            const type = levelBadge[risk.level] || 'info'
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{risk.crop}</span>
                <span style={{
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  color: levelColors[type] || 'var(--color-accent)',
                  background: type === 'danger' ? 'rgba(196, 86, 74, 0.12)' : type === 'warning' ? 'rgba(196, 156, 74, 0.12)' : 'var(--color-accent-bg)',
                }}>
                  {risk.level}
                </span>
              </div>
            )
          })}
          {data.notes && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)', lineHeight: 'var(--leading-relaxed)' }}>
              {data.notes}
            </p>
          )}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No risk data available.</p>
      )}
    </ResultCard>
  )
}
