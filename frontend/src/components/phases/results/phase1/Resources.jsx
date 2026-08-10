import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)

export function Resources({ data, loading }) {
  return (
    <ResultCard title="Resources Needed" icon={icon} loading={loading}>
      {data?.items?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {data.items.map((item, i) => (
            <div key={i}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</span>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>{item.detail}</p>
            </div>
          ))}
          {data.labourEstimate && (
            <div style={{ padding: 'var(--space-3)', background: 'var(--color-accent-bg)', borderRadius: 'var(--radius-sm)', marginTop: 'var(--space-1)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-accent)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Labour Estimate</span>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginTop: 'var(--space-1)' }}>{data.labourEstimate}</p>
            </div>
          )}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No resource data available.</p>
      )}
    </ResultCard>
  )
}
