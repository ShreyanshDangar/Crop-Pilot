import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const ratingBadge = { Strong: 'success', 'At Risk': 'danger', Mixed: 'warning' }

export function QualitySnapshot({ data, loading }) {
  return (
    <ResultCard title="Quality Snapshot" icon={icon} badge={data?.rating} badgeType={ratingBadge[data?.rating] || 'info'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.summary && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.summary}</p>
        )}
        {data?.defects?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#c4564a', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Defects</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.defects.map((defect, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: '#c4564a', lineHeight: 'var(--leading-relaxed)' }}>{defect}</li>
              ))}
            </ul>
          </div>
        )}
        {!data?.summary && !data?.defects?.length && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No quality data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
