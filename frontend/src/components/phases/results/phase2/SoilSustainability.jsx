import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
  </svg>
)

const ratingBadge = { Good: 'success', 'At Risk': 'warning', 'Needs Action': 'danger' }

export function SoilSustainability({ data, loading }) {
  return (
    <ResultCard title="Soil Sustainability" icon={icon} badge={data?.rating} badgeType={ratingBadge[data?.rating] || 'info'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.summary && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.summary}</p>
        )}
        {data?.recommendations?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Recommendations</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.recommendations.map((rec, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
        {!data?.summary && !data?.recommendations?.length && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No soil data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
