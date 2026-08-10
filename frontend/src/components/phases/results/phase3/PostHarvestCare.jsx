import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export function PostHarvestCare({ data, loading }) {
  return (
    <ResultCard title="Post-Harvest Care" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.actions?.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {data.actions.map((action, i) => (
              <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{action}</li>
            ))}
          </ul>
        )}
        {data?.warning && (
          <div style={{ padding: 'var(--space-3)', background: 'rgba(196, 86, 74, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #c4564a' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: '#c4564a' }}>{data.warning}</p>
          </div>
        )}
        {!data?.actions?.length && !data?.warning && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No post-harvest data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
