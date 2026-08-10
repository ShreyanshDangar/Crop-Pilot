import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const verdictBadge = { Ready: 'success', 'Act Now': 'danger' }

export function HarvestReadiness({ data, loading }) {
  return (
    <ResultCard title="Harvest Readiness" icon={icon} badge={data?.verdict} badgeType={verdictBadge[data?.verdict] || 'warning'} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {data?.summary && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.summary}</p>
        )}
        {data?.photoAnalysis && (
          <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Photo Analysis</span>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.photoAnalysis}</p>
          </div>
        )}
        {!data?.summary && !data?.photoAnalysis && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No readiness data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
