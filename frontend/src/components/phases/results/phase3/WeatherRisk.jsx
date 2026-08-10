import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 16.2A4.5 4.5 0 0017.5 8h-1.8A7 7 0 104 14.9" /><path d="M16 14v6M8 14v6M12 16v6" />
  </svg>
)

const urgencyBadge = { Critical: 'danger', High: 'danger', Medium: 'warning', Low: 'success' }
const severityColors = { Critical: '#c4564a', High: '#c4564a', Medium: '#c49c4a', Low: 'var(--color-accent)' }

export function WeatherRisk({ data, loading }) {
  return (
    <ResultCard title="Weather Risk" icon={icon} badge={data?.urgency} badgeType={urgencyBadge[data?.urgency] || 'warning'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.risks?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {data.risks.map((risk, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{risk.type}</span>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: severityColors[risk.severity] || 'var(--color-text-secondary)' }}>{risk.severity}</span>
              </div>
            ))}
          </div>
        )}
        {data?.recommendation && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.recommendation}</p>
        )}
        {!data?.risks?.length && !data?.recommendation && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No weather risk data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
