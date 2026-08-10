import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const ratingBadge = { Ready: 'success', Hold: 'danger', 'Needs Sorting': 'warning' }

export function SaleReadiness({ data, loading }) {
  return (
    <ResultCard title="Sale Readiness" icon={icon} badge={data?.rating} badgeType={ratingBadge[data?.rating] || 'info'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.summary && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.summary}</p>
        )}
        {data?.actions?.length > 0 && (
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Preparation</span>
            <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', marginTop: 'var(--space-1)' }}>
              {data.actions.map((action, i) => (
                <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{action}</li>
              ))}
            </ul>
          </div>
        )}
        {!data?.summary && !data?.actions?.length && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No readiness data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
