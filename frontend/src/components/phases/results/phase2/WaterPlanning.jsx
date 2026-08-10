import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
)

export function WaterPlanning({ data, loading }) {
  const hasDeficit = data?.deficit && Number(data.deficit) > 0

  return (
    <ResultCard title="Water Planning" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {(data?.requiredCapacity || data?.deficit !== undefined) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            {data.requiredCapacity && (
              <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Required</span>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.requiredCapacity}</p>
              </div>
            )}
            {data.deficit !== undefined && (
              <div style={{ padding: 'var(--space-3)', background: hasDeficit ? 'rgba(196, 86, 74, 0.08)' : 'var(--color-surface)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: hasDeficit ? '#c4564a' : 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Deficit</span>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: hasDeficit ? '#c4564a' : 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.deficit}</p>
              </div>
            )}
          </div>
        )}
        {data?.schedule && (
          <div style={{ padding: 'var(--space-3)', background: 'var(--color-accent-bg)', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Schedule</span>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.schedule}</p>
          </div>
        )}
        {!data?.requiredCapacity && data?.deficit === undefined && !data?.schedule && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No water data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
