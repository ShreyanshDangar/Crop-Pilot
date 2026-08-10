import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

export function BestWindow({ data, loading }) {
  return (
    <ResultCard title="Best Harvest Window" icon={icon} badge={data?.window} badgeType="info" loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.optimal && (
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 'var(--leading-relaxed)' }}>{data.optimal}</p>
        )}
        {data?.reasoning && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.reasoning}</p>
        )}
        {!data?.optimal && !data?.reasoning && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No window data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
