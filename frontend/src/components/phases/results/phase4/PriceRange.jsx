import { ResultCard } from '../../../ui/ResultCard'

const icon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
)

export function PriceRange({ data, loading }) {
  return (
    <ResultCard title="Price Range" icon={icon} loading={loading}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {(data?.low !== undefined || data?.high !== undefined) && (
          <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              INR {data?.low ?? '—'} — {data?.high ?? '—'}
            </span>
          </div>
        )}
        {data?.confidence !== undefined && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>Confidence</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 600 }}>{data.confidence}%</span>
            </div>
            <div style={{ height: '4px', borderRadius: 'var(--radius-pill)', background: 'var(--color-border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${data.confidence}%`, background: 'var(--color-accent)', borderRadius: 'var(--radius-pill)' }} />
            </div>
          </div>
        )}
        {data?.basis && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{data.basis}</p>
        )}
        {data?.low === undefined && data?.high === undefined && (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>No price data available.</p>
        )}
      </div>
    </ResultCard>
  )
}
